import React, {useState, useEffect} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import {HttpService} from './../mern/httpService';
import TableComponent from './tableComponent';
import AddEmployeeComponent from './addEmployee';

const MainComponent=()=>{

    return(
        <div className="container">
            
            <h2>Hello</h2>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td><Link to="/">Employee List</Link></td>
                        {/* <td><Link to={{pathname:"/",state:{dataSource:empArr}}}></Link></td> */}
                        <td><Link to="/addEmp">Add Employee</Link></td>
                    </tr>
                </tbody>
            </table>
            {/* <TableComponent dataSource={empArr}></TableComponent> */}
            <Switch>
                <Route exact path="/" component={TableComponent}></Route>
                <Route exact path="/addEmp" component={AddEmployeeComponent}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
};

export default MainComponent;