const blogUrl = "/alicankustemur.github.io/";
const ajaxUrl = "service/posts.json"; 

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function paginationSize() {
    if (window.matchMedia('(max-width: 480px)').matches || window.matchMedia('(max-width: 767px)').matches) {
        $(".post-pagination > .pagination").addClass("pagination-sm");
    } else {
        $(".post-pagination > .pagination").removeClass("pagination-sm");
    }
}


function totalPostPage() {
    var url = ajaxUrl;
    $.getJSON(url, function(data) {
        $pageLimit = 5;
        $postCount = data.length;
        $pageCount = Math.ceil($postCount / $pageLimit);

        $('.post-pagination').bootpag({
            total: $pageCount,
            maxVisible: 7
        });

    });

}


function getPagination(num) {
    
    //if(location.pathname != "/alicankustemur.github.io/tags.html" || location.pathname != "/alicankustemur.github.io/tags.html"){

    var url = ajaxUrl;
    var page = [];
    $.getJSON(url, function(data) {
        $pageLimit = 5;
        $postCount = data.length;
        $pageCount = Math.ceil($postCount / $pageLimit);

        page[0] = data[$postCount - 1].id;
        for (var i = 1; i < $pageCount; i++) {
            page[i] = page[i - 1] - 5;
        }

        $.each(page, function(key, value) {
            if (num == (key + 1) || $(".pagination > li").attr("class") == "active") {
                for (var i = 0; i < data.length; i++) {
                    if (value == data[i].id) {
                        var output = "";
                        for (var j = 0; j < 5; j++) {
                            if (data[i - j] != null) {
                                output += '<p style="font-size:13px;" ><span class="fa fa-clock-o"></span> ' + convert(data[i - j].date) + '</p> <h4>' + data[i - j].title + '</h4> <p style="font-size:14px;" >' + data[i - j].content_half + '<br /><a  href="post_page.html?p=' + data[i - j].id + '/' + data[i - j].link + '" class="btn btn-default btn-xs">devamını oku ..</a></p> <p class="lead" style="font-size:12px;" ></p><hr>';
                                //output += '<p style="font-size:13px;" ><span class="fa fa-clock-o"></span> ' + convert(data[i - j].date) + '</p> <h4>' + data[i - j].title + '</h4> <p style="font-size:14px;" >' + data[i - j].content_half + '<a  href="post_page.html?p=' + data[i - j].id + '/' + data[i - j].link + '" class="btn btn-default btn-xs">devamını oku ..</a></p> <p class="lead" style="font-size:12px;" ></p> <p class="pull-right" style="font-size:12px;" ><span class="label label-warning">' + data[i - j].tags + '</span> <span class="label label-success">tag</span> <span class="label label-default">post</span></p> <ul class="list-inline" style="font-size:12px;" ><li><a href="#">29 kasım 2015</a></li><li><a href="#"><i class="fa fa-comment"></i> 4 yorum</a></li><li><a href="#"><i class="fa fa-share"></i> 34 paylaşım</a></li></ul> <hr>';
                            }
                        }
                        $(".content").html(output);
                    }
                }
            }
        });


    });

}

function redirect(){
    $(document).ready(function(){

        $("title").html("404 Bir hata oluştu.");
        $(".post-content").html("Aradığınız içerik bulunamamıştır.");
        $(".post-title").html("<b>404</b> Bir hata oluştu.");
        $(".post-date").html("");
        $i = 6 ;
        setInterval(function(){
            $i--;
            $(".post-content").html("Aradığınız içerik bulunamamıştır. <br /> Anasayfaya yönlendiriliyorsunuz... "+$i);
            if($i == 1){
                location.href = "http://alicankustemur.github.io";
            }
        },1000);
        
    });
}

function getPost() {
    $.ajax({
        type: "GET",
        url: ajaxUrl,
        data: {
            "id": "id"
        },
        dataType: "json",
        success: function(result) {
            if (result.error) {
                alert(result.error);
            } else {
                var jsonData = JSON.stringify(result);
                var arr = JSON.parse(jsonData);
                var postId = getUrlParameter("p");
                postId = postId.substr(0, postId.indexOf('/'));
                $count = 0;
                for (i = 0; i < arr.length; i++) {
                    if (postId == arr[i].id) {
                        $("title").html(arr[i].title +" - ali can kuştemur | bir programcının hayal dünyası");
                        $(".post-content").html(arr[i].content_full);
                        $(".post-title").html(arr[i].title);
                        $(".post-date").html('<span class="fa fa-clock-o"></span> '+convert(arr[i].date));
                        $count++;
                    }else if(i == ( arr.length - 1 ) && $count < 1){
                        redirect();
                    }
                } 
            }

        },
        error: function(err) {
            alert(err.responseText);
        }
    }).done(function(){
        syntaxHighlighter();

        //set images to responsive
        $("img.content-img").addClass("img-responsive");
        autoFocusToPostContent();

    });

    return true;
}

function convert($time) {
    //şimdiki zaman ile gönderilen zaman farkını bulma

    var timestamp = Math.floor(new Date().getTime() / 1000);

    $fark = timestamp - $time;
    //farkın ne kadar süre yaptığını hesaplama
    $sn = $fark;
    $dk = Math.round($fark / 60);
    $saat = Math.round($fark / 60 / 60);
    $gun = Math.round($fark / 60 / 60 / 24);
    $hafta = Math.round($fark / 60 / 60 / 24 / 7);
    $ay = Math.round($fark / 60 / 60 / 24 / 7 / 4);
    $yil = Math.round($fark / 60 / 60 / 24 / 7 / 4 / 12);
    
    //farkın üzerinden ne kadar zaman geçtiğini bulma
    if ($sn < 60) {
        return $sn + " saniye önce";
    } else if ($dk < 60) {
        return $dk + " dakika önce";
    } else if ($saat < 24) {
        return $saat + " saat önce";
    } else if ($gun < 7) {
        return $gun + " gün önce";
    } else if ($hafta < 4) {
        return $hafta + " hafta önce";
    } else if ($ay < 12) {
        return $ay + " ay önce";
    } else {
        return $yil + " yıl önce";
    }
}

function syntaxHighlighter(){
    SyntaxHighlighter.config.bloggerMode = true;
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();

    $(document).ready(function(){
       $("pre").each(function(index,object){
            var brush = $(this).attr("class");
            var highlight = $(this).attr("highlight");
            
            if(highlight == undefined){
            	$(this).replaceWith('<sh class="brush: '+ brush +'" >'+ this.innerHTML +'</sh>');
            }else{
            	$(this).replaceWith('<sh class="brush: '+ brush +'" highlight="'+ highlight +'" >'+ this.innerHTML +'</sh>');
            }
            
             
        });
    });

    var brushes = ["java","sql","xml","html","plain"];

    $.each(brushes,function(index,value){
        $('sh.'+brushes[index]).each(function(i, obj) {
            
            if(brushes[index] == "java"){
                var brush = new SyntaxHighlighter.brushes.Java(),html;
            }else if(brushes[index] == "sql"){
                var brush = new SyntaxHighlighter.brushes.Sql(),html;
            }else if(brushes[index] == "xml"){
                var brush = new SyntaxHighlighter.brushes.Xml(),html;
            }else if(brushes[index] == "plain"){
                var brush = new SyntaxHighlighter.brushes.Plain(),html;
            }
            
            var highlight = $(this).attr("highlight");
            brush.init({highlight:highlight});
            html = brush.getHtml($(this).html());
            $(this).html(html);
        });            
    });

    


}


function horizontalScroll() {
    var url = ajaxUrl;
    var page = [];

    $.getJSON(url, function(data) {

        var rand = Math.floor(Math.random() * (parseInt(data[data.length - 1].id) - parseInt(data[0].id))) + parseInt(data[0].id);

        var i = 0;
        while(parseInt(data[i].id) != rand && i < data.length){
            i++;
             if(parseInt(data[i].id) == rand && i < data.length){

            $(".horizontalScroll > ul").append('<li><a href="post_page.html?p=' + data[i].id + '/' + data[i].link + '">' + data[i].title + '</a></li>');
            $(".horizontalScroll").show();
            }
        }        
    });

}

function getAutoComplete(){

    var url = ajaxUrl;
    var source = [];
    $.getJSON(url, function(data) {

        for(var i = 0 ; i < data.length ; i++){
            source.push({
                label:data[i].title,
                the_link:'post_page.html?p=' + data[i].id + '/' + data[i].link
            });
        }

    });

    $( ".search" ).autocomplete({
      source: source,
      select:function(e,ui) { 
        location.href = ui.item.the_link;
      }
    });

    $("form").submit(function(){
       $search = $(".search").val();
        location.href="tags.html?search="+$search;
        return false;
    });

}

function getTheme(){
 var themeNames = [ 
                     "cosmo",
                     "cerulean" ,
                     "custom" ,
                     "cyborg",
                     "darkly",
                     "flatly",
                     "journal",
                     "lumen",
                     "paper",
                     "readable",
                     "sandstone",
                     "simplex",
                     "slate",
                     "spacelab",
                     "superhero",
                     "united",
                     "yeti" 
                ];

            for(var i=0 ; i < themeNames.length; i++){
                $(".theme-dropdown").append('<li><a href="?theme='+ themeNames[i] +'" class="'+ themeNames[i] +'">'+ themeNames[i] +'</a></li>');

            }

             $(".paper").click(function(){
                  $(".theme").html('<link rel="stylesheet" href="template/'+ getUrlParameter("theme") +'/bootstrap.min.css">"');
                });

             if(!getUrlParameter("theme")){
                $(".theme").html('<link rel="stylesheet" href="template/cosmo/bootstrap.min.css">');
             }else{
                $(".theme").html('<link rel="stylesheet" href="template/'+ getUrlParameter("theme") +'/bootstrap.min.css">');
             }
               
}

function findPostByTag(tag){
     var url = ajaxUrl;
        $(".searchResult").html(tag + " ile ilgili tüm sonuçlar;");
        $.getJSON(url, function(data) {

            $found = 0;
            for(var i = 0 ; i < data.length; i++){
                $tags = data[i].tags.split(",");
                $.each($tags , function(key,value){
                    tag = tag.replace(/\s/g, '').toLowerCase();
                    value = value.replace(/\s/g, '').toLowerCase();
                    if(tag == value ){
                        $(".table > tbody").append("<tr><td class=\"rowTitle\"><a href=\"post_page.html?p="+ data[i].id + "/"+ data[i].link +"\">"+ data[i].title +"</a></td></tr>\n");
                        $found++;
                    }
                  });
            }
            if($found == 0){
                $(".table-responsive").html(tag+" ilgili hiçbir sonuç bulunamamıştır.");
                if(tag == undefined){
                    location.href="http://alicankustemur.github.io";
                }
            }
        });
}

function redirectHomePageWhenComeStaticPage(){
    if(getUrlParameter("p") == null){
        location.href = "http://alicankustemur.github.io";
        return true;
    }else{
        return false;
    }
}

function autoFocusToPostContent(){
     $(document).ready(function(){
            if (window.innerWidth <= 480 || window.innerWidth <= 767)  {
                $('.content-place').click();
            }
    });
}

// not using
function ajaxLoading(){
    $body = $("body");

    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }
    });
}

function index(){
    if(location.pathname == "/" || location.pathname == blogUrl){
        getPagination(1);
        totalPostPage();
        setInterval(paginationSize, 1000);
        $(".horizontalScroll").hide();
        horizontalScroll();
        $('.horizontalScroll').easyTicker({
            visible: 1,
            interval:5000
            })
        setInterval(horizontalScroll, 5000);
    }
}

function post_page(){
    if(location.pathname == "/post_page.html" || location.pathname == blogUrl + "post_page.html"){
        if(!redirectHomePageWhenComeStaticPage()){
            getPost();
        }
    }
}

function tags(){
    if(location.pathname == "/tags.html" || location.pathname == blogUrl + "tags.html"){
            findPostByTag(getUrlParameter("search")); 
            getPagination(1);  
    }
}

function setDisplayNoneUntilPageLoad(){
	 var isPaceDone = false;
	    var paceInterval = setInterval(function(){
	    	var paceClass =  $("body").attr("class");
	    	paceClass = paceClass.replace(/\s/g, '');
	    	
	    	var selectors = ".left-sidebar, nav.navbar, .horizontalScroll, .post-full, .content, .post-content, footer.footer-distributed, .to-top, .post-pagination, #disqus_thread";
	    	
	    	if(paceClass != "pace-done"){
	        	$(selectors).css("display","none");
	    	}else{
	    		$("body").removeAttr('style');
	    		$(".loading-bar").css("display","none");
	    		
	    		selectors = selectors.replace(".to-top,",'');
	    		$(selectors).css("display",'');
	    		isPaceDone = true;
	    	}
	    		
	    },100);
	    
	    setTimeout(function(){
	    	if(isPaceDone){
	        	clearInterval(paceInterval);
	        }
	    },5000);
}


function callFunctions() {
	$(".left-sidebar, nav.navbar, .horizontalScroll, .content, footer.footer-distributed, .to-top").css("display","none");
    index();
    post_page();
    tags();
    
    getAutoComplete();
    
    setDisplayNoneUntilPageLoad();
    
}