package main

import (
    "database/sql"
    //"strconv"
    "fmt"
    "math/rand"
    "time"
    _ "github.com/go-sql-driver/mysql"
)


type Assignment struct {
    ID         int
    UserID     int
    InstanceID int
}


func main() {
    // Open up our database connection.
    // I've set up a database on my local machine using phpmyadmin.
    // The database is called testDb
    db, err := sql.Open("mysql", "root:123456@/label_task_schema")

    defer db.Close()
    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }

    // defer the close till after the main function has finished
    // executing
    //defer db.Close()

    //insert instance
    /*
    for i := 0; i < 100; i++ {
        // perform a db.Query insert
        insert, err := db.Query("INSERT INTO `instances`(`filepath`, `synthesis_path`, `default_value_p`, `default_value_a`, `default_value_d`) VALUES ('../../assets/FOY0303JOY1.wav','../../assets/FOY0303JOY3.wav', 5,5,5)")

        // if there is an error inserting, handle it
        if err != nil {
            panic(err.Error())
        }
        // be careful deferring Queries if you are using transactions
        defer insert.Close()
    }
    */

    //generate assignment
    
    instance_id_list := makeRange(101, 200)
    fmt.Println(instance_id_list)
    random_id_list := Shuffle(instance_id_list, 50)
    fmt.Println(random_id_list)
    
    for i := 0; i < len(random_id_list); i++ {
        // perform a db.Query insert
        insert, err := db.Query("INSERT INTO `assignments`(`user_id`, `instance_id`) VALUES (1,?)", random_id_list[i])

        // if there is an error inserting, handle it
        if err != nil {
            panic(err.Error())
        }
        // be careful deferring Queries if you are using transactions
        defer insert.Close()
    }


}



func Shuffle(slice []int, length int) []int {
  r := rand.New(rand.NewSource(time.Now().Unix()))
  ret := make([]int, length)
  for i := 0; i < length; i++ {
    randIndex := r.Intn(len(slice))
    ret[i] = slice[randIndex]
    slice = append(slice[:randIndex], slice[randIndex+1:]...)
  }
  return ret
}



func makeRange(min, max int) []int {
    a := make([]int, max-min+1)
    for i := range a {
        a[i] = min + i
    }
    return a
}