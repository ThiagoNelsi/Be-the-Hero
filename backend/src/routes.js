const express = require('express');

const controllers = {
  session: require('./controllers/Session'),
  ongs: require('./controllers/Ongs'),
  incidents: require('./controllers/Incidents'),
  profile: require('./controllers/Profile'),
}

const routes = express.Router();

// Session
routes.post('/session', controllers.session.create);

// Ongs
routes.get('/ongs', controllers.ongs.list);
routes.post('/ongs', controllers.ongs.create);

// Incidents
routes.get('/incidents', controllers.incidents.list);
routes.post('/incidents', controllers.incidents.create);
routes.delete('/incidents/:id', controllers.incidents.delete);

//Profile
routes.get('/profile', controllers.profile.list);

module.exports = routes;
