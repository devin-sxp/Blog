/**
 * Created by Devin on 2017/10/1.
 */
var blogId = 0;
var pageStep = 5;
var currentPage = 1;
var commentCount = 0;
var get_blog_by_id = function (blogId) {
  $.post(getRootPath()+"/get_blog_by_id",{blogId:blogId},function (data,status) {
    if(data.length == 0){
        alert("没有该文章啦");
        return
    }

    data = eval("("+data+")");
          console.log(data);

    $("#a_create_time").text(data.fields.create_time.replace('T',' '));
    $("#h_title").text(data.fields.title);
    $("#img_icon").attr('src','uploads/'+data.fields.icon);
    var converter = new Markdown.Converter();
    // var content = converter.makeHtml(data.fields.content);
      var content = marked(data.fields.content);
    $("#div_content").html(content);
    $("#p_description").text(data.fields.description);
    $("#a_tag").text(data.fields.tag[1]).attr('href',getRootPath()+'/index.html?page=1&tag='+data.fields.tag[0]);
    $("#a_blog_create_user").text(data.fields.user[1]);
    if(data.fields.file != ""){
            var html_video ="<video controls style='width: 100%;height: 100%' poster=\"uploads/"+data.fields.icon+"\" alt=\"\" class=\"img-responsive\">" +
                      "       <source src=\"uploads/"+data.fields.file+"\" type=\"video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;\" >"+
                      "       <source src=\"uploads/"+data.fields.file+"\" type=\"video/ogg; codecs=&quot;theora, vorbis&quot;\" >" +
                      "       <source src=\"uploads/"+data.fields.file+"\" type=\"video/webm; codecs=&quot;vp8, vorbis&quot;\" >" +
                      "<p>你的浏览器不支持</p>" +
                      "</video>"+
                      "<img src=\""+getRootPath()+"/static/images/play-btn.png\" alt=\"\" class=\"video-mark\">" ;
            $("#div_video").append(html_video).addClass("embed-responsive-16by9");

    }


    var html_li = "";
    if(data.fields.icon1 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon1 +"\" alt=\"\"></li>";
    }
    if(data.fields.icon2 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon2 +"\" alt=\"\"></li>";
    }
    if(data.fields.icon3 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon3 +"\" alt=\"\"></li>";
    }
    if(data.fields.icon4 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon4 +"\" alt=\"\"></li>";
    }
    if(data.fields.icon1 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon1 +"\" alt=\"\"></li>";
    }
    if(data.fields.icon2 !=""){
        html_li = html_li+"<li><img src=\"uploads/"+ data.fields.icon2 +"\" alt=\"\"></li>";
    }

    $(".slides").append(html_li);

    $.getScript("/static/js/theme.js");
             //为视频标签添加点击播放停止

    $(".img-responsive").click(function () {
        $(this).trigger("pause");
        $(this).next().attr('src',getRootPath()+"/static/images/play-btn.png");
    });

    $(".video-mark").click(function () {
        $(this).prev().trigger("play");
        $(this).attr('src','');
    });
  },'json');


};
var get_comment_by_blog_id = function (blogId,start,end) {
    $.post(getRootPath()+"/get_comment_by_blog_id",{blogId:blogId,start:start,end:end},function (data,status) {
        data = eval(data);
        console.log(data);
        commentCount = data.count;
        $(".response-count").text(commentCount+" comments");
        comments = eval(data.comments);
        $.each(comments,function (objIndex,comment) {
            var html_comment = "<div class=\"media comment\">" +
                "<div class=\"media-left\">" +
                "        <a><img src=\"static/images/posts/c1.jpg\" alt=\"\" class=\"img-circle\"></a>" +
                "</div>" +
                "<div class=\"media-body\">" +
                "        <h4><a>"+comment.fields.full_name+"</a></h4>" +
                "        <h5><a class=\"date\">"+comment.fields.create_time.replace('T',' ')+"</a> | <a class=\"reply-link\">reply</a></h5>" +
                "        <p style='margin-bottom: 10px'>"+comment.fields.message+"</p>" +
                "<a target='_blank' href='"+comment.fields.website+"'>"+comment.fields.website+"</a>"+
                "</div>" +
                "</div><hr>";

            $("#div_comments").append(html_comment)
        })
    });
};

var getUserById = function (id) {
    $.post(getRootPath()+'/get_user_by_id',{id:id},function (data,status) {
        data = eval("("+data+")")
        $("#a_user_name").text(data.fields.user_name);
        $("#p_user_description").text(data.fields.user_description)
        $("#img_user_icon").attr('src',getRootPath()+"/uploads/"+data.fields.user_icon)
    },'json')
};

(function () {
    getUserById(1)
    blogId = parseInt(getUrlParam("blogId"));
    get_blog_by_id(blogId);
    get_comment_by_blog_id(blogId,pageStep*(currentPage-1),pageStep*currentPage);
    if (blogId == 1){
        $("#pre_article").hide();
    }
    $("#pre_article").attr("href","single.html?BlogId="+(blogId-1));
    $("#next_article").attr("href","single.html?BlogId="+(blogId+1));

    $("#blog_id").val(blogId)

})();

$("#load_more").on('click',function () {
    if(currentPage == Math.floor(commentCount/pageStep)+1){
        alert("没有更多了");
        return
    }
    currentPage++;
    get_comment_by_blog_id(blogId,pageStep*(currentPage-1),pageStep*currentPage);
});
