package prometheus_exporter

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"testing"
	"time"

	"github.com/kalgurn/github-rate-limits-prometheus-exporter/internal/github_client"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/stretchr/testify/assert"
)

type FakeCollector struct {
	LimitTotal     *prometheus.Desc
	LimitRemaining *prometheus.Desc
	LimitUsed      *prometheus.Desc
	SecondsLeft    *prometheus.Desc
	Account        *github_client.Account
}

func newFakeCollector(a *github_client.Account) *LimitsCollector {
	return &LimitsCollector{
		LimitTotal: prometheus.NewDesc("limit_total",
			"Total limit of requests for the installation",
			nil, nil),
		LimitRemaining: prometheus.NewDesc("limit_remaining",
			"Amount of remaining requests for the installation",
			nil, nil),
		LimitUsed: prometheus.NewDesc("limit_used",
			"Amount of used requests for the installation",
			nil, nil),
		SecondsLeft: prometheus.NewDesc("seconds_left",
			"Time left in seconds until limit is reset for the installation",
			nil, nil),
		Account: a,
	}
}

func (collector *FakeCollector) Describe(ch chan<- *prometheus.Desc) {
	ch <- collector.LimitTotal
	ch <- collector.LimitRemaining
	ch <- collector.LimitUsed
	ch <- collector.SecondsLeft
}

func (collector *FakeCollector) Collect(ch chan<- prometheus.Metric) {

	log.Printf("Collecting metrics for %s", collector.Account.AccountName)
	//Write latest value for each metric in the prometheus metric channel.
	//Note that you can pass CounterValue, GaugeValue, or UntypedValue types here.
	m1 := prometheus.MustNewConstMetric(collector.LimitTotal, prometheus.GaugeValue, float64(10))
	m2 := prometheus.MustNewConstMetric(collector.LimitRemaining, prometheus.GaugeValue, float64(6))
	m3 := prometheus.MustNewConstMetric(collector.LimitUsed, prometheus.GaugeValue, float64(4))
	m4 := prometheus.MustNewConstMetric(collector.SecondsLeft, prometheus.GaugeValue, time.Duration(time.Second*30).Seconds())
	m1 = prometheus.NewMetricWithTimestamp(time.Now().Add(-time.Hour), m1)
	m2 = prometheus.NewMetricWithTimestamp(time.Now(), m2)
	m3 = prometheus.NewMetricWithTimestamp(time.Now(), m3)
	m4 = prometheus.NewMetricWithTimestamp(time.Now(), m4)
	ch <- m1
	ch <- m2
	ch <- m3
	ch <- m4
}

func TestNewLimitsCollector(t *testing.T) {
	account := github_client.Account{AccountName: "GitHub account name"}
	newCollector := newFakeCollector(&account)
	prometheus.MustRegister(newCollector)

	mux := http.NewServeMux()

	mux.Handle("/limits", promhttp.Handler())

	ts := httptest.NewServer(mux)
	defer ts.Close()

	resp, err := http.Get("0.0.0.0:2112/limits")
	if err != nil {
		log.Print(err)
	}
	fmt.Println(resp)
}

func TestParseAccountsList(t *testing.T) {
	os.Setenv(
		"ACCOUNTS",
		`[
			{"auth_type":"PAT","account_name":"bot1","token":"asdf"},
			{"auth_type":"APP","app_id":1234,"installation_id":67809,"private_key_path":"/home","account_name":"bot2"}
		]`,
	)

	expected := []github_client.Account{
		{
			AccountName: "bot1",
			AuthType:    github_client.AuthTypePAT,
			Token:       "asdf",
		},
		{
			AccountName:    "bot2",
			AuthType:       github_client.AuthTypeApp,
			AppID:          1234,
			InstallationID: 67809,
			PrivateKeyPath: "/home",
		},
	}

	r, _ := getAccountsList()

	assert.True(t, reflect.DeepEqual(expected, r))
}

func TestSingleAccountRunsOnEnvVarsPAT(t *testing.T) {
	os.Setenv("GITHUB_AUTH_TYPE", "PAT")
	os.Setenv("GITHUB_ACCOUNT_NAME", "A name")
	os.Setenv("GITHUB_TOKEN", "token_ahsd")

	expected := github_client.Account{
		AccountName: "A name",
		AuthType:    "PAT",
		Token:       "token_ahsd",
	}

	result, _ := getSingleAccount()
	assert.True(t, reflect.DeepEqual(&expected, result))
}

func TestSingleAccountRunsOnEnvVarsAPP(t *testing.T) {
	os.Setenv("GITHUB_AUTH_TYPE", "APP")
	os.Setenv("GITHUB_ACCOUNT_NAME", "Another name")
	os.Setenv("GITHUB_APP_ID", "12")
	os.Setenv("GITHUB_INSTALLATION_ID", "24")
	os.Setenv("GITHUB_PRIVATE_KEY_PATH", "/tmp")

	expected := github_client.Account{
		AccountName:    "Another name",
		AuthType:       "APP",
		AppID:          12,
		InstallationID: 24,
		PrivateKeyPath: "/tmp",
	}

	result, _ := getSingleAccount()
	assert.True(t, reflect.DeepEqual(&expected, result))
}

func TestSingleAccountFailsOnInvalidAuthType(t *testing.T) {
	os.Setenv("GITHUB_AUTH_TYPE", "POT")

	err := runSingleAccount()
	assert.NotNil(t, err)
}

func TestMultipleAccountFailsIfAnyInvalidAuthType(t *testing.T) {
	os.Setenv(
		"ACCOUNTS",
		`[
			{"auth_type":"PAT","account_name":"bot1","token":"asdf"},
			{"auth_type":"OOPS","app_id":1234,"installation_id":67809,"private_key_path":"/home","account_name":"bot2"}
		]`,
	)

	err := runMultipleAccounts()
	assert.NotNil(t, err)
}
