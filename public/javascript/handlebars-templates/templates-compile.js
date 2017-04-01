var template = Handlebars.compile('<div>Hello {{name}}</div>');
var appEl = document.getElementById("post");
appEl.innerHTML = template({name: 'tavish'});
