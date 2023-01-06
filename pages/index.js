import Head from 'next/head'
import Map from '../components/Map'
import { useState } from 'react';
import Auto from '../components/Auto';
import { GoogleMap, useLoadScript,DirectionsService } from '@react-google-maps/api';





export default function Home() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [originName, setOriginName] = useState(null);
  const [destinationName, setDestinationName] = useState(null);
  const [type, setType] = useState("DRIVING");


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: ["places"],
  });

  const handleType = (e) => {
    setType(e.target.value);
    calculateRoute();
  }

  async function calculateRoute() {
    if (origin === null || destination === null) return;
    const directionsService = new google.maps.DirectionsService();
    setDirectionsResponse(null);
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: type,
    })
    if (results.status === "ZERO_RESULTS") {
      alert("No route found between the origin and destination!");
      return;
    }
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

  }

  


  if (!isLoaded) return <div>Loading...</div>;
  return (
    
    <>
      <Head>
        <title>Map App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <main className="bg-blue-100 h-screen w-screen md:py-10 overflow-scroll">
        
        <p className="text-2xl text-blue-800 text-center hidden sm:block">Let calculate <span className='font-bold'>distance</span> from Google maps</p>
        <div className="flex flex-col-reverse sm:flex-row justify-between md:mt-10">
         <div className='md:w-1/2'>
         <div className='flex flex-col items-center my-2 sm:flex-row md:justify-center'> 
            <div>
              <Auto setnav={setOrigin} setName={setOriginName} type="origin"/>
              <Auto setnav={setDestination} setName={setDestinationName} type="destination"/>
            </div>
            <div className='flex flex-col gap-2 md:gap-6 md:ml-10'>
            <select className='bg-blue-700 text-white px-6 py-2 rounded-full' onChange={handleType}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
            </select>
              <button className='bg-blue-800 text-white px-6 py-2 rounded-full' onClick={calculateRoute}>Calculate</button>
            </div>
            
          </div>
          
          <div className='border border-gray-300 md:w-3/4 md:mx-auto'>
            <div className='bg-white p-5 justify-between flex'>
              <span className='text-lg font-bold '>Distance</span>
              <span className='text-blue-400 font-bold'>{distance} kms</span>
            </div>
            <p className='text-xs m-3'>
            The distance between <span className='font-bold'>{originName}</span> and <span className='font-bold'>{destinationName}</span> via the seleted route is <span className='font-bold'>{distance}</span> kms, and will take approximately <span className='font-bold'>{duration}</span>.
            </p>
          </div>
         </div>
          <div className='relative w-full sm:w-[500px] my-12 mx-1'>
          <Map origin={origin} destination={destination} directionsResponse={directionsResponse}/>
        </div>
        </div>
        
       
      </main>
    </>
  )
}
