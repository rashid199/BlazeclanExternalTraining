const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const path = require('path');
const {Sequelize, Model, DataTypes} = require('sequelize');
const { response } = require('express');

let instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

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

// async function getListEmpDesignation()
// {
//     let r = await sequelize.query('CALL listEmployees("MANAGER");');
//     console.log(JSON.stringify(r));
//     return r;
// }
// getListEmpDesignation().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{console.log(e)});


const dept = require(path.join(__dirname,'./models/department'))(sequelize, Sequelize.DataTypes);
const emp = require(path.join(__dirname,'./models/employee'))(sequelize, Sequelize.DataTypes);


instance.get('',(req,resp) => {
    sequelize.sync({
        force:false
    }).then(()=>emp.findAll())
        .then((data)=>{resp.json({statusCode:200, rowCount: data.length, response: data});resp.end();})
            .catch((error)=>resp.send({statusCode:500, data:error}));
});

instance.get('/:id',(req,resp)=>{
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


instance.post('',(req,resp)=>{
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

instance.put('/:id', (req, resp) => {
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

instance.delete('/:id', (req, resp) => {
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

instance.get('/getDeptEmp/:deptValue',(req,resp)=>{
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

instance.get('/getTax',(req,resp)=>{

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


