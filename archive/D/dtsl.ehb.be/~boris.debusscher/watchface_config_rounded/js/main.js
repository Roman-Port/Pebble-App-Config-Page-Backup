(function(){
    loadOptions();
    submitHandler();
})();

function submitHandler(){
    
    $("#submit_config").on("click",function(){
        console.log("submit");

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
        //console.log(return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData())));
    });
    
}

function loadOptions(){
    var bg_color = $("input#bg_color");
    var minutes_color = $("input#minutes_color");
    var hours_color = $("input#hours_color");
    var seconds_color = $("input#seconds_color");
    var marks_color = $("#marks_color");
    var ellipse_color = $("#ellipse_color");
    var clock_color = $("input#clock_color");
    
    if(localStorage.backgroundColor){
        bg_color.attr("value", localStorage.backgroundColor);
        minutes_color.attr("value", localStorage.minutesColor);
        hours_color.attr("value", localStorage.hoursColor);
        seconds_color.attr("value", localStorage.secondsColor);
        marks_color.attr("value", localStorage.marksColor);
        ellipse_color.attr("value", localStorage.ellipseColor);
        clock_color.attr("value", localStorage.clockColor);
    }
}

function getAndStoreConfigData(){
    var bg_color = $("input#bg_color");
    var minutes_color = $("input#minutes_color");
    var hours_color = $("input#hours_color");
    var seconds_color = $("input#seconds_color");
    var marks_color = $("#marks_color");
    var ellipse_color = $("#ellipse_color");
    var clock_color = $("input#clock_color");
    
    var options = {
        backgroundColor: bg_color.attr("value"),
        minutesColor: minutes_color.attr("value"),
        hoursColor: hours_color.attr("value"),
        secondsColor: seconds_color.attr("value"),
        marksColor: marks_color.attr("value"),
        ellipseColor: ellipse_color.attr("value"),
        clockColor: clock_color.attr("value")
    };
    
    localStorage.backgroundColor = options.backgroundColor;
    localStorage.minutesColor = options.minutesColor;
    localStorage.hoursColor = options.hoursColor;
    localStorage.secondsColor = options.secondsColor;
    localStorage.marksColor = options.marksColor;
    localStorage.ellipseColor = options.ellipseColor;
    localStorage.clockColor = options.clockColor;
    
    console.log(JSON.stringify(options));
    return options;
    
}

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