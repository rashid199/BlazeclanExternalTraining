
class dayFourTask
{
    constructor()
    {
        this.empName="";
        this.empNo="";
        this.deptName="";
        this.salary="";
        this.designation="";
        this.deptNo="";
        this.loc="";
        this.capacity="";
        this.empArr = new Map();
        this.deptArr = new Map();

        var deptRec = new Map();
        deptRec.set("DeptNo","1");
        deptRec.set("DeptName","DS");
        deptRec.set("Location","Pune");
        deptRec.set("Capacity","69");
        this.deptArr.set("1",deptRec);

        var deptRec1 = new Map();
        deptRec1.set("DeptNo","2");
        deptRec1.set("DeptName","DA");
        deptRec1.set("Location","Vegas");
        deptRec1.set("Capacity","420");
        this.deptArr.set("2",deptRec1);

        var deptRec2 = new Map();
        deptRec2.set("DeptNo","3");
        deptRec2.set("DeptName","Corporate");
        deptRec2.set("Location","Pune");
        deptRec2.set("Capacity","2");
        this.deptArr.set("3",deptRec2);

    }

    addEmp(empNo, empName, deptName, designation, salary)
    {
        // this.empNo = empNo;
        // this.empName = empName;
        // this.deptName = deptName;
        // this.designation = designation;
        // this.salary = salary;

        if(!this.#validEmp(empNo, empName, deptName, designation, salary)){console.log(`Employee ${empName} can't be added:(\n`);return;}

        for (const [key, value] of this.deptArr.entries()) 
        {
            if(value.get("DeptName") == deptName)
            {
                // console.log("Dept match found for ",key,value);
                if(parseInt(value.get("Capacity")) == 0)
                {
                    console.log(`No vacancies in ${deptName} department\nEmployee ${empName} can't be added :(\n---------------------------------\n`);return;
                }
                else
                {
                    value.set("Capacity",(parseInt(value.get("Capacity"))-1).toString());
                    break;                    
                }
            }
        }

        var empRec = new Map();
        empRec.set("No",empNo);
        empRec.set("Name",empName);
        empRec.set("Dept",deptName);
        empRec.set("Designation",designation);
        empRec.set("Salary",salary);

        this.empArr.set(empNo, empRec);

    }

    #validEmp(empNo, empName, deptName, designation, salary)
    {
        if(parseInt(empNo) < 0 || this.empArr.has(empNo)){console.log(`Emp No Error for ${empName}`);return false;}

        if(empName[0] == empName[0].toLowerCase()){console.log(`Lower Case Error for ${empName}`);return false;}

        if(parseInt(salary)<0){console.log(`Salary error for ${empName}`);return false;}

        return true;
        
    }

    delEmp(k)
    {
        let dept1 = this.empArr.get(k);
        let dept = dept1.get("Dept");

        console.log(`Deleting employee ${dept1.get("Name")} with Id - ${dept1.get("No")}\n`);

        for (const [key, value] of this.deptArr.entries()) 
        {   
            if(value.get("DeptName") == dept)
            {
                value.set("Capacity",(parseInt(value.get("Capacity"))+1).toString());
                break;
            }

        }

        this.empArr.delete(k);
        this.getAllEmp();

    }

    updateEmp(k,rec)
    {
        let n = this.empArr.get(k);
        console.log(`Updating values of ${n.get('Name')}\n`);
        this.empArr.set(k,rec);
        this.getAllEmp();
    }

    getAllEmp()
    {
        console.log(`Employees list\n`)
        this.empArr.forEach((v,k) => 
        {
            console.log(`            Number = ${v.get("No")}
            Name = ${v.get("Name")}
            Dept = ${v.get("Dept")}
            Position = ${v.get("Designation")}
            Salary = ${v.get("Salary")}
            `);
        });

        console.log("---------------------------------");
    }

    getEmp(category,value)
    {

        console.log(`Filtering ${category} based on ${value}\n`);

        let recFound = false;

        this.empArr.forEach((v,k) => 
        {
            if(v.get(category) == value)
            {
                console.log(`            Number = ${v.get("No")}
            Name = ${v.get("Name")}
            Dept = ${v.get("Dept")}
            Position = ${v.get("Designation")}
            Salary = ${v.get("Salary")}
            `);

                recFound = true;
            }
        });

        if(recFound == false)
        {
            console.log(`No record found for ${value} in ${category}:(\n`);
        }

        console.log("---------------------------------");

    }

    getDeptDesigEmp(valueDept,valueDesignation)
    {
        console.log(`Filtering for employees working in ${valueDept} as ${valueDesignation}\n`);
        try
        {
            let recFound = false;
            this.empArr.forEach((v,k) => 
            {
                if(v.get("Dept") == valueDept && v.get("Designation")==valueDesignation)
                {
                    console.log(`            Number = ${v.get("No")}
            Name = ${v.get("Name")}
            Dept = ${v.get("Dept")}
            Position = ${v.get("Designation")}
            Salary = ${v.get("Salary")}
            `);

                    recFound = true;
                }
            });


            if(recFound == false){console.log(`No record found for employee working in ${valueDept} as ${valueDesignation}:(\n`);}
        }

        catch(err)
        {
            console.log(err.message);
        }

        finally
        {
            console.log("---------------------------------");
        }
    }

    getMaxSalaryDept()
    {
        console.log("Department-wise max salary\n");

        this.deptArr.forEach((v,k) =>
        {
            let deptVal = v.get("DeptName");
            let maxSal = 0;
            let maxSalPpl = [];

            this.empArr.forEach((v1,k1) => 
            {
                if(v1.get("Dept") == deptVal && parseInt(v1.get("Salary"))>= maxSal)
                {
                    maxSal = parseInt(v1.get("Salary"));
                    maxSalPpl.push(v1);
                }
            });

            console.log(`Max Salary in ${deptVal} is earned by:`);
            maxSalPpl.forEach((v2) => {console.log(`Name - ${v2.get("Name")}\tSalary - ${v2.get("Salary")}`);});
            console.log("\n");
        });

        console.log("---------------------------------");

    }


    getAllDept()
    {
        console.log("Department details\n")
        this.deptArr.forEach((v,k) => 
        {
            console.log(`            Number = ${v.get("DeptNo")}
            Dept = ${v.get("DeptName")}
            Location = ${v.get("Location")}
            Capacity = ${v.get("Capacity")}
            `);
        });

        console.log("---------------------------------");
    }




}

var obj = new dayFourTask();
obj.getAllDept();
obj.addEmp("1","Farhan","DS","Intern","6969");
obj.getAllEmp();



obj.getAllDept();
obj.addEmp("2","Jai","DS","Intern","420");
obj.getAllEmp();



obj.getAllDept();
obj.addEmp("3","Abhi","Corporate","CEO","911");
obj.getAllEmp();


obj.getAllDept();
obj.addEmp("4","Mahesh","DA","Intern","666");
obj.getAllEmp();


obj.getAllDept();
obj.addEmp("5","Priyanshu","Corporate","UFO","786");
obj.getAllEmp();
obj.getAllDept();


// obj.delEmp("1");
// obj.getAllDept();



// var rec = new Map();
// rec.set("No","1");
// rec.set("Name","Yashi");
// rec.set("Dept","DS");
// rec.set("Designation","Intern");
// rec.set("Salary","6969");
// obj.updateEmp("2",rec);

// obj.addEmp("-6","Jai","DS","Intern","420");
// obj.addEmp("1","Mahesh","DS","Intern","420");
// obj.addEmp("7","kshitij","DS","Intern","420");
// obj.addEmp("8","Abhi","DS","Intern","-420");
// obj.addEmp("9","Anushri","Corporate","UFO","1234");


//obj.getEmp("Designation","Intern");

//obj.getDeptDesigEmp("DS","Intern");

obj.getMaxSalaryDept();

