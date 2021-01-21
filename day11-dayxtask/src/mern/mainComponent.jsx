import React,{Component} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import ListEmployees from './listEmployees';
import AddEmployee from './addEmployee';
import UpdateEmployee from './updateEmployee';

class MainComponent extends Component{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return(
            <div className="container">
                <h2>React Routing :)</h2>
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/">Employee List</Link>
                            </td>

                            <td>
                                <Link to="/addEmp">Add Employee</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Switch>
                    <Route exact path="/" component={ListEmployees}></Route>
                    <Route exact path="/addEmp" component={AddEmployee}></Route>
                    <Route exact path="/updateEmp/:id" component={UpdateEmployee}></Route>
                    <Redirect to="/"></Redirect>
                </Switch>

            </div>
        );
    }
}

export default MainComponent;