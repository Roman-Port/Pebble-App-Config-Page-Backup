
var arrivalJson;
var stopMax = 8;
var oldStopTitle = [];
var oldStopSubtitle = [];
var oldStopId = [];
var changesWereMade = [];
var stopIndex = 0;
var version = "myvr.v1";
var stopIsValid = [];
var save = [];

function log(msg) {
	//console.log(msg);
}

function getSavedSettings() {
  stopIndex = 0;
    for (var i=0; i < stopMax; ++i) {
      save.push({'api': "0", 'id': "", 'name': "", 'title': "", 'subtitle': ""});
      oldStopId[i] = save[i].id;
      oldStopTitle[i] = save[i].title;
      oldStopSubtitle[i] = save[i].subtitle;
      changesWereMade[i] = false;
      stopIsValid[i] = false;
    }

  if (localStorage[version + ".stopIndex"] !== undefined) {
    log("retrieving localstorage");
    stopIndex = parseInt(localStorage[version + ".stopIndex"], 10);
    log("stopIndex = " + stopIndex);
    for (i=0; i < stopMax; ++i) {
      save[i].api = localStorage[version + ".api." + i];
      save[i].id = localStorage[version + ".stopId." + i];
	  stopIsValid[i] = true;
		if (save[i].id === null || save[i].id === "null") {
			save[i].id = "";
      		stopIsValid[i] = false;
		}
      oldStopId[i] = save[i].id;
      save[i].name = localStorage[version + ".name." + i];
      save[i].title = localStorage[version + ".stopName." + i];
		if (save[i].title === null || save[i].title === "null") {
			save[i].title = "";
		}
      oldStopTitle[i] = save[i].title;
      save[i].subtitle = localStorage[version + ".sub." + i];
		if (save[i].subtitle === null || save[i].subtitle === "null" || save[i].subtitle === "NaN") {
			save[i].subtitle = "";
		}
      oldStopSubtitle[i] = save[i].subtitle;
     log("localstorage:" + i + ","  + save[i].id + "," + save[i].title+ "," + save[i].subtitle + "." );
    }
  }
}

var vancouverURL = "http://orologics.com/xmlproxy/nextbusproxy.php?vancouver=stops/";
var vancouverStopReq = "%3FapiKey%3DU1O8Wh9bzavTDdV2eG9s";
function vancouver(inStopId) {
	var url2 = vancouverURL + inStopId + vancouverStopReq;
	log(url2);
	var request = new XMLHttpRequest();
	var method = 'GET';
	var async = true;
	
	request.open(method, url2, async);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var json = JSON.parse(request.responseText);
			log(json);
      		stopIsValid[stopIndex] = (json.Name !== undefined);
      		if (stopIsValid[stopIndex]) {
      			save[stopIndex].name = json.OnStreet + " AT " + json.AtStreet;
            	save[stopIndex].id = $("#stopId").val();
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

function validateStopId() {
	var theStopId = $("#stopId").val();
	if (theStopId !== "") { // blank for delete
		stopIsValid[stopIndex] = false;
		vancouver(theStopId);
		return;
	}
	stopIsValid[stopIndex] = true;
    updateSubmitButton();
}

function saveOptions() {
  localStorage[version + ".stopIndex"] = stopIndex;
  for (var i = 0; i < stopMax; ++i) {
      localStorage[version + ".api." + i] = save[i].api;
      localStorage[version + ".name." + i] = save[i].name;
      localStorage[version + ".stopId." + i] = save[i].id;
		if (save[i].title === null || save[i].title === "null") {
			save[i].title = "";
		}
      localStorage[version + ".stopName." + i] = save[i].title;
		if (save[i].subtitle === null || save[i].subtitle === "null") {
			save[i].subtitle = "";
		}
      localStorage[version + ".sub." + i] = save[i].subtitle;
  }
  var options = [];
  for (i = 0; i < stopMax; ++i) {
    if (stopIsValid[i] && save[i].id !== null && save[i].id !== "" && save[i].id !== "null" && 
    	save[i].id !== undefined && save[i].title !== "" && save[i].title !== undefined &&
    	save[i].title !== null && save[i].title !== "null") {
      options.push({'agency': 'vr', 'api': save[i].api, 'id': save[i].id, 'name': save[i].name,
      	'title': save[i].title, 'subtitle': save[i].subtitle});
      }
  }
  return options;
}

function updateSubmitButton() {
    changesWereMade[stopIndex] = stopIsValid[stopIndex] && (oldStopId[stopIndex] !== save[stopIndex].id ||
    	 oldStopSubtitle[stopIndex] !== save[stopIndex].subtitle || 
    	 oldStopTitle[stopIndex] !== save[stopIndex].title);
    var changed = false;
    for (var i=0; i < stopMax; ++i) {
      changed = changed || changesWereMade[i];
    }
    if (changed)
        $("#b-submit").text( "Save");//.button("refresh");
    else
        $("#b-submit").text( "Not Ready");//.button("refresh");
}


function initDropdowns() {
	$("#selectNumber").val(stopIndex).selectmenu('refresh');
	$("#stopId").val((save[stopIndex].id === null || save[stopIndex].id === undefined) ? "" : save[stopIndex].id);
    $("#stopId").css({'color':'black'});
    $("#stopId").css({'font-weight':'normal'});
	$("#stopName").val((save[stopIndex].title === null || save[stopIndex].title === undefined) ? "" : save[stopIndex].title);
	$("#stopSubtitle").val((save[stopIndex].subtitle === null || save[stopIndex].subtitle === undefined) ? "" : save[stopIndex].subtitle);
}

function updateAgencies() {
	initDropdowns();
	updateSubmitButton();
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
	updateAgencies();
	$("#stopId").width("10em");
  
		$("#stopId").blur (function (event){
            validateStopId();
        });
  
		$("#stopName").blur (function (event){
            save[stopIndex].title = $("#stopName").val();
        });
  
		$("#stopSubtitle").blur (function (event){
            save[stopIndex].subtitle = $("#stopSubtitle").val();
        });
  
		$("#selectNumber").blur (function (event){
          var newStopIndex = $("#selectNumber").val();
          log("stopIndex:"+newStopIndex);
          if (newStopIndex != stopIndex && changesWereMade[stopIndex]) {
            save[stopIndex].title = $("#stopName").val();
            save[stopIndex].subtitle = $("#stopSubtitle").val();
          }
          stopIndex = newStopIndex;
          updateAgencies();
        });

		$("#stopName").keyup (function (event){
            save[stopIndex].title = $("#stopName").val();
            updateSubmitButton();
        });

		$("#stopSubtitle").keyup (function (event){
            save[stopIndex].subtitle = $("#stopSubtitle").val();
            updateSubmitButton();
        });

		$("#stopId").keyup (function (event){
			if ($("#stopId").val() === "") {
				save[stopIndex].id = "";
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

