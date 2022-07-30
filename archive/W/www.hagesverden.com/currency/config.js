var currencies;

function save() {
	var response = {
		"status":1, //OK
		"to":document.querySelector("#to").value.toUpperCase(),
		"from":document.querySelector("#from").value.toUpperCase()
	};
	sendResponse(response);
}

function cancel() {
	var response = {
		"status":2 //Cancel
	}
	sendResponse(response);
}

function sendResponse(responseObj) {
	var responseStr = encodeURIComponent(JSON.stringify(responseObj));
	window.location.href = "pebblejs://close#" + responseStr;
}

function currencySearch(element, searchStr) {
	var matches = [];
	var lcSearch = searchStr.toLowerCase();
	for (var i = 0; i < currencies.length; i++ ) {
		if( currencies[i]["code"].toLowerCase().indexOf(lcSearch) > -1 || currencies[i]["name"].toLowerCase().indexOf(lcSearch) > -1 ) {
			matches.push(currencies[i]);
		}
		if( matches.length >= 5 ) {
			break;
		}
	}

	var container = document.querySelector("#searchResult");
	if( matches.length > 0 ) {
		var table = document.createElement("table");

		for( var i = 0; i < matches.length; i++ ) {
			var row = createSearchResultRow(matches[i], element);
			table.appendChild(row);
		}

		container.innerHTML = "";
		container.appendChild(table);
		container.style.visibility = "visible"

		var top = element.offsetTop + element.offsetHeight;
		container.style.top = top;
		container.style.left = element.offsetLeft;
		container.style.width = element.offsetWidth-2; //-2 for border
	} else {
		container.style.visibility = "hidden";
	}
}

function createSearchResultRow(match, inputElement) {
	var row = document.createElement("tr");
	var codeCell = document.createElement("td");
	codeCell.innerHTML = match["code"];
	row.appendChild(codeCell);

	var nameCell = document.createElement("td");
	nameCell.innerHTML = match["name"];
	row.appendChild(nameCell);

	row.addEventListener("click", function(event) {
		inputElement.value = match["code"];
	});

	return row;
}

function hideSearch() {
	var container = document.querySelector("#searchResult");
	container.style.visibility = "hidden";
}

function exec() {
	currencies = [];
	for( var p in currency_name_map ) {
		if( currency_name_map.hasOwnProperty(p) ) {
			currencies.push({
				"code":p,
				"name":currency_name_map[p]
			});
		}
	}

	var fromField = document.querySelector("#from");
	setUpTextfield(fromField);
	var toField = document.querySelector("#to");
	setUpTextfield(toField);
}

function setUpTextfield(tf) {
	tf.onkeyup = function() {
		if( tf.value.length > 0 ) {
			currencySearch(tf, tf.value);
		} else {
			hideSearch();
		}
	};
	tf.onblur = function() {
		setTimeout(hideSearch, 300);	
	}
}

var currentWindowOnload = window.onload;
window.onload = function() {
	if (currentWindowOnload) {
    	currentWindowOnload();
    }

    exec();
};
