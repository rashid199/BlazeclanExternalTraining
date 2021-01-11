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

    // var data = {
    //     BasePrice: 694989,
    //     CategoryName: 'Stationary',
    //     Description: 'Gel-Pen',
    //     Manufacturer: 'Reynolds',
    //     ProductId: 'Prd9111',
    //     ProductName: 'Pen',
    // };


    const validateData = {
        set: function(target, prop, value)
            {
                if(prop === 'ProductId') 
                {
                    if(typeof(value) != "string")
                    {
                        alert(`Value of ${prop} ain't string type`);
                        return false;
                    }

                    else
                    {
                        target[prop] = value;
                        return true;
                    }
                }

                if(prop === 'BasePrice') 
                {
                    if(typeof(value) != "number")
                    {
                        alert(`Value of ${prop} ain't number type`);
                        return false;
                    }
                    else
                    {
                        target[prop] = value;
                        return true;
                    }
                }

                if(prop === 'ProductName') 
                {
                    if(target[prop].length>30)
                    {
                        alert(`Value of ${prop} exceeded 30 characters`);
                        return false;
                    }

                    else
                    {
                        target[prop] = value;
                        return true;
                    }
                }

                target[prop] = value;
                console.log(`Value of ${prop} is ${value}`);
                return true;
            },

            get: function(target, prop)
            {
                console.log(`Getting ${prop} value ${target[prop]}`);
                return target[prop];
            }
    };
    var targetData = 
    {
         BasePrice: 694989,
         CategoryName: 'Stationary',
         Description: 'Gel-Pen',
         Manufacturer: 'Reynolds',
         ProductId: 'Prd9111',
         ProductName: 'Pen',
    };

    const ProxyData = new Proxy(targetData, validateData)

    ProxyData.BasePrice = 911420; 
    ProxyData.CategoryName = 'Toothpaste';
    ProxyData.Description = 'Toothpaste';
    ProxyData.Manufacturer = 'Vicco';
    ProxyData.ProductId = 'Prd100';
    ProxyData.ProductName = 'Vajradanti';
    
    console.log(ProxyData);
    // console.log(targetData);

    // targetData.BasePrice = ProxyData.BasePrice;
    // targetData.CategoryName = ProxyData.CategoryName;
    // targetData.Description = ProxyData.Description;
    // targetData.Manufacturer = ProxyData.Manufacturer;
    // targetData.ProductId = ProxyData.ProductId;
    // targetData.ProductName = ProxyData.ProductName;
    
    xhr.open('POST','https://apiapptrainingnewapp.azurewebsites.net/api/Products');

    xhr.setRequestHeader("Content-Type","application/json");

    console.log(targetData);
    xhr.send(JSON.stringify(targetData));

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