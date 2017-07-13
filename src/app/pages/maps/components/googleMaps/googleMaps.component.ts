import {Component, ElementRef} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
declare var google: any;
@Component({
  selector: 'google-maps',
  styleUrls: ['./googleMaps.scss'],
  templateUrl: './googleMaps.html',
})
export class GoogleMaps {

  constructor(private _elementRef:ElementRef) {
  }

  map: any;
  initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
  ngAfterViewInit() {
    // let el = this._elementRef.nativeElement.querySelector('.google-maps');

    /*// TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });*/
  }
}
