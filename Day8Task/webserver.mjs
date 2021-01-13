import * as http from 'http';
import * as fs from 'fs';

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


let server = http.createServer((req,resp) => {


    if(req.method === "POST")
    {
        let receivedData;
        console.log("POST Method Initiated...");

        req.on('data', (d) =>
        {
            receivedData = JSON.parse(d);

            ProductsInfo.push(receivedData);

            resp.writeHead(201);
            //resp.write("<html><body>Record added</body></html>");

            console.log(ProductsInfo);

            //resp.end();

        });
    }

    if(req.url === '/home')
    {
        console.log(req.url);

        fs.readFile('./home.html',(error,file) => 
        {

            
            if(error)
            {
                resp.writeHead(404, {'Content-Type': 'text/html'});
                resp.write(error.message);
                resp.end();
            }

            console.log(`File read = ${file}`);
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(file); 
            resp.end();

        });
    }



    else
    {
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write("file"); 
        resp.end();
    }
    
});

server.listen(9087);
console.log(`Listening on port 9087`);