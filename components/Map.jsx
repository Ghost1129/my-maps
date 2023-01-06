import React from 'react'
import { GoogleMap, Marker,DirectionsRenderer } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '350px'
  };
  
  const center = {
    lat: 21.637,
    lng: 78.681
  };

const Map = ({origin, destination,directionsResponse}) => {
 
  
  return (
    <>
      
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            
          }}
        >
          {origin && <Marker position={origin} icon={"https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/null/external-geometric-circle-dot-shape-with-ring-pattern-basic-green-tal-revivo.png"} />}
          {destination && <Marker position={destination} icon={"https://img.icons8.com/external-flaticons-lineal-flat-icons/64/null/external-destination-map-and-navigation-flaticons-lineal-flat-icons-2.png"} />}
          {directionsResponse && <DirectionsRenderer
           directions={directionsResponse}
          />}
          

       </GoogleMap>
      
    </>
  )
}

export default Map



