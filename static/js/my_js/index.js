/**
 * Created by Devin on 2017/10/1.
 */
var currentPage = 0;
var blogCount = 0;
var pageStep = 10;
var tag = 0;
var search = "";
var get_blogs = function (start,end,tag,search) {
    // $("#post-masonry").empty()
  $.post(getRootPath()+"/get_blogs",{'start':start,'end':end,'tag':tag,'search':search},function (data,status) {
      data = eval(data);
      console.log(data);
      blogCount = data.blogCount;

      var blogs = eval(data.blogs_list);
      console.log(blogs);
      $.each(blogs,function (pbjIndex,blog) {
          var html_article =  "";
          if(blog.fields.file !=""){
              html_article = "<article class=\"col-sm-4 post post-masonry post-format-video\">" +
                  "                <div class=\"post-wrapper row\">" +
                  "                    <div class=\"featured-content row\">" +
                  "                        <a>" +
                  "                            <video poster=\"uploads/"+blog.fields.icon+"\" alt=\"\" class=\"img-responsive\">" +
                  "                                 <source src=\"uploads/"+blog.fields.file+"\" type=\"video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;\" >"+
                  "                                 <source src=\"uploads/"+blog.fields.file+"\" type=\"video/ogg; codecs=&quot;theora, vorbis&quot;\" >" +
                  "                                 <source src=\"uploads/"+blog.fields.file+"\" type=\"video/webm; codecs=&quot;vp8, vorbis&quot;\" >" +
                  "                             <p>你的浏览器不支持</p>" +
                  "                            </video>"+
                  "                            <img src=\"static/images/play-btn.png\" alt=\"\" class=\"video-mark\">" +
                  "                        </a>" +
                  "                    </div>" +
                  "                    <div class=\"post-excerpt row\">" +
                  "                        <h5 class=\"post-meta\">" +
                  "                            <a href=\"#\" class=\"date\">"+blog.fields.create_time.replace('T',' ')+"</a>" +
                  "                            <span class=\"post-author\"><i>by</i><a href=\"about.html\">"+blog.fields.user[1]+"</a></span>" +
                  "                        </h5>" +
                  "                        <h3 class=\"post-title\"><a href=\"single.html?blogId="+blog.pk+"\">"+blog.fields.title+"</a></h3>" +
                  "                        <p>"+blog.fields.description+"</p>" +
                  "                        <footer class=\"row\">" +
                  "                            <h5 class=\"taxonomy\"><i>in</i> <a href=\""+getRootPath()+'/index.html?page=1&tag='+blog.fields.tag[0]+"\">"+blog.fields.tag[1]+"</a></h5>" +
                  "                            <div class=\"response-count\"><img src=\"static/images/comment-icon-gray.png\">"+blog.fields.comment_count+"</div>" +
                  "                        </footer>" +
                  "                    </div>" +
                  "                </div>" +
                  "            </article>";
          }else if(blog.fields.icon == ""){
              html_article = "<article class=\"col-sm-4 post post-masonry post-format-quote\""+
                  "                <div class=\"post-wrapper row\">" +
                  "                    <div class=\"post-excerpt row\">" +
                  "                        <h5 class=\"post-meta\">" +
                  "                            <a class=\"date\">"+blog.fields.create_time.replace('T',' ')+"</a>" +
                  "                            <span class=\"post-author\"><i>by</i><a href=\"about.html\">"+blog.fields.user[1]+"</a></span>" +
                  "                        </h5>" +
                  "                        <h3 class=\"post-title\"><a href=\"single.html?blogId="+blog.pk+"\">"+blog.fields.title+"</a></h3>" +
                  "                        <h5 class=\"quote-maker\">"+blog.fields.description+"</h5>" +
                  "                        <footer class=\"row\">" +
                  "                            <h5 class=\"taxonomy\"><i>in</i> <a href=\""+getRootPath()+'/index.html?page=1&tag='+blog.fields.tag[0]+"\">"+blog.fields.tag[1]+"</a></h5>" +
                  "                            <div class=\"response-count\"><img src=\"static/images/comment-icon-white.png\" alt=\"\">"+blog.fields.comment_count+"</div>" +
                  "                        </footer>" +
                  "                    </div>" +
                  "                </div>" +
                  "            </article>";
          }else if(blog.fields.icon1 == "" ){
              html_article = "<article class=\"col-sm-4 post post-masonry post-format-image\">"+
                    "<div class=\"post-wrapper row\"><div class=\"featured-content row\">"+
                    "<a href=\"single.html?blogId="+blog.pk+"\"><img src=\"uploads/"+blog.fields.icon+"\"  alt=\"\" class=\"img-responsive\"></a>"+
                    "</div><div class=\"post-excerpt row\"><h5 class=\"post-meta\">"+
                    "<a class=\"date\">"+blog.fields.create_time.replace('T',' ')+"</a>"+
                    "<span class=\"post-author\"><i>by</i><a href=\"about.html\">"+blog.fields.user[1]+"</a></span>"+
                    "</h5><h3 class=\"post-title\"><a href=\"single.html?blogId="+blog.pk+"\">"+blog.fields.title+"</a></h3><p>"+blog.fields.description+"</p>"+
                    "<footer class=\"row\"><h5 class=\"taxonomy\"><i>in</i> <a href=\""+getRootPath()+'/index.html?page=1&tag='+blog.fields.tag[0]+"\">"+blog.fields.tag[1]+"</a></h5>"+
                    "<div class=\"response-count\"><img src=\"static/images/comment-icon-gray.png\" alt=\"\">"+blog.fields.comment_count+"</div>"+
                    "</footer></div></div></article>";

          }else{
              html_article = " <article class=\"col-sm-4 post post-masonry post-format-gallery\">" +
                  "                <div class=\"post-wrapper row\">" +
                  "                    <div class=\"featured-content row\">" +
                  "                        <div class=\"gallery-of-post\"> "+
                  "<div class=\"item\" style=\"height:200px\"><img src=\"uploads/"+ blog.fields.icon +"\" alt=\"\"></div>"+
                  "<div class=\"item\" style=\"height:200px\"><img src=\"uploads/"+ blog.fields.icon1 +"\" alt=\"\"></div>" ;
              if(blog.fields.icon2 != ""){
                  html_article = html_article + "<div class=\"item\" style=\"height:200px\"><img src=\"uploads/"+ blog.fields.icon2 +"\" alt=\"\"></div>";

              }
              if(blog.fields.icon3 != ""){
                  html_article = html_article + "<div class=\"item\" style=\"height:200px\"><img src=\"uploads/"+ blog.fields.icon3 +"\" alt=\"\"></div>";

              }
              if(blog.fields.icon4 != ""){
                  html_article = html_article + "<div class=\"item\" style=\"height:200px\"><img src=\"uploads/"+ blog.fields.icon4 +"\" alt=\"\"></div>";

              }
              html_article = html_article+
                  "                        </div>" +
                  "                    </div>" +
                  "                    <div class=\"post-excerpt row\">" +
                  "                        <h5 class=\"post-meta\">" +
                  "                            <a class=\"date\">"+blog.fields.create_time.replace('T',' ')+"</a>" +
                  "                            <span class=\"post-author\"><i>by</i><a href=\"about.html\">"+blog.fields.user[1]+"</a></span>" +
                  "                        </h5>" +
                  "                        <h3 class=\"post-title\"><a href=\"single.html?blogId="+blog.pk+"\">"+blog.fields.title+"</a></h3>" +
                  "                        <p>"+blog.fields.description+"</p>" +
                  "                        <footer class=\"row\">" +
                  "                            <h5 class=\"taxonomy\"><i>in</i> <a href=\""+getRootPath()+'/index.html?page=1&tag='+blog.fields.tag[0]+"\">"+blog.fields.tag[1]+"</a></h5>" +
                  "                            <div class=\"response-count\"><img src=\"images/comment-icon-gray.png\" alt=\"\">"+blog.fields.comment_count+"</div>" +
                  "                        </footer>" +
                  "                    </div>" +
                  "                </div>" +
                  "            </article>";
          }
           $("#post-masonry").append(html_article)
      });
      //为视频标签添加点击播放停止
      $(".video-mark").click(function () {
          $(this).prev().trigger("play");
          $(this).attr('src','');
      });
      $(".img-responsive").click(function () {
          $(this).trigger("pause");
          $(this).next().attr('src',getRootPath()+"/static/images/play-btn.png");
      });
      $.getScript("/static/js/theme.js");

      $.getScript("/static/js/letItSnow.js" );
        dealPagination();//处理分页

      //雪花掉落
       setTimeout(function () {
                 $('#snowspawner').letItSnow({
          color: '#fff',
          size_min: 5,
          size_max: 15,
          zindex: 99999,
          maxcount: 100,
          wind: 250,
          easing_x: "easeInBack",
          easing_y: "easeInCubic",
          fall_time: 10000
        });
        },5000)

  },'json');

};

var getUserById = function (id) {
    $.post(getRootPath()+'/get_user_by_id',{id:id},function (data,status) {
        data = eval("("+data+")")
        console.log(data);
        $("#a_user_name").text(data.fields.user_name);
        $("#p_user_description").text(data.fields.user_description);
        $("#a_user_description1").text(data.fields.user_description);
        $("#a_user_description2").text(data.fields.user_description);
        $("#a_user_description3").text(data.fields.user_description);
        $("#a_user_create_time1").text(data.fields.user_create_time.replace("T"," "));
        $("#a_user_create_time2").text(data.fields.user_create_time.replace("T"," "));
        $("#a_user_create_time3").text(data.fields.user_create_time.replace("T"," "));
        $("#img_user_icon").attr('src',getRootPath()+"/uploads/"+data.fields.user_icon);
        $("#img_user_icon1").attr('src',getRootPath()+"/uploads/"+data.fields.icon1);
        $("#img_user_icon2").attr('src',getRootPath()+"/uploads/"+data.fields.icon2);
        $("#img_user_icon3").attr('src',getRootPath()+"/uploads/"+data.fields.icon3);
    },'json')
};

(function () {
    getUserById(1);
    currentPage = getUrlParam("page");
    tag = getUrlParam("tag");
    search = getUrlParam("search");
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if(search != null && search != undefined && search != ""){
        if(currentPage == null || currentPage == undefined || !re.test(currentPage)){
            currentPage = 1;
            get_blogs((currentPage-1)*pageStep,currentPage*pageStep,0,search);
        }else{
            currentPage = parseInt(currentPage);
            get_blogs((currentPage-1)*pageStep,currentPage*pageStep,0,search);

        }
    }else{

        if(tag != null && tag != undefined && re.test(tag) && tag != ""){
            if(currentPage == null || currentPage == undefined || !re.test(currentPage)){
                currentPage = 1;
                get_blogs((currentPage-1)*pageStep,currentPage*pageStep,tag,"");
            }else{
                currentPage = parseInt(currentPage);
                get_blogs((currentPage-1)*pageStep,currentPage*pageStep,tag,"");

            }

        }else{

            if(currentPage == null || currentPage == undefined || !re.test(currentPage)){
                currentPage = 1;
                get_blogs((currentPage-1)*pageStep,currentPage*pageStep,0,"");
            }else{
                currentPage = parseInt(currentPage);
                get_blogs((currentPage-1)*pageStep,currentPage*pageStep,0,"");

            }

        }

    }

})();

/**
 * 处理分页
 */
function dealPagination() {
    $("#pre_page").attr("href","index.html?page="+(currentPage - 1)+"&tag="+tag+"&search="+search);
    $("#next_page").attr("href","index.html?page="+(currentPage + 1)+"&tag="+tag+"&search="+search);

    if(currentPage <= 1){
        $("#pre_page").hide();
    }

    if(currentPage >= Math.floor(blogCount/pageStep)+1){
        $("#next_page").hide();
    }
};

