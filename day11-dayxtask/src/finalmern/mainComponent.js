import React, {useState, useEffect} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import TableComponent from './tableComponent';
import AddEmployeeComponent from './addEmployee';
import UpdateEmployeeComponent from './updateEmployee';


const MainComponent=()=>{

    return(
        <div className="container">
            
            <h2>Hello</h2>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td><Link to="/">Employee List</Link></td>
                        <td><Link to="/addEmp">Add Employee</Link></td>
                    </tr>
                </tbody>
            </table>
            <Switch>
                <Route exact path="/" component={TableComponent}></Route>
                <Route exact path="/addEmp" component={AddEmployeeComponent}></Route>
                <Route exact path="/updateEmp/:id" component={UpdateEmployeeComponent}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
};

export default MainComponent;