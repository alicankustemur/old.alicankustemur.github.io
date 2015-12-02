$(document).ready(function(){

	$.instantConfess = function(){
	 	var lastId = $(".general-item-list .item:first").attr("id");
			$.ajax({
				type: "POST",
				url: "service/instant_post.php",
				data: {"lastId":lastId},
				dataType: "json",
				success: function(result){
					if(result.error){
						alert(result.error);
					}else{
						$(".general-item-list").prepend(result.data);
					}
				},
				error: function(err){
					//alert(err.responseText); 
				}
			});
	}
	
	setInterval($.instantConfess,60000);
	
});	