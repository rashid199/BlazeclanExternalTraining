import React, {useState, useEffect, useCallback} from 'react';
import {HttpService} from './../mern/httpService';
import {Link} from 'react-router-dom';


const TableComponent=(props)=>{

    let serv = new HttpService();
    const [empArr,getEmpArr] = useState([]);

    useEffect(()=>{
        console.log("Table component mounted");

        serv.getAllEmp().then((resp)=>{getEmpArr(resp.data.response)}).catch((error)=>{console.log(error.message)});


    },[]);

    const delRecordInComponent = useCallback(
        (evt) => {

            let empArrID = evt.target.value;
            console.log(empArr[empArrID].EmpNo);

            serv.delEmp(empArr[empArrID].EmpNo).then((resp)=>{
                window.location.reload();
            }).catch((e)=>{console.log(e.message)});
        },
        [empArr]
    );


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

                                    <td>
                                        <button className="btn btn-light">
                                            <Link to={`/updateEmp/${idx}`}>Edit</Link>
                                        </button>
                                    </td>

                                    <td>
                                        <button className="btn btn-danger" 
                                                onClick={delRecordInComponent}
                                                value={idx}>

                                                    Delete

                                        </button>
                                    </td>

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
