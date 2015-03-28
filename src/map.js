export class Map{
  constructor(){
    this.heading = 'Google Maps';
  }

  attached() {
    this.googlemap = new google.maps.Map(this.map, {
        center: new google.maps.LatLng(49.2, 237),
        zoom: 10
    });
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
