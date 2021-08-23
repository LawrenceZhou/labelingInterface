package main

import (
    "database/sql"
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "fmt"
)


func initDatabase(ip string, name string, user string, password string) {
    //createDatabase(ip, name, user, password)
    connectDatabase(ip, name, user, password)
    createTables()

    //insert instance example
    for i := 0; i < 100; i++ {
        // perform a db.Query insert
        instance := Instances{FilePath: "../../assets/FOY0303JOY1.wav", SynthesisPath: "../../assets/FOY0303JOY3.wav", DefaultValueP: 5, DefaultValueA: 5, DefaultValueD: 5}
        success := insertInstance(instance)
        if !success {
            fmt.Println("Instance insertion failed.")
        }
    }  
}

func connectDatabase(ip string, name string, user string, password string) {
    //open a db connection when initiated
    var err error
    db, err = gorm.Open("mysql", user+":"+password+"@"+ip+"/"+name+"?charset=utf8&parseTime=True&loc=Local")
    if err != nil {
        panic(err)
        panic("failed to connect database")
    }
}

func createDatabase(ip string, name string, user string, password string) {

   db_sql, err := sql.Open("mysql", user+":"+password+"@"+ip+"/")
   if err != nil {
       panic(err)
   }
   defer db_sql.Close()

   _,err = db_sql.Exec("CREATE DATABASE "+ name)
   if err != nil {
       panic(err)
   }

   _,err = db_sql.Exec("USE "+ name)
   if err != nil {
       panic(err)
   }
}


func createTables() {
    db.AutoMigrate(&Users{}, &Assignments{}, &Labels{}, &Instances{}, &Assignments{}, &Surveys{}, &Questionnaires{})
}


func createUser(new_user Users) bool {
    db.AutoMigrate(&Users{})
    result := db.Create(&new_user) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("user creation error：", result.Error)
        return false
    }

    return true
}


func getAssignments(userName string, assignmentsPtr *[]Assignments) bool {
    var user Users
    result := getUser(userName, &user)

    if result.Error != nil {
        fmt.Println("user found error：", result.Error)
        return false
    }

    db.AutoMigrate(&Assignments{})

    result = db.Where("user_id=?", user.ID).Find(assignmentsPtr)
    if result.Error != nil {
        fmt.Println("assignments query error：", result.Error)
        return false
    }
    return true
}


func getInstance(instanceID int, instancePtr *Instances) bool {
   db.AutoMigrate(&Instances{})

    result := db.First(instancePtr, instanceID)
    if result.Error != nil {
        fmt.Println("instance query error：", result.Error)
        return false
    }
    return true
}


func getUser(userName string, userPtr *Users) (*gorm.DB) {
    db.AutoMigrate(&Users{})
    result := db.Where("user_name = ?", userName).First(userPtr)

    return result
}


func updateUser(user Users) bool {
    db.AutoMigrate(&Users{})
    result := db.Save(&user)
    if result.Error != nil {
        fmt.Println("user update error：", result.Error)
        return false
    }

    return true
}


func insertInstance(instance Instances) bool {
    result := db.Create(&instance) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("user creation error：", result.Error)
        return false
    }
    return true
}


func insertAssignment(userID int, instanceID int) bool {
    assignment := Assignments{UserID: userID, InstanceID: instanceID}
    result := db.Create(&assignment) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("assignment insertion error：", result.Error)
        return false
    }

    return true
}


func assignUser(userName string, number int) bool {
    var user Users
    result := getUser(userName, &user)

    if result.RowsAffected > 1 {
            fmt.Println(result.RowsAffected, "More than 1 user returned! Please scrutinize the database.")
            return false
    }else if result.RowsAffected < 1 {
        fmt.Println(result.RowsAffected, "No user returned! Please scrutinize the database.")
        return false
    }else {
        //create new assignment by the algorithm selected
        instance_id_list := getInstancesIDList(number)
        fmt.Println(instance_id_list)
        db.AutoMigrate(&Assignments{})
        
        for i := 0; i < len(instance_id_list); i++ {
            // perform a db.Query insert
            success := insertAssignment(user.ID, instance_id_list[i])
            if !success {
                return false
            }
        }
    }

    return true
}


func insertLabel(label Labels) bool {
    
    db.AutoMigrate(&Labels{})

    result := db.Create(&label) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("label insertion error：", result.Error)
        return false
    }
    return true
}


func insertSurvey(survey Surveys) bool {
    
    db.AutoMigrate(&Surveys{})

    result := db.Create(&survey) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("label insertion error：", result.Error)
        return false
    }
    return true
}


func insertQuestionnaire(questionnaire Questionnaires) bool {
    
    db.AutoMigrate(&Questionnaires{})

    result := db.Create(&questionnaire) // pass pointer of data to Create

    if result.Error != nil {
        fmt.Println("label insertion error：", result.Error)
        return false
    }
    return true
}


func getInstancesIDList(number int) []int {
     instance_id_list := makeRange(101, 200)
     selected_id_list := shuffle(instance_id_list, number)
     return selected_id_list
}
