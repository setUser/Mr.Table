//-----------------------------------------------------------------------------------------
//Global
var CaptainTables;
//-----------------------------------------------------------------------------------------
//Resize
function onResize() {







};
//-----------------------------------------------------------------------------------------
//LOAD
addEventListener("load", () => {
    //setInterval(() => { getTables(result => CaptainTables = result) }, 5000);





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