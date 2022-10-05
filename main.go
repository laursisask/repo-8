package main

import (
	"flag"

	"github.com/contentsquare/terraform-provider-pritunl/internal/provider"
	"github.com/hashicorp/terraform-plugin-sdk/v2/plugin"
)

var (
	version string = "dev"
)

func main() {
	var debugMode bool

	flag.BoolVar(&debugMode, "debug", false, "set to true to run the provider with support for debuggers like delve")
	flag.Parse()

	opts := &plugin.ServeOpts{
		Debug: debugMode,
		ProviderAddr: "registry.terraform.io/contentsquare/pritunl",
		ProviderFunc: provider.New(version),
	}

	plugin.Serve(opts)
}
