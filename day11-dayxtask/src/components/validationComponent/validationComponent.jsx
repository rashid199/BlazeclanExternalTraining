import React, {Component} from 'react';
import ValidationSummaryComponent from './validationSummaryComponent';

class ValidationComponent extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
              empNo:0,
              empName:'',
              isempNoValid:false,
              isempNameValid:false,
              isReloaded:true
        };

        this.errMap = new Map();
    }

    isFormValid()
    {
        if(this.state.isempNameValid && this.state.isempNoValid)
        {
            return true;
        }

        return false;
    }

    save()
    {
        alert("Submitted");
    }

    clr()
    {
        this.setState({empNo:0});
        this.setState({empName:''});
        this.setState({isempNameValid:false});
        this.setState({isempNoValid:false});

    }

    handleChange(evt)
    {
        //console.log(evt.target.id);
        this.setState({isReloaded:false});
        this.setState({[evt.target.name]: evt.target.value});
        this.validateInput(evt.target.name,evt.target.value);    
    }

    validateInput(name,value)
    {
        if(name === "empNo")
        {
            if(parseInt(value)<=0 || value.length>10 || value.length===0)
            {
                this.setState({isempNoValid:false});
                this.errMap.set("empnoErr","Enter a positive value having length less than 11 characters"); 
            }

            else
            {
                this.setState({isempNoValid:true});
                this.errMap.delete("empnoErr");
            }
        }

        else
        {
            if(value.length<5 || value.length>20)
            {
                this.setState({isempNameValid:false});
                this.errMap.set("empnameErr","Length of name must be between 5 and 20 characters. Capishe?");
            }

            else
            {
                this.setState({isempNameValid:true});
                this.errMap.delete("empnameErr");
            }
        }
    }

    render()
    {
        return(
            <div className="container">
                <form onSubmit={this.save.bind(this)}>

                    <div className="form-group">
                        <label>Emp No</label>
                        <input type="text" 
                               name="empNo"
                               value={this.state.empNo}
                               className="form-control" 
                               onChange = {this.handleChange.bind(this)} id="inputNo" />
                        <div className = "alert alert-danger" hidden={this.state.isempNoValid}>
                                Enter a positive value having length less than 11 characters
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Emp Name</label>
                        <input type="text" 
                               name="empName" 
                               value={this.state.empName} 
                               className="form-control" 
                               onChange = {this.handleChange.bind(this)} id="inputName"/>
                        <div className="alert alert-danger" hidden={this.state.isempNameValid}>
                                Length of name must be between 5 and 20 characters. Capishe?
                        </div>
                    </div>

                    <input type = "reset" className="btn btn-secondary" value="reset" onClick={this.clr.bind(this)} />

                    <input type="submit"
                           className="btn btn-success"
                           value="submit" 
                           disabled = {!this.isFormValid()}/>

                </form>

                <ValidationSummaryComponent objMap={Object.fromEntries(this.errMap)} errArr = {Array.from(this.errMap.values())} ></ValidationSummaryComponent>

            </div>
        );
    }
}


export default ValidationComponent;