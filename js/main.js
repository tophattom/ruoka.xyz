(function() {
    'use strict';

    var contentElem = document.getElementById('main-content'),
    
        source = document.getElementById('main-template').innerHTML,
        template = Handlebars.compile(source),
        
        apiUrl = 'http://api.ruoka.xyz/',
        dateString = (new Date()).toISOString().split('T')[0],
        requestUrl = apiUrl + dateString;
        
    var req = new XMLHttpRequest();
    
    req.addEventListener('load', function() {
        var context = JSON.parse(this.responseText);
        
        contentElem.innerHTML = template(context);
    });
    
    req.open('get', requestUrl, true);
    req.send();
})();