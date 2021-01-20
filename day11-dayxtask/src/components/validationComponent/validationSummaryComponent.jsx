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
        console.log(typeof(this.props.errArr),this.props.errArr);
        //this.newerrMap = this.props.errMap;

        

        if( /*this.props.objMap === undefined || Object.keys(this.props.objMap).length == 0|| */this.props.errArr === undefined || this.props.errArr.length===0) 
        {
            return (<strong>All Cool</strong>)
        } 
        else 
        {
            return ( 
                <div>
                {
                    // this.props.objMap.forEach((val,idx)=>(
                    //     <div>{val}</div>
                    // ))

                    this.props.errArr.map((val,idx)=>(
                        <strong key={idx}>{val}</strong>
                        
                    ))
                        
                }
                </div>
            );}
    }
}
 
export default ValidationSummaryComponent;