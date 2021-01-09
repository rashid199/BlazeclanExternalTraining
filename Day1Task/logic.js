function calculate()
{

    try{

        var input = document.getElementById("input").value;
        var val = eval(input);
        clearInput();
        document.getElementById("input").value = val;
    }
    catch( err ){
        clearInput();
        document.getElementById("input").value = "Invalid";
    }
}

function clearInput()
{
    document.getElementById("input").value = "";
}

function append(val)
{
    document.getElementById("input").value += val;
    
}