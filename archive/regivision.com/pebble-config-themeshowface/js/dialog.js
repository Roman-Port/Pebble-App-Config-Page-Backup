// JavaScript Document\

function Dialog(options)
{
	/*
		The purpose of the Dialog class is to support the functionality portion of a dialog on a page.
		A dialog is enclosed by a <div id="identifier"></div>
		private:
			selected_objects:[]
			defaultOptions
				id: dialog id
				classnames:
				    focus:classname to add/remove when something has focus
					disable:classname to add/remove when somthing is disabled

		public:
			hide(options)				// interval:milliseconds, callback:pfn(event)
			show(options) 				// interval:milliseconds, modal:true|false, callback:pfn(event)
			select(options)				// selectors:[] -- call this to create a working vector of objects, used by *
			setTickInterval(options) 	// interval:milliseconds, callback:pfn(tickcount)
			setOnChange(options) 		// * callback:pfn(object,classname,oldval,newval)
			setOnFocus(options)			// * callback:pfn(object,classname)
			setOpacity(options) 		// * opacity:0 to 1, interval:milliseconds
			setFocused()		 		// *
			setBlurred()				// *
			setEnabled()				// *
			setDisabled()				// *
			setValue(val)				// *
			getValue()					// *
	*/
	var defaultOptions={id:null,cn_Focus:"",cn_Disable:"",EmptyField:"    "};
	var selected_objects = [];
	var e;
	var exposed_methods = {};
	var events_when = {};
	var selection_set_alias={};

	for(e in options)
	{
	if(options[e]!=null)
		defaultOptions[e]=options[e];
	}

	// internal functions

	function add_set_alias(options)
		{
			var e;
			for(e in options)
			{
				selection_set_alias[e]=options[e];
			}
		}


	function add_flag(s_verb,s_class)
	{
		var method_name;
		var method_fn;

		method_name="has"+s_verb;
		method_fn=function(pfn)
			{
				if(typeof(pfn)!="function")
					return false;
				var i;
				for(i=0;i<selected_objects.length;i++)
				{
					if(selected_objects[i].hasClass(s_class))
						pfn(selected_objects[i]);
				}
				return true;
			}
		exposed_methods[method_name]=method_fn;

		method_name="is"+s_verb;
		exposed_methods[method_name]=method_fn;

		method_name="set"+s_verb;
		method_fn=function()
			{
				var i;
				for(i=0;i<selected_objects.length;i++)
				{
					selected_objects[i].addClass(s_class);
				}
				return true;
			}
		exposed_methods[method_name]=method_fn;

		method_name="unset"+s_verb;
		method_fn=function()
			{
				var i;
				for(i=0;i<selected_objects.length;i++)
				{
					selected_objects[i].removeClass(s_class);
				}
				return true;
			}
		exposed_methods[method_name]=method_fn;
	}

	function select(selector_list) // create a vector of objects
	{
		var aliased_items_expanded="";
		var i,j,obj;
		if(selector_list==null)
			return 0;

		if(typeof(selector_list)=="string")
			selector_list=selector_list.split(";");


		for(i=0;i<selector_list.length;i++)
		{
			if(aliased_items_expanded!="")
				aliased_items_expanded+=";";
			if(selection_set_alias[selector_list[i]]!=null)
				aliased_items_expanded+=selection_set_alias[selector_list[i]];
			else
				aliased_items_expanded+=selector_list[i];
		}

		selector_list=aliased_items_expanded.split(";");

		selected_objects=[];


		for(i=0;i<selector_list.length;i++)
		{
			obj=$("#"+defaultOptions.id).find(selector_list[i]);
			if(obj.length>0)
				{
					for(j=0;j<obj.length;j++)
						selected_objects.push(obj.eq(j));
				}
		}

		return selected_objects.length;
	}

	function selected_items(index) // create a vector of objects
	{
		if(selected_objects==null)
			return null;

		if(selected_objects.length==null || index<0 && index>(selected_objects.length-1))
			return null;

		return selected_objects[index];
	}

	function get_values()
	{
		var the_values=[];
		var i;
		var X;
		if(selected_objects==null)
			return the_values;

		if(selected_objects.length==null)
			return the_values;

		for(i=0;i<selected_objects.length;i++)
		{
			X=selected_objects[i].val();
			if (X.indexOf(defaultOptions.EmptyField)>=0)
				X="";
			the_values.push(X);
		}
		return the_values;
	}

	function set_values(the_values)
	{

		var i;
		if(selected_objects==null || the_values==null)
			return false;

		if(selected_objects.length==null || the_values.length==null)
			return false;

		for(i=0;(i<the_values.length && i<selected_objects.length);i++)
			selected_objects[i].val(the_values[i]);

		return true;
	}

	function clear_options()
	{
		var i,j,addMe;
		if(selected_objects==null)
			return false;

		if(selected_objects.length==null)
			return false;

		for(i=0;i<selected_objects.length;i++)
			{
				selected_objects[i].html("");
			}

		return true;
	}

	function append_options(option_list)
	{
		/*
		$('#mySelect').append($('<option>', {
    value: 1,
    text: 'My option'
}));
		*/

		var i,j,addMe;
		if(selected_objects==null || option_list==null)
			return false;

		if(selected_objects.length==null || option_list.length==null)
			return false;

		for(i=0;i<selected_objects.length;i++)
			{
				for(j=0;j<option_list.length;j++)
				{
					addMe={value:option_list[j]['value'],text:option_list[j]['text']};
					selected_objects[i].append($('<option>',addMe));
				}

			}

		return true;
	}

	// event catchers
	function catch_event(obj,event_name,e_obj,options)
	{
		// alert("event_name "+event_name+"::"+e_obj.currentTarget.className);
		var elm;
		var obj_actionable;
		var condition;
		var action;
		var add_class;
		var remove_class;
		var obj_a;
		for (elm in events_when)
			{
				if(e_obj==null || e_obj.currentTarget==null || e_obj.currentTarget.className==null)
					continue;
				if(e_obj.currentTarget.className.indexOf(elm)>=0)
				{
					obj_actionable=events_when[elm];
					condition=obj_actionable['condition'];
					action=obj_actionable['action'];
					add_class=options['addclass'];
					remove_class=options['removeclass'];

					obj_a=$("#"+defaultOptions.id).find("."+elm);
					switch(event_name)
					{
						case "change":
						{
							if(condition=="empty")
							{
								if(e_obj.currentTarget.value=="")
									{
									if(typeof(action)=="function")
										e_obj.currentTarget.value=action(e_obj)
										else
										e_obj.currentTarget.value=action+defaultOptions.EmptyField;
									}
							}
						break;
						}
						case "focus":
						{
							if(condition=="empty")
							{
								if(e_obj.currentTarget.value.indexOf(defaultOptions.EmptyField)>=0)
									{
										e_obj.currentTarget.value="";
										if(add_class!=null)
											obj_a.addClass(add_class);


									}
							}
						break;
						}
						case "blur":
						{
							if(condition=="empty")
							{
								if(e_obj.currentTarget.value=="")
									{
									if(typeof(action)=="function")
										e_obj.currentTarget.value=action(e_obj)
										else
										e_obj.currentTarget.value=action+defaultOptions.EmptyField;
									if(remove_class!=null)
											obj_a.removeClass(remove_class);

									}
							}
						break;
						}
					}
				}
			}




		return true;
	}



	function refresh()
	{
		var i,v;
		if(selected_objects==null)
			return false;

		if(selected_objects.length==null)
			return false;

		for(i=0;(i<selected_objects.length);i++)
			selected_objects[i].blur();

		return true;
	}

	function onevent(options)
	{
		// if any handler is assigned for any field then:
		var i;

		if(options==null || selected_objects==null)
			return false;

		for(i=0;i<selected_objects.length;i++)
			{
				var event_type=options["type"];
				if(typeof(event_type)!="string")
					continue;
				if("click,change,focus,blur,hover,dblclick,keydown,keypress,keyup,mouseleave,mousemove,mouseout,mouseover".indexOf(event_type)>=0)
					{
					var pfn=function(e_obj)
						{
							if(options['pfn'])
								{
									if(catch_event(selected_objects[i],event_type,e_obj,options))
										options['pfn'](selected_objects[i],e_obj);
								}
						}
					selected_objects[i][event_type](pfn); // same as obj.event_type(fnpointer) -- attach event
					}
			}

	}

	function when_condition(options)
	{
		if(typeof(options)!="object")
			return false;


		if(options["condition"]==null || options["class"]==null || options["action"]==null)
			return false;


		var i;


		events_when[options["class"]]=
			{'condition':options["condition"],'action':options["action"],'obj':selected_objects[i]};



		return true;
	}

	var set_opacity=function(obj,f)
		{
		var o={filter:"alpha(opacity="+Math.round(100*f)+")","-moz-opacity":f,opacity:f,display:"block"};
		obj.css(o);
		};

	function show_dialog(options)
	{
		// Display the dialog box
		var dDO={showDuration:250,hideDuration:250,
			onComplete:null,opacity:1.0,
			action:"modal",backdropClass:"backdrop",backdropOpacity:1.0};
		var e,obj,s;

		for(e in dDO)
		{
			if(options!=null && options[e]!=null)
				dDO[e]=options[e];
		}

		obj=$("#"+defaultOptions['id']);

		if(obj==null)
			return false;

		s=dDO['action'];
		if(s=="show")
		{
			set_opacity(obj,0.0);
			obj.fadeTo(dDO.showDuration,1.0,dDO.onComplete);
			return true;
		}
		else
		if(s=="modal")
		{
			var backdropDiv=document.createElement("div");
			var backdrop_Selector=defaultOptions.id+"_backdrop";
			var obj_backdrop;
			var w,h;
			backdropDiv.setAttribute("ID",backdrop_Selector);
			backdropDiv.setAttribute("CLASS",dDO.backdropClass);
			document.body.appendChild(backdropDiv);


			obj_backdrop=$("#"+backdrop_Selector);

			set_opacity(obj,0.0);
			set_opacity(obj_backdrop,0.0);

			w=obj.width();
			h=obj.height();


			obj_backdrop.css({zIndex:10000,height:"770%",
				width:"100%",display:"block",
				position:"absolute",
				top:"0px",left:"0px"});
			obj_backdrop.addClass(dDO.backdropClass);
			obj.css({zIndex:10010,marginLeft:-(w>>1)+"px"});

				// alert("w="+w+" h="+h);

			obj_backdrop.fadeTo(dDO.showDuration,dDO.backdropOpacity);
			obj.fadeTo(dDO.showDuration,dDO.opacity,dDO.onComplete);
			return true;
		}
		else
		if(s=="hide")
		{
			var backdrop_Selector=defaultOptions.id+"_backdrop";
			var obj_backdrop;

			obj_backdrop=$("#"+backdrop_Selector);

			if(obj_backdrop!=null)
			{
				obj_backdrop.fadeTo(dDO.hideDuration,0.0);
			}
			obj.fadeTo(dDO.hideDuration,0.0,dDO.onComplete);
			return true;
		}

		// action is "modal" or "show" or "hide"

		/*
			.fadeTo(duration,opacity,pf_complete)
			*/
	}

	// set any provided defaults

	// exposed Methods
	this.Select=exposed_methods.Select=select;
	this.addFlag=exposed_methods.addFlag=add_flag;
	this.selectedItems=exposed_methods.selectedItems=selected_items;
	this.getValues=exposed_methods.getValues=get_values;
	this.setValues=exposed_methods.setValues=set_values;
	this.OnEvent=exposed_methods.OnEvent=onevent;
	this.whenCondition=exposed_methods.whenCondition=when_condition;
	this.Refresh=exposed_methods.Refresh=refresh;
	this.appendOptions=exposed_methods.appendOptions=append_options;
	this.clearOptions=exposed_methods.clearOptions=clear_options;
	this.addSetAlias=exposed_methods.addSetAlias=add_set_alias;
	this.showDialog=exposed_methods.showDialog=show_dialog;


	return exposed_methods;

}
