package main

import (
  "fmt"
  "strconv"
  "net/http"
  //"encoding/json"
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/mysql"
)


var db *gorm.DB

func init() {
  //open a db connection
  var err error
  db, err = gorm.Open("mysql", "root:123456@/label_task_schema?charset=utf8&parseTime=True&loc=Local")
  if err != nil {
    panic(err)

    panic("failed to connect database")
  }
  //Migrate the schema
  //  db.AutoMigrate(&todoModel{})
}


func main() {
  r := gin.Default()

  r.Use(static.Serve("/",static.LocalFile("../templates", true)))


  api := r.Group("/api")
  {
    api.POST("/save", saveHandler)
    api.POST("/get_list", getListHandler)
  }
  r.Run()
}


type (
    // todoModel 包括了 todoModel 的字段类型
    todoModel struct {
        gorm.Model
        Title     string `json:"title"`
        Completed int    `json:"completed"`
    }

    // transformedTodo 代表格式化的 todo 结构体
    transformedTodo struct {
        ID        uint   `json:"id"`
        Title     string `json:"title"`
        Completed bool   `json:"completed"`
    }

    result struct {
      result uint `json:"result"`
    }

    myJSON struct {
      Array []string
    }

    Users struct {
        ID     int `gorm:"AUTO_INCREMENT"`//`json:"id"`
        UserName string    //`json:"user_name"`
        Password string    //`json:"password"`
        LastLoginTimestamp string    //`json:"last_login_timestamp"`
        IsFinished int    //`json:"is_finished"`
    }

    Instances struct {
        ID     int `gorm:"AUTO_INCREMENT"`//`json:"id"`
        FilePath string    //`json:"user_name"`
        SynthesisPath string    //`json:"password"`
        DefaultValueP int    //`json:"last_login_timestamp"`
        DefaultValueA int    //`json:"is_finished"`
        DefaultValueD int    //`json:"is_finished"`
    }


    Assignments struct {
        ID     int `gorm:"AUTO_INCREMENT"`//`json:"id"`
        UserID int    //`json:"user_id"`
        InstanceID int    //`json:"instance_id"`
    }

    Labels struct {
        ID     int `gorm:"AUTO_INCREMENT"`//`json:"id"`
        InstanceID int    //`json:"user_name"`
        UserID int    //`json:"password"`
        IsConflicted int
        Timestamp string    //`json:"last_login_timestamp"`
        TimeUsage int    //`json:"last_login_timestamp"`
        ChangeTimesP int    //`json:"is_finished"`
        ChangeTimesA int    //`json:"is_finished"`
        ChangeTimesD int    //`json:"is_finished"`
        ValueP int    //`json:"is_finished"`
        ValueA int    //`json:"is_finished"`
        ValueD int    //`json:"is_finished"`
    }
)




func saveHandler(c *gin.Context) {
    userName := c.PostForm("userName")
    fmt.Printf("userName: %s \n", userName)
    instanceID, _ := strconv.Atoi(c.PostForm("ID"))
    fmt.Printf("instanceID: %d \n", instanceID)
    selectedPleasure, _ := strconv.Atoi(c.PostForm("selectedPleasure"))
    fmt.Printf("selectedPleasure: %d \n", selectedPleasure)
    selectedArousal, _ := strconv.Atoi(c.PostForm("selectedArousal"))
    fmt.Printf("selectedArousal: %d \n", selectedArousal)
    selectedDominance, _ := strconv.Atoi(c.PostForm("selectedDominance"))
    fmt.Printf("selectedDominance: %d \n", selectedDominance)
    clickCountPleasure, _ := strconv.Atoi(c.PostForm("clickCountPleasure"))
    fmt.Printf("clickCountPleasure: %d \n", clickCountPleasure)
    clickCountArousal, _ := strconv.Atoi(c.PostForm("clickCountArousal"))
    fmt.Printf("clickCountArousal: %d \n", clickCountArousal)
    clickCountDominance, _ := strconv.Atoi(c.PostForm("clickCountDominance"))
    fmt.Printf("clickCountDominance: %d \n", clickCountDominance)
    timeUsage, _ := strconv.Atoi(c.PostForm("timeUsage"))
    fmt.Printf("timeUsage: %d \n", timeUsage)
    timeStamp := c.PostForm("timeStamp")
    fmt.Printf("timeStamp: %s \n", timeStamp)
    var isInconsistent int
    if c.PostForm("isInconsistent") == "true" {
      isInconsistent = 1
    }else {
      isInconsistent = 0
    }
    fmt.Printf("isInconsistent: %d \n", isInconsistent)

    var user Users
    
    db.AutoMigrate(&Users{})
    err := db.Where("user_name = ?", userName).First(&user).Error

    if err != nil {
      //username not found
      fmt.Println("error：", err)
      c.JSON(http.StatusNotFound, gin.H {
            "message": "User Unauthorized!",
        })
    }
    
    fmt.Printf("user: %#v\n", user)
    fmt.Printf("userID: %d\n", user.ID)
    
    db.AutoMigrate(&Labels{})

    label := Labels{UserID: user.ID, InstanceID: instanceID, IsConflicted: int(isInconsistent), Timestamp: timeStamp, TimeUsage: timeUsage, ChangeTimesP: clickCountPleasure, ChangeTimesA: clickCountArousal, ChangeTimesD: clickCountDominance, ValueP: selectedPleasure, ValueA: selectedArousal, ValueD: selectedDominance}

    res := db.Create(&label) // pass pointer of data to Create

    if res.Error != nil {
      //username not found
      fmt.Println("error：", res.Error)
      c.JSON(http.StatusNotFound, gin.H {
            "message": "Insertion Failed!",
        })
    }

      c.JSON(http.StatusOK, gin.H {
        "message": "pong",
      })
    }


func getListHandler(c *gin.Context) {
    
    userName:= c.PostForm("userName")

    fmt.Println("UserName:", userName)

    var user Users
    
    db.AutoMigrate(&Users{})
    err := db.Where("user_name = ?", userName).First(&user).Error

    if err != nil {
      //username not found
      fmt.Println("error：", err)
      c.JSON(http.StatusNotFound, gin.H {
            "message": "User Unauthorized!",
        })
    }
    
    fmt.Printf("user: %#v\n", user)
    fmt.Printf("userID: %d\n", user.ID)


    var assignments []Assignments
    
    db.AutoMigrate(&Assignments{})
    err = db.Where("user_id=?", user.ID).Find(&assignments).Error

    if err != nil || len(assignments) == 0 {
      //Assignments not found
      fmt.Println("error：", err)
      c.JSON(http.StatusNotFound, gin.H {
            "message": "Assignments not found!",
        })
    }

    
    var instance_to_return []Instances
    
    db.AutoMigrate(&Instances{})
    for _, assignment := range assignments {
      var instance Instances
      fmt.Printf("assignment: %#v\n", assignment)

      err := db.First(&instance, assignment.InstanceID).Error
      if err != nil {
        //instance not found
        fmt.Println("error：", err)
      } else {
        fmt.Printf("instance: %#v\n", instance)
        instance_to_return = append(instance_to_return, instance)
      }
    }

    fmt.Println("instance list: ", instance_to_return)

    c.JSON(http.StatusOK, gin.H {
        "instance_list": instance_to_return,
      })
    }