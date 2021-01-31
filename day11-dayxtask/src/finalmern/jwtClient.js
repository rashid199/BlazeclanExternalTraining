import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from 'react-router';
import {HttpService} from './../mern/httpService';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import MainComponent from './mainComponent';

const LoginComponent=(props)=>
{
    const [creds, updateCreds] = useState({"Username":"","Password":""});
    const serv = new HttpService();
    let statusCode=0;
    const history = useHistory();

    function valCreds()
    {
        serv.authUser(creds).then((resp)=>{
            console.log(resp.data.statusCode);
            if(resp.data.statusCode===200)
            {
                // history.push("/");
                localStorage.setItem('token', resp.data.token);

            }
        }
        ).catch((e)=>{
            console.log(e.message);
        });
    }

    return(
           <div className="container"><br/>
               <h2>Login Page</h2><br/>
                
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text"
                           value={creds.Username}
                           onChange={(evt)=>updateCreds({...creds,"Username":evt.target.value})} 
                           className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                           onChange={(evt)=>updateCreds({...creds,"Password":evt.target.value})}
                           className="form-control"
                           value={creds.Password} />
                </div>

                <button className="btn btn-success" onClick={valCreds}>Login</button>
                {
                    JSON.stringify(creds)
                }

                {/* <Switch>
                    <Route exact path="/" component={MainComponent}></Route>
                    
                </Switch> */}

           </div>
    );
}

export default LoginComponent;