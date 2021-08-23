
# Emotional Speech Labeling Interface ( Full-Stack App Built with Go(Gin), NPM, Webpack, and Reactjs)

## About
Project targeting to solve the subjectiveness problem in emotional speech labeling task.


## Instructions
Below are the installing and running procedues

### Installing
Requirement: node, npm, go, and mysql (**node v12.13.0**, **npm v6.12.0**, **Go v1.16.5**, **MySQL v5.7.33-0ubuntu0.16.04.1**)
  
1. Install Node and Npm.

Install curl.
  
`apt-get install curl`
      
Sometimes, the error below may occur when building it in a virtual machine:
      
E: Could not get lock /var/lib/dpkg/lock-frontend - open (11: Resource temporarily unavailable)
      
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?
  
If so, run the following command: 

`rm /var/lib/apt/lists/lock`

Then install node and npm.
`apt-get update`

`apt-get -y upgrade`

`apt-get -y install dirmngr apt-transport-https lsb-release ca-certificates`
 
`curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

`apt-get install nodejs`

`npm install -g npm@6.12.0`

`npm install -g n`

`n 12.13.0`

It would need to start a new shell window to see the version change.

2. Install Git.

`apt-get install git`

3. Clone the project.

`git clone https://github.com/LawrenceZhou/labelingInterface.git labelingInterface`

4. Enter the directary *templates/static/* and run the command `npm install`. (Download and install all the dependencies listed in *package.json*.)

5. In the static directory, build the front end code with the command `npm run build`

6. Install Go and Gin

Download Go v1.16.5 from the site: https://golang.org/doc/install

Extract the archive you downloaded into /usr/local, creating a Go tree in /usr/local/go.

`rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz`

Add the following line to /etc/profile (for a system-wide installation): 

`export PATH=$PATH:/usr/local/go/bin`

Start a new shell to check the Go installed:
`go version`

Install Gin.
`go get -u github.com/gin-gonic/gin`

7. Install MySQL

`apt-get update`

`apt-get install mysql-server`

Use `mysql_secure_installation` for mysql configuration.

Use `systemctl status mysql.service` or `mysqladmin -p -u root version` to check mysql connection and status.

8. Install PhPAdmin for mysql visualization.

`apt-get update`

`apt-get install phpmyadmin php-mbstring php-gettext`

For the server selection, choose apache2.

Select yes when asked whether to use dbconfig-common to set up the database.

Enable the PHP mcrypt and mbstring extensions:

`phpenmod mcrypt`

`phpenmod mbstring`

Restart Apache for changes to be recognized:

`systemctl restart apache2`

Go to `http://localhost/phpmyadmin` for checking the mysql.


### Running

1. Go to the `server/` directory create database and tables: ` go run *.go -mode=init_database -database_name=label_task_schema` and start the server with `go run *.go -mode=server -database_name=label_task_schema`

2. If all is working correctly, check the address http://localhost:8080/ which you can open in your  browser and see the application running.

3. token: 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
