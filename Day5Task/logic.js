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
}

