(function() {
    'use strict';
    
    moment.locale('fi');
    
    var weekdays = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'];
    
    var selectedDate = moment(new Date());
        
    var contentElem = document.getElementById('main-content'),
    
        source = document.getElementById('main-template').innerHTML,
        template = doT.template(source),
        loadingIcon = '<div class="loading-icon"><i class="fa fa-circle-o-notch fa-spin"></i></div>',
        
        apiUrl = 'https://api.ruoka.xyz/';
        
    updateMenus(selectedDate);
    
    document.getElementById('next-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.add(1, 'day');
        
        updateMenus(selectedDate);
    });
    
    document.getElementById('prev-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.subtract(1, 'day');
        
        updateMenus(selectedDate);
    });
        
    
    function updateMenus(date) {
        contentElem.innerHTML = loadingIcon;
        
        var dateString = date.format('YYYY-MM-DD'),
            requestUrl = apiUrl + dateString;
            
        var req = new XMLHttpRequest();
        
        req.addEventListener('load', function() {
            var context = JSON.parse(this.responseText);
            context.date = weekdays[date.weekday()] + ' ' + date.format('D.M.');
            
            contentElem.innerHTML = template(context);
        });
        
        req.open('get', requestUrl, true);
        req.send();
    }
})();