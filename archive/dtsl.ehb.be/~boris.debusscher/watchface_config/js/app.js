$(document).ready(function(){
    
    var bg_Color;
    var minutes_Color;
    var hours_Color;
    var ellipse_M_color;
    var ellipse_H_color;
    var dots_off_color;
    var dots_on_color;
    var date_color;
    
    
    setColors();
    function setColors(){
        
        $("div#bg").css("background-color", "#"+$("#bg_color").attr("value"));
        $("div#dots-off").css("background-color", "#"+$("#svg_off_color").attr("value"));
        $("div#dots-on").css("background-color", "#"+$("#svg_on_color").attr("value"));
        $("div#hours").css("background-color", "#"+$("input#hours_color").attr("value"));
        $("div#minutes").css("background-color", "#"+$("input#minutes_color").attr("value"));
        $("div#date").css("background-color", "#"+$("input#date_color").attr("value"));
        
        var bgColor = $("input#bg_color").attr("value");
        $("div.watch").css("background-color", "#"+bgColor);
        
        var minutesColor = $("input#minutes_color").attr("value");
        $("div.watch span.arm_m").css("background-color", "#"+minutesColor);
        $("div.watch span.ellipse_m").css("background-color", "#"+minutesColor);
        
        var hoursColor = $("input#hours_color").attr("value");
        $("div.watch span.arm_h").css("background-color", "#"+hoursColor);
        $("div.watch span.ellipse_h").css("background-color", "#"+hoursColor);
        
        var dotsOffColor = $("#svg_off_color").attr("value");
        $("div.watch svg#dots-off circle").css("fill", "#"+dotsOffColor);
        
        var dotsOnColor = $("#svg_on_color").attr("value");
        $("div.watch svg#dots-on circle").css("fill", "#"+dotsOnColor);
        
        var dateColor = $("input#date_color").attr("value");
        $("article.main-container section#watch-preview div.watch h1").css("color", "#"+dateColor);
        
        switch($("#date-switch").attr("value")){
            case "2":
            $("article.main-container section#date div.switch div.switch-button").addClass("date-on");
            $("article.main-container section#watch-preview div.watch h1").animate({opacity: "1"});
            $("article.main-container section#date div.color-box").removeClass("hide");
            break;
        }
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
        ellipse_M_color = $(this).text();
        updateWatch();
    });
    
    $("article.main-container section#hours ul.color-list li").on("click",function(){
        hours_Color = $(this).text();
        $("input#hours_color").attr("value", hours_Color);
        ellipse_H_color = $(this).text();
        updateWatch();
    });
    
    $("article.main-container section#dots-off ul.color-list li").on("click",function(){
        dots_off_color = $(this).text();
        $("#svg_off_color").attr("value", dots_off_color);
        updateWatch();
    });
    
    $("article.main-container section#dots-on ul.color-list li").on("click",function(){
        dots_on_color = $(this).text();
        $("#svg_on_color").attr("value", dots_on_color);
        updateWatch();
    });
    
    $("article.main-container section#date ul.color-list li").on("click",function(){
        date_color = $(this).text();
        $("#date_color").attr("value", date_color);
        updateWatch();
    });
    
    function updateWatch(){
        $("article.main-container section#watch-preview div.watch").css("background-color", "#"+bg_Color);
        $("article.main-container section#watch-preview div.watch span.arm_m").css("background-color", "#"+minutes_Color);
        $("article.main-container section#watch-preview div.watch span.arm_h").css("background-color", "#"+hours_Color);
        $("article.main-container section#watch-preview div.watch span.ellipse_m").css("background-color", "#"+ellipse_M_color);
        $("article.main-container section#watch-preview div.watch span.ellipse_h").css("background-color", "#"+ellipse_H_color);
        $("article.main-container section#watch-preview div.watch svg#dots-off circle").css("fill", "#"+dots_off_color);
        $("article.main-container section#watch-preview div.watch svg#dots-on circle").css("fill", "#"+dots_on_color);
        $("article.main-container section#watch-preview div.watch h1").css("color", "#"+date_color);
    }
    
    $("article.main-container section#date div.switch").on("click",function(){
        if($(this).find("div.switch-button").hasClass("date-on")){
            $(this).find("div.switch-button").removeClass("date-on");
            $(this).parent().find("ul.color-list").slideUp().addClass("hide");
            $("#date-switch").attr("value", "1");
            $("article.main-container section#watch-preview div.watch h1").animate({opacity: "0"});
            $("article.main-container section#date div.color-box").addClass("hide");
        }else{
            $(this).find("div.switch-button").addClass("date-on");
            $("#date-switch").attr("value", "2");
            $("article.main-container section#watch-preview div.watch h1").animate({opacity: "1"});
            $("article.main-container section#date div.color-box").removeClass("hide");
        }
    });
    
    
});