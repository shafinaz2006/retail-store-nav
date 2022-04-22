import React, { useEffect, useState } from 'react'
import data from '../../data/navigation.json'
import './Nav.css';

const Nav = ({getTimeZone}) => {
  const [prevPosition, setPrevPosition] = useState(-100);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
  }, []);

  const handleWindowResize = () => setIsMobile(window.innerWidth < 700);
  
  const displayBorder = (index, label) => {
    getTimeZone(label);
    const cityNames = document.querySelectorAll('.cityName');
    const cityDivs = document.querySelectorAll('.cityDiv');
    let currentPosition = cityDivs[index].getBoundingClientRect();
    let distance = prevPosition - currentPosition.left;
    const animationProp = isMobile? 
    [{transform: `scale(0.25)`}, {transform: `scale(1)`}]: 
    [{transform: `translateX(${distance}px)`}, {transform: `translateX(0%)`}];
    
    for(let i = 0; i < cityDivs.length; i++){
      const borderDiv = document.createElement('div');
      if(i === index){
        cityDivs[i].appendChild(borderDiv);
        cityNames[i].style.color = 'black';
        cityNames[i].style.opacity = '1';
        borderDiv.style.height = '2px';
        borderDiv.style.width = '100%';
        borderDiv.style.backgroundColor = 'black';
        cityNames[i].onmouseover = () => cityNames[i].style.color = 'black'
        cityNames[i].onmouseout = () => cityNames[i].style.color = 'black';
        
        borderDiv.animate(animationProp, {duration: 500, iteration: 1, fill: 'forwards'});

      } else {
        if(cityNames[i].nextSibling) cityNames[i].nextSibling.remove();
        cityNames[i].style.color = 'gray';
        cityNames[i].style.opacity = '0.5';
        cityNames[i].onmouseover = () => cityNames[i].style.color = 'skyblue';
        cityNames[i].onmouseout = () => {
          cityNames[i].style.color = 'gray';
          cityNames[i].style.opacity = '0.5';
        };
      }
    }
    setPrevPosition(currentPosition.left);
  }

  return(
    <ul className='cityList' data-testid='cityList'>
      {data.cities.map((city, index) => 
        <div key={index} className= 'cityDiv'
             onClick = {() => {displayBorder(index, city.label)}}>
          <li className='cityName'>{city.label}</li>
        </div>)
      }
    </ul>
  )
}

export default Nav;