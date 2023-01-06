import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import originIcon from '../assets/origin.png'
import destinationIcon from '../assets/destination.png'
import Image from 'next/image';

const Auto= ({setnav,type,setName}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  
  const handleInput = (e) => {
    setValue(e.target.value);
  }
  const handleSelect =({description}) => {
    setName(description);
    setValue(description, false);
    clearSuggestions();
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setnav({lat, lng});
    });
  }

  const renderSugg = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      
      return (
        <li className="cursor-pointer bg-white w-56" key={place_id} onClick={() => handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    })
  


  return (
    <div className='my-5'>
      {type==='origin' && <span className='hidden sm:block'>Origin</span>}
      {type==='destination' && <span className='hidden sm:block'>Destination</span>}
      <div className='flex bg-white p-1 w-max items-center justify-center relative'>
      <Image src={type==='origin'?originIcon:destinationIcon} width={30} height={30} />
      <input value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Select a location"
        className='outline-none font-semibold text-black'
       />
      </div>
      {status === "OK" && <ul>{renderSugg()}</ul>}
      
    </div>
  )
}

export default Auto