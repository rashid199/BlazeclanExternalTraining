import React, { Component } from 'react';
class ValidationSummaryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.newerrMap = new Map();
    }
    render() 
    { 
        //console.log(typeof(this.props.objMap),this.props.objMap);
        console.log(typeof(this.props.errMap),this.props.errMap);
        //this.newerrMap = this.props.errMap;

        

        if( /*this.props.objMap === undefined || Object.keys(this.props.objMap).length == 0|| */this.props.errMap === undefined || this.props.errMap.size===0) 
        {
            return (<div>All Cool</div>)
        } 
        else 
        {
            return ( 
                <div>
                {
                    // this.props.objMap.forEach((val,idx)=>(
                    //     <div>{val}</div>
                    // ))

                    this.props.errMap.forEach((val,idx) => (
                        <div key={idx}>{val}</div>   
                     ))
                        
                }
                </div>
            );}
    }
}
 
export default ValidationSummaryComponent;