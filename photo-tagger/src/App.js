import React, { useState, setState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore"; 
import { async } from '@firebase/util';

const firebaseConfig = {
  apiKey: "AIzaSyAj5DTk736HAORLfaFJaeWuUEVj8Zu-2C4",
  authDomain: "photo-tagger-e601c.firebaseapp.com",
  projectId: "photo-tagger-e601c",
  storageBucket: "photo-tagger-e601c.appspot.com",
  messagingSenderId: "136198387706",
  appId: "1:136198387706:web:b0f38476d608fe46461643",
  measurementId: "G-JDJ44L6TST"
};
//remind to click head
function App() {
  const db = getFirestore();
  const tellPosition = async (e) => {
    const tag = document.querySelector('#targetBox');
    tag.classList.toggle('hide');
    if (tag.classList.contains('hide') === false) {
      let x = e.clientX;
      let y = e.clientY;
      tag.style.cssText = `top: ${y - 20}px; left: ${x - 20}px`;
      const querySnapshot = await getDocs(collection(db, "characterPositions"));
      querySnapshot.forEach((doc) => {
        const imageX = parseInt(doc.data()['X']);
        const imageY = parseInt(doc.data()['Y']);
        if ((x >= imageX - 20 & x <= imageX + 20) &&
          (y >= imageY - 20 && y <= imageY + 20)) {
          const character = document.querySelector(`#${doc.data()['Name']}`);
          if (character.classList.contains('hide')) {
            character.classList.remove('hide');
            checkWin();
          }
        }
      });
    }
  }
  const checkWin = async () => {
    let marks = 0;
    const querySnapshot = await getDocs(collection(db, "characterPositions"));
    querySnapshot.forEach((doc) => {
      const character = document.querySelector(`#${doc.data()['Name']}`);
      if (character.classList.contains('hide') === false) {
        marks += 1;
      }
    });
    if (marks === 3) {
      console.log('Win!')
    }
  }
  return (
    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
      <div className="crossOut material-icons hide" id="kirby">close</div>
      <div className="crossOut material-icons hide" id="bowser">close</div>
      <div className="crossOut material-icons hide" id="pokemonRed">close</div>
      <div id="navbar">
      </div>
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
        <img onClick={tellPosition} id="image" src="http://www.smashbros.com/assets_v2/img/sns/en.png?180613" alt="Super Smash Bros"/>
      </div>
    </div>
  );
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default App;
