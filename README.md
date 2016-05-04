# hrLogs
Employee record management using MEAN stack

* Use technologies Mongo, Express, AngularJS and Node Js.
* Create a list of 50 employees, so while first time connecting to MongoDB, it will populate these records. ( * Employee First Name, Last Name, Manager Name, Date Of Joining, Education, Work Experience)
* Write REST API using nodejs (getAllEmployees()) and it should check for the authentication.
* Display these 50 employees on the list page with pagination, 15 records each page with checkbox as first column. Use AngularJs.
* User can select randomly employees and export to pdf.
* User can select randomly employees and print the records.
* Provide option to export and print all the records ( i.e. 50 records)
* User can delete the selected record(s).
* Make sure your code runs after download to the computer with only change in the monogodb connection url.


Sample Data Generation - Use a sublime FakeDataGenerator plugin to generate fake data using following code
		
		{
            "id":{{index()}},
            "First Name": "{{first_name()}}",
            "Last Name": "{{last_name()}}",
            "Manager Name": "{{name()}}",
            "Date of joining": "{{date(pattern='%m-%d-%Y')}}",
            "Education": "Masters",
            "Work Experience": {{random_int(min=1, max=15)}}
        }

Clone from github URL https://github.com/vamshi4001/hrLogs.git to hrLogs folder on your machine
```
cd hrLogs/
	cd node/
		npm install
		node server.js
			This should get the services up and running
			API Endpoints
				GET http://localhost:3000/employees	gives us all employees
				DELETE http://localhost:3000/employees/:id deletes an employee with provided id

	cd application/
		npm install
		gulp
			this should get the server up and running on http://localhost:8000/#/home
			however if it says, that gulp should be installed globally - then execute following command
			npm install -g gulp

```




