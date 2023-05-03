const app = require('../app');

exports.index = function(req, res, next) {
  res.render('index', { title: 'Shorttin' });
};

exports.new = async (req, res, next) =>  { 
  const url = req.body.url;
  const code = app.generateCode();

  res.send(`${process.env.DOMAIN}${code}`);
};