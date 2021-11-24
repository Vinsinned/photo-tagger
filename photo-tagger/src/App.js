import React, { useState } from 'react'

function App() {
  const tellPosition = (e) => {
    const tag = document.querySelector('#targetBox');
    tag.classList.toggle('hide');
    if (tag.classList.contains('hide') === false) {
      let x = e.clientX;
      let y = e.clientY;
      tag.style.cssText = `top: ${y - 20}px; left: ${x - 20}px`
    }
  }
  return (
    <div>
      <div id="targetBox" className="hide">
        <div id="tag"></div>
        <div id="dropdown">
          <ul>
            <div className="dropdownDivs">
              <img className="dropdownImage" src="https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png" alt="kirby"/>
              <li>Kirby</li>
            </div>
            <div className="dropdownDivs">
              <img className="dropdownImage" src="https://cdn2.bulbagarden.net/upload/thumb/d/d3/Lets_Go_Pikachu_Eevee_Red.png/250px-Lets_Go_Pikachu_Eevee_Red.png" alt="red"/>
              <li>Red</li>
            </div>
            <div className="dropdownDivs">
              <img className="dropdownImage" src="https://upload.wikimedia.org/wikipedia/en/9/92/Bowser_Stock_Art_2021.png" alt="bowser"/>
              <li>Bowser</li>
            </div>
          </ul>
        </div>
      </div>
      <div id="imageDiv">
        <img onClick={tellPosition}id="image" src="http://www.smashbros.com/assets_v2/img/sns/en.png?180613" alt="Super Smash Bros" width="500px"/>
      </div>
    </div>
  );
}

export default App;
