import axios from 'axios';

export class HttpService
{
    constructor()
    {
        this.url = "http://localhost:6060";
    }

    getAllDeptNo()
    {
        let response = axios.get(`${this.url}/api/deptNo`);
        return response;
    }

    getAllEmpNo()
    {
        let response = axios.get(`${this.url}/api/empNo`);
        return response;
    }

    getAllEmp()
    {
        let response = axios.get(`${this.url}/api/emp`);
        return response;
    }

    getEmp(EmpNo)
    {
        let response = axios.get(`${this.url}/api/emp/${EmpNo}`);
        return response;
    }

    postEmp(emp)
    {
        let response = axios.post(`${this.url}/api/emp`,emp,{
            // @ts-ignore
            'Content-Type':'application/json'
        });

        return response;
    }

    putEmp(emp)
    {
        let response = axios.put(`${this.url}/api/emp/${emp.EmpNo}`,emp,{
            //@ts-ignore
            'Content-Type':'application/json'
        });
        return response;
    }

    delEmp(EmpNo)
    {
        let response = axios.delete(`${this.url}/api/emp/${EmpNo}`);
        return response;
    }

    authUser(creds)
    {
        let response = axios.post(`${this.url}/api/users/auth`,creds,{
            //@ts-ignore
            'Content-Type':'application/json'
        });

        return response;
    }
}