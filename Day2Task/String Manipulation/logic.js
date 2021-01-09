function calculate()
{
    var val = document.getElementById("textArea").value
    console.log(val + " Type = " + typeof(val));

    if(val === "")
    {
        alert("Please enter something :(");
        return;
    }

    firstUpper(val);
    titlecase(val);
    containsAI(val);
    rev(val);
    repl(val);
}

function firstUpper(val)
{
    var splitStr = val.split('.');

    for(var i=0; i<splitStr.length; i++)
    {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    var res = splitStr.join('.');

    document.getElementById("t0").innerHTML = res;

}

function titlecase(val)
{
    var splitStr = val.toLowerCase().split(/[\s. ]+/);

    for( var i=0; i<splitStr.length; i++)
    {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    var res = splitStr.join(' ');

    document.getElementById("t1").innerHTML = res;
}

function containsAI(val)
{
    var res="";
    
    var splitStr = val.split(' ');

    for(var i=0; i<splitStr.length; i++)
    {
        if(splitStr[i].includes("i") || splitStr[i].includes["a"])
        {
            // res = res + "\n" + splitStr[i];
            res = res + splitStr[i] + "\n"; 
            console.log(res);
        }
    }

    document.getElementById("t2").innerHTML = res;
}

function rev(val)
{
    var splitStr = val.split(' ');
    var res = "";

    for(var i=0; i<splitStr.length; i++)
    {
        res = res + reverseStr(splitStr[i]) + " ";
    }
    document.getElementById("t3").innerHTML = res;
    console.log(splitStr)
}   

function reverseStr(str)
{
    var s = "";

    for( var i=str.length-1; i>=0; i--)
    {
        s = s + str[i];
    }

    return s;
}

function repl(val)
{

    document.getElementById("t4").innerHTML = val.split(' ').join('-');
}
 