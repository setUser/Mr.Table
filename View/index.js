//-----------------------------------------------------------------------------------------
//Resize
function setResize() {







};
//-----------------------------------------------------------------------------------------
//LOAD
var variable;
addEventListener("load", () => {

    
    setTable("Bar", 5, true, result => variable = result);

    console.log(variable);






});

//-----------------------------------------------------------------------------------------
//API
function resetTables(result) {
    $.get("resetTables", result);
}

function getTables(result) {
    $.get("getTables", result);
}

function setTable(sectorVal, tableVal, stateVal, result) {
    $.post("setTable", { sector: sectorVal, table: tableVal, state: stateVal }, result);
}