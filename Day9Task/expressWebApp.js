const { Router } = require('express');
let express = require('express');
let path = require('path');

let instance = express();

instance.use(express.static(path.join(__dirname, "./node_modules/jquery/dist")));

let router = express.Router();

instance.use(router);

router.get("/home",(req,resp) => {
    resp.sendFile("home.html",{

        root:path.join(__dirname,'./')
    });
});

instance.listen(9087, ()=>{
    console.log("Express Web App listening on port 9087");
});