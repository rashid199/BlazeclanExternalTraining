import React, { Component } from 'react';
import {Departments, Designations} from './constants';
import { Logic } from "./Logic";
import DropDownComponent from './dropdownComponent';
import TableComponent from './tableComponent';

class EmployeeComponent extends Component {
    /**
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {  
            EmpNo:0,
            EmpName: '',
            DeptName: '',
            Designation: '',
            Salary:0,
            departments: Departments, // store constant array
            designations: Designations, // store constant array
            employees:[],
            tableColumnHeaders:[]
        };
        this.logic = new Logic();

        this.state.employees =  this.logic.getEmployees();

        this.state.tableColumnHeaders = Object.keys(this.state.employees[0]);
        this.rowCount = 3;
        this.cols = [{Header:'EmpNo',accessor:'EmpNo'},{Header:'EmpName',accessor:'EmpName'},{Header:'DeptName',accessor:'DeptName'},{Header:'Designation',accessor:'Designation'},{Header:'Salary',accessor:'Salary'}]
    
    }
    /**
     * @param {{ target: { name: any; value: any; }; }} evt
     */
    handleValueChange=(evt)=> {
        this.setState({[evt.target.name]: evt.target.value});
    };

    clear=()=>{
        this.setState({EmpNo:0});
        this.setState({EmpName:''});
        this.setState({DeptName:''});
        this.setState({Designation:''});
        this.setState({Salary:0});
         
    };

    save=()=>{
        let emp = {
            EmpNo: this.state.EmpNo,
            EmpName: this.state.EmpName,
            DeptName: this.state.DeptName,
            Designation: this.state.Designation,
            Salary: this.state.Salary
        };
        let emps = this.logic.addEmployee(emp);
 
        this.setState({employees: emps},()=>{});


        console.log(`EMployees = ${JSON.stringify(this.state.employees)}`);
    };

    getSelectedEmp=(e)=>{
      
        this.setState({EmpNo:e.EmpNo});
        this.setState({EmpName:e.EmpName});
        this.setState({DeptName:e.DeptName});
        this.setState({Designation:e.Designation});
        this.setState({Salary:e.Salary});
    };
    getSelectedDeptName=(val)=>{
        console.log(`DeptName ${val}`);
        this.setState({DeptName:val});
    };

    getSelectedDesignation=(val)=>{
        console.log(`Designation ${val}`);
        this.setState({Designation:val});
    };

    delRow=(ind)=>{
        this.state.employees.splice(ind,1);
        this.setState({employees: this.state.employees});

    };  

    colSort=(col,idx)=>{

        console.log(col,idx);
        let temp = this.state.employees;
        temp.sort((a,b) => (a[col] > b[col]) ? 1 : ((b[col] > a[col]) ? -1 : 0));
        console.log(temp);
        this.setState({employees: temp});

    }

    render() { 
        return ( 
            <div className="container">
            <h2>The Employee Information</h2>
                <div className="form-group">
                  <label>EmpNo</label>
                  <input type="text" className="form-control"
                  name="EmpNo"
                  value={this.state.EmpNo}
                   onChange={this.handleValueChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" className="form-control"
                    name="EmpName"
                    value={this.state.EmpName}
                     onChange={this.handleValueChange.bind(this)}/>
                </div>
              <div className="form-group">
                <label>DeptName</label>

                 <DropDownComponent 
                  stateData={this.state.DeptName}
                 dataSource={this.state.departments}
                 selectedValue={this.getSelectedDeptName.bind(this)}></DropDownComponent>
              </div>

            <div className="form-group">
            <DropDownComponent 
            stateData={this.state.Designation}
            dataSource={this.state.designations}
            selectedValue={this.getSelectedDesignation.bind(this)}></DropDownComponent>
            </div>

            <div className="form-group">
                    <label>Salary</label>
                    <input type="text" className="form-control"
                    name="Salary"
                    value={this.state.Salary}
                     onChange={this.handleValueChange.bind(this)}/>
            </div>

            <div className="form-group">
               <input type="button" value="Clear" onClick={this.clear.bind(this)} className="btn btn-warning"/>
               <input type="button" value="Save" onClick={this.save.bind(this)} className="btn btn-success"/>
            </div>
        <hr/>
        <h2>The Employee List</h2>

          <br/>
          <TableComponent dataSource={this.state.employees} 
                          canDelete={true} 
                          handleClick={(ind)=>this.delRow(ind)}
                          getSelectEmp={(data)=>this.getSelectedEmp(data)}
                          rows={this.rowCount}
                          handleSort={ (col,idx)=>this.colSort(col,idx)} >

            </TableComponent>

            </div>
         );
    }
}
 
export default EmployeeComponent;