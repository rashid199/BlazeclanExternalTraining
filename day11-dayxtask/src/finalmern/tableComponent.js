import React, {useState, useEffect} from 'react';
import {HttpService} from './../mern/httpService';

const TableComponent=(props)=>{

    let serv = new HttpService();
    const [empArr,getEmpArr] = useState([]);

    useEffect(()=>{
        console.log("Table component mounted");

        serv.getAllEmp().then((resp)=>{getEmpArr(resp.data.response)}).catch((error)=>{console.log(error.message)});


    },[]);

    if(empArr == undefined || empArr.length==0)
    {
        return(<h2>No Records found :( </h2>);
    }

    else
    {
        let tableData = empArr;
        let tableHeaders = Object.keys(empArr[0]);
        return(
            <div>

                <table className="table table-bordered table-striped table-hover table-dark">
                    <thead>
                        <tr>
                            {
                                tableHeaders.map((val,idx)=>(
                                    <th key={idx}>{val}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((obj,idx)=>(
                                <tr>
                                    {
                                        tableHeaders.map((colVal,colIdx)=>(
                                            <td key={colIdx}>{obj[colVal]}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
    
    
}

export default TableComponent;

/*
        const [empArr,getEmpArr] = useState([]);
    let serv = new HttpService();

    const [employee,updateEmployee]=useState({EmpNo:0,EmpName:'',Designation:'',Salary:0,DeptNo:0});

    useEffect(()=>{
        // componentDidMount
        console.log('Main Component mounted');

        serv.getAllEmp().then((resp)=>{getEmpArr(resp.data.response)}).catch((error)=>{console.log(error.message)});

    },[]);
*/