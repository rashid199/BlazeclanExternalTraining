var m = new Map();
var maparr = [];
m.set('k',maparr);

function clr()
{
    document.getElementById("i1").value = "";
    document.getElementById("i2").value = "";
    document.getElementById("i3").value = "";
    document.getElementById("i4").value = "Select Option";


}

function sbmt()
{
    if(!validate())
    {return;}

    if(!checkDuplicate())
    {return;}

    var recMap = new Map();
    
    var i1 = document.getElementById("i1").value;
    var i2 = document.getElementById("i2").value;
    var i3 = document.getElementById("i3").value;
    var i4 = document.getElementById("i4").value;

    recMap.set('Id',i1);
    recMap.set('Name',i2);
    recMap.set('Price',i3);
    recMap.set('Category',i4);

    console.log(m.get('k'));
    maparr.push(recMap);
    m.set('k',maparr);


    addToTable(recMap,"table2");

}

function addToTable(recMap,tableid)
{

    var table = document.getElementById(tableid);  
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);


    var i1 = recMap.get('Id');
    var i2 = recMap.get('Name');
    var i3 = recMap.get('Price');
    var i4 = recMap.get('Category'); 

    cell1.innerHTML = i1;
    cell2.innerHTML = i2;
    cell3.innerHTML = i3;
    cell4.innerHTML = i4;

    //alert(tableid)
    if(tableid === "table2")
    {
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell5.innerHTML = '<button onclick = "loadRow(this)">Load</button>';
        cell6.innerHTML = '<button onclick = "deleteRow(this)">Delete</button>';
    }



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


    //console.log(row[0].innerHTML);

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

    //console.log(rowLength);
    if(rowLength == 1){console.log("Table empty");return true;}

    for(var i=1; i<rowLength; i++)
    {
        var oCells = otable.rows.item(i).cells;
        var x = oCells.item(0).innerHTML;

        val = document.getElementById("i1").value.trim();
        // console.log("Trimmed value =" + val + ".");
        // console.log(x + " type: " + typeof(x))
        // console.log(val + " type: " + typeof(val))

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

function filterRecords()
{
    clearTable("table3");

    var recFound = false;

    var filterCategory = document.getElementById("filterCategory").value;
    var filterValue = document.getElementById("filterValue").value;
    var filterCol=10;

    console.log(filterCategory + " " + filterValue);

    if(filterCategory == "ID"){filterCol = 0;}

    else if(filterCategory == "Name"){filterCol = 1;}

    else if(filterCategory == "Category"){filterCol = 3;}

    else if(filterCategory == "Price"){filterCol = 2;}

    // console.log(filterCol);

    var table = document.getElementById("table2");
    var rowLength = table.rows.length;

    console.log("Row Length = " + rowLength);

    for(var i=1; i<rowLength; i++)
    {
        var row = table.rows.item(i).cells;
        if(row[filterCol].innerHTML == filterValue)
        {
            console.log("Record found for " + filterValue);
            var rec = new Map();

            rec.set('Id',row[0].innerHTML);
            rec.set('Name',row[1].innerHTML);
            rec.set('Price',row[2].innerHTML);
            rec.set('Category',row[3].innerHTML);

            console.log(rec);

            addToTable(rec,"table3");

            recFound = true;

        }

    }

    if(recFound == false)
    {
        alert("No records found :(");
    }


}

function clearTable(tableid)
{
    var table = document.getElementById(tableid);
    while(true)
    {
        if(table.rows.length == 1){break;}
        table.deleteRow(-1);
    }

}


function ascSort(ascFlag)
{
    var arr = getArrMaps();
    console.log(arr);

    if(arr==0){alert("No records :(");return;}

    clearTable("table3");

    var filterCategory = document.getElementById("filterCategory").value;

    if(ascFlag == true)
    {
        arr.sort(function(a,b)
        { 
            if(a.get(filterCategory) < b.get(filterCategory)){return -1;}
            else if(a.get(filterCategory) > b.get(filterCategory)){return 1;}
            else{return 0;}
        });
    }

    else
    {
        arr.sort(function(a,b)
        { 
            if(a.get(filterCategory) < b.get(filterCategory)){return 1;}
            else if(a.get(filterCategory) > b.get(filterCategory)){return -1;}
            else{return 0;}
        });    
    }

    arr.forEach((v,i)=>{addToTable(v,"table3");console.log("Added the filtered record " + v);});

    console.log(arr);
}

function getArrMaps()
{
    var arr = [];
    var table = document.getElementById("table2");
    var rowLength = table.rows.length;

    if(rowLength == 1){return 0;}

    for(var i=1; i<rowLength; i++)
    {
        var row = table.rows.item(i).cells;

        var rec = new Map();
        rec.set('Id',row[0].innerHTML);
        rec.set('Name',row[1].innerHTML);
        rec.set('Price',row[2].innerHTML);
        rec.set('Category',row[3].innerHTML);

        arr.push(rec);
    }

    return arr;
}


// maparr.sort(function(a,b){ return parseInt(a.get("Price"))-parseInt(b.get("Price"));})