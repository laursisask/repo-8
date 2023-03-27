package prometheus_exporter

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/kalgurn/github-rate-limits-prometheus-exporter/internal/github_client"
	"github.com/kalgurn/github-rate-limits-prometheus-exporter/internal/utils"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func newLimitsCollector(a *github_client.Account) *LimitsCollector {
	return &LimitsCollector{
		LimitTotal: prometheus.NewDesc(prometheus.BuildFQName("github", "limit", "total"),
			"Total limit of requests for the installation",
			nil, prometheus.Labels{
				"account": a.AccountName,
			}),
		LimitRemaining: prometheus.NewDesc(prometheus.BuildFQName("github", "limit", "remaining"),
			"Amount of remaining requests for the installation",
			nil, prometheus.Labels{
				"account": a.AccountName,
			}),
		LimitUsed: prometheus.NewDesc(prometheus.BuildFQName("github", "limit", "used"),
			"Amount of used requests for the installation",
			nil, prometheus.Labels{
				"account": a.AccountName,
			}),
		SecondsLeft: prometheus.NewDesc(prometheus.BuildFQName("github", "limit", "time_left_seconds"),
			"Time left in seconds until rate limit gets reset for the installation",
			nil, prometheus.Labels{
				"account": a.AccountName,
			}),
		Account: a,
	}
}

func (collector *LimitsCollector) Describe(ch chan<- *prometheus.Desc) {
	ch <- collector.LimitTotal
	ch <- collector.LimitRemaining
	ch <- collector.LimitUsed
	ch <- collector.SecondsLeft
}

func (collector *LimitsCollector) Collect(ch chan<- prometheus.Metric) {

	auth := github_client.InitConfig(collector.Account)
	limits := github_client.GetRemainingLimits(auth.InitClient())
	log.Printf("Collected metrics for %s", collector.Account.AccountName)
	log.Printf("Limit: %d | Used: %d | Remaining: %d", limits.Limit, limits.Used, limits.Remaining)
	//Write latest value for each metric in the prometheus metric channel.
	//Note that you can pass CounterValue, GaugeValue, or UntypedValue types here.
	m1 := prometheus.MustNewConstMetric(collector.LimitTotal, prometheus.GaugeValue, float64(limits.Limit))
	m2 := prometheus.MustNewConstMetric(collector.LimitRemaining, prometheus.GaugeValue, float64(limits.Remaining))
	m3 := prometheus.MustNewConstMetric(collector.LimitUsed, prometheus.GaugeValue, float64(limits.Used))
	m4 := prometheus.MustNewConstMetric(collector.SecondsLeft, prometheus.GaugeValue, limits.SecondsLeft)
	m1 = prometheus.NewMetricWithTimestamp(time.Now(), m1)
	m2 = prometheus.NewMetricWithTimestamp(time.Now(), m2)
	m3 = prometheus.NewMetricWithTimestamp(time.Now(), m3)
	m4 = prometheus.NewMetricWithTimestamp(time.Now(), m4)
	ch <- m1
	ch <- m2
	ch <- m3
	ch <- m4
}

func Run() {
	prometheus.NewRegistry()
	var err error

	if _, present := os.LookupEnv("ACCOUNTS"); present {
		err = runMultipleAccounts()
	} else {
		err = runSingleAccount()
	}

	if err != nil {
		fmt.Println(err)
		return
	}

	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

func runSingleAccount() error {
	account, err := getSingleAccount()
	if err != nil {
		return err
	}

	limit := newLimitsCollector(account)
	prometheus.MustRegister(limit)
	return nil
}

func runMultipleAccounts() error {
	accounts := getAccountsList()

	if len(accounts) == 0 {
		return errors.New("No valid accounts detected")
	}
	for _, i := range accounts {
		prometheus.MustRegister(newLimitsCollector(&i))
	}

	return nil
}

func getSingleAccount() (*github_client.Account, error) {
	accountName := utils.GetOSVar("GITHUB_ACCOUNT_NAME")

	switch authType := utils.GetOSVar("GITHUB_AUTH_TYPE"); authType {
	case "PAT":
		return &github_client.Account{
			AuthType:    authType,
			AccountName: accountName,
			Token:       utils.GetOSVar("GITHUB_TOKEN"),
		}, nil
	case "APP":
		appID, _ := strconv.ParseInt(utils.GetOSVar("GITHUB_APP_ID"), 10, 64)
		installationID, _ := strconv.ParseInt(utils.GetOSVar("GITHUB_INSTALLATION_ID"), 10, 64)

		return &github_client.Account{
			AuthType:       authType,
			AccountName:    accountName,
			AppID:          appID,
			InstallationID: installationID,
			PrivateKeyPath: utils.GetOSVar("GITHUB_PRIVATE_KEY_PATH"),
		}, nil
	default:
		return nil, fmt.Errorf("invalid auth type")
	}
}

func getAccountsList() []github_client.Account {
	s := []byte(utils.GetOSVar("ACCOUNTS"))
	var accounts []github_client.Account

	err := json.Unmarshal(s, &accounts)
	if err != nil {
		err := fmt.Errorf("invalid format for accounts list")
		utils.RespError(err)
		return nil
	}

	return accounts
}
