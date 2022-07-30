function gup(name) {
	name = name.replace(/[\[]/, "\\\[").replace("/[\]]/", "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
     if (results == null)
   
        return "";
    else
        return results[1];
} 

function setValues()
{    
	setValue("temp", "weatherTempFormat");
	setValue("wind", "weatherWindFormat");
}

function setValue( valueToSelect, selectElementId)
{
	var value = gup(valueToSelect);
    var element = document.getElementById(selectElementId);
    for (var i = 0; i < element.options.length; i++) {
                if (element.options[i].value == value)
                    element.options[i].selected = "selected";
	}
}


function cancel() {
	document.location="pebblejs://close#Cancelled";
}


function submit() {
	var tempUnit		=	document.getElementById("weatherTempFormat").value;
	var windFormat		=	document.getElementById("weatherWindFormat").value;
	document.location = "pebblejs://close#" + tempUnit + "," + windFormat;
}