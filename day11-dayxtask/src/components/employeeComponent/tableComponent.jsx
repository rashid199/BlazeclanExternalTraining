import React, { Component } from 'react'

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentRows:0
         }
    }


    render() {



        if(this.props.dataSource === undefined || this.props.dataSource.length <=0 || this.props.rows ===0 ){
            return (
                 <div>No Records</div>
            )
        }  
        
        else {
        return (  
            <table className="table table-bordered table-striped table-dark">
            <thead >
              <tr>
               {
                Object.keys( this.props.dataSource[0]).map((col,idx)=>(
                       <th key={idx} onClick={()=>this.props.handleSort(col,idx)} id="thHover">{col}</th>
                   ))
               }
              </tr>
            </thead>
            <tbody>
             {
                this.props.dataSource.map((data,index)=>(
                    

                        <tr key={index} onClick ={()=>this.props.getSelectEmp(data)}  id="trHover" >
                        {
                            Object.keys( this.props.dataSource[0]).map((col,idx)=>(
                                <td key={idx}>{data[col]}</td>
                            ))
                        }
                       <input type="button" value="Delete" hidden={!this.props.canDelete} onClick={()=>this.props.handleClick(index)} className="btn btn-danger" />
                        </tr>
                         
                ))
             }
            </tbody>
         </table>
                );
            }
    }
}
 
export default TableComponent;