const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const path = require('path');
const {Sequelize, Model, DataTypes} = require('sequelize');

let instance = express();

const sequelize = new Sequelize("company","root","",{
    host:'localhost',
    dialect:'mysql',
    pool:{
            max:5,
            min:0,
            idle:10000
    },
    define:{
        timestamps:false
    }
});

async function getListEmpDesignation()
{
    let r = await sequelize.query('CALL listEmployees("MANAGER");');
    console.log(JSON.stringify(r));
    return r;
}
getListEmpDesignation().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{console.log(e)});


