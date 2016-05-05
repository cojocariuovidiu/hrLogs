var mongo = require('mongodb');
var md5 = require('md5');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('employeesDB', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'employeesDB' database");
        db.collection('employees', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.getAllEmployees = function(req, res) {
    var headers = req.header('X-access-token');
    if(headers =="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MTE5MjcyMDAzNjl9.cuUKFKsf2qhQJHToP-zBmObhMwi84rhnrhH03OdyzSA"){
        console.log("Headers matched");
        db.collection('employees', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.send(items);
            });
        });
    }    
    else{
        res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
    }
};


exports.deleteEmployee = function(req, res) {
    var id = req.params.id;
    db.collection('employees', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.json({
                    isSuccess: false,                    
                })
            } else {
                res.json({
                    isSuccess:true,
                    recordsDeleted: result
                })                
            }
        });
    });
}
exports.populateDB = function(req, res){
    populateDB();
}
exports.authenticate = function(req, res){
    var user = req.body;
    db.collection('users', function(err, collection) {
        collection.findOne({username:user.username}, function(err, result) {
            if(result.password==md5(user.password)){
                res.json({
                    isSuccess: true,
                    name: result.username,
                    access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MTE5MjcyMDAzNjl9.cuUKFKsf2qhQJHToP-zBmObhMwi84rhnrhH03OdyzSA"
                })
            }    
            else{
                result.json({
                    isSuccess: false,
                    errorMsg:"Authentication failed"
                })
            }
        });
    });    
}

var populateDB = function() {

    var employees = [
        {
            "emp_id":1,
            "First Name": "Dink",
            "Last Name": "O'Kon",
            "Manager Name": "Dawson Rohan",
            "Date of joining": "10-31-1986",
            "Education": "Masters",
            "Work Experience": 15
        },        {
            "emp_id":2,
            "First Name": "Guilford",
            "Last Name": "Pouros",
            "Manager Name": "Jesenia Rogahn",
            "Date of joining": "12-08-1973",
            "Education": "Masters",
            "Work Experience": 12
        },        {
            "emp_id":3,
            "First Name": "Rickie",
            "Last Name": "Gutkowski",
            "Manager Name": "Jiles Jakubowski",
            "Date of joining": "04-29-1995",
            "Education": "Masters",
            "Work Experience": 9
        },        {
            "emp_id":4,
            "First Name": "Belva",
            "Last Name": "Wisoky",
            "Manager Name": "Abraham Quigley",
            "Date of joining": "02-17-1979",
            "Education": "Masters",
            "Work Experience": 8
        },        {
            "emp_id":5,
            "First Name": "Lilah",
            "Last Name": "Tromp",
            "Manager Name": "Eugenio Buckridge",
            "Date of joining": "09-04-1999",
            "Education": "Masters",
            "Work Experience": 1
        },        {
            "emp_id":6,
            "First Name": "Vicki",
            "Last Name": "Stanton",
            "Manager Name": "Lyndia Steuber",
            "Date of joining": "11-20-1973",
            "Education": "Masters",
            "Work Experience": 4
        },        {
            "emp_id":7,
            "First Name": "Kinsley",
            "Last Name": "Prohaska",
            "Manager Name": "Cason Botsford",
            "Date of joining": "01-08-1993",
            "Education": "Masters",
            "Work Experience": 7
        },        {
            "emp_id":8,
            "First Name": "Mattye",
            "Last Name": "Macejkovic",
            "Manager Name": "Tegan Wehner",
            "Date of joining": "04-15-1982",
            "Education": "Masters",
            "Work Experience": 11
        },        {
            "emp_id":9,
            "First Name": "Laverne",
            "Last Name": "Walsh",
            "Manager Name": "Noel Gorczany",
            "Date of joining": "07-07-1991",
            "Education": "Masters",
            "Work Experience": 5
        },        {
            "emp_id":10,
            "First Name": "Mearl",
            "Last Name": "Shanahan",
            "Manager Name": "Lilburn Weissnat",
            "Date of joining": "07-31-1987",
            "Education": "Masters",
            "Work Experience": 2
        },        {
            "emp_id":11,
            "First Name": "Doloris",
            "Last Name": "Thompson",
            "Manager Name": "Carli King",
            "Date of joining": "07-11-2007",
            "Education": "Masters",
            "Work Experience": 7
        },        {
            "emp_id":12,
            "First Name": "Thaddeus",
            "Last Name": "Baumbach",
            "Manager Name": "Francis Runolfsdottir",
            "Date of joining": "10-01-2013",
            "Education": "Masters",
            "Work Experience": 1
        },        {
            "emp_id":13,
            "First Name": "Benedict",
            "Last Name": "Hammes",
            "Manager Name": "Mrs. Ivie Bailey PhD",
            "Date of joining": "02-05-2014",
            "Education": "Masters",
            "Work Experience": 7
        },        {
            "emp_id":14,
            "First Name": "Dianna",
            "Last Name": "Rutherford",
            "Manager Name": "Mitchel Nienow",
            "Date of joining": "10-20-2013",
            "Education": "Masters",
            "Work Experience": 9
        },        {
            "emp_id":15,
            "First Name": "Sariah",
            "Last Name": "Kertzmann",
            "Manager Name": "Azaria Lemke",
            "Date of joining": "07-12-1995",
            "Education": "Masters",
            "Work Experience": 11
        },        {
            "emp_id":16,
            "First Name": "Hazelle",
            "Last Name": "Kuhn",
            "Manager Name": "Colbert Medhurst",
            "Date of joining": "12-28-1974",
            "Education": "Masters",
            "Work Experience": 13
        },        {
            "emp_id":17,
            "First Name": "Allison",
            "Last Name": "Schaefer",
            "Manager Name": "Jedidiah Borer",
            "Date of joining": "03-03-2004",
            "Education": "Masters",
            "Work Experience": 11
        },        {
            "emp_id":18,
            "First Name": "Kenia",
            "Last Name": "Ward",
            "Manager Name": "Georganna Satterfield",
            "Date of joining": "03-02-2005",
            "Education": "Masters",
            "Work Experience": 2
        },        {
            "emp_id":19,
            "First Name": "Arah",
            "Last Name": "Smith",
            "Manager Name": "Cody Cruickshank",
            "Date of joining": "03-26-1988",
            "Education": "Masters",
            "Work Experience": 15
        },        {
            "emp_id":20,
            "First Name": "Tatsuo",
            "Last Name": "Buckridge",
            "Manager Name": "Lucie Blick",
            "Date of joining": "06-11-1989",
            "Education": "Masters",
            "Work Experience": 13
        },        {
            "emp_id":21,
            "First Name": "Alwina",
            "Last Name": "Williamson",
            "Manager Name": "Cleo Krajcik",
            "Date of joining": "02-04-2013",
            "Education": "Masters",
            "Work Experience": 3
        },        {
            "emp_id":22,
            "First Name": "Sina",
            "Last Name": "Casper",
            "Manager Name": "Gertha Funk",
            "Date of joining": "08-31-2012",
            "Education": "Masters",
            "Work Experience": 5
        },        {
            "emp_id":23,
            "First Name": "Kaye",
            "Last Name": "Schuster",
            "Manager Name": "Mr. Iva Lebsack DVM",
            "Date of joining": "09-23-2010",
            "Education": "Masters",
            "Work Experience": 14
        },        {
            "emp_id":24,
            "First Name": "Marinda",
            "Last Name": "Smitham",
            "Manager Name": "Lanita Hyatt",
            "Date of joining": "07-07-1970",
            "Education": "Masters",
            "Work Experience": 4
        },        {
            "emp_id":25,
            "First Name": "Declan",
            "Last Name": "Legros",
            "Manager Name": "Dicie Reynolds",
            "Date of joining": "09-18-1981",
            "Education": "Masters",
            "Work Experience": 6
        },        {
            "emp_id":26,
            "First Name": "Jill",
            "Last Name": "Abernathy",
            "Manager Name": "Davin Erdman",
            "Date of joining": "08-02-1999",
            "Education": "Masters",
            "Work Experience": 8
        },        {
            "emp_id":27,
            "First Name": "Humberto",
            "Last Name": "Dickens",
            "Manager Name": "Shreya Jones",
            "Date of joining": "08-31-2011",
            "Education": "Masters",
            "Work Experience": 12
        },        {
            "emp_id":28,
            "First Name": "Kimberely",
            "Last Name": "Lebsack",
            "Manager Name": "Mara Brakus",
            "Date of joining": "04-13-2001",
            "Education": "Masters",
            "Work Experience": 13
        },        {
            "emp_id":29,
            "First Name": "Rashad",
            "Last Name": "Padberg",
            "Manager Name": "Melvina McClure",
            "Date of joining": "10-07-2013",
            "Education": "Masters",
            "Work Experience": 3
        },        {
            "emp_id":30,
            "First Name": "Ashton",
            "Last Name": "Balistreri",
            "Manager Name": "Lenord Bayer",
            "Date of joining": "04-03-1990",
            "Education": "Masters",
            "Work Experience": 3
        },        {
            "emp_id":31,
            "First Name": "Gilbert",
            "Last Name": "Funk",
            "Manager Name": "Ewing Bergnaum PhD",
            "Date of joining": "04-26-1971",
            "Education": "Masters",
            "Work Experience": 4
        },        {
            "emp_id":32,
            "First Name": "Merle",
            "Last Name": "Muller",
            "Manager Name": "Shellie Gibson",
            "Date of joining": "11-06-1977",
            "Education": "Masters",
            "Work Experience": 13
        },        {
            "emp_id":33,
            "First Name": "Yajaira",
            "Last Name": "Hessel",
            "Manager Name": "Alcide Gusikowski Sr.",
            "Date of joining": "09-23-1997",
            "Education": "Masters",
            "Work Experience": 5
        },        {
            "emp_id":34,
            "First Name": "Cornelious",
            "Last Name": "Stokes",
            "Manager Name": "Winfred Kovacek",
            "Date of joining": "06-11-2005",
            "Education": "Masters",
            "Work Experience": 15
        },        {
            "emp_id":35,
            "First Name": "Lazaro",
            "Last Name": "Shields",
            "Manager Name": "Anastacia Lueilwitz",
            "Date of joining": "11-02-2002",
            "Education": "Masters",
            "Work Experience": 11
        },        {
            "emp_id":36,
            "First Name": "Demian",
            "Last Name": "Bechtelar",
            "Manager Name": "Phoenix Schoen III",
            "Date of joining": "09-18-1970",
            "Education": "Masters",
            "Work Experience": 5
        },        {
            "emp_id":37,
            "First Name": "Jacoby",
            "Last Name": "Schmitt",
            "Manager Name": "Caren Homenick",
            "Date of joining": "08-16-2000",
            "Education": "Masters",
            "Work Experience": 6
        },        {
            "emp_id":38,
            "First Name": "Kianna",
            "Last Name": "Upton",
            "Manager Name": "Elam Lind",
            "Date of joining": "10-03-2015",
            "Education": "Masters",
            "Work Experience": 14
        },        {
            "emp_id":39,
            "First Name": "Edith",
            "Last Name": "Murray",
            "Manager Name": "Heber Ondricka",
            "Date of joining": "07-20-1989",
            "Education": "Masters",
            "Work Experience": 7
        },        {
            "emp_id":40,
            "First Name": "Elease",
            "Last Name": "Fahey",
            "Manager Name": "Verda Sporer MD",
            "Date of joining": "11-19-1995",
            "Education": "Masters",
            "Work Experience": 6
        },        {
            "emp_id":41,
            "First Name": "Kasen",
            "Last Name": "Powlowski",
            "Manager Name": "Arletta Rosenbaum",
            "Date of joining": "03-09-1983",
            "Education": "Masters",
            "Work Experience": 5
        },        {
            "emp_id":42,
            "First Name": "Lassie",
            "Last Name": "Wolff",
            "Manager Name": "Danniel Hilll II",
            "Date of joining": "04-17-1993",
            "Education": "Masters",
            "Work Experience": 2
        },        {
            "emp_id":43,
            "First Name": "Akeelah",
            "Last Name": "Wilkinson",
            "Manager Name": "Judge Jewess",
            "Date of joining": "04-26-2014",
            "Education": "Masters",
            "Work Experience": 6
        },        {
            "emp_id":44,
            "First Name": "Forrest",
            "Last Name": "Mueller",
            "Manager Name": "Matthew Cole",
            "Date of joining": "04-06-1981",
            "Education": "Masters",
            "Work Experience": 9
        },        {
            "emp_id":45,
            "First Name": "Tiara",
            "Last Name": "Graham",
            "Manager Name": "Hortencia Cummerata",
            "Date of joining": "03-12-1975",
            "Education": "Masters",
            "Work Experience": 10
        },        {
            "emp_id":46,
            "First Name": "Tyrin",
            "Last Name": "Harris",
            "Manager Name": "Gil DuBuque",
            "Date of joining": "10-07-1973",
            "Education": "Masters",
            "Work Experience": 7
        },        {
            "emp_id":47,
            "First Name": "Jaime",
            "Last Name": "Kunze",
            "Manager Name": "Cappie Swaniawski",
            "Date of joining": "12-11-2003",
            "Education": "Masters",
            "Work Experience": 8
        },        {
            "emp_id":48,
            "First Name": "Bess",
            "Last Name": "Borer",
            "Manager Name": "Isiah Watsica",
            "Date of joining": "08-18-1986",
            "Education": "Masters",
            "Work Experience": 14
        },        {
            "emp_id":49,
            "First Name": "Peggy",
            "Last Name": "Bergnaum",
            "Manager Name": "Kenna Osinski",
            "Date of joining": "05-28-1999",
            "Education": "Masters",
            "Work Experience": 5
        },{
            "emp_id":50,
            "First Name": "Little",
            "Last Name": "Wuckert",
            "Manager Name": "Mr. Mack Koch DDS",
            "Date of joining": "02-19-2008",
            "Education": "Masters",
            "Work Experience": 1
        }
    ]
    var users = [
        {
            username:"manager",
            password:"ceb6c970658f31504a901b89dcd3e461"
        }
    ]

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
    db.collection('employees', function(err, collection) {
        collection.insert(employees, {safe:true}, function(err, result) {});
    });

};