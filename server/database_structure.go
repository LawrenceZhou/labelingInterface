package main

type (
    //Users schema in mysql
    Users struct {
        ID     int                `gorm:"AUTO_INCREMENT"`                                        //`json:"id"`
        UserName string           `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`  //`json:"user_name"`
        Password string           `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`  //`json:"password"`
        CreatedTimestamp string   `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`  //`json:"created_timestamp"`
        IsFinished int                                                                          //`json:"is_finished"`
    }

    //Instances schema in mysql
    Instances struct {
        ID     int                `gorm:"AUTO_INCREMENT"` //`json:"id"`
        FilePath string           `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`           //`json:"file_path"`
        SynthesisPath string      `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`        //`json:"password"`
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
        Timestamp string            `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`       //`json:"timestamp"`
        TimeUsage int                      //`json:"time_usage"`
        ChangeTimesP int                   //`json:"change_times_p"`
        ChangeTimesA int                   //`json:"change_times_a"`
        ChangeTimesD int                   //`json:"change_times_d"`
        ValueP int                         //`json:"value_p"`
        ValueA int                         //`json:"value_a"`
        ValueD int                         //`json:"value_d"`
    }

    //Surveys schema in mysql
    Surveys struct {
        ID     int `gorm:"AUTO_INCREMENT"` //`json:"id"`
        UserID int                         //`json:"user_id"`
        Age string            `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`             //`json:"age"`
        Gender string         `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`             //`json:"gender"`
        Ethnicity string       `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`            //`json:"ethnicity"`
        Nationality string     `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`            //`json:"nationality"`
        EducationLevel string   `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`           //`json:"education_level"`
        IncomeLevel string     `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`            //`json:"income_level"`
    }

    //Questionnaires schema in mysql
    Questionnaires struct {
        ID     int `gorm:"AUTO_INCREMENT"` //`json:"id"`
        UserID int                         //`json:"user_id"`
        Easiness int                       //`json:"age"`
        Satisfaction int                   //`json:"satisfaction"`
        Helpness int                       //`json:"helpness"`
        AdvantageComment string       `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`     //`json:"advantage_comment"`
        DisadvantageComment string    `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`     //`json:"disadvantage_comment"`
        OtherComment string           `sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`     //`json:"other_comment"`
    }
)
