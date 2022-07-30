// JavaScript Document

var g_attached_menu=null;
var g_isMobileDevice=false;
var g_Resume_scrollTop=0;
var g_MobileNav=null;
var g_nxt="<div class=\"mnxt\"><i class=\"fa fa-chevron-right\"></i></div>";
var g_exp="<div class=\"mnxt\"><i class=\"fa fa-plus\"></i></div>";
var g_col="<div class=\"mnxt\"><i class=\"fa fa-minus\"></i></div>";
var g_href="";

var g_useFaceStyle=0;
var g_options={FS: 1,
    PS:0,PSN:"a,b,c".split("'"),
    OFS:1,
    HD:5000,
    OC:0,
    FG:0x030303,
    O:2,
    BG:0x000000,TN:""};

/*
 'USE_FACESTYLE': config_data.USE_FACESTYLE,
    'OVERRIDE_FACESTYLE':config_data.OVERRIDE_FACESTYLE,
    'HIDE_DURATION':config_data.HIDE_DURATION,
    'OVERRIDE_COLORS':config_data.OVERRIDE_COLORS,
    'CLOCK_FG_COLOR':config_data.CLOCK_FG_COLOR,
    'CLOCK_BG_COLOR':config_data.CLOCK_BG_COLOR
*/


var g_parameters={};

 function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return defaultValue || false;
  }

function item_mouseover(obj)
	{
	flash_list_item(0);
	current_list_item=[];
	current_list_item.push(obj.parent());
	}

function item_mouseout(obj)
	{
	flash_list_item(0);
	}

function section_title_mouseout(obj)
	{
	var obj_parent=obj.parent().parent();
	var oo;
	obj_parent.find("a").removeClass("c1").removeClass("c2");

	oo=obj_parent.find("ul");
	oo.removeClass("rs_active");



	flash_list_item(0);
	current_list_item=[];

	}

function section_title_click(obj)
	{
    if(g_isMobileDevice)
        return;
	var click_count=0;
	if(obj.hasClass('c1'))
		click_count=1;
	else
	if(obj.hasClass('c2'))
		click_count=2;

	var obj_parent=obj.parent().parent();
	var obj_section=obj_parent.parent();

	obj_parent.find("a").removeClass("c1").removeClass("c2");

	click_count++;

	var oo;

	if(click_count==1)
		{
		oo=obj_parent.find("ul");
		oo.addClass("rs_active");
		attachMenu(obj_parent);
		}
	else
	if(click_count==2)
		{
		// obj_parent.qtip({content: 'Test',show: 'mouseover',hide: 'mouseout'});
		var section_number=obj_section.attr("id");
		section_number=section_number.substring(7);
		showModal("modal_"+section_number);
		detachMenu(obj_parent);
		}

	if(click_count>0 && click_count<3)
		obj_parent.find("a").addClass("c"+click_count);
	}

var globals={timer:null,interval:500,tick:0,list:[]};

var current_list_item=[];
function flash_list_item(i)
	{
	if(current_list_item.length<1)
		return;
	var j,obj;
	for(j=0;j<current_list_item.length;j++)
		{
		obj=current_list_item[j];
		if(i & 1)
			obj.removeClass("hover").addClass("hover");
		else
			obj.removeClass("hover");
		}
	}

function swipe_event_handler(event, direction, distance, duration, fingerCount)
{
    var obj_modal_mobile=$("#modal_mobile");

    if(direction=="left")
        hideModal();
    else
        if(direction=="up" || direction=="down")
    {
        return false;
    }
}

function createColorSelector()
{
    var S="";
    var a,r,g,b,i=0;
    var R,G,B,H,A,P="000000",PC;
    for(r=0;r<=3;r++)
        for(g=0;g<=3;g++)
            for(b=0;b<=3;b++)
            {
            A=255; R=64*r; G=64*g; B=64*b;
            a=3;
            PC=(a<<6)+(r<<4)+(g<<2)+b;
            H=(R<<16)+(G<<8)+B; H=H.toString(16);
            H=P.substr(0,P.length-H.length)+H;
            S+="<a id=\"color"+i+"\" href=\"javascript:;\" class=\"color_cell\" data_value=\""+PC+"\" style=\"background-color:#"+H+";color:#"+H+"\">&#x2713;</a>";
            i++;
            }
    A=0; R=255; G=255; B=255;
    a=0;
    PC=(a<<6)+(r<<4)+(g<<2)+b;
    H=(R<<16)+(G<<8)+B; H=H.toString(16);
    H=P.substr(0,P.length-H.length)+H;
    S+="<a id=\"color"+(i)+"\" href=\"javascript:;\" class=\"color_cell\" data_value=\""+PC+"\" style=\"border-style:dashed; border-color:black; background-color:#"+H+";color:#"+H+"\">&#x2713;</a>";
    S+="<a href=\"#\"id=\"color_select_done\" class=\"btn btn-lg btn-success me_button me_wide\">Accept</a>";
    return S;
}

function showModal(s_id)
	{
	var obj=$("#"+s_id);

	if(obj.length<1)
		return;

	var s_title=obj.attr("title");
	var s_content=obj.html();


	if(g_isMobileDevice)
		{
        var obj_modal_mobile=$("#modal_mobile");
        obj_modal_mobile.find("div.body").html(s_content); // .css({height:$(window).height()});
        obj_modal_mobile.find("div.title").html(s_title);
        // $("html").css({"overflow":"hidden"});
        $("#resume_container").addClass("resume_container_mobile");
        // g_Resume_scrollTop=$("html").scrollTop();
        // alert("SCROLLTOP: "+g_Resume_scrollTop);
	    obj_modal_mobile.fadeIn(250);

            /*
        obj_modal_mobile.animate({width: "toggle",height: "toggle"},{duration: 5000,specialEasing:{width: "linear",height: "easeInBounce"},
    complete:function()
                    {
                        this.css({'width':'100%','height':'100%','display':'block'});
                    }});

                    */


        $("#modal_mobile").swipe( {swipe:swipe_event_handler,threshold:10,allowPageScroll:"vertical"});
		}
	else
		Shadowbox.open({content:s_content,title:s_title,player:'html'});


	}

function hideModal()
	{
        if(g_isMobileDevice)
        {
        var obj_modal_mobile=$("#modal_mobile");

        // $("html").css({"overflow":"auto"});
        $("#resume_container").removeClass("resume_container_mobile");
        window.scrollTo(0,g_Resume_scrollTop);
	    obj_modal_mobile.fadeOut(250);
        }
        else
        {
	       $("#modal_container").fadeOut(250);
	       $("#modal_container div.modal").addClass("hidden");
        }

	}

function ticker()
	{
	with(globals)
		{
		if(timer)
			{
			clearTimeout(timer);
			if(list.length)
				{
				for(var i=0;i<list.length;i++)
					list[i](tick);
				}
			}
		timer=setTimeout("ticker()",interval);
		tick++;
		}
	}

function setup_QTip()
	{
	// $("#section6 div.right_column H2 a").qtip({content: 'Test',show: 'mouseover',hide: 'mouseout'});
	// $('a.dcfm').qtip({ content:'double click here for more info.',show: 'mouseover',hide: 'mouseout'});
	var s_msg="Please, Click here for more information";
	$("div.right_column H2 a,div.right_column H3 a").attr({title:s_msg});
	}


function swipe_event_handler_MobileMenu(event, direction, distance, duration, fingerCount)
{
    var obj_modal_mobile=$("#modal_mobile");

    if(direction=="right")
        {
        var cp=g_MobileNav.getCurrentPath();
        
        if(cp!="")
            g_MobileNav.goBack();
        }
    else
    if(direction=="up" || direction=="down")
    {
        return false;
    }
}

function swipe_event_handler_Resume(event, direction, distance, duration, fingerCount)
{
    if(direction=="right")
          showModal_Mobile();
    else
    if(direction=="up" || direction=="down")
    {
        return false;
    }
}


function selectFaceStyle(useFaceStyle)
{
    g_options.FS=useFaceStyle;
    var obj=$(".facestyle_selected");
    obj.removeClass("facestyle_selected");
    obj=$("#facestyle"+useFaceStyle);
    obj.addClass("facestyle_selected");
}

function selectTheme(useTheme,theme_name)
{
    var last_item=g_options.PSN;
    
    if(last_item!=null)
        {
            if(g_options.PS>(last_item.length-1))
                useTheme=last_item.length-1;
        }
    
    g_options.PS=useTheme;
    g_options.TN=theme_name;
    var obj=$(".theme_selected");
    obj.removeClass("theme_selected");
    obj=$("#theme"+useTheme);
    obj.addClass("theme_selected");
}

function exitConfig()
{
     
    // Return data to watchapp
    
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    
    
    var ret=return_to + encodeURIComponent(JSON.stringify(g_options));    
    g_href=ret;
    document.location = ret;
    /*
    setTimeout(function()
              {
                document.location = g_href;
                },2000);
                */
}

function addMenuTitleBar(the_path,title_name)
{
    var back_button=(the_path.length>0) ? "<div id=\"goBack\"><a href=\"#\" class=\"menu_icon menu_icon_right\"><span class=\"glyphicon glyphicon-backward\"></span></a>":"";
    var menu_button=(the_path.length>0) ? "<div id=\"goHome\"><a href=\"#\" class=\"menu_icon menu_icon_left\"><span class=\"glyphicon glyphicon-home\"></span></a>":"";
    
    var ret=g_MobileNav.addItem({path:the_path,id:"topMenu",code:"<div id=\"topMenu\" class=\"menu_entry_mobile bpad\">"+menu_button+back_button+"</div>",pfn_click:function() {}});
    var ret=g_MobileNav.addItem({path:the_path,id:"topMenu2",code:"<div id=\"topMenu2\" class=\"menu_entry_mobile menu_title_spacing bpad\">"+title_name+"</div>",pfn_click:function() {}});
}

function activateColorSelector(option_field_name,s_title)
{
    var S=createColorSelector();    
    var B="<div id=\"useDFI\" class=\"menu_entry_mobile me_wide bpad \">"+s_title+"</div>";
    var obj=$("#colorSelector");
    obj.html(B+S);
    
    var hide_me=function()
        {
        $("#colorSelector").removeClass("cc_hidden").addClass("cc_shown");    
        $("#Select_BG,#Select_FG,#Select_AUTO").hide();        
        };
    
    var show_me=function()
        {
        $("#colorSelector").removeClass("cc_shown").addClass("cc_hidden");    
        $("#Select_BG,#Select_FG,#Select_AUTO").show();        
        };
    
    
    hide_me();
    
    var color_selected=function()
    {
        $("#colorSelector").removeClass("cc_shown").addClass("cc_hidden");    
        $("#Select_BG,#Select_FG,#Select_AUTO").show();  
        $("#colorSelector").html("");
        g_MobileNav.renderPath("/Select_Colors");
    };
    
        
    obj=$(".color_cell,#color_select_done");
    obj.click(function()
                {
                g_options.OC=1;
                $("#Select_AUTO").removeClass("me_selected");
                var data_value=$(this).attr("data_value");
                if(null==data_value)
                    {
                    color_selected();
                    return;    
                    }
                g_options[option_field_name]=parseInt(data_value);
                if($(this).hasClass("color_cell_selected"))
                    {                                         
                    color_selected();
                    return;
                    }
                $(".color_cell").removeClass("color_cell_selected");
                $(this).addClass("color_cell_selected");
                
                });
    
    if(g_options.OC!=0)
        {
            var obj=$("#color"+(g_options[option_field_name] & 63));
            obj.click();
        }
}

function attachMenuTitleBarActions(the_path)
{
    g_MobileNav.addPath_EventHandlers(the_path,{open:function()
                                                    {   
                                                        $("#goBack").click(function(){g_MobileNav.goBack();});
                                                        
                                                        if(g_options.OC==0)
                                                            {
                                                                $("#Select_AUTO").addClass("me_selected");
                                                            }
                                                        selectFaceStyle(g_options.FS);
                                                        selectTheme(g_options.PS);
                                                        $("#goHome").click(function()
                                                                        {
                                                                        g_MobileNav.renderPath("");
                                                                        });
                                                        
                                                        var op_value=g_options.O*33;
                                                        $("#Change_OPACITY").html("OPACITY: "+op_value+"%");
                                                    }
                                                   }); 
}

function buildMenu_Mobile()
{
    var ret=0,obj,txt,title,i;
    var path;
    g_MobileNav=new MobileNav();

     g_MobileNav.setOptions({id:"modal_mobile div.body",container:"modal_mobile"});
    
    // Main Menu
    
    /*
    ret=g_MobileNav.addItem({path:"",id:"goBack",code:"<div id=\"goBack\"><div class=\"menu_icon\"><img src=\"images/back_icon2.png\" /></div> <div class=\"my_photo\"><img src=\"images/me.jpg\" /></div> </div>",pfn_click:function() {g_MobileNav.goBack();}});
    */
    
    /*
       ret=g_MobileNav.addItem({path:private_path,id:"oText1",code:"<div id=\"oText1\" class=\"menu_entry_mobile\">Additional Info"+g_exp+"</div>",pfn_click:function()
                             {
                                var obj=$("#oText1");
                                var label=obj.html();
                                var idx=label.indexOf(g_exp);
                                var cls=".oTextM";
                                if(idx>=0)
                                    {
                                    label=label.replace(g_exp,g_col);
                                    $(cls).removeClass("hidden");
                                    g_MobileNav.setVar("bOpen",1);
                                    }
                                 else
                                    {
                                    label=label.replace(g_col,g_exp);
                                    $(cls).addClass("hidden");
                                    g_MobileNav.setVar("bOpen",0);
                                    }
                                 obj.html(label);
                             }});

    */
    
    path="";
    addMenuTitleBar(path,"<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Configuration Menu</h3></div><div class=\"panel-body\">Choose setting to configure</div></div>");
    ret=g_MobileNav.addItem({path:path,id:"Select_Watchface",code:"<a id=\"Select_Watchface\" href=\"#\" class=\"btn btn-lg btn-primary me_button me_wide\">Select Preferred Watchface </a>",pfn_click:function()       {g_MobileNav.renderPath("/Select_Watchface");}});
    
    ret=g_MobileNav.addItem({path:path,id:"Select_Theme",code:"<a href=\"#\" id=\"Select_Theme\" class=\"btn btn-lg btn-primary me_button me_wide\">Select Preferred Theme </a>",pfn_click:function()       {g_MobileNav.renderPath("/Select_Theme");}});
    
    ret=g_MobileNav.addItem({path:path,id:"Select_Colors",code:"<a href=\"#\"  id=\"Select_Colors\" class=\"btn btn-lg btn-primary me_button me_wide\">Select Watchface Color Options</a>",pfn_click:function()       { g_MobileNav.renderPath("/Select_Colors");}});
     ret=g_MobileNav.addItem({path:path,id:"done",code:"<a href=\"#\"id=\"done\" class=\"btn btn-lg btn-success me_button me_wide\">Done</a>",pfn_click:function()       {exitConfig();}});
    attachMenuTitleBarActions(path);
    
    path="/Select_Theme";
    addMenuTitleBar(path,"Select Theme");    
    
    var a=g_parameters['PSN'];
    
    if(a==null)
        a="missing".split(',');    
    
    for(var aa=0;aa<a.length;aa++)
        {
    var call_me=new Function("{selectTheme("+aa+",\""+a[aa]+"\");g_MobileNav.renderPath(\"mobj\");}");            
    ret=g_MobileNav.addItem({path:path,id:"theme"+aa,code:"<a href=\"#\" id=\"theme"+aa+"\" class=\"menu_entry_mobile btn btn-lg btn-info me_button me_wide\">"+a[aa]+"</a>",pfn_click:call_me});
        }
     ret=g_MobileNav.addItem({path:path,id:"done",code:"<a href=\"#\" id=\"done\" class=\"menu_entry_mobile btn btn-lg btn-success me_button me_wide \">Done</a>",pfn_click:function()       {exitConfig();}});
    
    attachMenuTitleBarActions(path);
    
    path="/Select_Watchface";
    addMenuTitleBar(path,"<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Select Watchface</h3></div><div class=\"panel-body\">Change the active watchface</div></div>");       
    ret=g_MobileNav.addItem({path:path,id:"facestyle1",code:"<div id=\"facestyle1\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(1); g_MobileNav.renderPath("mpref");}});
    ret=g_MobileNav.addItem({path:path,id:"facestyle2",code:"<div id=\"facestyle2\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(2); g_MobileNav.renderPath("mpref");}});
    ret=g_MobileNav.addItem({path:path,id:"facestyle3",code:"<div id=\"facestyle3\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(3); g_MobileNav.renderPath("mpref");}});    
     ret=g_MobileNav.addItem({path:path,id:"facestyle4",code:"<div id=\"facestyle4\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(4); g_MobileNav.renderPath("mpref");}}); 
     ret=g_MobileNav.addItem({path:path,id:"facestyle5",code:"<div id=\"facestyle5\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(5); g_MobileNav.renderPath("mpref");}}); 
     ret=g_MobileNav.addItem({path:path,id:"facestyle6",code:"<div id=\"facestyle6\" class=\"menu_entry_mobile facestyle \"></div>",pfn_click:function()       {selectFaceStyle(6); g_MobileNav.renderPath("mpref");}}); 
     ret=g_MobileNav.addItem({path:path,id:"done",code:"<a href=\"#\" id=\"done\" class=\"menu_entry_mobile btn btn-lg btn-success me_button me_wide \">Done</a>",pfn_click:function()       {exitConfig();}});
    attachMenuTitleBarActions(path);
    
    path="/Select_Colors";
    addMenuTitleBar(path,"<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Select watchface colors</h3></div><div class=\"panel-body\">Choose an automatic or fixed foreground and background color.  Pick FG or BG color by double tapping</div></div>");        
    attachMenuTitleBarActions(path);  
     ret=g_MobileNav.addItem({path:path,id:"Select_AUTO",code:"<a href=\"#\" id=\"Select_AUTO\" class=\"menu_entry_mobile btn btn-lg btn-primary me_button me_wide \">Colors Selected Automatically </a>",pfn_click:function()       
                             {
                               g_options.OC=0;
                               $("#Select_AUTO").addClass("me_selected");
                             }}); 
    if(g_options.O<0 || g_options.O>3)
                                   g_options.O=3;
    var op_value=g_options.O*33;
    ret=g_MobileNav.addItem({path:path,id:"Change_OPACITY",code:"<a href=\"#\" id=\"Change_OPACITY\" class=\"menu_entry_mobile btn btn-lg btn-primary me_button me_wide \">OPACITY: "+op_value+"%</a>",pfn_click:function()       
                             {                                
                               g_options.O=(g_options.O<3) ? (g_options.O+1):0;
                               if(g_options.O<0 || g_options.O>3)
                                   g_options.O=3;
                               var op_value=g_options.O*33;
                               $("#Change_OPACITY").html("OPACITY: "+op_value+"%");
                             }}); 
    ret=g_MobileNav.addItem({path:path,id:"Select_FG",code:"<a href=\"#\" id=\"Select_FG\" class=\"menu_entry_mobile btn btn-lg btn-primary me_button me_wide \">Choose Foreground Color </a>",pfn_click:function()       
                             {
                               activateColorSelector("FG","Choose Foreground Color:");
                             }});    
    
    ret=g_MobileNav.addItem({path:path,id:"Select_BG",code:"<a href=\"#\" id=\"Select_BG\" class=\"menu_entry_mobile btn btn-lg btn-primary me_button me_wide \">Choose Background Color </a>",pfn_click:function() {
                               activateColorSelector("BG","Choose Background Color:");
                             }});     
        ret=g_MobileNav.addItem({path:path,id:"bottomMenu",code:"<div id=\"bottomMenu\"><div id=\"colorSelector\" class=\"color_cells cc_hidden\"></div></div>",pfn_click:function() {}});    
         
    
     attachMenuTitleBarActions(path);
    
    
    



    $("#modal_mobile").swipe( {swipe:swipe_event_handler_MobileMenu,threshold:30,allowPageScroll:"vertical"});
}

function showModal_Mobile()
{
    g_MobileNav.renderPath("");
    g_MobileNav.show("modal_mobile");
}

function getParameters()
{
    /*
    Get passed location parameters
    */
    var parms={};
    var s=document.location.href;
    var idx=s.indexOf("?");
    if(idx<0)
        return parms;
    s=s.substr(idx+1);
    var i,kv,a=s.split("&");
    for(i=0;i<a.length;i++)
    {
        kv=a[i].split("=");
        if(kv.length>2)
            continue;
        if(kv.length==1)
        {
            parms[kv[0]]=true;            
        }
        else
        if(kv.length==2)
        {
            kv[1]=decodeURIComponent(unescape(kv[1]));
            if(kv[1].charAt(0)=='"')
                parms[kv[0]]=kv[1].replace(/\"/g,"");
            else
                {
                    if(kv[1].indexOf(",")>=0)
                        {
                            parms[kv[0]]=kv[1].split(",");
                        }
                    else
                        parms[kv[0]]=kv[1];
                }
        }
    }   

    return parms;
}

// functions used to attach and retrieve a windows object
function addWindowObject(theName,theObject)
{
    var obj=window[theName];
    if(typeof(obj)!="undefined")
        return false;
    window[theName]=theObject;
    return true;    
}

function getWindowObject(theName)
{
    var obj=window[theName];    
    return obj;
}

function clickPath(thePath)
{
    // Works as long as page does NOT reload
    var win_obj_name="resume2_ClickPath";
    var myObj=getWindowObject(win_obj_name);
    if(myObj==null)
    {
        myObj={};
        myObj.pfn=clickPath;
        myObj.isActive=false;
        myObj.retries=3;
        myObj.retries_left=0;
        myObj.timeout_ms=250;
        myObj.thePath={items:null,cur:0};
        addWindowObject(win_obj_name,myObj);
    }
    
    if(myObj.thePath.items==null)
    {
        if(thePath==null || thePath=="") 
            return false;
        var a;
        if(thePath.split!=null)
            a=thePath.split(",");  
        else
            a=thePath;
        myObj.thePath.items=a;
        myObj.thePath.cur=0;
        myObj.retries_left=myObj.retries;
    }
    
    var obj=$(myObj.thePath.items[myObj.thePath.cur]);
    // alert("try to click: "+myObj.thePath.items[myObj.thePath.cur]);
    if(obj!=null)
    {
        obj.click();
        if(myObj.thePath.cur<myObj.thePath.items.length)
        {
            myObj.thePath.cur++;
            myObj.retries_left=myObj.retries;
        }
        else
        {
            myObj.thePath={items:null,cur:0};
        }
    }
    else
    {
        if(myObj.retries_left>0)
        {
            myObj.retries_left--;
        }
        else
        {
            myObj.thePath.cur++;
            myObj.retries_left=myObj.retries;
        }
    }
    
    if(myObj.thePath.items!=null && myObj.thePath.cur<myObj.thePath.items.length)
        setTimeout(clickPath,myObj.timeout_ms);
    return;
}

$(document).ready(function()
	{
    
    g_parameters=getParameters();  
    

	
	globals.list.push(flash_list_item);

	
	setup_QTip();

	try
	{
		g_isMobileDevice=(/mobile/i.test(navigator.userAgent));
		g_isMobileDevice=(g_isMobileDevice && ('ontouchstart' in window));
        // g_isMobileDevice=true;


	}
	catch(err)
	{

	}

    g_isMobileDevice=true;
    
        var test; 

        $("body").addClass("mobile");

        buildMenu_Mobile();
    
        test="mobile";
        if(g_parameters[test]!=null)
        {
            g_isMobileDevice=(g_parameters[test]=="true");
        }

        if(g_isMobileDevice)
        {
            $("#resume_container").swipe( {swipe:swipe_event_handler_Resume,threshold:10,allowPageScroll:"vertical"});
            showModal_Mobile();
        }
    

        $("#resume_menu_trigger").click(function()
            {
            $("#resume_container").fadeOut(250);
            showModal_Mobile();
            });


        test="cp";
        if(g_parameters[test]!=null)
        {
            clickPath(g_parameters[test]);
        }
    
        for(e in g_options)
            {
                if(g_parameters[e]!=null)
                    g_options[e]=g_parameters[e];
            }

	});

