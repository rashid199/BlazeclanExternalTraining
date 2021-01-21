import React, { Component } from 'react';
import { HttpService } from './httpService';

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            EmpNo:0,
            EmpName: '',
            Designation: '',
            Salary:0,
            DeptNo:0,
            isEmpNoValid:true,
            isEmpNameValid:true,
            isDesignationValid:true,
            isSalaryValid:true,
            isDeptNoValid:true,
            deptNoArr:[],
            empNoArr:[]
        };
        this.serv = new HttpService();
    }

    handleChanges(evt){
        this.setState({[evt.target.name]:evt.target.value});

        this.isFormValid(evt.target.name,evt.target.value);
    }

    componentDidMount(){
        let EmpNo  = this.props.match.params.id;
        console.log(`Received Value ${EmpNo}`);
        this.serv.getEmp(parseInt(EmpNo)).then((resp)=>{
             let Emp = resp.data.response;
             this.setState({EmpNo:Emp.EmpNo});
             this.setState({EmpName:Emp.EmpName});
             this.setState({Designation:Emp.Designation});
             this.setState({Salary:Emp.Salary});
             this.setState({DeptNo:Emp.DeptNo});
             console.log(JSON.stringify(Emp));
             }).catch((error)=>{
                console.log(`Error ${error}`);
        });

        this.serv.getAllDeptNo().then((resp)=>{
            this.setState({deptNoArr:resp.data.response});
            //this.deptNoArr = resp.data.response;
            console.log(resp.data.response);
        });

        this.serv.getAllEmpNo().then((resp)=>{
            this.setState({empNoArr:resp.data.response});
            //this.empNoArr = resp.data.response;
            console.log(resp.data.response);
        });
    
    }

    isFormValid(name,value)
    {
        if(name==="DeptNo")
        {
            if(!this.state.deptNoArr.includes(parseInt(value)))
            {
                this.setState({isDeptNoValid:false});
            }

            else if(value==='')
            {
                this.setState({isDeptNoValid:false});
            }

            else
            {
                this.setState({isDeptNoValid:true});
            }
        }

        else if(name === "Salary")
        {
            if(parseInt(value)<0 || value==="")
            {
                this.setState({isSalaryValid:false});
            }

            else
            {
                this.setState({isSalaryValid:true});
            }
        }

        else if(name === "EmpNo")
        {
            if(this.state.empNoArr.includes(parseInt(value)) || parseInt(value)<0 || value==="")
            {
                console.log(value);
                this.setState({isEmpNoValid:false});
            }
            else
            {
                this.setState({isEmpNoValid:true});

            }
        }

        else if(name === "Designation")
        {
            if(value==="")
            {
                this.setState({isDesignationValid:false});

            }

            else
            {
                this.setState({isDesignationValid:true});

            }
        }

        else
        {
            if(value==="")
            {
                this.setState({isEmpNameValid:false});

            }
            else
            {
                this.setState({isEmpNameValid:true});

            }
        }


        
    }

    allValid()
    {
        if(this.state.isDeptNoValid && this.state.isDesignationValid && this.state.isEmpNameValid && this.state.isEmpNoValid && this.state.isSalaryValid)
        {
            return true;
        }
        return false;
    }

    save(){
        let Emp = {
            EmpNo:this.state.EmpNo,
            EmpName: this.state.EmpName,
            Designation: this.state.Designation,
            Salary: this.state.Salary,
            DeptNo: this.state.DeptNo
        };

        this.serv.putEmp(Emp).then((resp)=>{
             console.log(JSON.stringify(resp.data));
             this.props.history.push('/');
        }).catch((error)=>{
            this.setState({errorMessage: `Error Occured ${error.message}`});
        });
    }

    clear(){
        this.setState({EmpNo:0});
        this.setState({EmpName:''});
        this.setState({Designation:''});
        this.setState({Salary:0});
        this.setState({DeptNo:0});
    }

    render() { 
        return (  
            <div className="container">
                <h2>Add employee</h2>

                <div className="form-group">
                <label>EmpNo</label>
                <input type="text" className="form-control"
                name="EmpNo"
                value={this.state.EmpNo}
                onChange={this.handleChanges.bind(this)}
                />
                <div className="alert alert-danger"
                         hidden={this.state.isEmpNoValid}>
                         
                        EmpNo already exists or should not be empty or negative :(
                    </div>
                </div>

                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" className="form-control"
                    name="EmpName"
                    value={this.state.EmpName}
                    onChange={this.handleChanges.bind(this)}
                    />
                    <div className="alert alert-danger"
                         hidden={this.state.isEmpNameValid}>
                         
                        EmpName should be non-empty :(
                    </div>
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <input type="text" className="form-control"
                    name="Designation"
                    value={this.state.Designation}
                    onChange={this.handleChanges.bind(this)}
                    />
                    <div className="alert alert-danger"
                         hidden={this.state.isDesignationValid}>
                         
                        Designation should be non-empty :(
                    </div>
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <input type="text" className="form-control"
                    name="Salary"
                    value={this.state.Salary}
                    onChange={this.handleChanges.bind(this)}
                    />
                    <div className="alert alert-danger"
                         hidden={this.state.isSalaryValid}>
                         
                        Salary should be positive and non-empty :(
                    </div>
                </div>


                <div className="form-group">
                    <label>DeptNo</label>
                    <input type="text" className="form-control"
                    name="DeptNo"
                    value={this.state.DeptNo}
                    onChange={this.handleChanges.bind(this)}
                    />

                    <div className="alert alert-danger"
                         hidden={this.state.isDeptNoValid}>

                        Dept No does not exist and should not be empty :(
                    </div>

                </div>
                <input type="button" value="Clear"  onClick={this.clear.bind(this)}  className="btn btn-warning"/>
                <input type="button" value="Save"
                       onClick={this.save.bind(this)}  
                       className="btn btn-success"
                       disabled={!this.allValid()} />
 
            </div>

        );
    }
}
 
export default UpdateEmployee;