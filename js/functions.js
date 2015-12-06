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
};

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
            maxVisible: 10
        });

    });

}


function getPagination(num) {
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
                                output += '<p style="font-size:13px;" ><span class="fa fa-clock-o"></span> ' + convert(data[i - j].date) + '</p> <h4>' + data[i - j].title + '</h4> <p style="font-size:14px;" >' + data[i - j].content_half + '<a  href="post_page.html?p=' + data[i - j].id + '/' + data[i - j].link + '" class="btn btn-default btn-xs">devamını oku ..</a></p> <p class="lead" style="font-size:12px;" ></p> <p class="pull-right" style="font-size:12px;" ><span class="label label-warning">' + data[i - j].tags + '</span> <span class="label label-success">tag</span> <span class="label label-default">post</span></p> <ul class="list-inline" style="font-size:12px;" ><li><a href="#">29 kasım 2015</a></li><li><a href="#"><i class="fa fa-comment"></i> 4 yorum</a></li><li><a href="#"><i class="fa fa-share"></i> 34 paylaşım</a></li></ul> <hr>';
                            }
                        }
                        $(".content").html(output);
                    }
                }
            }
        });


    });

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
                for (i = 0; i < arr.length; i++) {
                    if (postId == arr[i].id) {
                        $(".post-content").html(arr[i].content_full);
                        $(".post-title").html(arr[i].title);
                        $(".post-date").html('<span class="fa fa-clock-o"></span> '+convert(arr[i].date));

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
    $saat = Math.round($fark / 60 * 60);
    $gun = Math.round($fark / 60 * 60 * 24);
    $hafta = Math.round($fark / 60 * 60 * 24 * 7);
    $ay = Math.round($fark / 60 * 60 * 24 * 7 * 4);
    $yil = Math.round($fark / 60 * 60 * 24 * 7 * 4 * 12);

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

function callFunctions() {
    //pagination size
    setInterval(paginationSize, 1000);

    //default num 1
    getPagination(1);

    //page count
    totalPostPage();

    getPost();
}