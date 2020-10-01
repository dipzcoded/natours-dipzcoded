import ReactDOM from 'react-dom';
import React, {useState, useEffect, useRef} from 'react'
// import ReactMapGl from "react-mapbox-gl"
import mapboxgl, { Marker } from 'mapbox-gl';
import TourMarker from './TourMarker';
import TourPopup from './TourPopup';

const TourMap = ({tour: {locations, startLocation}}) => {

    const mapContainerRef = useRef(null);
    const [distance, setDistance] = useState({
        latitude : startLocation.coordinates[1],
        longitude : startLocation.coordinates[0]
    })
    
      // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/dipzcoded/ckfnbr72000by19pl0p6o5nc2',
      center: [distance.longitude, distance.latitude],
      zoom: 15,
      scrollZoom : false
    });

    //  // add navigation control (the +/- zoom buttons)
     map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
        const bounds = new mapboxgl.LngLatBounds();

    // adding marker
    locations.forEach(loc => {
        // Add marker
        const markerNode = document.createElement('div');
        const popUpNode = document.createElement('div')
        ReactDOM.render(<TourMarker  />, markerNode);
        ReactDOM.render(<TourPopup desc={loc.description} day={loc.day} />, popUpNode);
        // add marker to app
        new mapboxgl.Marker({
            element : markerNode,
            anchor : "bottom"
        }).setLngLat(loc.coordinates).addTo(map);

        // adding popup
        new mapboxgl.Popup({offset : 30}).setLngLat(loc.coordinates).setDOMContent(popUpNode).addTo(map);
        // extend map bounds to include current location
        bounds.extend(loc.coordinates)

    });

    map.fitBounds(bounds, {
        padding : {
            top : 200,
        bottom : 150,
        left : 100,
        right : 100
        }
    });
    })

     // clean up on unmount
     return () => map.remove()

},[]);
    return (
        <section className="section-map">
           <div ref={ mapContainerRef } className="map"></div> 
        </section>
    )
}

export default TourMap
