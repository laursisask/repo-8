package github_client

import (
	"encoding/json"
	"errors"

	"github.com/google/go-github/github"
)

type AppConfig struct {
	AppID          int64
	InstallationID int64
	PrivateKeyPath string
}

type TokenConfig struct {
	Token string
}

type RateLimits struct {
	Limit       int
	Remaining   int
	Used        int
	SecondsLeft float64
}

type GithubClient interface {
	InitClient() *github.Client
}

type Account struct {
	AuthType       AuthType `json:"auth_type"`
	AccountName    string   `json:"account_name"`
	AppID          int64    `json:"app_id"`
	InstallationID int64    `json:"installation_id"`
	PrivateKeyPath string   `json:"private_key_path"`
	Token          string   `json:"token"`
}

type AuthType string

const (
	AuthTypePAT AuthType = "PAT"
	AuthTypeApp AuthType = "APP"
)

var ErrInvalidAuthType = errors.New("invalid auth type")

func (a AuthType) MarshalJSON() ([]byte, error) {
	return json.Marshal(string(a))
}

func (a *AuthType) UnmarshalJSON(b []byte) error {
	var s string
	if err := json.Unmarshal(b, &s); err != nil {
		return err
	}

	if s == "PAT" || s == "APP" {
		*a = AuthType(s)
		return nil
	}

	return ErrInvalidAuthType
}
