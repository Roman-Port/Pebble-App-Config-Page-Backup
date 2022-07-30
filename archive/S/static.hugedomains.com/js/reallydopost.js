function uid(){var result='';for(var i=0;i<36;i++)
result+=Math.floor(Math.random()*16).toString(16).toUpperCase
();return result}
var thisuu;thisuu=uid();var tmfollowed=0;$("html").mousemove(function(event){tmfollowed=tmfollowed+1;});var sRLpost;var eRLpost;rdpCount=0;sRLpost=(new Date()).getTime();function doPostRL(){eRLpost=(new Date()).getTime();reallyDoPost('snapshot');}
function reallyDoPost(t){eRLpost=(new Date()).getTime();$.post("/rjs/reallydopost.cfm",{timeSpent:eRLpost-sRLpost,tmfollowed:tmfollowed,page:window.location.href,logType:t,uuid:thisuu});}
function timeoutReally(){eRLpost=(new Date()).getTime();doPostRL();rdpCount=rdpCount+1;if(parseInt(eRLpost-sRLpost)<=902000){if(rdpCount<=24){setTimeout("timeoutReally()",5000);}else if(rdpCount<=36){setTimeout("timeoutReally()",10000);}else if(rdpCount<=44){setTimeout("timeoutReally()",15000);}else if(rdpCount<=56){setTimeout("timeoutReally()",20000);}else if(rdpCount<=66){setTimeout("timeoutReally()",30000);}else{setTimeout("timeoutReally()",60000);}}}
$(window).unload(function(){reallyDoPost('unload');});setTimeout("timeoutReally()",5000);