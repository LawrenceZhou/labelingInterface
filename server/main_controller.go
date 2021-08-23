package main

import (
	"flag"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func main (){
	modePtr := flag.String("mode", "server", "select the mode, 'server' or 'init_database'")
	databaseNamePtr := flag.String("database_name", "trial", "indicate the database name")
	databaseIPPtr := flag.String("database_ip", "", "indicate the database ip address")
	databaseUserPtr := flag.String("database_user", "root", "indicate the database user")
	databasePasswordPtr := flag.String("database_password", "123456", "indicate the database user's password")
	numPtr := flag.Int("assignment_number", 50, "number of instances for each participant")
	
	flag.Parse()
	fmt.Println("mode:", *modePtr)
	fmt.Println("database name:", *databaseNamePtr)
	fmt.Println("database ip:", *databaseIPPtr)
	fmt.Println("database username:", *databaseUserPtr)
	fmt.Println("database password:", *databasePasswordPtr)
    fmt.Println("number:", *numPtr)

    if *modePtr == "server" {
    	fmt.Println("Starting the web server...")
    	webServer(*databaseIPPtr, *databaseNamePtr, *databaseUserPtr, *databasePasswordPtr)
    }

    if *modePtr == "init_database" {
    	fmt.Println("Initiating database...")
    	initDatabase(*databaseIPPtr, *databaseNamePtr, *databaseUserPtr, *databasePasswordPtr)
    }
}
