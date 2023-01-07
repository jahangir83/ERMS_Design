const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const SessionStore  = require("express-session-sequelize")(session.Store)
const {bindUserWithRequest} = require('./authMiddleware')

const setLocals = require('./setLocals')

const db = require("../Model/DMBS").sequelize

const oneDay =1000 * 60 * 60 * 24;
const sequelizeSessionStore = new SessionStore({
    db:db
});
const Middlewere = [
    morgan("dev"),
    cookieParser(),
    session({
        secret: "thisProjectVeryScecret",  
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: oneDay },
        store: sequelizeSessionStore
    }),


    bindUserWithRequest(),
    setLocals(),

    
]

module.exports = app => {
    Middlewere.forEach(m => {
        app.use(m)
    })
}