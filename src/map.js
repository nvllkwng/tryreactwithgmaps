import {Addresses} from './addresses';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';
var defaultCircleOptions = {
  strokeColor: '#1187f9',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#1187f9',
  fillOpacity: 0.35,
  map: null,
  center: null,
  radius: 0
};

export class Map{
  static inject() {
    return [Addresses, EventAggregator];
  }
  constructor(addresses, vent){
    this.heading = 'Google Maps';
    this.addresses = addresses;
    this.vent = vent;
    this.vent.subscribe('addresses:added', this.onAddressAdded.bind(this));
    this.vent.subscribe('addresses:removed', this.onAddressRemoved.bind(this));
    this.vent.subscribe('focusAddress', this.onFocusAddress.bind(this));
    this.geocoder = new google.maps.Geocoder();
    this.mapCircles = [];
  }

  getCircleOption(options, map, metric, center) {
      options = options || {};
      return _.extend(options, defaultCircleOptions, {
          radius: metric,
          center: center,
          map: map
      });
  }

  onFocusAddress(address) {
    this.updateMapLocation(address);
  }

  onAddressRemoved(address) {
    if(this.mapCircles[address]) {
        this.mapCircles[address].setMap(null);
        delete this.mapCircles[address];
    }
  }

  onAddressAdded(address) {
    this.updateMapLocation(address, function(results) {
        this.drawCircleOnMap(address, results[0].geometry.location);
    }.bind(this));
  }

  drawCircleOnMap(address, center) {
      this.mapCircles[address] = new google.maps.Circle(this.getCircleOption(null, this.googlemap, Math.random() * 50000 , center));
  }

  updateMapLocation(address, success) {
      var map = this.googlemap;
      var self = this;
      this.waitingOnGmaps = true;
      this.geocoder.geocode( { 'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);

              if(success && typeof success === 'function') {
                  success(results);
              }
          } else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
          self.waitingOnGmaps = false;
          self.activeAddress = address;
      });
  }

  attached() {
    this.googlemap = new google.maps.Map(this.map, {
        center: new google.maps.LatLng(49.2, 237),
        zoom: 10
    });
  }
}
