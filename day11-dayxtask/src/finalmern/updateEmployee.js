import React, {useState, useEffect} from 'react';
import {HttpService} from './../mern/httpService';

const UpdateEmployeeComponent=(props)=>{

    let serv = new HttpService();
    const [employee,addEmployee] = useState({EmpNo:0,EmpName:'',Designation:'',Salary:0,DeptNo:0});
    const [deptNoArr, getDeptArr] = useState([]);
    const [empNoArr, getEmpArr] = useState([]);
    const [errFlag, changeErrFlag] = useState({isEmpNoValid:false, isEmpNameValid:false, isSalaryValid:false, isDeptNoValid:false, isDesignationValid:false});
    let empArr = [];

    useEffect(()=>{
        console.log("Update employee component mounted");
        let empArrID = props.match.params.id;

        serv.getAllEmp().then((resp)=>{
            empArr = resp.data.response;
            addEmployee(empArr[empArrID]);
        }).catch((e)=>{
            console.log(e.message);
        });

        serv.getAllDeptNo().then((resp)=>{getDeptArr(resp.data.response)}).catch((error)=>{console.log(error.message)});

        serv.getAllEmpNo().then((resp)=>{
            getEmpArr(resp.data.response);
        }
        ).catch((error)=>{
            console.log(error.message)
        });



        
        
    },[])

    function clr()
    {
        let emp = {
            EmpNo:0,
            EmpName:'',
            Salary:0,
            DeptNo:0,
            Designation:''
        }

        addEmployee({...emp});
    }

    function handleChanges(evt)
    {
        const name = evt.target.name;
        const val = evt.target.value;
        


        if(name === "EmpName")
        {
            addEmployee({...employee, EmpName:val});

            console.log(name , val);
            if(val=="")
            {
                changeErrFlag({...errFlag,isEmpNameValid:false});
            }

            else
            {
                changeErrFlag({...errFlag,isEmpNameValid:true});

            }
        }

        else if(name === "Designation")
        {
            addEmployee({...employee, Designation:val});

            console.log(name , val);
            if(val=="")
            {
                changeErrFlag({...errFlag,isDesignationValid:false});
            }

            else
            {
                changeErrFlag({...errFlag,isDesignationValid:true});

            }
        }

        else if(name==="Salary")
        {
            if(val==="")
            {
                addEmployee({...employee, Salary:parseInt("0")});
                changeErrFlag({...errFlag,isSalaryValid:false});
                return;
            }

            addEmployee({...employee, Salary:parseInt(val)});

            if(val<0)
            {
                changeErrFlag({...errFlag,isSalaryValid:false});
            }
            else
            {
                changeErrFlag({...errFlag,isSalaryValid:true});
            }

        }

        else if(name==="EmpNo")
        {
            if(val==="")
            {
                addEmployee({...employee, EmpNo:parseInt("0")});
                changeErrFlag({...errFlag,isEmpNoValid:false});
                return;
            }

            addEmployee({...employee, EmpNo:parseInt(val)});

            
            if(val<0)
            {
                changeErrFlag({...errFlag,isEmpNoValid:false});
            }

            else
            {
                changeErrFlag({...errFlag,isEmpNoValid:true});

            }

        }

        else
        {
            if(val==="")
            {
                addEmployee({...employee, DeptNo:parseInt("0")});
                changeErrFlag({...errFlag,isDeptNoValid:false});
                return;
            }

            addEmployee({...employee, DeptNo:parseInt(val)});

            if(val<0 || !deptNoArr.includes(parseInt(val)))
            {
                changeErrFlag({...errFlag,isDeptNoValid:false});
            }

            else
            {
                changeErrFlag({...errFlag,isDeptNoValid:true});

            }

        }

        
    }

    function areAllValid()
    {
        let allValid = Object.values(errFlag);

        if(allValid.includes(false)){return false;}

        else{return true;}

    }

    function save()
    {
        console.log(employee);
        
        serv.putEmp(employee).then((resp)=>
            {
                alert(`Updated ${JSON.stringify(employee)}`);
                props.history.push("/");
            }
            ).catch((error)=>{
                console.log(error.message)
            });
    }

   

    return(
            <div className="container">
                <h2>Add Employee</h2>

                {JSON.stringify(empNoArr)}<br/>
                {JSON.stringify(deptNoArr)}<br/>

                <div className="form-group">
                    <label>EmpNo</label>
                    <input type="number"
                           value={employee.EmpNo} 
                           className="form-control"
                           name="EmpNo" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={errFlag.isEmpNoValid}>
                         Employee Number is invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text"
                           value={employee.EmpName} 
                           className="form-control"
                           name="EmpName" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={errFlag.isEmpNameValid}>
                         Employee Name is invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <input type="text"
                           value={employee.Designation} 
                           className="form-control"
                           name="Designation" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={errFlag.isDesignationValid}>
                          Designation is invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <input type="number"
                           value={employee.Salary} 
                           className="form-control"
                           name="Salary" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={errFlag.isSalaryValid}>
                          Salary is invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>DeptNo</label>
                    <input type="number"
                           value={employee.DeptNo} 
                           className="form-control"
                           name="DeptNo" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={errFlag.isDeptNoValid}>
                         Dept Number is invalid
                    </div>
                </div>

                <button className="btn btn-warning" onClick={clr}>Clear</button>

                <button className="btn btn-success"  
                        onClick={save}
                        disabled={!areAllValid()}>

                        Submit
                </button>
                
            </div>
    );


    
}

export default UpdateEmployeeComponent;