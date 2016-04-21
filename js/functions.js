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
    var url = 'service/posts.json';
    $.getJSON(url, function(data) {
        $pageLimit = 4;
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

    var url = 'service/posts.json';
    var page = [];
    $.getJSON(url, function(data) {

        $pageLimit = 4;
        $postCount = data.length;
        $pageCount = Math.ceil($postCount / $pageLimit);

        page[0] = data[$postCount - 1].id;
        for (var i = 1; i < $pageCount; i++) {
            page[i] = page[i - 1] - 4;
        }

        $.each(page, function(key, value) {
            if (num == (key + 1) || $(".pagination > li").attr("class") == "active") {
                for (var i = 0; i < data.length; i++) {
                    if (value == data[i].id) {
                        var output = "";
                        for (var j = 0; j < 4; j++) {
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

    //}
}


function getPost() {
    $.ajax({
        type: "GET",
        url: "service/posts.json",
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
                        
                        break;

                        // setInterval(function(){
                        //     location.href='http://alicankustemur.github.io';
                        // }, 4000);

                    }
                } 
            }

        },
        error: function(err) {
            alert(err.responseText);
        }
    });
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

function syntaxHightlighter(){
    SyntaxHighlighter.config.bloggerMode = true;
    SyntaxHighlighter.config.clipboardSwf = 'http://alexgorbatchev.com/pub/sh/current/scripts/clipboard.swf';
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();
}


function horizontalScroll() {
    var url = 'service/posts.json';
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

    var url = 'service/posts.json';
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

function findPostByTag(){
     var url = 'service/posts.json';
    $.getJSON(url, function(data) {

        for(var i = 0 ; i < data.length; i++){
            alert(data[i].tags);
        }

    });

}


function index(){
    if(location.pathname == "/alicankustemur.github.io/"){
        getPagination(1);
        totalPostPage();
        setInterval(paginationSize, 1000);
    }
}

function post_page(){
    if(location.pathname == "/post_page.html"){
        getPost();
        syntaxHightlighter();
    }
}



function callFunctions() {
    

    index();

    post_page();

    findPostByTag();

    $(".horizontalScroll").hide();
    horizontalScroll();
    $('.horizontalScroll').easyTicker({
        visible: 1,
        interval:5000
        })
    setInterval(horizontalScroll, 5000);

    getAutoComplete();

}