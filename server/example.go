package main

import (
  "fmt"
  //"strconv"
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
)




func saveHandler(c *gin.Context) {
    message := c.PostForm("selectedPleasure")
    fmt.Printf("result: %s", message)
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