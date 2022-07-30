/*
 * Usage:
 *
 * Add
 *
 * 	<script
 * 		type="text/javascript"
 * 		src="http://tzdata-javascript.org/tzdata-javascript.js"
 * 	></script>
 *
 * to the <head> section of your html.
 *
 * Optional:
 *
 * 	Change some of the settings used. All settings are located under
 *
 * 		tzdata_javascript.settings...
 *
 *  e.g.
 *
 * 	<script type="text/javascript">
 * 		tzdata_javascript.settings.baseURL="http://example.com/zones/";
 * 		tzdata_javascript.settings.localStorage.read=false;
 * 		tzdata_javascript.settings.localStorage.write=false;
 * 	</script>
 *
 * Load and use one or more timezones:
 *
 * 	<script type="text/javascript">
 * 		var la=new tzdata_javascript.zoneinfo("America/Los_Angeles");
 * 		var utc=new tzdata_javascript.zoneinfo("UTC");
 * 		var cet=new tzdata_javascript.zoneinfo("Europe/Copenhagen");
 *
 * 		var now=new Date().valueOf();
 *
 * 		var localtime_la=la.localtime(now);
 * 		var localtime_cph=cph.localtime(now);
 *
 * 		var difference=
 * 			localtime_cph.ttinfo.offset-
 * 			localtime_la.ttinfo.offset;
 *
 * 		alert(
 * 			la.strftime("%+",now)+"\n"+
 * 			utc.strftime("%+",now)+"\n"+
 * 			cet.strftime("%+",now)+"\n"+
 * 			"\n"+
 * 			"Copenhagen is currently "+
 * 			(difference/(60*1000))+
 * 			" minutes ahead of Los Angeles"
 * 		);
 * 	</script>
 *
 * Or using a call-back function:
 *
 * 	<script type="text/javascript">
 * 		new tzdata_javascript.zoneinfo(
 * 			"UTC",
 * 			function(timezone,zoneinfo)
 * 			{
 * 				var now=new Date().valueOf();
 *
 * 				alert(
 * 					"In the '"+timezone+"' timezone, it's:\n"+
 * 					zoneinfo.strftime("%+",now)
 * 				);
 * 			}
 * 		);
 * 	</script>
 *
 * If you want a list of (some of) the timezones supported by the
 * server, tzdata_javascript.timezones() can be used:
 *
 * 	<script type="text/javascript">
 * 		var timezones=tzdata_javascript.timezones();
 * 	</script>
 *
 * or asynchronously:
 *
 * 	<script type="text/javascript">
 * 		tzdata_javascript.timezones(
 * 			function(timezones)
 * 			{
 * 			}
 * 		);
 * 	</script>
 *
 * In both the synchronous and the asynchronous case, "timezones" is an
 * object with the various timezones as the keys. If you prefer a
 * sorted array, use something like
 *
 * 		var timezone_array=Object.keys(timezones).sort();
 */

var tzdata_javascript=
{
	/*
	 * Still loading...
	 */
	ready:	false,

	id:	"$Id$",

	last_modified:	"2017-05-14 20:40 UTC",

	settings:
	{
		/*
		 * The default base URL for all zoneinfo data.
		 *
		 * The requested URL will be this string + the timezone, i.e.
		 * "http://zoneinfo.tzdata-javascript.org/zoneinfo/" +
		 * "Europe/Copenhagen".
		 */
		baseURL_http:	"http://zoneinfo.tzdata-javascript.org/zoneinfo/",
		baseURL_https:	"https://zoneinfo-ssl.tzdata-javascript.org/zoneinfo/",

		localStorage:
		{
			/*
			 * Should we try to get a cached version of the timezone
			 * from localStorage?
			 */
			read:	true,

			/*
			 * Should we try to cache the timezone in localStorage for
			 * later use?
			 */
			write:	true
		}
	},

	/*
	 * The minimum and maximum timestamp that can be used to construct
	 * a new Date() object is 100 million days before/after epoch.
	 *
	 * Epoch is defined at 1970-01-01T00:00:00.000 UTC
	 *
	 * You probably shouldn't change these.
	 */
	MIN_TIMESTAMP:	 - 100*1000*1000 * 24 * 60 * 60 * 1000,
	MAX_TIMESTAMP:	 + 100*1000*1000 * 24 * 60 * 60 * 1000,

	/*
	 * Cached copies of timezones already loaded.
	 */
	timezone_cache:			{},

	timezones:
		function(func)
		{
			var url=tzdata_javascript.settings.baseURL+".timezones";

			var request;

			/*
			 * Try to make a new request object, using whatever method
			 * is supported in the browser.
			 */
			if(window.XMLHttpRequest)
			{
				try
				{
					request=new XMLHttpRequest();
				}
				catch(e)
				{
					alert(e);
				}
			}
			else
			{
				if(window.ActiveXObject)
				{
					try
					{
						request=new ActiveXObject("Xsxml2.XMLHTTP");
					}
					catch(e1)
					{
						try
						{
							request=
								new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch(e2)
						{
							alert(e1+"\n"+e2);
						}
					}
				}
				else
				{
					if(window.createRequest)
					{
						try
						{
							request=window.createRequest();
						}
						catch(e)
						{
							alert(e);
						}
					}
				}
			}

			/*
			 * If we didn't succeed in making the request object, alert
			 * the caller of the problem.
			 */
			if(!request)
			{
				alert(
					"Couldn't load list of timezones from\n"+
					url+"\n"+
					"\n"+
					"Couldn't create an XMLHttpRequest\n"
				);

				if(typeof(func)==="function")
				{
					func(undefined);

					return;
				}
				else
				{
					return(undefined);
				}
			}

			request.url=url;

			/*
			 * If the caller supplied a callback function, the list
			 * of timezones should be loaded asynchronously.
			 */
			if(typeof(func)==="function")
			{
				request.onreadystatechange=function()
				{
					/*
					 * We don't care about the request until it's
					 * done.
					 */
					if(this.readyState!==this.DONE)
					{
						return;
					}

					/*
					 * If we couldn't load the list of timezones,
					 * complain about it.
					 */
					if(this.status!==200)
					{
						if(this.status!==0)
						{
							alert(
								"Couldn't load list of timezones from"+
								"\n"+
								this.url+"\n"+
								"\n"+
								"The response from the server was:\n"+
								this.status+" "+this.statusText+
								"\n"+
								this.responseText
							);
						}

						func(undefined);

						return;
					}

					/*
					 * If we didn't get a proper response from the
					 * server, complain about it.
					 */
					if(!this.responseText)
					{
						alert(
							"Couldn't load list of timezones from\n"+
							this.url+"\n"+
							url+"\n"+
							"\n"+
							"The server returned an empty response"
						);

						func(undefined);

						return;
					}

					var list_of_timezones;

					/*
					 * Parse the list of timezones.
					 */
					try
					{
						list_of_timezones=
							JSON.parse(request.responseText);
					}
					catch(e)
					{
						alert(e);

						func(undefined);

						return;
					}

					/*
					 * Call the callback function supplied by the
					 * caller.
					 */
					func(list_of_timezones);
				};

				/*
				 * Fetch the list of timezones asynchronously.
				 */
				request.open("GET",url,true);

				/*
				 * The request is asynchronously, so this call returns
				 * right away.
				 */
				request.send(null);

				return;
			}

			/*
			 * Fetch the list of timezones synchronously.
			 */
			request.open("GET",url,false);

			/*
			 * This call won't return until the response is ready.
			 */
			request.send(null);

			var list_of_timezones;

			/*
			 * Parse the list of timezones.
			 */
			try
			{
				list_of_timezones=JSON.parse(request.responseText);
			}
			catch(e)
			{
				alert(e);

				return;
			}

			/*
			 * Return the list of timezones.
			 */
			return(list_of_timezones);
		},

	zoneinfo:
		function(timezone,func)
		{
			/*
			 * Special timezone that uses the build-in local timezone
			 * functions of the Data() object.
			 */
			if(timezone==="localtime")
			{
				this.__not_implemented=
					function(func_name,args)
					{
						console.log(
							func_name+
							": Not implemented for 'localtime'."
						);
						console.log("Arguments:");
						console.log(args);
					};

				this._parse_server_response=
					function()
					{
						var args=new Array(arguments.length);

						var i;

						for(i=0;i<args.length;i+=1)
						{
							args[i]=arguments[i];
						}

						this.__not_implemented(
							"_parse_server_response",
							args
						);
					};

				this._find_transition_index=
					function()
					{
						var args=new Array(arguments.length);

						var i;

						for(i=0;i<args.length;i+=1)
						{
							args[i]=arguments[i];
						}

						this.__not_implemented(
							"_find_transition_index",
							args
						);
					};

				this._find_ttinfo=
					function()
					{
						var args=new Array(arguments.length);

						var i;

						for(i=0;i<args.length;i+=1)
						{
							args[i]=arguments[i];
						}

						this.__not_implemented(
							"_find_ttinfo",
							args
						);
					};

				this.localtime=
					function(timestamp)
					{
						if(timestamp===null)
						{
							return(undefined);
						}

						if(typeof(timestamp)==="object")
						{
							timestamp=timestamp.valueOf();
						}

						if(typeof(timestamp)==="string")
						{
							timestamp=parseInt(timestamp);
						}

						if(typeof(timestamp)!=="number")
						{
							console.log(timestamp+" is not a number");

							return(undefined);
						}

						var date=new Date(timestamp);

						var offset=date.getTimezoneOffset();
						offset*=-1*60*1000;

						return(
							{
								year:			date.getFullYear(),
								month:			date.getMonth(),
								day:			date.getDate(),
								hour:			date.getHours(),
								minute:			date.getMinutes(),
								second:			date.getSeconds(),
								millisecond:	date.getMilliseconds(),
								weekday:		date.getDay(),
								ttinfo:
									{
										from:		undefined,
										until:		undefined,
										offset:		offset,
										isdst:		undefined,
										tz_abbr:	"localtime"
									}
							}
						);
					};

/*
				this._pad_to_length=
					tzdata_javascript.zoneinfo.prototype._pad_to_length;
*/

/*
				this.weekdays=
					tzdata_javascript.zoneinfo.prototype.weekdays;
*/

/*
				this.months=
					tzdata_javascript.zoneinfo.prototype.months;
*/

/*
				this.strftime=
					tzdata_javascript.zoneinfo.prototype.strftime;
*/

/*
				this.strptime=
					tzdata_javascript.zoneinfo.prototype.strptime;
*/

				this.timestamp=
					function(localtime)
					{
						var date=new Date(0);

						date.setFullYear(localtime.year);
						date.setMonth(localtime.month);
						date.setDate(localtime.day);
						date.setHours(localtime.hour);
						date.setMinutes(localtime.minute);
						date.setSeconds(localtime.second);
						date.setMilliseconds(localtime.millisecond);

						var timestamp=date.valueOf();

						return(timestamp);
					};

				if(typeof(func)==="function")
				{
					func(timezone,this);

					return;
				}
				else
				{
					return(this);
				}
			}

			/*
			 * If we have loaded this timezone already, return it from
			 * the cache to avoid unnecessary network load.
			 */
			if(tzdata_javascript.timezone_cache[timezone]!==undefined)
			{
				if(typeof(func)==="function")
				{
					func(
						timezone,
						tzdata_javascript.timezone_cache[timezone]
					);

					return;
				}
				else
				{
					return(tzdata_javascript.timezone_cache[timezone]);
				}
			}

			/*
			 * Try to get a cached version of the timezone from
			 * localStorage.
			 *
			 * TODO: Should use last modified timestamp to see if the
			 * local version is up to date.
			 */
			if(
				(tzdata_javascript.settings.localStorage.read)
			&&
				(window.hasOwnProperty("localStorage"))
			)
			{
				var json;

				try
				{
					/*
					 * _Everything_ related to localStorage is insecure
					 * according to Firefox... :-/
					 */
					json=localStorage.getItem("zoneinfo/"+timezone);
				}
				catch(e)
				{
					console.log(e);

					/*
					 * As I said, _everything_ related to localStorage
					 * is insecure according to Firefox... :-/
					 *
					 * We don't need localStorage, so we'll just ignore
					 * the error and download the timezone again.
					 */
				}

				if(json)
				{
					/*
					 * Parse the cached zoneinfo data.
					 */
					var new_zoneinfo=
						this._parse_server_response(json);

					/*
					 * Copy the various properties of the new zoneinfo
					 * data to the zoneinfo object we're building.
					 *
					 * We can't just assign new_zoneinfo to
					 * this.zoneinfo as that object has other
					 * properties (e.g. "ready"), we want to keep.
					 */

					/* "this" isn't the right "this"... */
					/*
					Object.keys(new_zoneinfo).forEach(
						function(property)
						{
							this[property]=new_zoneinfo[property];
						}
					);
					*/

					var property;

					for(property in new_zoneinfo)
					{
						this[property]=new_zoneinfo[property];
					}

					/*
					 * The zoneinfo object is now ready for use.
					 */
					this.ready=true;

					/*
					 * Copy the zoneinfo object to the cache, so we can
					 * reuse it later, if/when we're asked for the same
					 * timezone multiple times.
					 */
					tzdata_javascript.timezone_cache[timezone]=this;

					if(typeof(func)==="function")
					{
						func(
							timezone,
							tzdata_javascript.timezone_cache[timezone]
						);

						return;
					}
					else
					{
						return(
							tzdata_javascript.timezone_cache[timezone]
						);
					}
				}
			}

			/*
			 * Since we haven't loaded the timezone data yet, it
			 * obviously ain't ready for use yet.
			 */
			this.ready=false;

			this.timezone=timezone;

			this.url=tzdata_javascript.settings.baseURL+timezone;

			var request;

			/*
			 * Try to make a new request object, using whatever method
			 * is supported in the browser.
			 */
			if(window.XMLHttpRequest)
			{
				try
				{
					request=new XMLHttpRequest();
				}
				catch(e)
				{
					alert(e);
				}
			}
			else
			{
				if(window.ActiveXObject)
				{
					try
					{
						request=new ActiveXObject("Xsxml2.XMLHTTP");
					}
					catch(e1)
					{
						try
						{
							request=
								new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch(e2)
						{
							alert(e1+"\n"+e2);
						}
					}
				}
				else
				{
					if(window.createRequest)
					{
						try
						{
							request=window.createRequest();
						}
						catch(e)
						{
							alert(e);
						}
					}
				}
			}

			/*
			 * If we didn't succeed in making the request object,
			 * alert the caller of the problem.
			 */
			if(!request)
			{
				alert(
					"Couldn't load timezone data for\n"+
					timezone+"\n"+
					"from\n"+
					this.url+"\n"+
					"\n"+
					"Couldn't create an XMLHttpRequest\n"
				);

				if(typeof(func)==="function")
				{
					func(timezone,undefined);

					return;
				}
				else
				{
					return(undefined);
				}
			}

			request.zoneinfo=this;

			/*
			 * If the caller supplied a callback function, the zoneinfo
			 * data should be loaded asynchronously.
			 */
			if(typeof(func)==="function")
			{
				request.onreadystatechange=function()
				{
					/*
					 * We don't care about the request until it's done.
					 */
					if(this.readyState!==this.DONE)
					{
						return;
					}

					/*
					 * If we couldn't load the zoneinfo data, complain
					 * about it.
					 */
					if(this.status!==200)
					{
						if(this.status!==0)
						{
							alert(
								"Couldn't load timezone data for\n"+
								timezone+"\n"+
								"from\n"+
								this.zoneinfo.url+"\n"+
								"\n"+
								"The response from the server was:\n"+
								this.status+" "+this.statusText+"\n"+
								this.responseText
							);
						}

						func(timezone,undefined);

						return;
					}

					/*
					 * If we didn't get a proper response from the
					 * server, complain about it.
					 */
					if(!this.responseText)
					{
						alert(
							"Couldn't load timezone data for\n"+
							timezone+"\n"+
							"from\n"+
							this.zoneinfo.url+"\n"+
							url+"\n"+
							"\n"+
							"The server returned an empty response"
						);

						func(timezone,undefined);

						return;
					}

					/*
					 * Try to cache the timezone in local storage for
					 * later use.
					 *
					 * TODO: Should use last modified timestamp to see
					 * if the local version is up to date.
					 */
					if(
						(tzdata_javascript.settings.localStorage.write)
					&&
						(window.hasOwnProperty("localStorage"))
					)
					{
						try
						{
							localStorage.setItem(
								"zoneinfo/"+timezone,
								this.responseText
							);
						}
						catch(e)
						{
							console.log(
								"Error while writing to localStorage:"
							);
							console.log(e);

							/*
							 * The most likely error is "cache full".
							 *
							 * We could try to do some clean up in the
							 * cache, but then we should probably also
							 * remember when each timezone was last
							 * fetched from the cache and remove the
							 * one we haven't used for the longest
							 * time.
							 *
							 * But since the script can do its job
							 * without any cache at all, we can simply
							 * ignore the error. It just means the
							 * script will have to get the timezone
							 * from the server again next time.
							 */
						}
					}

					/*
					 * Parse the new zoneinfo data.
					 */
					var new_zoneinfo=
						this.zoneinfo._parse_server_response(
							this.responseText
						);

					/*
					 * Copy the various properties of the new zoneinfo
					 * data to the zoneinfo object we're building.
					 *
					 * We can't just assign new_zoneinfo to
					 * this.zoneinfo as that object has other
					 * properties (e.g. "ready"), we want to keep.
					 */

					/* "this" isn't the right "this"... */
					/*
					Object.keys(new_zoneinfo).forEach(
						function(property)
						{
							this[property]=new_zoneinfo[property];
						}
					);
					*/

					var property;

					for(property in new_zoneinfo)
					{
						this.zoneinfo[property]=new_zoneinfo[property];
					}

					/*
					 * The zoneinfo object is now ready for use.
					 */
					this.zoneinfo.ready=true;

					/*
					 * Copy the zoneinfo object to the cache, so we can
					 * reuse it later, if/when we're asked for the same
					 * timezone multiple times.
					 */
					tzdata_javascript.timezone_cache[timezone]=
						this.zoneinfo;

					/*
					 * Call the callback function supplied by the
					 * caller.
					 */
					func(timezone,this.zoneinfo);
				};

				/*
				 * Fetch the zoneinfo data asynchronously.
				 */
				request.open("GET",this.url,true);

				/*
				 * The request is asynchronously, so this call returns
				 * right away.
				 */
				request.send(null);

				return(this);
			}

			/*
			 * Fetch the zoneinfo data synchronously.
			 */
			request.open("GET",this.url,false);

			/*
			 * This call won't return until the response is ready.
			 */
			try
			{
				request.send(null);
			}
			catch(e)
			{
				alert(e.message);

				console.log("Tip: Sometimes you get a better error message, if you load the timezone asynchronously instead of synchronously. Try something like:");

				console.log("new tzdata_javascript.zoneinfo(\""+request.zoneinfo.timezone+"\",function(){});");

				throw(e);
			}

			/*
			 * If we couldn't load the zoneinfo data, complain about
			 * it.
			 */
			if(request.status!==200)
			{
				throw(request.responseText);
			}

			/*
			 * Try to cache the timezone in localStorage for later use.
			 *
			 * TODO: Should use last modified timestamp to see if the
			 * local version is up to date.
			 */
			if(
				(tzdata_javascript.settings.localStorage.write)
			&&
				(window.hasOwnProperty("localStorage"))
			)
			{
				try
				{
					localStorage.setItem(
						"zoneinfo/"+timezone,
						request.responseText
					);
				}
				catch(e)
				{
					console.log(
						"Error while writing to localStorage:"
					);
					console.log(e);

					/*
					 * The most likely error is "cache full".
					 *
					 * We could try to do some clean up in the cache,
					 * but then we should probably also remember when
					 * each timezone was last fetched from the cache
					 * and remove the one we haven't used for the
					 * longest time.
					 *
					 * But since the script can do its job without any
					 * cache at all, we can simply ignore the error. It
					 * just means the script will have to get the
					 * timezone from the server again next time.
					 */
				}
			}

			/*
			 * Parse the new zoneinfo data.
			 */
			var new_zoneinfo=
				this._parse_server_response(request.responseText);

			/*
			 * Copy the various properties of the new zoneinfo data to
			 * the zoneinfo object we're building.
			 *
			 * We can't just assign new_zoneinfo to "this" as that
			 * object has other properties (e.g. "ready"), we want to
			 * keep.
			 */

			/* "this" isn't the right "this"...
			/*
			Object.keys(new_zoneinfo).forEach(
				function(property)
				{
					this[property]=new_zoneinfo[property];
				}
			);
			*/

			var property;

			for(property in new_zoneinfo)
			{
				this[property]=new_zoneinfo[property];
			}

			/*
			 * The zoneinfo object is now ready for use.
			 */
			this.ready=true;

			/*
			 * Copy the zoneinfo object to the cache, so we can reuse
			 * it later, if/when we're asked for the same timezone
			 * multiple times.
			 */
			tzdata_javascript.timezone_cache[timezone]=this;

			/*
			 * Return the new zoneinfo object.
			 */
			return(this);
		}
};

tzdata_javascript.zoneinfo.prototype._parse_server_response=
	function(response)
	{
		var new_zoneinfo;

		try
		{
			new_zoneinfo=JSON.parse(response);
		}
		catch(e)
		{
			alert(e);

			return;
		}

		if(new_zoneinfo.transition===undefined)
		{
			return;
		}

		new_zoneinfo.transition.forEach(
			function(transition)
			{
				if(transition.transition_time==="MIN_TIMESTAMP")
				{
					transition.transition_time=
						tzdata_javascript.MIN_TIMESTAMP;
				}

				if(transition.transition_time==="MAX_TIMESTAMP")
				{
					transition.transition_time=
						tzdata_javascript.MAX_TIMESTAMP;
				}

				if(typeof(transition.transition_time)==="string")
				{
					transition.transition_time=
						parseInt(transition.transition_time);
				}

				if(typeof(transition.transition_time)!=="number")
				{
					console.log(transition.transition_time+" is not a number");

					return;
				}
			}
		);

		return(new_zoneinfo);
	};

tzdata_javascript.zoneinfo.prototype._find_transition_index=
	function(timestamp)
	{
		if(
			(this.transition===undefined)
		||
			(this.transition.length===0)
		)
		{
			return;
		}

		if(timestamp<this.transition[0].transition_time)
		{
			return(-1);
		}

		var first_index=0;
		var last_index=this.transition.length-1;

		if(timestamp>=this.transition[last_index].transition_time)
		{
			return(last_index);
		}

		var test_index;

		while(first_index+1<last_index)
		{
			test_index=parseInt((first_index+last_index)/2);

			if(timestamp>=this.transition[test_index].transition_time)
			{
				first_index=test_index;
			}
			else
			{
				last_index=test_index;
			}
		}

		return(first_index);
	};

tzdata_javascript.zoneinfo.prototype._find_ttinfo=
	function(timestamp)
	{
		var transition_index=
			this._find_transition_index(timestamp);

		if(transition_index===undefined)
		{
			var from=tzdata_javascript.MIN_TIMESTAMP;
			var until=tzdata_javascript.MAX_TIMESTAMP;

			var local_time_type=0;

			var test_local_time_type;
			for(
				test_local_time_type=0;
				test_local_time_type<this.ttinfo.length;
				test_local_time_type+=1
			)
			{
				if(this.ttinfo[test_local_time_type].tt_isdst===0)
				{
					local_time_type=test_local_time_type;
					break;
				}
			}

			var offset=this.ttinfo[local_time_type].tt_gmtoff;
			var isdst=this.ttinfo[local_time_type].tt_isdst;
			var abbrind=this.ttinfo[local_time_type].tt_abbrind;

			var tz_abbr=this.timezone_abbreviation[abbrind];

			return(
				{
					from:		from,
					until:		until,
					offset:		offset,
					isdst:		isdst,
					tz_abbr:	tz_abbr
				}
			);
		}

		if(transition_index===-1)
		{
			var from=tzdata_javascript.MIN_TIMESTAMP;
			var until=this.transition[0].transition_time;

			var local_time_type=0;

			var test_local_time_type;
			for(
				test_local_time_type=0;
				test_local_time_type<this.ttinfo.length;
				test_local_time_type+=1
			)
			{
				if(this.ttinfo[test_local_time_type].tt_isdst===0)
				{
					local_time_type=test_local_time_type;
					break;
				}
			}

			var offset=this.ttinfo[local_time_type].tt_gmtoff;
			var isdst=this.ttinfo[local_time_type].tt_isdst;
			var abbrind=this.ttinfo[local_time_type].tt_abbrind;

			var tz_abbr=this.timezone_abbreviation[abbrind];

			return(
				{
					from:		from,
					until:		until,
					offset:		offset,
					isdst:		isdst,
					tz_abbr:	tz_abbr
				}
			);
		}

		var transition=this.transition[transition_index];

		var from=transition.transition_time;

		var until;

		if(transition_index===this.transition.length-1)
		{
			until=tzdata_javascript.MAX_TIMESTAMP;
		}
		else
		{
			until=
				this.
					transition[transition_index+1].
						transition_time;
		}

		var local_time_type=transition.local_time_type;

		var offset=this.ttinfo[local_time_type].tt_gmtoff;
		var isdst=this.ttinfo[local_time_type].tt_isdst;
		var abbrind=this.ttinfo[local_time_type].tt_abbrind;

		var tz_abbr=this.timezone_abbreviation[abbrind];

		return(
			{
				from:		from,
				until:		until,
				offset:		offset,
				isdst:		isdst,
				tz_abbr:	tz_abbr
			}
		);
	};

tzdata_javascript.zoneinfo.prototype.localtime=
	function(timestamp)
	{
		if(timestamp===null)
		{
			return(undefined);
		}

		if(typeof(timestamp)==="object")
		{
			timestamp=timestamp.valueOf();
		}

		if(typeof(timestamp)==="string")
		{
			timestamp=parseInt(timestamp);
		}

		if(typeof(timestamp)!=="number")
		{
			console.log(timestamp+" is not a number");

			return(undefined);
		}

		if(
			(this._last_ttinfo===undefined)
		||
			(timestamp<this._last_ttinfo.from)
		||
			(timestamp>=this._last_ttinfo.until)
		)
		{
			this._last_ttinfo=this._find_ttinfo(timestamp);
		}

		var local_timestamp=timestamp+this._last_ttinfo.offset;

/*
 * TODO: Leap seconds...
 *
 * local_timestamp-=total_leap_seconds(timestamp);
 *
 * convert to year/month/day/...
 *
 * if(is_leap_second(Math.floor(timestamp/1000)*1000))
 * 		second=60;
 */

		/*
		 * Pretend local_timestamp IS UTC and use the build-in
		 * functions to convert the timestamp to year, month, day and
		 * so on.
		 *
		 * No need to re-invent the wheel...
		 */
		var date=new Date(local_timestamp);

		return(
			{
				year:			date.getUTCFullYear(),
				month:			date.getUTCMonth(),
				day:			date.getUTCDate(),
				hour:			date.getUTCHours(),
				minute:			date.getUTCMinutes(),
				second:			date.getUTCSeconds(),
				millisecond:	date.getUTCMilliseconds(),
				weekday:		date.getUTCDay(),
				ttinfo:			this._last_ttinfo
			}
		);
	};

tzdata_javascript.zoneinfo.prototype._pad_to_length=
	function(str,padding,length)
	{
		if(typeof(str)!=="string")
		{
			str=str.toString();
		}

		while(str.length<length)
		{
			str=padding+str;
		}

		return(str);
	};

tzdata_javascript.zoneinfo.prototype.weekdays=
	[
		"Sun","Mon","Tue","Wed","Thu","Fri","Sat"
	];

tzdata_javascript.zoneinfo.prototype.months=
	[
		"Jan","Feb","Mar","Apr","May","Jun",
		"Jul","Aug","Sep","Oct","Nov","Dec"
	];

tzdata_javascript.zoneinfo.prototype.strftime=
	function(format,timestamp)
	{
		var localtime=this.localtime(timestamp);

		if(localtime===undefined)
		{
			return(undefined);
		}

		var str="";

		var format_array=format.split("");

		var chr;

		var i;

		for(i=0;i<format_array.length;i+=1)
		{
			chr=format_array[i];

			if(chr!=="%")
			{
				str+=chr;
				continue;
			}

			i+=1;

			if(i===format_array.length)
			{
				str+=chr;
				break;
			}

			chr=format_array[i];

			switch(chr)
			{
				case ".":
					str+=this._pad_to_length(localtime.millisecond,"0",3);
				break;

				case "a":
					str+=this.weekdays[localtime.weekday];
				break;

				case "b":
					str+=this.months[localtime.month];
				break;

				case "C":
					str+=parseInt(localtime.year/100);
				break;

				case "d":
					str+=this._pad_to_length(localtime.day,"0",2);
				break;

				case "e":
					str+=this._pad_to_length(localtime.day," ",2);
				break;

				case "F":
					str+=this._pad_to_length(localtime.year,"0",4);
					str+="-";
					str+=this._pad_to_length(localtime.month+1,"0",2);
					str+="-";
					str+=this._pad_to_length(localtime.day,"0",2);
				break;

				case "H":
					str+=this._pad_to_length(localtime.hour,"0",2);
				break;

				case "I":
					str+=
						this._pad_to_length(
							(((localtime.hour+12)-1)%12)+1,
							"0",
							2
						);
				break;

				case "k":
					str+=this._pad_to_length(localtime.hour," ",2);
				break;

				case "l":
					str+=
						this._pad_to_length(
							(((localtime.hour+12)-1)%12)+1,
							" ",
							2
						);
				break;

				case "m":
					str+=this._pad_to_length(localtime.month+1,"0",2);
				break;

				case "M":
					str+=this._pad_to_length(localtime.minute,"0",2);
				break;

				case "n":
					str+="\n";
				break;

				case "p":
					if(localtime.hour<12)
					{
						str+="AM";
					}
					else
					{
						str+="PM";
					}
				break;

				case "P":
					if(localtime.hour<12)
					{
						str+="am";
					}
					else
					{
						str+="pm";
					}
				break;

				case "r":
					str+=
						this._pad_to_length(
							(((localtime.hour+12)-1)%12)+1,
							"0",
							2
						);
					str+=":";
					str+=this._pad_to_length(localtime.minute,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.second,"0",2);
					str+=" ";
					if(localtime.hour<12)
					{
						str+="AM";
					}
					else
					{
						str+="PM";
					}
				break;

				case "R":
					str+=this._pad_to_length(localtime.hour,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.minute,"0",2);
				break;

				case "s":
					str+=timestamp;
				break;

				case "S":
					str+=this._pad_to_length(localtime.second,"0",2);
				break;

				case "t":
					str+="\t";
				break;

				case "T":
					str+=this._pad_to_length(localtime.hour,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.minute,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.second,"0",2);
				break;

				case "u":
					str+=(((localtime.weekday+7)-1)%7)+1;
				break;

				case "w":
					str+=localtime.weekday;
				break;

				case "y":
					str+=this._pad_to_length(localtime.year%100,"0",2);
				break;

				case "Y":
					str+=this._pad_to_length(localtime.year,"0",4);
				break;

				case "Z":
					str+=localtime.ttinfo.tz_abbr;
				break;

				case "+":
					str+=this.weekdays[localtime.weekday];
					str+=" ";
					str+=this.months[localtime.month];
					str+=" ";
					str+=this._pad_to_length(localtime.day," ",2);
					str+=" ";
					str+=this._pad_to_length(localtime.hour,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.minute,"0",2);
					str+=":";
					str+=this._pad_to_length(localtime.second,"0",2);
					str+=" ";
					str+=localtime.ttinfo.tz_abbr;
					str+=" ";
					str+=this._pad_to_length(localtime.year,"0",4);
				break;

				case "%":
					str+="%";
				break;

				default:
					/*
					alert(
						"Unknown conversion code, "+
						"'%"+chr+"', "+
						"in strftime format string"
					);
					*/

					console.log(
						"Unknown conversion code, "+
						"'%"+chr+"', "+
						"in strftime format string"
					);

					str+="%";
					str+=chr;
				break;
			}
		}

		return(str);
	};

tzdata_javascript.zoneinfo.prototype.strptime=
	function(format,localtime_string)
	{
		var timestamps=[];

		var re_str="";
		var matches=[];

		re_str+="^";

		var chr;

		while(format!=="")
		{
			chr=format.substr(0,1);

			format=format.substr(1);

			if(chr!=="%")
			{
				if(
					(chr==="$")
				||
					(chr==="(")
				||
					(chr===")")
				||
					(chr==="-")
				||
					(chr===".")
				||
					(chr==="[")
				||
					(chr==="\\")
				||
					(chr==="]")
				||
					(chr==="^")
				||
					(chr==="{")
				||
					(chr==="|")
				||
					(chr==="}")
				)
				{
					re_str+="\\";
				}

				re_str+=chr;

				continue;
			}

			if(format==="")
			{
				break;
			}

			chr=format.substr(0,1);
			format=format.substr(1);

			switch(chr)
			{
				case ".":
					re_str+="(\\d{3})";
					matches.push("millisecond");
				break;

				case "a":
					re_str+="("+this.weekdays.join("|")+")";
					matches.push("weekday_name");
				break;

				case "b":
					re_str+="("+this.months.join("|")+")";
					matches.push("month_name");
				break;

				case "C":
					re_str+="( \\d|\\d{2})";
					matches.push("century");
				break;

				case "d":
					re_str+="(\\d{2})";
					matches.push("day");
				break;

				case "e":
					re_str+="( \\d|\\d{2})";
					matches.push("day");
				break;

				case "F":
					re_str+="(\\d{4})";
					matches.push("year");
					re_str+="-";
					re_str+="(\\d{2})";
					matches.push("month");
					re_str+="-";
					re_str+="(\\d{2})";
					matches.push("day");
				break;

				case "H":
					re_str+="( \\d|\\d{2})";
					matches.push("hour");
				break;

				case "I":
					re_str+="( \\d|\\d{2})";
					matches.push("ampm_hour");
				break;

				case "k":
					re_str+="( \\d|\\d{2})";
					matches.push("hour");
				break;

				case "l":
					re_str+="( \\d|\\d{2})";
					matches.push("ampm_hour");
				break;

				case "m":
					re_str+="( \\d|\\d{2})";
					matches.push("month");
				break;

				case "M":
					re_str+="( \\d|\\d{2})";
					matches.push("minute");
				break;

				case "n":
					re_str+="\s*";
				break;

				case "p":
					re_str+="(AM|am|PM|pm|)";
					matches.push("ampm");
				break;

				case "P":
					re_str+="(AM|am|PM|pm|)";
					matches.push("ampm");
				break;

				case "r":
					re_str+="( \\d|\\d{2})";
					matches.push("ampm_hour");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("minute");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("second");
					re_str+="( (AM|am|PM|pm)|)";
					matches.push("ignore_r");
					matches.push("ampm");
				break;

				case "R":
					re_str+="( \\d|\\d{2})";
					matches.push("hour");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("minute");
				break;

				case "s":
					re_str+="(\\d+)";
					matches.push("timestamp");
				break;

				case "S":
					re_str+="( \\d|\\d{2})";
					matches.push("second");
				break;

				case "t":
					re_str+="\s*";
				break;

				case "T":
					re_str+="( \\d|\\d{2})";
					matches.push("hour");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("minute");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("second");
				break;

				case "u":
					re_str+="(\\d)";
					matches.push("weekday");
				break;

				case "w":
					re_str+="(\\d)";
					matches.push("weekday");
				break;

				case "y":
					re_str+="(\\d{2})";
					matches.push("year_without_century");
				break;

				case "Y":
					re_str+="(\\d{4})";
					matches.push("year");
				break;

				case "Z":
					/**/
					var tz_abbrs=
						this.timezone_abbreviation.filter(
							function(tz_abbr)
							{
								return(tz_abbr);
							}
						);
					/**/
					/*
					var tz_abbrs=[];
					this.timezone_abbreviation.forEach(
						function(tz_abbr)
						{
							if(tz_abbr)
							{
								tz_abbrs.push(tz_abbr);
							}
						}
					);
					*/
					re_str+="("+tz_abbrs.join("|")+")";
					matches.push("tz_abbr");
				break;

				case "+":
					re_str+="("+this.weekdays.join("|")+")";
					matches.push("weekday_name");
					re_str+=" ";
					re_str+="("+this.months.join("|")+")";
					matches.push("month_name");
					re_str+=" ";
					re_str+="( \\d|\\d{2})";
					matches.push("day");
					re_str+=" ";
					re_str+="( \\d|\\d{2})";
					matches.push("hour");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("minute");
					re_str+=":";
					re_str+="(\\d{2})";
					matches.push("second");
					re_str+=" ";
					/**/
					var tz_abbrs=
						this.timezone_abbreviation.filter(
							function(tz_abbr)
							{
								return(tz_abbr);
							}
						);
					/**/
					/*
					var tz_abbrs=[];
					this.timezone_abbreviation.forEach(
						function(tz_abbr)
						{
							if(tz_abbr)
							{
								tz_abbrs.push(tz_abbr);
							}
						}
					);
					*/
					re_str+="("+tz_abbrs.join("|")+")";
					matches.push("tz_abbr");
					re_str+=" ";
					re_str+="(\\d{4})";
					matches.push("year");
				break;

				case "%":
					re_str+="%";
				break;

				default:
					/*
					alert(
						"Unknown conversion code, "+
						"'%"+chr+"', "+
						"in strptime format string"
					);
					*/

					console.log(
						"Unknown conversion code, "+
						"'%"+chr+"', "+
						"in strptime format string"
					);

					re_str+="%";
					re_str+=chr;
				break;
			}
		}

		re_str+="$";

		var re=new RegExp(re_str);

		var results=re.exec(localtime_string);

		if(!results)
		{
			return(timestamps);
		}

		results.shift();

		if(matches.length!==results.length)
		{
			return(timestamps);
		}

		var localtime={};

		var count;

		for(count=0;count<matches.length;count+=1)
		{
			localtime[matches[count]]=results[count];
		}

		if(localtime.timestamp!==undefined)
		{
			timestamps.push(localtime.timestamp);
		}

		if(localtime.year===undefined)
		{
			if(localtime.year_without_century===undefined)
			{
				return(timestamps);
			}

			if(localtime.century!==undefined)
			{
				localtime.year=
					(localtime.century*100)+
					localtime.year_without_century;
			}
			else
			{
				if(localtime.year_without_century<=68)
				{
					localtime.year=2000+localtime.year_without_century;
				}
				else
				{
					localtime.year=1900+localtime.year_without_century;
				}
			}
		}

		localtime.year*=1;

		if(localtime.month===undefined)
		{
			if(localtime.month_name===undefined)
			{
				return(timestamps);
			}

			localtime.month=this.months.indexOf(localtime.month_name);
		}
		else
		{
			localtime.month--;
		}

		if(localtime.day===undefined)
		{
			return(timestamps);
		}

		localtime.day*=1;

		if(localtime.weekday===undefined)
		{
			if(localtime.weekday_name!==undefined)
			{
				localtime.weekday=this.weekdays.indexOf(localtime.weekday_name);
			}
		}
		else
		{
			localtime.weekday%=7;
		}

		if(localtime.hour===undefined)
		{
			if(localtime.ampm_hour===undefined)
			{
				return(timestamps);
			}

			if(localtime.ampm===undefined)
			{
				return(timestamps);
			}

			localtime.hour=localtime.ampm_hour%12;

			if(
				(localtime.ampm=="PM")
			||
				(localtime.ampm=="pm")
			)
			{
				localtime.hour+=12;
			}
		}
		else
		{
			localtime.hour*=1;
		}

		if(localtime.minute===undefined)
		{
			return(timestamps);
		}

		localtime.minute*=1;

		if(localtime.second===undefined)
		{
			localtime.second=0;
		}
		else
		{
			localtime.second*=1;
		}

		if(localtime.millisecond===undefined)
		{
			localtime.millisecond=0;
		}
		else
		{
			localtime.millisecond=
				parseFloat("0."+localtime.millisecond)*1000;
		}

		if(localtime.tz_abbr!==undefined)
		{
			localtime.ttinfo=
				{
					tz_abbr:	localtime.tz_abbr
				};
		}

		timestamps=timestamps.concat(this.timestamp(localtime));

		return(timestamps);
	};

tzdata_javascript.zoneinfo.prototype.timestamp=
	function(localtime)
	{
		var date=new Date(0);

		/*
		 * Pretend localtime IS UTC and use the build-in functions to
		 * convert the year, month, day and so on to a timestamp.
		 *
		 * No need to re-invent the wheel...
		 */

		date.setUTCFullYear(localtime.year);
		date.setUTCMonth(localtime.month);
		date.setUTCDate(localtime.day);
		date.setUTCHours(localtime.hour);
		date.setUTCMinutes(localtime.minute);
		date.setUTCSeconds(localtime.second);
		date.setUTCMilliseconds(localtime.millisecond);

		var local_timestamp=date.valueOf();

		var matching_timestamps={};

		var zi=this;

		this.ttinfo.forEach(
			function(ttinfo)
			{
				var test_timestamp=local_timestamp-ttinfo.tt_gmtoff;

				var test_localtime=zi.localtime(test_timestamp);

				if(
					(localtime.year===test_localtime.year)
				&&
					(localtime.month===test_localtime.month)
				&&
					(localtime.day===test_localtime.day)
				&&
					(localtime.hour===test_localtime.hour)
				&&
					(localtime.minute===test_localtime.minute)
				&&
					(localtime.second===test_localtime.second)
				&&
					(localtime.millisecond===test_localtime.millisecond)
				&&
					(
						(localtime.ttinfo===undefined)
					||
						(localtime.ttinfo.tz_abbr===undefined)
					||
						(
							localtime.ttinfo.tz_abbr===
							test_localtime.ttinfo.tz_abbr
						)
					)
				)
				{
					matching_timestamps[test_timestamp]=1;
				}
			}
		);

		var timestamps=[];

		Object.keys(matching_timestamps).forEach(
			function(timestamp)
			{
				timestamps.push(parseInt(timestamp));
			}
		);

		return(timestamps.sort());
	};

if(location.protocol==="https:")
	tzdata_javascript.settings.baseURL=tzdata_javascript.settings.baseURL_https;
else
	tzdata_javascript.settings.baseURL=tzdata_javascript.settings.baseURL_http;

tzdata_javascript.ready=true;
