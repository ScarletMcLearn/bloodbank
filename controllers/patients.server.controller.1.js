var mongoose = require('mongoose');
var Patient = require('./../models/Patient.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.singleView = function(req, res){
  res.render('./../public/views/article/view.ejs', {
          user: req.user || null,
          request: req
        });
}

// module.exports.listView = function(req, res) {
//     Article.find(function(err, data) {
//       if (err) {
//         return res.status(400).send({

//           message: errorHandler.getErrorMessage(err)
//         });
//       }
//       else {
//         console.log("api called");

//         res.render('./../public/views/article/all.ejs', {
//           user: req.user || null,
//           request: req,
//           articles: data
//         });
//       }
//     });
  
	
// };



module.exports.list = function(req, res) {
  Patient.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var patient = new Patient(req.body);
  patient.user = req.user;
  patient.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.patient);
};


exports.delete = function(req, res) {
	var patient = req.article;
	patient.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(patient);
		}
	});
};


module.exports.update = function(req, res) {
  var patient = req.article;

  	patient = _.extend(patient, req.body);

  	patient.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(patient);
  		}
  	});
};

exports.articleByID = function(req, res, next, id) {
	Patient.findById(id).populate('user', 'email').exec(function(err, patient) {
		if (err) return next(err);
		if (!patient) return next(new Error('Failed to load article ' + id));
		req.patient =patient;
		next();
	});
};