module.exports = function(app){

 var patients = require('./../controllers/patients.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/patientss')
	.get(patients.list)
	.post(users.requiresLogin, patients.create);

  app.route('/api/articles/:patientId')
	.get(patients.read)
  .delete(users.requiresLogin, patients.delete);

	app.route('/api/articles/edit/:patientId')
	.get(patients.read)
	.put(users.requiresLogin, patients.update);

app.route('/articles/all').get(patients.listView);
app.route('/article/:patientIdleId').get(patients.singleView);


app.param('patientIdicleId', patients.articleByID);


}
