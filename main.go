package main

import (
	"fmt"
	"os"

	"github.com/HackerQueue/cmd"
)

func main() {
	// go run main.go server
	if err := cmd.RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
}
