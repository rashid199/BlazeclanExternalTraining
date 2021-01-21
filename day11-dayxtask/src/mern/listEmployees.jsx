import React,{ Component } from 'react';
import {HttpService} from './httpService';
import { Link } from "react-router-dom";

class ListEmployees extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            empArr:[],
            tableHeaders:[]
        };

        this.serv = new HttpService();
    }

    componentDidMount(){
        console.log("List Emp Component Mounted");
        this.serv.getAllEmp().then((resp)=>{
            this.setState({empArr:resp.data.response});
            this.setState({tableHeaders:Object.keys(resp.data.response[0])});
        }).catch((error)=>{
            console.log(error.message);
        });
    }

    componentWillUnmount(){
        console.log('List Component is UnMounted');
    }

    deleteRecord(EmpNo)
    {
        this.serv.delEmp(EmpNo).then((resp)=>{
            console.log('Deleted');
            // reload the window
            window.location.reload();
        }).catch((error)=>{
             console.log(`Error in Delete ${error}`);   
        });
    }

    SortTable(evt)
    {
        let sortCol = this.state.tableHeaders[evt.target.id];
        console.log(this.state.tableHeaders[evt.target.id]);

        let temp = this.state.empArr;

        temp.sort((a,b) => (a[sortCol] > b[sortCol]) ? 1 : ((b[sortCol] > a[sortCol]) ? -1 : 0));

        this.setState({empArr:temp});

    }


    render() { 
        if(this.state.empArr.length === 0) {
           return( <div>No records :(</div>);
        } else {
        return (  
            <div className="container">
             <h2>List of employees</h2>
              <table className="table table-bordered table-striped table-dark table-hover">
                <thead>

                    <tr>
                    {
                        this.state.tableHeaders.map((val,idx)=>(
                                <th key={idx} id={idx} onClick={this.SortTable.bind(this)} className="thHover">{val}</th>
                            ))
                    }
                    </tr>
                </thead>
                <tbody>
                  {
                      this.state.empArr.map((d,i)=>(
                          <tr key={i}>
                             <td>{d.EmpNo}</td>
                             <td>{d.EmpName}</td>
                             <td>{d.Designation}</td>
                             <td>{d.Salary}</td>
                             <td>{d.DeptNo}</td>
                            <td>
                               <button className="btn btn-light">
                                 <Link to={`/updateEmp/${d.EmpNo}`}>Edit</Link>
                               </button>
                            </td>
                            <td>
                            <input type="button" value="Delete" className="btn btn-danger"
                                   onClick={()=> {this.deleteRecord(d.EmpNo)}}/>
                          </td>
                          </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
        );}
    }
}

export default ListEmployees;