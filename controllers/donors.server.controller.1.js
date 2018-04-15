var mongoose = require('mongoose');
var Donor = require('./../models/Article.js');
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



module.exports.list = function(req, res)Donor.find(function(err, data) {
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
  var article = new Donor(req.body);
  article.user = req.user;
  article.save(function(err, data) {
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
  res.json(req.article);
};


exports.delete = function(req, res) {
	var article = req.article;
	article.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(article);
		}
	});
};


module.exports.update = function(req, res) {
  var donor = req.article;

  	donor = _.extend(donor, req.body);

  	donor.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(donor);
  		}
  	});
};

exports.articleByID = function(req, res, next, id) {
	Donor.findById(id).populate('user', 'email').exec(function(err, donors) {
		if (err) return next(err);
		if (!donors) return next(new Error('Failed to load article ' + id));
		req.article = donors;
		next();
	});
};