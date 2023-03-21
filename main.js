const express = require("express")
const fs = require("fs")
const session = require('express-session')
const multer  = require('multer')


const startDb = require("./database/init");
const userModel = require("./database/models/user");
const todoModel = require("./database/models/todo");

startDb();

const app = express();

app.use( express.static("public") );
app.use( express.static("uploads") );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) )

/* app.use(function(req, res, next)
{
	console.log(req.url);
	next();
}) */

const upload = multer({ dest: 'uploads' })


app.use(session({
  secret: 'keyboard cat',
	resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
	
}))

app.set("view engine","ejs");
app.set("views","./views");


app.get("/", Home);
app.post("/delete", DeleteTodo);

app.route("/todo").get(GetTodo).post(upload.single("todoPic"),PostTodo);

app.listen(3000, function()
{
	console.log("server is live")
})


app.get("/logout", function(req, res)
{
	req.session.destroy();
	res.redirect("/");
})

app.route("/login").get(function(req, res)
{
	res.render("login",{ error:"" });
})
.post(function(req, res)
{
	getUser(req.body.userid,  req.body.password, function( err, user )
	{
		if(user.length)
		{
			req.session.isLoggedIn = true;
			req.session.userid = user[0].userid;
			req.session.username = user[0].fullname;
			req.session.user = user[0];
			console.log(user[0]);
			
			res.redirect("/")
		}
		else
		{
			res.render("login",{ error:"user not found" });

		}
	});

});

/* app.get("/uploads/:id", function(req, res)
{
	res.sendFile(__dirname+"/uploads/"+req.params.id);
}) */

app.route("/signup").get(function(req, res)
{
	res.sendFile(__dirname+"/public/html/signup.html")
})
.post( upload.single("profilePic") ,function(req, res)
{
//	console.log(req.file);

	const user = {
		fullname: req.body.username,
		userid: req.body.userid,
		password: req.body.password,
		profile_pic: req.file.filename
	}		

	saveUser( user , function(err)
	{
		if(err)
		{
			res.end("something went horribly wrong")
		}
		else
		{
			res.redirect("/login")
		}
	})
		

});




function Home(req, res)
{
	if(req.session.isLoggedIn)
	{
		getTodos(function(err, todos)
		{
			
			const userTodos = todos.filter(function(todo)
			{
				return todo.createdBy === req.session.userid
			})

			res.render("home", {  data: userTodos, 
				username: req.session.username,
				user: req.session.user   
			});
		})
	}
	else
	{
		res.redirect("/login")
	}
}



function GetTodo(req, res)
{
	getTodos(function(err, todos)
	{
	
		res.json(todos);
	})
}

function PostTodo(req, res)
{
   if(!req.body.text){
		 res.redirect("/")
	 }

	const todo = {
		text: req.body.text,
		pic:req.file.filename,
		createdBy: req.session.userid
	}

	saveTodo(todo, function()
	{
		res.redirect("/")
	})

}

function getTodos(callback)
{
		todoModel.find({}).then(function(todos)
	{
		callback(null, todos)
	})
	.catch(function()
	{
		callback("cant read todos")
	})
}

function DeleteTodo( req,res) {
  
	const id = req.body.index;

	todoModel.deleteOne({id}).then(()=>{
		res.redirect("/")
	})
	.catch((err)=>{
		console.log(err)

	})

 
}
    



function saveTodo(todo, callback)
{
	todoModel.create(todo)
	.then(function()
	{
		callback(null);
	})
	.catch(function()
	{
		callback("cant save todo")
	})
}

function saveUser(user, callback)
{
	userModel.create(user).then(function()
	{
		callback(null);
	})
	.catch(function()
	{
		callback("cant save user")
	})
}

function getUser(userid, password, callback)
{
	userModel.find({ userid: userid, password: password })
	.then(function(data)
	{
		callback(null, data)
	})
	.catch(function(err)
	{
		callback("user not found");
	})
}
