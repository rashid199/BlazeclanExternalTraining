import React, {useState, useEffect} from 'react';
import {HttpService} from './../mern/httpService';

const AddEmployeeComponent=(props)=>{

    let serv = new HttpService();
    const [employee,addEmployee] = useState({EmpNo:0,EmpName:'',Designation:'',Salary:0,DeptNo:0});


    
}

return AddEmployeeComponent;