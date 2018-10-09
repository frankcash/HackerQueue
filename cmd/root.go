package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var RootCmd = &cobra.Command{
	Use:   "hackerqueue",
	Short: "HackerQueue is a compilation of web crawlers and a UI for them",
	Long:  `HackerQueue scrapes all the things and the puts them in a nice UI.  It also has the abiliy to write to PSQL.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Scrape all the things!!!")
	},
}
