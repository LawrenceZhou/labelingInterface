package main

import (
	"flag"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB
var assignmentNumber int
var dialogue_id_list = [3]int{9, 10, 35}
var condition_list = [3]string{"withHighlight", "withoutHighlight", "slider"}
var dialogue_index = 0
var condition_index = 0

func main (){
	modePtr := flag.String("mode", "server", "select the mode, 'server' or 'init_database'")
	databaseNamePtr := flag.String("database_name", "label_dialogue", "indicate the database name")
	databaseIPPtr := flag.String("database_ip", "", "indicate the database ip address")
	databaseUserPtr := flag.String("database_user", "lawrence", "indicate the database user")
	databasePasswordPtr := flag.String("database_password", "123456", "indicate the database user's password")
	numPtr := flag.Int("assignment_number", 50, "number of instances for each participant")
	
	flag.Parse()
	fmt.Println("mode:", *modePtr)
	fmt.Println("database name:", *databaseNamePtr)
	fmt.Println("database ip:", *databaseIPPtr)
	fmt.Println("database username:", *databaseUserPtr)
	fmt.Println("database password:", *databasePasswordPtr)
    fmt.Println("number:", *numPtr)
    assignmentNumber = *numPtr

    if *modePtr == "server" {
    	//dialogue_id_list = [9, 10, 35]
    	//condition_list = ["withHighlight", "withoutHighlight", "slider"]
    	fmt.Println("Starting the web server...")
    	webServer(*databaseIPPtr, *databaseNamePtr, *databaseUserPtr, *databasePasswordPtr)
    }

    if *modePtr == "init_database" {
    	fmt.Println("Initiating database...")
    	initDatabase(*databaseIPPtr, *databaseNamePtr, *databaseUserPtr, *databasePasswordPtr)
    }
}
