package main

import (
	"fmt"
	"strconv"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"github.com/pkg/errors"  //Adding context to errors
)

func webServer(ip string, name string, user string, password string) {

	connectDatabase(ip, name, user, password)

	r := gin.Default()

	r.Use(static.Serve("/",static.LocalFile("../templates", true)))

	r.Static("/assets", "../assets")

	api := r.Group("/api/v1")
	{
		//login checking
		api.POST("/log_in", loginHandler)
		//get user status
		api.POST("/get_status", getStatusHandler) 
		//save label
		api.POST("/save_label", saveLabelHandler) 
		//get instance list
		api.POST("/get_list", getListHandler)
		//get tasks
		api.POST("/get_tasks", getTasksHandler)
		//save survey
		api.POST("/save_survey", saveSurveyHandler)
		//save questionnaire
		api.POST("/save_questionnaire", saveQuestionnaireHandler)
	}

	r.Run()
}


//login checking
func loginHandler(c *gin.Context) {
	//completed checking if already sent a response
	completed:= false

	userName := c.PostForm("userName")
	fmt.Printf("userName: %s \n", userName)
	timeStamp := c.PostForm("timeStamp")
	fmt.Printf("timeStamp: %s \n", timeStamp)

	var user Users
	result := getUser(userName, &user)
	
	if result.RowsAffected >= 1 {
		if !completed {
			c.JSON(http.StatusOK, gin.H {
				"message": "login success!",
				"status": user.IsFinished,
			})
			completed = true
		}
	}else {
		//create new user
		new_user := Users{UserName: userName, Password: "label", CreatedTimestamp: timeStamp, IsFinished: 0}
		success := createUser(new_user)
		
		if !completed && !success {
			//user creation failed	
			c.JSON(http.StatusNotFound, gin.H {
				"message": "User creation Failed!",
			})
			completed = true      
		}


		//generate assignment
		//success = assignUser(userName, assignmentNumber)
		//generate dialogue assignment
		success = assignUserDialogue(userName)
    	if !completed && !success {
			//assignment failed	
			c.JSON(http.StatusNotFound, gin.H {
				"message": "Assignment Failed!",
			})
			completed = true      
		}

    	if !completed {
	    	c.JSON(http.StatusOK, gin.H {
				"message": "Login Succeeded!",
				"status" : 0,
			})
    		completed = true
    	}
	}

}



//get user status
func getStatusHandler(c *gin.Context) {

	completed := false

	userName := c.PostForm("userName")
	fmt.Printf("userName: %s \n", userName)

	var user Users
	result := getUser(userName, &user)
	
	if result.RowsAffected >= 1 {
		if !completed {
			c.JSON(http.StatusOK, gin.H {
				"message": "user status retrieved!",
				"status": user.IsFinished,
			})
			completed = true
		}
	
	}else {
	    c.JSON(http.StatusNotFound, gin.H {
			"message": "User not found!",
			"status" : 0,
		})
    	completed = true
    }
}


func saveLabelHandler(c *gin.Context) {

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
	var isConflicted int
	if c.PostForm("isInconsistent") == "true" {
		isConflicted = 1
	}else {
		isConflicted = 0
	}
	fmt.Printf("isInconsistent: %d \n", isConflicted)

	var user Users
	result := getUser(userName, &user)

	if result.Error != nil {
		//username not found
		fmt.Println("error：", result.Error)
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}
		
	//need to revise; just for debugging
	user.IsFinished = 2

	success := updateUser(user)
		
	if !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Not Found!",
		})
		completed = true
	}
	/////////////////////

	fmt.Printf("user: %#v\n", user)
	fmt.Printf("userID: %d\n", user.ID)
    	
    label := Labels{UserID: user.ID, InstanceID: instanceID, IsConflicted: isConflicted, Timestamp: timeStamp, TimeUsage: timeUsage, ChangeTimesP: clickCountPleasure, ChangeTimesA: clickCountArousal, ChangeTimesD: clickCountDominance, ValueP: selectedPleasure, ValueA: selectedArousal, ValueD: selectedDominance}
	success = insertLabel(label)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Insertion Failed!",
		})
		completed = true      
	}

	if !completed {
		c.JSON(http.StatusOK, gin.H {
			"message": "Insertion Succeeded!",
		})
	}
}


func saveSurveyHandler(c *gin.Context) {

	completed:= false

	userName := c.PostForm("userName")
	fmt.Printf("userName: %s \n", userName)
	age := c.PostForm("age")
	fmt.Printf("age: %s \n", age)
	gender := c.PostForm("gender")
	fmt.Printf("gender: %s \n", gender)
	ethnicity := c.PostForm("ethnicity")
	fmt.Printf("ethnicity: %s \n", ethnicity)
	nationality := c.PostForm("nationality")
	fmt.Printf("nationality: %s \n", nationality)
	educationLevel := c.PostForm("educationLevel")
	fmt.Printf("educationLevel: %s \n", educationLevel)
	incomeLevel := c.PostForm("incomeLevel")
	fmt.Printf("incomeLevel: %s \n", incomeLevel)

	var user Users
	result := getUser(userName, &user)

	if result.Error != nil {
		//username not found
		fmt.Println("error：", result.Error)
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}

	user.IsFinished = 1

	success := updateUser(user)
		
	if !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Not Found!",
		})
		completed = true
	}

	fmt.Printf("user: %#v\n", user)
	fmt.Printf("userID: %d\n", user.ID)
		
	survey := Surveys{UserID: user.ID, Age: age, Gender: gender, Ethnicity: ethnicity, Nationality:nationality, EducationLevel: educationLevel, IncomeLevel: incomeLevel}
	success = insertSurvey(survey)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Insertion Failed!",
		})
		completed = true      
	}

	if !completed {
		c.JSON(http.StatusOK, gin.H {
			"message": "Submission Succeeded!",
		})
	}
}


func saveQuestionnaireHandler(c *gin.Context) {

	completed:= false

	userName := c.PostForm("userName")
	fmt.Printf("userName: %s \n", userName)
	easiness , _ := strconv.Atoi(c.PostForm("easiness"))
	fmt.Printf("easiness: %d \n", easiness)
	satisfaction, _ := strconv.Atoi(c.PostForm("satisfaction"))
	fmt.Printf("satisfaction: %d \n", satisfaction)
	helpness, _ := strconv.Atoi(c.PostForm("helpness"))
	fmt.Printf("helpness: %d \n", helpness)
	advantageComment := c.PostForm("advantageComment")
	fmt.Printf("advantageComment: %s \n", advantageComment)
	disadvantageComment := c.PostForm("disadvantageComment")
	fmt.Printf("disadvantageComment: %s \n", disadvantageComment)
	otherComment := c.PostForm("otherComment")
	fmt.Printf("otherComment: %s \n", otherComment)

	var user Users
	result := getUser(userName, &user)

	if result.Error != nil {
		//username not found
		fmt.Println("error：", result.Error)
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}

	user.IsFinished = 3

	success:= updateUser(user)

	if !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Not Found!",
		})
		completed = true
	}
		
	fmt.Printf("user: %#v\n", user)
	fmt.Printf("userID: %d\n", user.ID)

	questionnaire := Questionnaires{UserID: user.ID, Easiness: easiness, Satisfaction: satisfaction, Helpness:helpness, AdvantageComment: advantageComment, DisadvantageComment: disadvantageComment, OtherComment: otherComment}

	success = insertQuestionnaire(questionnaire)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Insertion Failed!",
		})
		completed = true      
	}

	if !completed {
		c.JSON(http.StatusOK, gin.H {
			"message": "Submission Succeeded!",
		})
	}
}


func getListHandler(c *gin.Context) {
		
	completed := false

	userName:= c.PostForm("userName")
	fmt.Println("UserName:", userName)

	var user Users
	result := getUser(userName, &user)

	if result.Error != nil {
		//username not found
		errors.Wrap(result.Error, "User unauthorized")
		fmt.Println("error：", errors.Wrap(result.Error, "open foo.txt failed"))
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}
	
	fmt.Printf("user: %#v\n", user)
	fmt.Printf("userID: %d\n", user.ID)

	var assignments []Assignments
		
	success := getAssignments(userName, &assignments)

	if !completed && !success || len(assignments) == 0 {
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

		success = getInstance(assignment.InstanceID, &instance)
		if !completed && !success {
			completed = true
		} else {
			fmt.Println("[new] instance:", instance)
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


func getTasksHandler(c *gin.Context) {
		
	completed := false

	userName:= c.PostForm("userName")
	fmt.Println("UserName:", userName)

	var user Users
	result := getUser(userName, &user)

	if result.Error != nil {
		//username not found
		errors.Wrap(result.Error, "User unauthorized")
		fmt.Println("error：", errors.Wrap(result.Error, "open foo.txt failed"))
		c.JSON(http.StatusNotFound, gin.H {
			"message": "User Unauthorized!",
		})
		completed = true
	}
	
	fmt.Printf("user: %#v\n", user)
	fmt.Printf("userID: %d\n", user.ID)

	var dialogueAssignment DialogueAssignments
		
	success := getDialogueAssignment(userName, &dialogueAssignment)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Dialogue Assignments not found!",
		})
		completed = true
	}

	var dialogue Dialogues
	success = getDialogue(dialogueAssignment.DialogueID, &dialogue)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Dialogue not found!",
		})
		completed = true
	}

	var sentences []Sentences
	success = getSentences(dialogueAssignment.DialogueID, &sentences)

	if !completed && !success {
		c.JSON(http.StatusNotFound, gin.H {
			"message": "Sentences not found!",
		})
		completed = true
	}

	if !completed {
		c.JSON(http.StatusOK, gin.H {
			"message": "Task Retrived!",
			"dialogue_path": dialogue.FilePath,
			"condition": dialogueAssignment.Condition,
			"assignment_id": dialogueAssignment.ID,
			"sentences": sentences,
		})
	}
}
