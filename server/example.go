package main

import (
	"fmt"
	"strconv"
	"math/rand"
    "time"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func init() {
	//open a db connection when initiated
	var err error
	db, err = gorm.Open("mysql", "root:123456@/label_task_schema?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
		panic("failed to connect database")
	}
}


func main() {
	r := gin.Default()

	r.Use(static.Serve("/",static.LocalFile("../templates", true)))

	api := r.Group("/api")
	{
		//login checking
		api.POST("/log_in", loginHandler)
		//save label 
		api.POST("/save", saveHandler) 
		//get instance list
		api.POST("/get_list", getListHandler)
	}

	r.Run()
}


type (
	//Users schema in mysql
	Users struct {
		ID     int `gorm:"AUTO_INCREMENT"`  //`json:"id"`
		UserName string                     //`json:"user_name"`
		Password string                     //`json:"password"`
		CreatedTimestamp string           //`json:"created_timestamp"`
		IsFinished int                      //`json:"is_finished"`
	}

	//Instances schema in mysql
	Instances struct {
		ID     int `gorm:"AUTO_INCREMENT"` //`json:"id"`
		FilePath string                    //`json:"file_path"`
		SynthesisPath string               //`json:"password"`
		DefaultValueP int                  //`json:"default_value_p"`
		DefaultValueA int                  //`json:"default_value_a"`
		DefaultValueD int                  //`json:"default_value_d"`
	}

	//Assignments schema in mysql
	Assignments struct {
		ID     int `gorm:"AUTO_INCREMENT"` //`json:"id"`
		UserID int                         //`json:"user_id"`
		InstanceID int                     //`json:"instance_id"`
	}

	//Labels schema in mysql
	Labels struct {
		ID     int `gorm:"AUTO_INCREMENT"` //`json:"id"`
		InstanceID int                     //`json:"instance_id"`
		UserID int                         //`json:"user_id"`
		IsConflicted int                   //`json:"is_conflicted"`
		Timestamp string                   //`json:"timestamp"`
		TimeUsage int                      //`json:"time_usage"`
		ChangeTimesP int                   //`json:"change_times_p"`
		ChangeTimesA int                   //`json:"change_times_a"`
		ChangeTimesD int                   //`json:"change_times_d"`
		ValueP int                         //`json:"value_p"`
		ValueA int                         //`json:"value_a"`
		ValueD int                         //`json:"value_d"`
	}
)


//login checking
func loginHandler(c *gin.Context) {
	//completed checking if already sent a response
	completed:= false

	userName := c.PostForm("userName")
	fmt.Printf("userName: %s \n", userName)
	timeStamp := c.PostForm("timeStamp")
	fmt.Printf("timeStamp: %s \n", timeStamp)

	var user Users
	
	//get Users schema
	db.AutoMigrate(&Users{})
	result := db.Where("user_name = ?", userName).First(&user)

	
	if result.RowsAffected >= 1 {
		if !completed {
			c.JSON(http.StatusOK, gin.H {
				"message": "login success!",
			})
			completed = true
		}
	}else {
		//create new user
		db.AutoMigrate(&Users{})

		new_user := Users{UserName: userName, Password: "label", CreatedTimestamp: timeStamp, IsFinished: 0}
		res := db.Create(&new_user) // pass pointer of data to Create

		if !completed && res.Error != nil {
			//user creation failed
			fmt.Println("error：", res.Error)
			c.JSON(http.StatusNotFound, gin.H {
				"message": "User creation Failed!",
			})
			completed = true      
		}


		//generate assignment
    	instance_id_list := makeRange(101, 200)
    	fmt.Println(instance_id_list)
    	random_id_list := Shuffle(instance_id_list, 50)
    	fmt.Println(random_id_list)
    	
		db.AutoMigrate(&Assignments{})

    	for i := 0; i < len(random_id_list); i++ {
        	// perform a db.Query insert
			new_assignment := Assignments{UserID: new_user.ID, InstanceID: random_id_list[i]}
			result_a := db.Create(&new_assignment) // pass pointer of data to Create


        	// if there is an error inserting, handle it
        	if !completed && result_a.Error != nil {
            	panic(result_a.Error)
            	if !completed {
            		c.JSON(http.StatusNotFound, gin.H {
					"message": "Assignment generation failed!",
					})
            	}
        	}
    	}

    	if !completed {
	    	c.JSON(http.StatusOK, gin.H {
				"message": "login success!",
			})
    		completed = true
    	}
	}

	if !completed && result.Error != nil {
		//username not found
		fmt.Println("error：", result.Error)
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}
	

}


func saveHandler(c *gin.Context) {

		completed:= false

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
			completed = true
		}
		
		fmt.Printf("user: %#v\n", user)
		fmt.Printf("userID: %d\n", user.ID)
		
		db.AutoMigrate(&Labels{})

		label := Labels{UserID: user.ID, InstanceID: instanceID, IsConflicted: int(isInconsistent), Timestamp: timeStamp, TimeUsage: timeUsage, ChangeTimesP: clickCountPleasure, ChangeTimesA: clickCountArousal, ChangeTimesD: clickCountDominance, ValueP: selectedPleasure, ValueA: selectedArousal, ValueD: selectedDominance}

		res := db.Create(&label) // pass pointer of data to Create

		if !completed && res.Error != nil {
			//username not found
			fmt.Println("error：", res.Error)
			c.JSON(http.StatusNotFound, gin.H {
						"message": "Insertion Failed!",
				})
			completed = true      
		}

		if !completed {
			c.JSON(http.StatusOK, gin.H {
				"message": "pong",
			})
		}
}


func getListHandler(c *gin.Context) {
		
		completed := false

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
			completed = true
		}
		
		fmt.Printf("user: %#v\n", user)
		fmt.Printf("userID: %d\n", user.ID)


		var assignments []Assignments
		
		db.AutoMigrate(&Assignments{})
		err = db.Where("user_id=?", user.ID).Find(&assignments).Error

		if !completed && err != nil || len(assignments) == 0 {
			//Assignments not found
			fmt.Println("error：", err)
			c.JSON(http.StatusNotFound, gin.H {
						"message": "Assignments not found!",
				})
			completed = true
		}

		
		var instance_to_return []Instances
		
		db.AutoMigrate(&Instances{})
		for _, assignment := range assignments {
			var instance Instances
			fmt.Printf("assignment: %#v\n", assignment)

			err := db.First(&instance, assignment.InstanceID).Error
			if !completed && err != nil {
				//instance not found
				fmt.Println("error：", err)
				completed = true
			} else {
				fmt.Printf("instance: %#v\n", instance)
				instance_to_return = append(instance_to_return, instance)
			}
		}

		fmt.Println("instance list: ", instance_to_return)

		if !completed {
		c.JSON(http.StatusOK, gin.H {
				"instance_list": instance_to_return,
			})
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