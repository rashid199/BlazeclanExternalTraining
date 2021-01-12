let http = require('http');

let ProductsInfo = [
    {
        "ProductName":'Vicco Vajradanti',
        "CategoryName":'Toothpaste',
        "Price":69,
        "ProductId":1
    },
    {
        "ProductName":'Parle-G',
        "CategoryName":'Biscuit',
        "Price":10,
        "ProductId":2
    }
];

let x=3;

let server = http.createServer((req, resp)=>{

    let headers = req.headers;
    let authObject = headers.authorization;
    //console.log(authObject);

    console.log(`Current Method = ${req.method}`);

    if(req.method === "GET")
    {
        let filterCategory = req.url.split('/')[1];
        let filterValue = req.url.split('/')[2];

        

        if(filterCategory !== 'favicon.ico' && filterCategory!== '')
        {
            console.log(`Filtering for ${filterValue} in ${filterCategory}`);

            let resArray = [];
            //console.log("Houston we have a problem");
            ProductsInfo.forEach((val) => 
            {
                //console.log(val);
                if(val[filterCategory] == filterValue)
                {
                    console.log(`We found it :( ${JSON.stringify(val)})`);
                    resArray.push(val);   
                }
            
            });

            if(resArray.length == 0)
            {
                resp.writeHead(404,{'Content-Type': 'application/json'});
                resp.write(JSON.stringify({"Error":"Record not found"}));

                console.log(`Record not found for ID = ${filterValue} in ${filterCategory}`);
            }

            else
            {
                resp.writeHead(200,{'Content-Type': 'application/json'});
                resp.write(JSON.stringify(resArray));
            }

            resp.end();
        }

        else
        {
            resp.writeHead(200,{'Content-Type': 'application/json'});
            resp.write(JSON.stringify(ProductsInfo));
            resp.end();
        }
    }

    else if(req.method === "POST")
    {
        let receivedData;

        console.log("In Post");
        // console.dir(`Data ProductName = ${receivedData["ProductName"]}`);


        req.on('data', (d) =>
        {
            receivedData = JSON.parse(d);

            //console.log(receivedData.ProductName);

            let newkey = "ProductId";
            let newval = x;

            receivedData[newkey] = newval;
            x++;

            ProductsInfo.push(receivedData);

            resp.writeHead(200,{'Content-Type': 'application/json'});
            resp.write(JSON.stringify(ProductsInfo));

            resp.end();

        });
        

    }

});

server.listen(9087);
console.log("Started on port 9087");