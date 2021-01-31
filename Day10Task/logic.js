const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const path = require('path');
const {Sequelize, Model, DataTypes} = require('sequelize');
const { response } = require('express');
let jwt = require('jsonwebtoken');

let instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));

const jwtSettings = {
    jwtSecret: 'sbisecret007700tercesibs'
};

const sequelize = new Sequelize("Company","admin","admin12345",{
    host:'database-1.cyudcmrtfbww.us-east-2.rds.amazonaws.com',
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


async function getAllEmployeesNo()
{
    let r = await sequelize.query('CALL getAllEmployeesNo();');
    let res = [];
    r.map((obj,ind)=>{
        res.push(obj.EmpNo);
    })

    console.log(res);
    return res;
}

async function getListEmpDesignation()
{
    let r = await sequelize.query('CALL getAllDeptNo();');
    let res = [];
    r.map((obj,ind)=>{
        res.push(obj.DeptNo);
    })

    console.log(res);
    return res;
}



const dept = require(path.join(__dirname,'./models/department'))(sequelize, Sequelize.DataTypes);
const emp = require(path.join(__dirname,'./models/employee'))(sequelize, Sequelize.DataTypes);
const users = require(path.join(__dirname,'./models/Users'))(sequelize, Sequelize.DataTypes);


instance.get('/api/deptNo',(req,resp)=>{

    getListEmpDesignation().then((res)=>{resp.send({response:res});resp.end();}).catch((e)=>{
        console.log(`error ${e}`);
    });
})

instance.get('/api/empNo',(req,resp)=>{

    getAllEmployeesNo().then((res)=>{resp.send({response:res});resp.end();}).catch((e)=>{
        console.log(`error ${e}`);
    });
})


instance.get('/api/emp',(req,resp) => {
    sequelize.sync({
        force:false
    }).then(()=>emp.findAll())
        .then((data)=>{resp.json({statusCode:200, rowCount: data.length, response: data});resp.end();})
            .catch((error)=>resp.send({statusCode:500, data:error}));
});

instance.get('/api/emp/:id',(req,resp)=>{
    let id = req.params.id;
    sequelize.sync({
        force:false
    }).then(() =>
        emp.findOne({ where: { EmpNo: id } })
)   .then((data)=>{
        resp.json({statusCode:200, rowCount: data.length, response:data});
        resp.end();
    }).catch((e) => {resp.send({statusCode:500, data:e})});
});


instance.post('/api/emp/',(req,resp)=>{
    let Emp = {
        EmpNo : parseInt(req.body.EmpNo),
        EmpName : req.body.EmpName,
        Designation : req.body.Designation,
        Salary : parseFloat(req.body.Salary),
        DeptNo : parseInt(req.body.DeptNo)
     }; 


    console.log(JSON.stringify(Emp));

    sequelize.sync({force:false})
             .then(()=>{return emp.create(Emp);})
             .then((data)=>{
                 resp.json({statusCode:200, data:data.toJSON()});
                 resp.end();
             }).catch((e)=>{resp.status(500).send({statusCode:500, error:"Invalid values"});});

});

async function valUser(req,resp)
{
    let creds = {
        Username:req.body.Username,
        Password:req.body.Password
    }

    await sequelize.sync({force:false});

    const find = await users.findOne({where:{UserName:creds.Username}});

    if(find === null)
    {
        return resp.status(409).send({statusCode:409,response:`Sorry! ${creds.Username} is not found`});
    }

    if(find.Password.trim() !== creds.Password.trim()) // unauthorized
    {
        return resp.status(401).send({statusCode:401,response:`Sorry!! Password for ${creds.Username} is incorect`});
    }    

    const token  = jwt.sign({creds}, jwtSettings.jwtSecret, {
        expiresIn:3600
    });

    return resp.status(200).send({
        statusCode:200,
        response: `Login Successful for ${creds.Username}`,
        authenticated: true,
        token:token
    });

}

instance.post('/api/users/auth',(req,resp)=>valUser(req,resp));

instance.put('/api/emp/:id', (req, resp) => {
    let id = req.params.id;
    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.update({
                EmpNo : id,
                EmpName : req.body.EmpName,
                Designation : req.body.Designation,
                Salary : parseFloat(req.body.Salary),
                DeptNo : parseInt(req.body.DeptNo)
            }, { where: { EmpNo:id } })
        )
        .then((response) => {
            if (response.length === 1) {
                resp.status(200).send({statusCode:200, data:"Record added successfully"});
            } else {
                resp.status(400).send({statusCode:400,data:"Record not found"});
            }
        })
        .catch((error) => resp.status(500).send({ statusCode: 500, data: `Error in Update ${error}` }));
});

instance.delete('/api/emp/:id', (req, resp) => {
    let id = req.params.id;

    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.destroy({ where: { EmpNo:id } })
        )
        .then((response) => {
            if (response === 1) {
                resp.status(200).send({statusCode:200,data:"Record deleted successfully"});
            } else {
                resp.status(400).send({statusCode:400,data:"Record not found"});
            }
        })
        .catch((error) => resp.status(500).send({ statusCode: 500, data: `Error in Delete ${error}` }));
});

instance.get('api/getDeptEmp/:deptValue',(req,resp)=>{
    let deptValue = req.params.deptValue;

    async function getDeptEmp(){
     
        let r = await sequelize.query(`select * from employee where DeptNo = (select DeptNo from department where DeptName = "${deptValue}");`);
        //console.log(`Result in Methos ${JSON.stringify(r)}`);
        return r;
    }
    getDeptEmp().then((r)=>{resp.status(200).send({statusCode:200, data:r});resp.end();}).catch((e)=>{
        console.log(`error ${e}`);
    });
});

instance.get('/api/emp/getTax',(req,resp)=>{

    async function getTax(){
     
        let r = await sequelize.query(`SELECT EmpNo,EmpName,Salary,if(Salary>=500000,salary*0.30,if(salary>=200000,salary*0.20,salary*0.10)) as tax FROM employee;`);
        console.log(`Result in Tax Method ${JSON.stringify(r)}`);
        return r;
    }

    getTax().then((r)=>{resp.status(200).send({statusCode:200, data:r});resp.end();}).catch((e)=>{
        console.log(`error ${e}`);
    });
});





instance.listen(6060,()=>{
    console.log("Express Server starting on port 6060");
});


