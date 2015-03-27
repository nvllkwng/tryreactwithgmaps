/*global React*/
var app = app || {};
var addresses = addresses || [];
var mapMarkers = {};
var mapCircles = {};
var geocoder = new google.maps.Geocoder();

var defaultCircleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: null,
    center: null,
    radius: 0
};

// cityCircle = new google.maps.Circle(populationOptions);

(function() {
    'use strict';
    var AddressForm = app.AddressForm;
    var AddressList = app.AddressList;
    var getCircleOption = function(options, map, metric, center) {
        options = options || {};
        return _.extend(options, defaultCircleOptions, {
            radius: metric,
            center: center,
            map: map
        });
        
    };
    app.MapApp = React.createClass({

        componentDidMount: function() {
            this.map = new google.maps.Map(document.getElementById('maps'), {
                center: new google.maps.LatLng(49.2, 237),
                zoom: 10
            });
        },

        getInitialState: function() {
            return {
                addresses: addresses
            };
        },

        onRemoveAddress: function(address) {
            var indexOfAddress = addresses.indexOf(address);
            if(indexOfAddress >= 0) {
                addresses.splice(indexOfAddress, 1);
            }
            if(mapCircles[address]) {
                mapCircles[address].setMap(null);
                delete mapCircles[address];
            }
            this.setState({addresses: addresses});
        },

        onAddAddress: function(address) {
            addresses.push(address);
            this.updateMapLocation(address, function(results) {
                this.setState({addresses: addresses});
                this.drawCircleOnMap(address, results[0].geometry.location);
            }.bind(this));
        },

        drawCircleOnMap: function(address, center) {
            mapCircles[address] = new google.maps.Circle(getCircleOption(null, this.map, 10000, center));
        },

        updateMapLocation: function(address, success) {
            var map = this.map;
            var self = this;
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);

                    if(success && typeof success === 'function') {
                        success(results);
                    }
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },

        render: function () {
            return(
                <div>
                    <AddressForm
                        onAddAddress={this.onAddAddress}
                        showAddBtn={false}
                    />
                    <div id="maps"></div>
                    <AddressList
                        addresses={this.state.addresses}
                        onClickAddress = {this.updateMapLocation}
                        onRemoveAddress = {this.onRemoveAddress}/>
                </div>)
        }
    });
}());