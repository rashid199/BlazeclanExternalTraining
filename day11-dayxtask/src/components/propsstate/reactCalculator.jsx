import React, {Component} from 'react';
//import './components/propsstate/fonts.css';

class CalculatorComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            inputValue:''
        };
    }

    clr = () => {
        this.setState({inputValue:''});
    }

    appendInput = (evt) => {
        this.setState({inputValue: this.state.inputValue + evt.target.value});
    }

    // appendSymbol = (sym) => {
    //     this.setState({inputValue: this.state.inputValue + sym.target.value});
    // }

    calcValue = () =>{

        try{
            let val = eval(this.state.inputValue);
            this.clr();
            this.setState({inputValue: val});
        }
        catch(err){
            this.clr();
            this.setState({inputValue: "Invalid"});
        }

    }

    render()
    {
        return(
            
            <body>
            <center><div id="contCalculator">

                    <input type="text" name="inputValue" value={this.state.inputValue} onChange={this.appendInput.bind(this)} />
                    <table id = "calcTable">

                        <tr>
                            <td><button onClick={this.clr.bind(this)}>&#8617;</button></td>
                            <td ><button  value="/"  id="/" onClick={this.appendInput.bind(this)} >/</button></td>
                            <td ><button   value="*" onClick={this.appendInput.bind(this)} >*</button></td>
                            <td ><button   value="-"  onClick={this.appendInput.bind(this)} >-</button></td>
                        </tr>

                        <tr>
                            <td ><button  value="7"   onClick={this.appendInput.bind(this)}>7</button></td>
                            <td ><button  value="8"   onClick={this.appendInput.bind(this)}>8</button></td>
                            <td ><button  value="9"   onClick={this.appendInput.bind(this)}>9</button></td>
                            <td  rowspan="2"><button    value="+" onClick={this.appendInput.bind(this)}>+</button></td>
                        </tr>

                        <tr>
                            <td ><button  value="4"   onClick={this.appendInput.bind(this)}>4</button></td>
                            <td ><button  value="5"   onClick={this.appendInput.bind(this)}>5</button></td>
                            <td ><button  value="6"   onClick={this.appendInput.bind(this)}>6</button></td>
                        </tr>

                        <tr>
                            <td ><button  value="1"   onClick={this.appendInput.bind(this)}>1</button></td>
                            <td ><button  value="2"   onClick={this.appendInput.bind(this)}>2</button></td>
                            <td ><button  value="3"   onClick={this.appendInput.bind(this)}>3</button></td>
                            <td rowspan="2"><button  id="enter" onClick={this.calcValue.bind()}>=</button></td>
                        </tr>

                        <tr>
                            <td  colspan="2"><button  value="0"   onClick={this.appendInput.bind(this)}>0</button></td>
                            <td ><button  value="." onClick={this.appendInput.bind(this)}>.</button></td>
                        </tr>

                    </table>

            </div>

            </center>
            </body>
        );
    
    }   

}

export default CalculatorComponent;