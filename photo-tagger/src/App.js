import React, {setState, useState, useEffect, useDebugValue} from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, addDoc, getFirestore, query, orderBy, limit } from "firebase/firestore";
import Leaderboard from './Leaderboard';

const firebaseConfig = {
  apiKey: "AIzaSyAj5DTk736HAORLfaFJaeWuUEVj8Zu-2C4",
  authDomain: "photo-tagger-e601c.firebaseapp.com",
  projectId: "photo-tagger-e601c",
  storageBucket: "photo-tagger-e601c.appspot.com",
  messagingSenderId: "136198387706",
  appId: "1:136198387706:web:b0f38476d608fe46461643",
  measurementId: "G-JDJ44L6TST"
};

//intervalId is a local variable and is reset every single time you call the function!
var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
let intervalId = setInterval(() => {
  document.getElementById("seconds").innerHTML=pad(++sec%60);
  document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);
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
      clearInterval(intervalId);
      erase();
    }
  }
  function erase() {
    const kirby = document.querySelector('#kirby');
    kirby.classList.add('hide');
    const bowser = document.querySelector('#bowser');
    bowser.classList.add('hide');
    const red = document.querySelector('#pokemonRed');
    red.classList.add('hide');
    const tag = document.querySelector('#tag');
    tag.classList.add('hide');
    const dropdown = document.querySelector('#dropdown');
    dropdown.classList.add('hide');
    const image = document.querySelector('#image');
    image.classList.add('hide');
    const scoreInput = document.querySelector('#scoreInput');
    scoreInput.classList.remove('hide');
  }
  let preData = [];
  let [data, setData] = useState([]);
  const submit = async () => {
    const minutes = document.querySelector('#minutes').textContent;
    const seconds = document.querySelector('#seconds').textContent;
    console.log(minutes);
    console.log(seconds);
    const error = document.querySelector('#errorMessage');
    const input = document.querySelector('#name');
    if (input.value.length === 0) {
      error.textContent = 'The name entered is empty!';
    } else if (input.value.length < 3) {
      error.textContent = 'The name entered is too short!';
    } else {
      const db = getFirestore();
		  const scoresRef = collection(db, "scoreboard");
		  const q = query(scoresRef, orderBy("time"), limit(15));
		  const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        preData.push(doc.data());
				console.log('a')
      });
      setData(preData);
      const scoreInput = document.querySelector('#scoreInput');
      scoreInput.classList.add('hide');
      error.textContent = '';
      try {
        await addDoc(collection(db, `scoreboard`), {
          name: input.value,
          time: minutes + seconds,
        });
        } catch (e) {
          console.error("Error adding document: ", e);
      }
    }
  }
  return (
    <div lang="en">
      <Leaderboard array={data} />
      <div id="scoreInput" className="hide">
        <h2 id="winHeader">Congratulations!</h2>
        <p id="winPara">Please enter your name to publish your score!</p>
        <p id="warning">Remember: it must be at least three characters long!</p>
        <input type="text" id="name"></input>
        <p id="errorMessage"></p>
        <button onClick={submit} id="submit">Submit!</button>
      </div>
      <p id="timer"><span id="minutes"></span>:<span id="seconds"></span></p>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
      <div className="crossOut material-icons hide" id="kirby">close</div>
      <div className="crossOut material-icons hide" id="bowser">close</div>
      <div className="crossOut material-icons hide" id="pokemonRed">close</div>
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
