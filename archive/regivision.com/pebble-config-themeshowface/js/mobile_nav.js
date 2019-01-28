// JavaScript Document

function MobileNav(options)
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
	var defaultOptions={id:"",cn_Focus:"",cn_Disable:"",EmptyField:"    ",pfn_Show:defaultShow,pfn_Hide:defaultHide,container:""};
    var NavOptions={};
	var NavStack={}; // Navigation Object
    var exposedMethods={};
    var currentPath="";
    var showContainer=null;
    
    
    
    // methods (Private)
    function findPath(path)
    {
        var i,a=path.split("/");
        var obj=NavStack;
        if(path=="")
            return obj;
        for(i=0;i<a.length;i++)
        {
            if(typeof(obj[a[i]])=="object")
                obj=obj[a[i]];
            else
                return null;
        }
        
        return obj;
    }
    
    function addPath(path)
    {
        var i,t,a=path.split("/");
        var obj=NavStack;
        
        if(a.length<1)
            return obj;
        
        for(i=0;i<a.length;i++)
        {
            t=typeof(obj[a[i]]);            
            
            if(t=="object")
                obj=obj[a[i]];
            else
            if(obj[a[i]]==null)    
                {
                    obj[a[i]]={};
                    obj=obj[a[i]];
                }
            else
                return null;
        }        
        
        return obj;
    }
    
    function triggerEvent(event_name,info)
    {
        var obj=findPath(currentPath);
        if(obj==null)
            return false;
        var ev=obj['eventHandlers'];
        if(ev==null)
            return false;
        var en="fn_"+event_name;
        if(typeof(ev[en])!="function")
            return false;
        ev[en](info);
        return true;
    }
    
    function addItem(options)
    {        
        var option_items="path,id,class,code,pfn_click,pfn_mouseenter,pfn_mouseleave,pfn_focus,pfn_blur,next";
        var i,a=option_items.split(",");
        var iname="items";
        var new_obj={};
        obj=NavStack;
        for(i=0;i<a.length;i++)
        {
            if(a[i]=="path")
            {
                if(options['path']==null)
                    return 0;
                obj=addPath(options['path']);
                if(obj==null)
                    return 0;
                if(obj[iname]==null)
                    obj[iname]=[];
                continue;
            }
            if(options[a[i]]!=null)
                new_obj[a[i]]=options[a[i]];            
        }
        obj[iname].push(new_obj);
        return obj[iname].length;
    }
    
    function renderPath(path)
    {
        
        triggerEvent('close',{oldpath:currentPath,newpath:path});
        
        if(path==null)
            path=currentPath;
        
        var theTarget=findPath(path);
        if(theTarget==null)
            return;
        
        var idx=path.lastIndexOf("/");
        var leaf=path;
        if(idx>=0)
            {
            leaf=leaf.substring(idx+1);            
            }
        
        if(theTarget['items']==null)
            theTarget=theTarget[leaf];
        
        var theItems=theTarget['items'];
        if(theItems==null || theItems.length<1)
            {
                currentPath="";                
                goBack();                
                return;
            }
        
        copyForegroundMenu();
        
        var objContainer=$("#"+NavOptions['id']);
        if(objContainer==null)
            return;
        objContainer.html("");
        var i;
        // add the html code
        for(i=0;i<theItems.length;i++)
            objContainer.append(theItems[i].code);
        
        var ef=(path.length>currentPath.length) ? "right":"left";
        menuEnterFrom(ef);
        // attach events
        var obj;
        for(i=0;i<theItems.length;i++)
            {
                obj=$("#"+theItems[i].id);
                if(obj!=null) // each triggered event <gui container obj>,<properties container>
                {
                    if(typeof(theItems[i].pfn_click)=="function") // go next and custom
                    {
                        obj.click(theItems[i].pfn_click);
                    }
                    if(typeof(theItems[i].pfn_mouseenter)=="function") // go next and custom
                    {
                        obj.mouseenter(theItems[i].pfn_mouseenter);
                    }
                    if(typeof(theItems[i].pfn_mouseleave)=="function") // go next and custom
                    {
                        obj.mouseleave(theItems[i].pfn_mouseleave);
                    }
                    if(typeof(theItems[i].pfn_focus)=="function") // go next and custom
                    {
                        obj.focus(theItems[i].pfn_focus);
                    }
                    if(typeof(theItems[i].pfn_blur)=="function") // go next and custom
                    {
                        obj.blur(theItems[i].pfn_blur);
                    }
                }
            }
        var oldpath=currentPath;
        currentPath=path;     
        triggerEvent('open',{oldpath:oldpath,newpath:currentPath});
    }
    
    function goBack()
    {
        var obj={};
        obj['oldpath']=currentPath;
        var sParent=currentPath;
        var idx=sParent.lastIndexOf("/");
        if(sParent=="")
            {
            hide();            
            }
        
        if(idx<0)        
            sParent="";
        else    
            sParent=sParent.substring(0,idx);
        
        obj['newpath']=sParent;
        triggerEvent('back',obj);
        renderPath(sParent);        
    }
    
    function setOptions(options)
    {
        if(options==null)
            return;
        var e;
        for(e in defaultOptions)
        {
            if(options[e]!=null)
                NavOptions[e]=options[e];
            else
            if(defaultOptions[e]!=null)
                NavOptions[e]=defaultOptions[e];
        }
    }
    
    
    function copyForegroundMenu()
    {
       var obj_copy=$("#"+NavOptions['container']+"_copy");
        var obj=$("#"+NavOptions['container']);
    
        var hold=obj.html();
        obj_copy.html(hold);
        obj_copy.find("div").each(function()
                                  {
                                        var id=$(this).attr("id");
                                        if(id!=null)
                                            $(this).attr("id",id+"_");
                                    });
        
    }
    
    function menuEnterFrom(side)
    {
        var obj_copy=$("#"+NavOptions['container']+"_copy");
        var obj=$("#"+NavOptions['container']);
        var duration=250;
          
        
        if(side=="left")
        {        
            obj.css({left:"-"+$(window).width()+"px"});
            obj_copy.css({left:"0px",display:'block'}).removeClass("hidden");
            
            obj.animate({left:"0px"},250);
            obj_copy.animate({left:$(window).width()+"px"},250,function() {$(this).html("").addClass("hidden").css({display:'none'});});
        }
        else
        {
            obj.css({left:$(window).width()+"px"});
            obj_copy.css({left:"0px",display:'block'}).removeClass("hidden");
            
            obj.animate({left:"0px"},250);
            obj_copy.animate({left:"-"+$(window).width()+"px"},250,function() {$(this).html("").addClass("hidden").css({display:'none'});});        
        }
    }    
    
    function defaultShow(obj)
    {    
    obj.css({left:"-"+$(window).width()+"px"});
    obj.show();
    obj.animate({left:"0px"},250);
    }
    
    function defaultHide(obj)
    {
    obj.css({left:"0px"});    
    obj.animate({left:"-"+$(window).width()+"px"},250,function() {obj.hide();});
    }
    
    
    function show(obj_id)
    {
        var obj=showContainer;
        if(obj_id!=null)
            obj=$("#"+obj_id);
        NavOptions.pfn_Show(obj);
        showContainer=obj;
    }
    
    function hide(obj_id)
    {
        var obj=showContainer;
        if(obj_id!=null)
            obj=$("#"+obj_id);        
        NavOptions.pfn_Hide(obj);
        showContainer=obj;
    }
    
    function getVar(var_id)
    {
        if(typeof(var_id)!="string")
            return null;
        var obj=findPath(currentPath);
        return obj[var_id];
    }
    
    function setVar(var_id,value)
    {
        if(typeof(var_id)!="string")
            return false;
        var obj=findPath(currentPath);
        if(obj==null)
            return false;
        obj[var_id]=value;
        return true;
    }
    
    function addPath_EventHandlers(path,options)
    {
        var obj=findPath(path);
        if(obj==null)
            return false;
        var validEvents="open,close,back";
        var i,a=validEvents.split(",");
        var eventHandlers={};
        for(i=0;i<a.length;i++)
        {
            if(typeof(options[a[i]])=="function")
                eventHandlers['fn_'+a[i]]=options[a[i]];
        }
        
        obj['eventHandlers']=eventHandlers;
        return true;        
    }
    
    function getCurrentPath()
    {
        return currentPath;
    }
    
    // set constructor options
    setOptions(options);

	// exposed Methods (Publicized)
	this.findPath=exposedMethods.findPath=findPath;
    this.addPath=exposedMethods.addPath=addPath;
    this.addItem=exposedMethods.addItem=addItem;
    this.setOptions=exposedMethods.setOptions=setOptions;
    this.renderPath=exposedMethods.renderPath=renderPath;
    this.show=exposedMethods.show=show;
    this.hide=exposedMethods.hide=hide;
    this.goBack=exposedMethods.goBack=goBack;
    this.setVar=exposedMethods.setVar=setVar;
    this.getVar=exposedMethods.getVar=getVar;
    this.addPath_EventHandlers=exposedMethods.addPath_EventHandlers=addPath_EventHandlers;
    this.getCurrentPath=exposedMethods.getCurrentPath=getCurrentPath;

	return exposedMethods;
}
