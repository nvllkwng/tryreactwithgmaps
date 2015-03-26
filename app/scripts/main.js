/*global React*/
/* jshint devel:true */
var app = app || {};
(function($) {
    'use strict';
    var MapApp = app.MapApp;
    $(function() {
        React.render(<MapApp/>,
            document.getElementById('MapApp')
        );
    });
}(jQuery));
