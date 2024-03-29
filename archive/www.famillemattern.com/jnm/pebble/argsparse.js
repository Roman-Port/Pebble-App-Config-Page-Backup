function getJsonFromUrl(hashBased) {
  var query;
  if(hashBased) {
    var pos = location.href.indexOf("?");
    if(pos==-1) return [];
    query = location.href.substr(pos+1);
  } else {
    query = location.search.substr(1);
  }
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    var item = part.split("=");
    var key = item[0];
    var from = key.indexOf("[");
    if(from==-1) {
      result[key] = decodeURIComponent(item[1]);
    } else {
      var to = key.indexOf("]");
      var index = key.substring(from+1,to);
      key = key.substring(0,from);
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(item[1]);
      else result[key][index] = item[1];
    }
  });
  return result;
}

args = getJsonFromUrl(false);

console.log(JSON.stringify(args));
