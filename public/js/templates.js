this["WorldInsight"] = this["WorldInsight"] || {};
this["WorldInsight"]["templates"] = this["WorldInsight"]["templates"] || {};
this["WorldInsight"]["templates"]["post"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "     <div class=\"row\">\n        <div class=\"col-md-11 card\">\n            <div class=\"row\">\n                 <div class=\"post-image\">\n                  <img src=\"../images/portfolio-2.jpg\" class=\"img-responsive\" alt=\"Avatar\">\n                </div>\n                 <div class=\"col-md-8 post-description\">\n                     <div class=\"row\">\n                        <h4>Posted By: "
    + alias2(alias1((depth0 != null ? depth0.postedBy : depth0), depth0))
    + "</h4>\n                     </div>\n                     <div class=\"row\">\n                         <div class=\"titlebox\">\n                    <p class=\"title\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</p>\n                             </div>\n                         <div class=\"postCustomizebox\">\n                             <span data-id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon glyphicon-trash hidden deletePost\" id=\"deletePostIcon"
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" aria-hidden=\"true\"></span>\n                             <span data-id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon glyphicon-edit hidden editbox\" id=\"editPostIcon"
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" aria-hidden=\"true\"></span>\n                         </div>\n                         </div>\n                    <p  class=\"description\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p> \n                     <div class=\"post-like\">\n                         <ul class=\"comments list-unstyled\">\n                             <li class=\"likes-count\">Likes: "
    + alias2(alias1((depth0 != null ? depth0.likeCount : depth0), depth0))
    + "</li>\n                             <li>&nbsp;|&nbsp;</li>\n                             <li class=\"comments-count\">Comments: "
    + alias2(alias1((depth0 != null ? depth0.commentCount : depth0), depth0))
    + "</li>\n                        </ul>\n                    </div>\n                     <div>\n                         <i class=\"fa fa-thumbs-up fa-2x\" aria-hidden=\"true\"></i>\n                     </div>\n                </div>\n                </div>\n                <div style=\"clear: both;\"></div>\n            </div>   \n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.post : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["WorldInsight"]["templates"]["responseDialog"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"ngdialog-message\">\n    <div>\n        <h3>"
    + alias2(alias1((depth0 != null ? depth0.message : depth0), depth0))
    + "</h3>\n    </div>\n    <div>\n        <p>"
    + alias2(alias1((depth0 != null ? depth0.responseMessage : depth0), depth0))
    + "</p>\n    </div>\n    <div class=\"ngdialog-buttons\">\n        <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=confirm(\"OK\")>OK</button>\n    </div>";
},"useData":true});