$(document).ready(function(){
    
    var bg_Color;
    var minutes_Color;
    var hours_Color;
    var seconds_Color;
    var ellipse_color;
    var marks_color;
    var clock_color;
    
    console.log(parseInt("55AAAA", 16));
    
    setColors();
    function setColors(){
        
        $("div#bg").css("background-color", "#"+$("#bg_color").attr("value"));
        $("div#marks").css("background-color", "#"+$("#marks_color").attr("value"));
        $("div#hours").css("background-color", "#"+$("input#hours_color").attr("value"));
        $("div#ellipse").css("background-color", "#"+$("input#ellipse_color").attr("value"));
        $("div#clock").css("background-color", "#"+$("input#clock_color").attr("value"));
        $("div#minutes").css("background-color", "#"+$("input#minutes_color").attr("value"));
        $("div#seconds").css("background-color", "#"+$("input#seconds_color").attr("value"));
        
        var bgColor = $("input#bg_color").attr("value");
        $("div.watch").css("background-color", "#"+bgColor);
        
        var minutesColor = $("input#minutes_color").attr("value");
        $("div.watch span.arm_m").css("background-color", "#"+minutesColor);
        
        var secondsColor = $("input#seconds_color").attr("value");
        $("div.watch span.arm_s").css("background-color", "#"+secondsColor);
        
        var hoursColor = $("input#hours_color").attr("value");
        $("div.watch span.arm_h").css("background-color", "#"+hoursColor);
        
        var ellipseColor = $("input#ellipse_color").attr("value");
        $("div.watch span.ellipse").css("background-color", "#"+ellipseColor);
        
        var marksColor = $("input#marks_color").attr("value");
        $("div.watch svg#marks path").css("fill", "#"+marksColor);
        
        var clockColor = $("input#clock_color").attr("value");
        $("article.main-container section#watch-preview div.watch h1").css("color", "#"+clockColor);
        
    }
    
    $("div.color-box").on("click",fillColorList);
    function fillColorList(){
        var lis = $(this).next().find("li");
        $.each(lis,function(key,li){
            var liColor = $(li).text();
            $(li).css("background-color", "#"+liColor);
        });
        if($(this).next().hasClass("hide")){
            $("article.main-container ul.color-list").slideUp();
            $("article.main-container ul.color-list").addClass("hide");
            $(this).next().stop().slideDown();
            $(this).next().removeClass("hide");
        }else{
            $(this).next().stop().slideUp();
            $(this).next().addClass("hide");
        }
    }
    
    $("article.main-container ul.color-list li").on("click", function(){
        var thisColor = $(this).text();
        $(this).parent().prev().css("background-color", "#"+thisColor);
        $(this).parent().prev().text(thisColor);
        $(this).parent().next().attr("value", thisColor);
    });
    
    $("article.main-container section#background ul.color-list li").on("click",function(){
        bg_Color = $(this).text();
        $("input#bg_color").attr("value", bg_Color);
        updateWatch();
    });
    
    $("article.main-container section#minutes ul.color-list li").on("click",function(){
        minutes_Color = $(this).text();
        $("input#minutes_color").attr("value", minutes_Color);
        updateWatch();
    });
    
    $("article.main-container section#seconds ul.color-list li").on("click",function(){
        seconds_Color = $(this).text();
        $("input#seconds_color").attr("value", seconds_Color);
        updateWatch();
    });
    
    $("article.main-container section#hours ul.color-list li").on("click",function(){
        hours_Color = $(this).text();
        $("input#hours_color").attr("value", hours_Color);
        updateWatch();
    });
    
    $("article.main-container section#ellipse ul.color-list li").on("click",function(){
        ellipse_color = $(this).text();
        $("#ellipse_color").attr("value", ellipse_color);
        updateWatch();
    });
    
    $("article.main-container section#marks ul.color-list li").on("click",function(){
        marks_color = $(this).text();
        $("#marks_color").attr("value", marks_color);
        updateWatch();
    });
    
    $("article.main-container section#clock ul.color-list li").on("click",function(){
        clock_color = $(this).text();
        $("#clock_color").attr("value", clock_color);
        updateWatch();
    });
    
    function updateWatch(){
        $("article.main-container section#watch-preview div.watch").css("background-color", "#"+bg_Color);
        $("article.main-container section#watch-preview div.watch span.arm_m").css("background-color", "#"+minutes_Color);
        $("article.main-container section#watch-preview div.watch span.arm_s").css("background-color", "#"+seconds_Color);
        $("article.main-container section#watch-preview div.watch span.arm_h").css("background-color", "#"+hours_Color);
        $("article.main-container section#watch-preview div.watch span.ellipse").css("background-color", "#"+ellipse_color);
        $("article.main-container section#watch-preview div.watch svg#marks path").css("fill", "#"+marks_color);
        $("article.main-container section#watch-preview div.watch h1").css("color", "#"+clock_color);
    }
    
    
});