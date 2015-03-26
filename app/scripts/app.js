/*global React*/
var app = app || {};
var addresses = addresses || ['v5a3l9'];
var geocoder = new google.maps.Geocoder();
(function() {
    'use strict';
    var AddressForm = app.AddressForm;
    var AddressList = app.AddressList;
    app.MapApp = React.createClass({

        componentDidMount: function() {
            this.map = new google.maps.Map(document.getElementById('maps'), {
                center: new google.maps.LatLng(-34.397, 150.644),
                zoom: 8
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
            this.setState({addresses: addresses});
        },

        onAddAddress: function(address) {
            addresses.push(address);
            this.updateMap(address, this.setState.bind(this, {addresses: addresses}));
        },

        updateMap: function(address, success) {
            var map = this.map;
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    if(success && typeof success === 'function') {
                        success();
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
                    />
                    <div id="maps"></div>
                    <AddressList
                        addresses={this.state.addresses}
                        onClickAddress = {this.updateMap}
                        onRemoveAddress = {this.onRemoveAddress}/>
                </div>)
        }
    });
}());