function getData()
{
    let xhr = new XMLHttpRequest();

    xhr.onload = function()
    {
        if(xhr.status == 200)
        {
            console.log(xhr.response);
        }

        else
        {
            console.log("Error occured whie sending GET request");
        }
    };

    xhr.onerror = function()
    {
        console.log("Some error occured");
    };

    xhr.open('GET','https://apiapptrainingnewapp.azurewebsites.net/api/Products');
    xhr.send();
}

function deleteData()
{
    let xhr = new XMLHttpRequest();

    xhr.onload = function()
    {
        if(xhr.status == 200)
        {
            console.log("Deleted successfully");
        }

        else
        {
            console.log("Deleted unsuccessful");   
        }
    };

    xhr.onerror = function()
    {
        console.log("Some error occured"); 
    };

    xhr.open('DELETE','https://apiapptrainingnewapp.azurewebsites.net/api/Products/54');
    xhr.send();

}

function postData()
{
    let xhr = new XMLHttpRequest();

    xhr.onload = function()
    {
        if(xhr.status == 201)
        {
            console.log("Added successfully");
        }

        else
        {
            console.log("Add unsuccessful");   
        }
    };

    xhr.onerror = function()
    {
        console.log("Some error occured"); 
    };

    var data = {
        BasePrice: 6900,
        CategoryName: 'Stationary',
        Description: 'Gel-Pen',
        Manufacturer: 'Reynolds',
        ProductId: 'Prd9111',
        ProductName: 'Pen',
    };


    const validateData = {
        set: function(target, property, value)
            {
                console.log(target.property);
            }
    };

    const ProxyData = new Proxy(data, validateData);
    
    xhr.open('POST','https://apiapptrainingnewapp.azurewebsites.net/api/Products');

    xhr.setRequestHeader("Content-Type","application/json");

    xhr.send(JSON.stringify(ProxyData));

}

function putData()
{
    let xhr = new XMLHttpRequest();

    xhr.onload = function()
    {
        if(xhr.status == 200)
        {
            console.log("Updated successfully");
        }

        else
        {
            console.log("Update unsuccessful");   
        }
    };

    xhr.onerror = function()
    {
        console.log("Some error occured"); 
    };

    xhr.open('PUT','https://apiapptrainingnewapp.azurewebsites.net/api/Products/229');

    var data = {
        BasePrice: 69,
        CategoryName: 'Stationary',
        Description: 'Gel-Pen',
        Manufacturer: 'Trimax',
        ProductId: 'Prd420',
        ProductName: 'Pen',
        ProductRowId: 229,
    };

    xhr.setRequestHeader("Content-Type","application/json");

    xhr.send(JSON.stringify(data));

}