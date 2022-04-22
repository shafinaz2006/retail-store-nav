import { useState } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import cityTimeZones from 'city-timezones';

function App() {
  const [city, setCity] = useState('');
  const [cityTime, setCityTime] = useState('');
  let d = new Date();

  const getTimeZone = (cityName) => {
    setCity(cityName);
    let cityLookup = cityTimeZones.lookupViaCity(cityName);
    if(cityLookup.length > 0){
      let localTime = d.toLocaleString('en-US', {
        timeZone: cityLookup[0].timezone,
        dateStyle: 'full',
        timeStyle: 'full',
      });
      setCityTime(`Local time: ${localTime}`);
    } else {
      setCityTime("Local time is not available!");
    }
  }
  
  return (
    <div className="App">
      <Nav getTimeZone={getTimeZone}/>
      {city? <h2 id='cityHeading'>{city}</h2>: ''}
      {cityTime? <p className='timeDisplay'>{cityTime}</p>: ''}
    </div>
  );
}

export default App;
