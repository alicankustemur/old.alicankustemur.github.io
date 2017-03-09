/**
 * jQuery.toTop.js v1.1
 * Developed by: MMK Jony
 * Fork on Github: https://github.com/mmkjony/jQuery.toTop
 **/
$(document).ready(function(){
	 $('.to-top').toTop({
               //options with default values
               autohide: true,  //boolean 'true' or 'false'
               offset: 420,     //numeric value (as pixels) for scrolling length from top to hide automatically
               speed: 500,      //numeric value (as mili-seconds) for duration
               position:true,   //boolean 'true' or 'false'. Set this 'false' if you want to add custom position with your own css
               right: 15,       //numeric value (as pixels) for position from right. It will work only if the 'position' is set 'true'
               bottom: 200       //numeric value (as pixels) for position from bottom. It will work only if the 'position' is set 'true'
           });
	 $(".to-top").hover(function(){
	 	$(this).css({
	 		"text-decoration":"none",
	 		"color":"white",
	 		"background-color":"#5b5f62"
	 	});
	 }).mouseout(function(){
	 	$(this).css("background-color","#33383B").animate("slow");
	 });

});
!function(o){"use strict";o.fn.toTop=function(t){var i=this,e=o(window),s=o("html, body"),n=o.extend({autohide:!0,offset:420,speed:500,position:!0,right:15,bottom:30},t);i.css({cursor:"pointer"}),n.autohide&&i.css("display","none"),n.position&&i.css({position:"fixed",right:n.right,bottom:n.bottom}),i.click(function(){s.animate({scrollTop:0},n.speed)}),e.scroll(function(){var o=e.scrollTop();n.autohide&&(o>n.offset?i.fadeIn(n.speed):i.fadeOut(n.speed))})}}(jQuery);