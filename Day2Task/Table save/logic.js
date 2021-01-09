function clr()
{
    document.getElementById("i1").value = " ";
    document.getElementById("i2").value = " ";
    document.getElementById("i3").value = " ";
    document.getElementById("i4").value = "Select Option";


}

function sbmt()
{
    if(!validate())
    {return;}

    if(!checkDuplicate())
    {return;}

    var i1 = document.getElementById("i1").value;
    var i2 = document.getElementById("i2").value;
    var i3 = document.getElementById("i3").value;
    var i4 = document.getElementById("i4").value;


    var table = document.getElementById("table2");  
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = i1;
    cell2.innerHTML = i2;
    cell3.innerHTML = i3;
    cell4.innerHTML = i4;
    cell5.innerHTML = '<button onclick = "loadRow(this)">Load</button>';
    cell6.innerHTML = '<button onclick = "deleteRow(this)">Delete</button>';

    clr();
}

function loadRow(r)
{
    var i = r.parentNode.parentNode.rowIndex;

    var row = document.getElementById("table2").rows.item(i).cells;
    document.getElementById("i1").value = row[0].innerHTML;
    document.getElementById("i2").value = row[1].innerHTML;
    document.getElementById("i3").value = row[2].innerHTML;
    document.getElementById("i4").value = row[3].innerHTML;


    console.log(row[0].innerHTML);

}

function deleteRow(r)
{
    var i = r.parentNode.parentNode.rowIndex;
 
    document.getElementById("table2").deleteRow(i);
}

function validate()
{

    if(document.getElementById("i1").value == "")
    {
        alert("enter product id");
        return false;
    }

    if(document.getElementById("i2").value == "")
    {
        alert("enter product name");
        return false;
    }   
    
    if(document.getElementById("i3").value == "")
    {
        alert("enter product price");
        return false;
    }    

    if(document.getElementById("i4").value == "Select Option")
    {
        alert("select an option");
        return false;
    }    

    return true;
}

function validatePrice()
{
    var price = document.getElementById("i3").value;
    if(price<0)
    {
        alert("Price can't be zero");
        document.getElementById("submitbtn").disabled = true;
    }
    else
    {
        document.getElementById("submitbtn").disabled = false;
    }
}

function checkDuplicate(val)
{
    var otable = document.getElementById("table2");
    var rowLength = otable.rows.length;

    console.log(rowLength);
    if(rowLength == 1){console.log("Table empty");return true;}

    for(var i=1; i<rowLength; i++)
    {
        var oCells = otable.rows.item(i).cells;
        var x = oCells.item(0).innerHTML;

        val = document.getElementById("i1").value.trim();
        console.log("Trimmed value =" + val + ".");
        console.log(x + " type: " + typeof(x))
        console.log(val + " type: " + typeof(val))

        if(x==val)
        {
            alert("Duplicate entries are prohibited");
            document.getElementById("submitbtn").disabled = true; 
            return false;           
        }

        else
        {
            document.getElementById("submitbtn").disabled = false;
        }
    }

    return true;
}

function optionValidate(val)
{
    // alert(val);
    var price = document.getElementById("i3").value;

    if(val == "FOD" && price<10)
    {

        alert("Price is low for FOD");
        document.getElementById("submitbtn").disabled = true;
        document.getElementById("i4").value = "Select Option";
    }

    else if(val == "ECL" && price<20)
    {

        alert("Price is low for ECL");
        document.getElementById("submitbtn").disabled = true;
        document.getElementById("i4").value = "Select Option";        
    }

    else if(val == "ECT" && price<1000)
    {

        alert("Price is low for ECT");
        document.getElementById("submitbtn").disabled = true;
        document.getElementById("i4").value = "Select Option";
        
    }

    else if(val == "Select Option")
    {

        alert("Select an option");
        document.getElementById("submitbtn").disabled = true;
        document.getElementById("i4").value = "Select Option";
        
    }

    else
    {
        document.getElementById("submitbtn").disabled = false;

    }


}
