var express = require ('express');
var cors = require('cors');
var parser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var config = require('./config/config.js');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')({
		session: session
	});

var path = require('path');


module.exports = function (db){
var app = new express();

// Globbing model files
	config.getGlobbedFiles('./models/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

app.set('port', (process.env.PORT || 3000));

// Setting the app router and static folder
app.use(express.static(path.resolve('public')));

app.use(cors())
.use(parser.urlencoded({ extended: true}))
.use(parser.json());

// CookieParser should be above session
	app.use(cookieParser());
	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			mongooseConnection: db.connection
			// collection: 'sessions'
		})
	}));

	// use passport session
app.use(passport.initialize());
	app.use(passport.session());

  // Globbing routing files
	config.getGlobbedFiles('./routes/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});
// require('./routes/users.server.routes.js')(app);
// require('./routes/article.server.routes.js')(app);


  return app;
}
$(function(){
	var $donors = $('#donors');
	$.ajax({
		type:'GET',
		url;'/api/donors',
		success: function(donors){
			$.each(donors, function(i, donor){
				$donors.append('<li>name:'donor.name+',area:'+donor.area+'</li>');
			});
		},
		error: function(){
			alert('error loading donor');
		}
	});
});
$('#SubmitButton').on('click',function(){
	var dinor={
		name=$donorname.val();
		mobile=$mobile.val();
	};
	$ajax({
		type: 'POST',
		url: '/api/donors',
		data: donor,
		success: function(newDonor){
			$donors.append('<li>name: '+newDonor.name+',mobile: '+newDonor.moblie+'</li>');
		},
		error: function(){
			alert('error saving donor');
		}
	});
});
