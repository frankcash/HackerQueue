package cmd

import (
	"github.com/HackerQueue/transports/http"
	"github.com/spf13/cobra"
)

var cmdServer = &cobra.Command{
	Use:   "server",
	Short: "server is for running the service",
	Long:  `server starts the service, with given transport if we`,
	Run:   serverRun,
}

func serverRun(cmd *cobra.Command, args []string) {
	srv := http.NewService()
	srv.Start()
}

func init() {
	RootCmd.AddCommand(cmdServer)
}
