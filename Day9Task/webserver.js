let express = require('express');
let atob = require('atob');
let bodyParser = require('body-parser');
let cors = require('cors');

let instance = express();

instance.use(bodyParser.urlencoded({extended:false}));
instance.use(bodyParser.json());

instance.use(cors({
    origin:"*",
    methods:"*",
    allowedHeaders:"*"
}));

let CredInfo = [
    
    {username:"farhan",password:"farhan"},
    {username:"jk",password:"pedia"}
]; 

instance.get("/getAll",(req,resp) => {

    let authValues = req.headers.authorization;
    let recFound = false;
    let credValues = authValues.split(' ');

    console.log(`${credValues[0]} ${credValues[1]}`);

    let data = credValues[1].split(':');

    for(let i=0; i<CredInfo.length; i++)
    {
        if(data[0].trim() === CredInfo[i].username && data[1].trim() === CredInfo[i].password)
        {
            recFound = true;
            break;
        }
    }

    if(recFound == false)
    {
        resp.status(401).send(`Invalid Credentials`);
    }

    else
    {
        resp.status(200).send(JSON.stringify(CredInfo));
    }
    
});

instance.get("/:user",(req,resp) =>{
    
    let user = req.params.user;

    let cred = CredInfo.filter((obj)=>{
        return  obj.username == user;
    });

    if(cred.length == 0)
    {
        resp.status(404).send(`Username ${user} unavailable`);
    }

    else
    {
        resp.status(200).send(JSON.stringify(cred[0]));
    }
});

instance.put("/:user",(req,resp) => {
    
    let user = req.params.user;

    let credIndex = -1;


    for(let i=0; i<CredInfo.length; i++)
    {
        if(CredInfo[i].username == user)
        {
            credIndex = i;
            break;
        }
    }



    if(credIndex == -1)
    {
        resp.status(404).send(`Username ${user} unavailable`);
    }

    else
    {
        CredInfo[credIndex].username = req.body.username;
        CredInfo[credIndex].password = req.body.password;

        resp.status(200).send(JSON.stringify(CredInfo));
    }
});

instance.delete("/:user",(req,resp) => {

    let user = req.params.user;
    let credIndex = -1;

    for(let i=0; i<CredInfo.length; i++)
    {
        if(CredInfo[i].username == user)
        {
            credIndex = i;
            break;
        }
    }

    if(credIndex == -1)
    {
        resp.status(404).send(`Username ${user} unavailable`);
    }

    else
    {
        CredInfo.splice(credIndex,1);

        resp.status(200).send(JSON.stringify(CredInfo));
    }


});

instance.post("",(req,resp) => {

    for(let i=0; i<CredInfo.length; i++)
    {
        if(req.body.username == CredInfo[i].username)
        {
            resp.status(400).send(`User ${req.body.username} already exists`);
            return;
        }
    }

    let cred = {username:req.body.username, password:req.body.password};

    CredInfo.push(cred);

    resp.status(200).send(JSON.stringify(CredInfo));
});


instance.listen(9000,()=>{
    console.log("Listening on port 9000");
});
