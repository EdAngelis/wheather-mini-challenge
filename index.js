const express = require('express');
const controller = require('../wheather-mini-challenge/controller');
const cors = require('cors');

const app = new express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', controller);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)

});

//  maceió code