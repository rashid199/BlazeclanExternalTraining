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

    xhr.open('DELETE','https://apiapptrainingnewapp.azurewebsites.net/api/Products/42');
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
        BasePrice: 40,
        CategoryName: 'Stationary',
        Description: 'Gel-Pen',
        Manufacturer: 'Reynolds',
        ProductId: 'Prd911',
        ProductName: 'Pen',
    };

    xhr.open('POST','https://apiapptrainingnewapp.azurewebsites.net/api/Products');

    xhr.setRequestHeader("Content-Type","application/json");

    xhr.send(JSON.stringify(data));

}
