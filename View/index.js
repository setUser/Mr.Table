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
    getTables(result => {
        CaptainTables = result;
        _update()
        _setSectorEvent("Bar");
        _setSectorEvent("PortDown");
        _setSectorEvent("PortUp");
        _setSectorEvent("LibertyDown");
        _setSectorEvent("LibertyUp");
        _setSectorEvent("Neptune");
        _setSectorEvent("SunDown");
        _setSectorEvent("SunUp");
        _setSectorEvent("StarDown");
        _setSectorEvent("StarUp");
        _setSectorEvent("CaptainUp");
        _setSectorEvent("CaptainDown");
        _setSectorEvent("DockUp");
        _setSectorEvent("DockDown");
    })
    setInterval(() => { getTables(result => { CaptainTables = result; _update() }) }, 3000);
    $("#Reset_Button_ID").click(() => { resetTables(result => { CaptainTables = result; _update() }) });
});
//-----------------------------------------------------------------------------------------
//Update State
function _update() {
    _setSectorState("Bar");
    _setSectorState("PortDown");
    _setSectorState("PortUp");
    _setSectorState("LibertyDown");
    _setSectorState("LibertyUp");
    _setSectorState("Neptune");
    _setSectorState("SunDown");
    _setSectorState("SunUp");
    _setSectorState("StarDown");
    _setSectorState("StarUp");
    _setSectorState("CaptainUp");
    _setSectorState("CaptainDown");
    _setSectorState("DockUp");
    _setSectorState("DockDown");
}
function _setSectorState(sector) {
    let index = 0;
    CaptainTables[sector].forEach(element => {
        if (element) {
            $("#" + sector + "_" + index + "_ID").removeClass("Available_Table");
            $("#" + sector + "_" + index + "_ID").addClass("Occupied_Table");
        } else {
            $("#" + sector + "_" + index + "_ID").removeClass("Occupied_Table");
            $("#" + sector + "_" + index + "_ID").addClass("Available_Table");
        }
        index++;
    });
}
function _setSectorEvent(sector) {
    let index = 0;
    CaptainTables[sector].forEach(() => {
        $("#" + sector + "_" + index + "_ID").click({ param0: sector, param1: index }, (event) => {
            if (CaptainTables[event.data.param0][event.data.param1]) {
                setTable(event.data.param0, event.data.param1, false, result => { CaptainTables = result; _update() });
            } else {
                setTable(event.data.param0, event.data.param1, true, result => { CaptainTables = result; _update() });
            }
        })
        index++;
    });
}
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