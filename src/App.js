import './App.css';
import { useState, useRef } from 'react';

import startLocation from './animation/locations/start-location.png';
import firstLocation from './animation/locations/first-location.png';
import secondLocation from './animation/locations/second-location.png';
import thirdLocation from './animation/locations/third-location.png';

import minimap from './animation/locations/minimap.png';
import comeBack from './animation/locations/come-back.png';
import minimapDraw from './animation/locations/minimap-draw.png';
import minimapDrawS1 from './animation/locations/minimap-draw-s1.png';
import minimapDrawS2 from './animation/locations/minimap-draw-s2.png';
import minimapDrawS3 from './animation/locations/minimap-draw-s3.png';
import minimapDrawMenu from './animation/locations/minimap-draw-menu.png';
import html2canvas from 'html2canvas';

// --------------- Animation consts ----------------------
// Create a module that imports all PNG files in the 'animation' directory
const animationFrames = {};
const req = require.context('./animation');
req.keys().forEach((key) => {
  animationFrames[key] = req(key);
});
const ANIMATION_SPEED = 100                // miliseconds

const STAGE_ONE_FRAMES_AMOUNT = 150;      // 0 -> 1
const STAGE_TWO_FRAMES_AMOUNT = 176;      // 0 -> 2
const STAGE_THREE_FRAMES_AMOUNT = 111;    // 0 -> 3
const STAGE_FOUR_FRAMES_AMOUNT = 198;     // 1 -> 2
const STAGE_FIVE_FRAMES_AMOUNT = 108;     // 1 -> 3
const STAGE_SIX_FRAMES_AMOUNT = 86;       // 2 -> 3

// ----------------- Minimap consts -----------------
// X range and Y range
const STAGE_ONE_X_Y = [280, 470, 130, 360];
const STAGE_TWO_X_Y = [700, 920, 150, 350];
const STAGE_THREE_X_Y = [530, 670, 65, 150];
const MENU_X_Y = [490, 690, 285, 430];

function App() {
  const [mainBg, setMainBg] = useState(startLocation);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [frameNumber, setFrameNumber] = useState(0);
  const [stage, setStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const [firstButtonLabel, setFirstButtonLabel] = useState('Stage1');
  const [secondButtonLabel, setSecondButtonLabel] = useState('Stage2');
  const [thirdButtonLabel, setThirdButtonLabel] = useState('Stage3');

  const [isMinimapVisible, setIsMinimapVisible] = useState(false);
  const [actualMinimap, setActualMinimap] = useState(minimapDraw);
  const minimapRef = useRef(null);


  const playAnimation = (framesAmount, stageNumber, destination) => {
    setIsAnimationPlaying(true);

    const interval = ANIMATION_SPEED;
    let currentFrame = 0;

    const animationInterval = setInterval(() => {
      currentFrame += 1;
      setFrameNumber(currentFrame);

      if (currentFrame === framesAmount) {
        setMainBg(destination);
        setIsAnimationPlaying(false);
        clearInterval(animationInterval);
        setTitleVisible(true);
      }
    }, interval);
  };

  const playReverseAnimation = (framesAmount, stageNumber, destination) => {
    setIsAnimationPlaying(true);

    const interval = ANIMATION_SPEED;
    let currentFrame = framesAmount;

    const animationInterval = setInterval(() => {
      currentFrame -= 1;
      setFrameNumber(currentFrame);

      if (currentFrame === 0) {
        setMainBg(destination);
        setIsAnimationPlaying(false);
        clearInterval(animationInterval);
        setTitleVisible(true);
      }
    }, interval);
  };

  const onButtonClick = (stageNumber, buttonLabel) => {

    console.log(stageNumber);
    console.log(buttonLabel);

    // Go Back to menu
    if (buttonLabel === 'Menu') {
      setCurrentStage(0);
      setTitleVisible(false);
      if (stageNumber == 1) {
        setStage(1);
        setFirstButtonLabel('Stage1');
        playReverseAnimation(STAGE_ONE_FRAMES_AMOUNT, 0, startLocation);
      } else if (stageNumber == 2) {
        setStage(2);
        setSecondButtonLabel('Stage2');
        playReverseAnimation(STAGE_TWO_FRAMES_AMOUNT, 0, startLocation);
      } else {
        setStage(3);
        setThirdButtonLabel('Stage3');
        playReverseAnimation(STAGE_THREE_FRAMES_AMOUNT, 0, startLocation);
      }
        
    }
    // Go to First stage
    else if (buttonLabel === 'Stage1') {
      setStage(1);
      setCurrentStage(1);
      setTitleVisible(false);

      // Go to first stage from menu
      if (stageNumber == 0) {
        setFirstButtonLabel('Menu');
        playAnimation(STAGE_ONE_FRAMES_AMOUNT, 1, firstLocation);
      } 
      // Go back to first stage from second stage
      // Stage = 4 is animation from 1 to 2
      else if (stageNumber == 2) {
        setSecondButtonLabel('Stage2');
        setFirstButtonLabel('Menu');
        setStage(4);
        playReverseAnimation(STAGE_FOUR_FRAMES_AMOUNT, 4, firstLocation);
      }
      // Go back to first stage from third stage
      // Stage = 5 is animation from 1 to 3
      else {
        setThirdButtonLabel('Stage3');
        setFirstButtonLabel('Menu');
        setStage(5);
        playReverseAnimation(STAGE_FIVE_FRAMES_AMOUNT, 5, firstLocation);
      }
    }
    // Go to Second stage
    else if (buttonLabel === 'Stage2') {
      setTitleVisible(false);
      setStage(2);
      setCurrentStage(2);

      // Go to second stage from menu
      if (stageNumber == 0) {
        setSecondButtonLabel('Menu');
        playAnimation(STAGE_TWO_FRAMES_AMOUNT, 2, secondLocation);
      } 
      // Go to second stage from first stage
      // Stage = 4 is animation from 1 to 2
      else if (stageNumber == 1) {
        setFirstButtonLabel('Stage1');
        setSecondButtonLabel('Menu');
        setStage(4);
        playAnimation(STAGE_FOUR_FRAMES_AMOUNT, 4, secondLocation);
      }
      // Go back to second stage from third stage
      // Stage = 6 is animation from 2 to 3
      else {
        setThirdButtonLabel('Stage3');
        setSecondButtonLabel('Menu');
        setStage(6);
        playReverseAnimation(STAGE_SIX_FRAMES_AMOUNT, 6, secondLocation);
      }
    }
    // Go to Third stage
    else {
      setStage(3);
      setCurrentStage(3);
      setTitleVisible(false);
      setThirdButtonLabel('Menu');

      // Go to third stage from menu
      if (stageNumber == 0) {
        playAnimation(STAGE_THREE_FRAMES_AMOUNT, 3, thirdLocation);
      } 
      // Go to third stage from first stage
      // Stage = 5 is animation from 1 to 3
      else if (stageNumber == 1) {
        setFirstButtonLabel('Stage1');
        setStage(5);
        playAnimation(STAGE_FIVE_FRAMES_AMOUNT, 5, thirdLocation);
      }
      // Go to third stage from second stage
      // Stage = 6 is animation from 2 to 3
      else {
        setSecondButtonLabel('Stage2');
        setStage(6);
        playAnimation(STAGE_SIX_FRAMES_AMOUNT, 6, thirdLocation);
      }
    }
  };

  const toggleMinimap = () => {
    setIsMinimapVisible(!isMinimapVisible);
  };  

  const handleMinimapClick = (event) => {
    html2canvas(minimapRef.current).then(canvas => {
      let x = event.clientX;
      let y = event.clientY;
      
      if (isInStage(1, x, y) == 1) {
        setActualMinimap(minimapDrawS1);
      }
      else if (isInStage(2, x, y) == 2) {
        setActualMinimap(minimapDrawS2);
      }
      else if (isInStage(3, x, y) == 3) {
        setActualMinimap(minimapDrawS3);
      }
      else if (isInStage(0, x, y) == 0) {
        setActualMinimap(minimapDrawMenu);
      }
      else {
        setActualMinimap(minimapDraw);
      }
    });
  };

  function isInStage(stage, x, y) {
    if (stage == 1 && x >= STAGE_ONE_X_Y[0] && x <= STAGE_ONE_X_Y[1] && y >= STAGE_ONE_X_Y[2] && y <= STAGE_ONE_X_Y[3]) {
      return 1; 
    }
    else if (stage == 2 && x >= STAGE_TWO_X_Y[0] && x <= STAGE_TWO_X_Y[1] && y >= STAGE_TWO_X_Y[2] && y <= STAGE_TWO_X_Y[3]) {
      return 2;
    }
    else if (stage == 3 && x >= STAGE_THREE_X_Y[0] && x <= STAGE_THREE_X_Y[1] && y >= STAGE_THREE_X_Y[2] && y <= STAGE_THREE_X_Y[3]) { 
      return 3;
    }
    else if (stage == 0 && x >= MENU_X_Y[0] && x <= MENU_X_Y[1] && y >= MENU_X_Y[2] && y <= MENU_X_Y[3]) { 
      return 0;
    }
    else {
      return -1;
    }
  }
  

  return (
    <div className="app" style={{ backgroundImage: `url(${mainBg})` }}>

      {/* Main app */}
      <div className="minimap" style={{ display: !isMinimapVisible ? 'block' : 'none' }}>
        <div className="title" style={{ display: titleVisible ? 'block' : 'none' }}>
          <h1>Shop</h1>
        </div>
        <button className="map-button" onClick={toggleMinimap}>
          <img className="minimap-icon" src={minimap} alt="Map"/>
        </button>
        <div className="animation-container" style={{ display: isAnimationPlaying ? 'block' : 'none', }}>
          <img
            className="animation-frame"
            src={animationFrames[`./stage${stage}/${stage}_ (${frameNumber}).png`]}
            alt={`stage ${stage}, frame ${frameNumber}`}
          />
        </div>
        <div className="button-container" style={{ display: titleVisible ? 'block' : 'none' }}>
          <button className="button" onClick={() => onButtonClick(currentStage, firstButtonLabel)}>{firstButtonLabel}</button>
          <button className="button" onClick={() => onButtonClick(currentStage, secondButtonLabel)}>{secondButtonLabel}</button>
          <button className="button" onClick={() => onButtonClick(currentStage, thirdButtonLabel)}>{thirdButtonLabel}</button>
        </div>
      </div>
      
      {/* Mini map */}
      <div className="minimap" style={{ display: isMinimapVisible ? 'block' : 'none' }}>
        <button className="comeback-button" onClick={toggleMinimap}>
          <img src={comeBack} alt="Comeback" />
        </button>
        <div className="minimap-container" ref={minimapRef}>
          <img src={actualMinimap} alt="minmap" onMouseMove={handleMinimapClick}/>
        </div>

      </div>

    </div>
  );
}


export default App;
