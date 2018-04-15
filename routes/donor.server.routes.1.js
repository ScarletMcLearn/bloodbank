module.exports = function(app){

 var donors = require('./../controllers/donors.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/donors')
	.get(donors.list)
	.post(users.requiresLogin, donors.create);

  app.route('/api/donors/:articleId')
	.get(donors.read)
  .delete(users.requiresLogin, donors.delete);

	app.route('/api/donors/edit/:articleId')
	.get(donors.read)
	.put(users.requiresLogin, donors.update);

app.route('/donors/all').get(donors.listView);
app.route('/donors/:donorId').get(donors.singleView);


app.param('donorId', donors.articleByID);


}
