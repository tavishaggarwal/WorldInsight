this["WorldInsight"] = this["WorldInsight"] || {};
this["WorldInsight"]["templates"] = this["WorldInsight"]["templates"] || {};
this["WorldInsight"]["templates"]["post"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"col-md-5 card\">\n            <div class=\"row\">\n                 <div class=\"col-md-6 col-sm-4 post-image\">\n                  <img src=\"../images/portfolio-2.jpg\" class=\"img-responsive\" alt=\"Avatar\">\n                </div>\n                 <div class=\"col-md-6 col-sm-8 post-description\">\n                    <p class=\"truncate title\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</p>\n                    <p class=\"truncate\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p> \n                     <div class=\"post-like\">\n                     <ul class=\"comments list-unstyled\">\n                         <li class=\"likes-count\">Likes: "
    + alias2(alias1((depth0 != null ? depth0.likeCount : depth0), depth0))
    + "</li>\n                         <li>&nbsp;|&nbsp;</li>\n                         <li class=\"comments-count\">Comments: "
    + alias2(alias1((depth0 != null ? depth0.commentCount : depth0), depth0))
    + "</li>\n                    </ul>\n                        <i class=\"fa fa-thumbs-up fa-2x\" aria-hidden=\"true\"></i>\n                    </div>\n                </div>\n            </div>   \n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.post : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});