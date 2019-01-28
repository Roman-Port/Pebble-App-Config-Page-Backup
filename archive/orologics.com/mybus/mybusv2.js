/// http://jsbin.com/OduMEPex/1/edit

var nextBusURL = "http://orologics.com/xmlproxy/nextbusproxy.php?nextbus=";
var arrivalJson;
var stopMax = 8;
var saveApi = [];
var lastRegion = "California-Northern";
var saveRegion = [];
var saveAgency = [];
var saveStopName = [];
var oldStopName = [];
var saveStopSubtitle = [];
var oldStopSubtitle = [];
var saveStopId = [];
var oldStopId = [];
var changesWereMade = [];
var stopIndex = 0;
var version = "mybus.v2";
var stopIsValid = [];

function log(msg) {
	console.log(msg);
}
	
var agencyArray = [];

function analyzeAgency(agency) {
  agencyArray.push( {'tag' : agency.tag, 'title': agency.title, 'region' : agency.regionTitle} );
}

function agencyParse(json) {
    agencyArray = [];
    var theError = json.Error;
    if (theError === undefined) {
      var agencies = json.agency;
          for (var key1 in agencies) {
            analyzeAgency(agencies[key1]['@attributes']);
          }
     }
}

function getSavedSettings() {
  stopIndex = 0;
  log("localStorage lastRegion is " + localStorage[version + ".lastRegion"]);
  if (localStorage[version + ".lastRegion"] !== undefined) {
		lastRegion = localStorage[version + ".lastRegion"];
  		log("retrieved lastRegion is " + lastRegion);
  }
    for (var i=0; i < stopMax; ++i) {
      saveRegion[i] = "0";
      saveAgency[i] = "0";
      saveApi[i] = "0";
      saveStopId[i] = "";
      oldStopId[i] = saveStopId[i];
      saveStopName[i] = "";
      oldStopName[i] = saveStopName[i];
      saveStopSubtitle[i] = "";
      oldStopSubtitle[i] = saveStopSubtitle[i];
      changesWereMade[i] = false;
      stopIsValid[i] = false;
    }

  if (localStorage[version + ".stopIndex"] !== undefined) {
    log("retrieving localstorage");
    stopIndex = parseInt(localStorage[version + ".stopIndex"], 10);
    log("stopIndex = " + stopIndex);
    for (i=0; i < stopMax; ++i) {
      if (localStorage[version + ".region." + i] !== undefined) {
         saveRegion[i] = localStorage[version + ".region." + i];
      }
      saveAgency[i] = localStorage[version + ".agency." + i];
      saveApi[i] = localStorage[version + ".api." + i];
      saveStopId[i] = localStorage[version + ".stopId." + i];
      stopIsValid[i] = true;
      oldStopId[i] = saveStopId[i];
      saveStopName[i] = localStorage[version + ".stopName." + i];
      oldStopName[i] = saveStopName[i];
      saveStopSubtitle[i] = localStorage[version + ".sub." + i];
      oldStopSubtitle[i] = saveStopSubtitle[i];
     // alert("localstorage:" + i + ","  + saveStopId[i] + "," + saveStopName[i] + "." );
    }
  }
}

function updateAgencies() {
  log("updateAgencies json lastRegion = " + lastRegion);
  $("#selectAgency").val([]).children().remove();
  $('<option value="0">Select Transit System...</option>').appendTo("#selectAgency").attr('selected', 'selected');
  for (var key2 in agencyArray) {
  	var agency = agencyArray[key2];
      if (agency.region === lastRegion) {
      	$('<option value="' + agency.tag + '">' + agency.title + '</option>').appendTo("#selectAgency");
      }	
  }
	$("#selectAgency").selectmenu('refresh');
	log("got here");
    initDropdowns();
    updateSubmitButton();
}

function getAgencies() {
	var url = nextBusURL +  escape("command=agencyList");
	var request = new XMLHttpRequest();
	var method = 'GET';
	var async = true;

	request.open(method, url, async);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			agencyParse(JSON.parse(request.responseText));
      		updateAgencies();
		}
	};
	request.send();
}

function nextbus(inStopId) {
	var nextBusStopReq = "command=predictions&a=" + saveAgency[stopIndex] + "&stopId=" + inStopId;
	var url2 = nextBusURL + escape(nextBusStopReq);
	var request = new XMLHttpRequest();
	var method = 'GET';
	var async = true;
	
	request.open(method, url2, async);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var json = JSON.parse(request.responseText);
      		stopIsValid[stopIndex] = (json.Error === undefined);
      		if (stopIsValid[stopIndex]) {
            	saveStopId[stopIndex] = $("#stopId").val();
            	$("#stopId").css({'color':'green'});
    			$("#stopId").css({'font-weight':'normal'});
			} else {
				$("#stopId").css({'color':'red'});
				$("#stopId").css({'font-weight':'bold'});
            }
    		updateSubmitButton();
		}
	};
	request.send();
}

var api = { '0': nextbus
          };

function validateStopId() {
	var theStopId = $("#stopId").val();
	if (theStopId !== "") { // blank for delete
		stopIsValid[stopIndex] = false;
		api[saveApi[stopIndex ]](theStopId);
		return;
	}
	stopIsValid[stopIndex] = false;
    updateSubmitButton();
}

function saveOptions() {
  localStorage[version + ".stopIndex"] = stopIndex;
  for (var i = 0; i < stopMax; ++i) {
      localStorage[version + ".region." + i] = saveRegion[i];
      localStorage[version + ".agency." + i] = saveAgency[i];
      localStorage[version + ".api." + i] = saveApi[i];
      localStorage[version + ".stopId." + i] = saveStopId[i];
      localStorage[version + ".stopName." + i] = saveStopName[i];
      localStorage[version + ".sub." + i] = saveStopSubtitle[i];
  }
  localStorage[version + ".lastRegion"] = lastRegion;
  var options = [];
  for (i = 0; i < stopMax; ++i) {
    if (stopIsValid[i] && saveAgency[i] !== "0" && saveStopId[i] !== null && saveStopId[i] !== "" && 
    	saveStopId[i] !== undefined && saveStopName[i] !== "" && saveStopName[i] !== undefined) {
      options.push({'agency': saveAgency[i], 'api': saveApi[i], 'id': saveStopId[i], 
      	'title': saveStopName[i], 'subtitle': saveStopSubtitle[i]});
      }
  }
  return options;
}

function updateSubmitButton() {
    changesWereMade[stopIndex] = oldStopId[stopIndex] !== saveStopId[stopIndex] ||
    	 oldStopSubtitle[stopIndex] !== saveStopSubtitle[stopIndex] || 
    	 oldStopName[stopIndex] !== saveStopName[stopIndex];
    var changed = false;
    for (var i=0; i < stopMax; ++i) {
      changed = changed || changesWereMade[i];
    }
    if (changed)
        $("#b-submit").text( "Save");//.button("refresh");
    else
        $("#b-submit").text( "Not Ready");//.button("refresh");
}

function RegionChange (select) {
	lastRegion = select.options[select.selectedIndex].value;
    log("selectedRegion:" + lastRegion);
	if (lastRegion != saveRegion[stopIndex]) {
		saveRegion[stopIndex] = lastRegion;
      	saveAgency[stopIndex] = "0";
      	saveStopName[stopIndex] = "";
      	saveStopId[stopIndex] = "";
		updateAgencies();
	}
}

function AgencyChange (select) {
	var selectedAgency = select.options[select.selectedIndex].value;
  log("selectedAgency:" + selectedAgency);
}


function initDropdowns() {
	$("#selectNumber").val(stopIndex).selectmenu('refresh');
	console.log("idd saveRegion["+stopIndex+"]="+saveRegion[stopIndex] + " lastRegion=" + lastRegion) ;
	$("#selectRegion").val([]); // remove any former selection
	$("#selectRegion option[value='" + lastRegion + "']").attr('selected', 'selected');
	
	$("#selectAgency").val([]);
	console.log("idd saveAgency["+stopIndex+"]="+saveAgency[stopIndex]);
	$("#selectAgency option[value='" + saveAgency[stopIndex] + "']").attr('selected', 'selected');
	$("#stopId").val((saveStopId[stopIndex] === null || saveStopId[stopIndex] === undefined) ? "" : saveStopId[stopIndex]);
    $("#stopId").css({'color':'black'});
    $("#stopId").css({'font-weight':'normal'});
	$("#stopName").val((saveStopName[stopIndex] === null || saveStopName[stopIndex] === undefined) ? "" : saveStopName[stopIndex]);
	$("#stopSubtitle").val((saveStopSubtitle[stopIndex] === null || saveStopSubtitle[stopIndex] === undefined) ? "" : saveStopSubtitle[stopIndex]);
	$("#selectRegion").selectmenu('refresh');
	$("#selectAgency").selectmenu('refresh');
}

// Get query variables
function getQueryParam(variable, defaultValue) {
  // Find all URL parameters
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    // If the query variable parameter is found, decode it to use and return it for use
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}

$().ready(function(){
    getSavedSettings();
	getAgencies();
	$("#stopId").width("10em");
  
       
		$("#selectAgency").blur (function (event){
            saveAgency[stopIndex] = $("#selectAgency").val();
			//log(saveAgency[stopIndex]);
        });

		$("#stopId").blur (function (event){
            validateStopId();
        });
  
		$("#stopName").blur (function (event){
            saveStopName[stopIndex] = $("#stopName").val();
        });
  
		$("#stopSubtitle").blur (function (event){
            saveStopSubtitle[stopIndex] = $("#stopSubtitle").val();
        });
  
		$("#selectNumber").blur (function (event){
          var newStopIndex = $("#selectNumber").val();
          log("stopIndex:"+newStopIndex);
          if (newStopIndex != stopIndex && changesWereMade[stopIndex]) {
            saveRegion[stopIndex] = $("#selectRegion").val();
            console.log("blur saveRegion["+stopIndex+"="+saveRegion[stopIndex]) ;
            saveAgency[stopIndex] = $("#selectAgency").val();
            saveStopName[stopIndex] = $("#stopName").val();
            saveStopSubtitle[stopIndex] = $("#stopSubtitle").val();
          }
          stopIndex = newStopIndex;
			if (saveRegion[stopIndex] !== "" && saveRegion[stopIndex] !== "0") {
				lastRegion = saveRegion[stopIndex];
			} else {
				saveRegion[stopIndex] = lastRegion;
			}
          updateAgencies();
        });

		$("#stopName").keyup (function (event){
            saveStopName[stopIndex] = $("#stopName").val();
            updateSubmitButton();
        });

		$("#stopSubtitle").keyup (function (event){
            save[stopIndex].subtitle = $("#stopSubtitle").val();
            updateSubmitButton();
        });

		$("#stopId").keyup (function (event){
			if ($("#stopId").val() === "") {
				saveStopId[stopIndex] = "";
            	updateSubmitButton();
            }
        });

        $("#b-submit").click(function() {
          var changed = false;
          for (var i=0; i < stopMax; ++i) {
            changed = changed || changesWereMade[i];
          }
            if (!changed)
                return;
          log("Submit");

          // Set the return URL depending on the runtime environment
          var return_to = getQueryParam('return_to', 'pebblejs://close#');
          var location = return_to + encodeURIComponent(JSON.stringify(saveOptions()));
          log("Warping to: " + location);
          document.location = location;
        });
        
        $("#b-cancel").click(function() {
          log("Cancel");
          document.location = getQueryParam('return_to', 'pebblejs://close');
        });
});

