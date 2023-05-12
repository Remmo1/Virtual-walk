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

import st1Sofa from './animation/objects/st1-sofa.mp4';
import st1Table from './animation/objects/st1-table.mp4';
import st2Table from './animation/objects/st2-table.mp4';
import st3Desk from './animation/objects/st3-desk.mp4';
import st2Chair from './animation/objects/st2-chair.mp4';

// --------------- Animation consts ----------------------
// Create a module that imports all PNG files in the 'animation' directory
const animationFrames = {};
const req = require.context('./animation');
req.keys().forEach((key) => {
  animationFrames[key] = req(key);
});

const STAGE_ONE_NAME = 'Salon';
const STAGE_TWO_NAME = 'Kuchnia';
const STAGE_THREE_NAME = 'Pracownia';

const ANIMATION_SPEED = 60;                // miliseconds

const STAGE_ONE_FRAMES_AMOUNT = 151;      // 0 -> 1
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

// ----------------- Object consts -----------------
// X range and Y range
const STAGE_ONE_SOFA = [170, 945, 240, 350];
const STAGE_ONE_TABLE = [500, 1150, 340, 510];

const STAGE_TWO_TABLE = [260, 980, 240, 350];
const STAGE_TWO_CHAIR_ONE     = [140, 230, 250, 400]; 
const STAGE_TWO_CHAIR_TWO     = [285, 405, 180, 235]; 
const STAGE_TWO_CHAIR_THREE   = [585, 715, 180, 235]; 
const STAGE_TWO_CHAIR_FOUR    = [790, 885, 180, 235]; 
const STAGE_TWO_CHAIR_FIVE    = [1000, 1120, 250, 400]; 
const STAGE_TWO_CHAIR_SIX     = [850, 1000, 415, 500]; 
const STAGE_TWO_CHAIR_SEVEN   = [585, 715, 415, 500]; 
const STAGE_TWO_CHAIR_EIGHT   = [285, 405, 415, 500]; 

const STAGE_THREE_DESK = [700, 1200, 300, 500];

function App() {
  const [mainBg, setMainBg] = useState(startLocation);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [frameNumber, setFrameNumber] = useState(0);
  const [stage, setStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [titleName, setTitleName] = useState('Sklep');

  const [firstButtonLabel, setFirstButtonLabel] = useState(STAGE_ONE_NAME);
  const [secondButtonLabel, setSecondButtonLabel] = useState(STAGE_TWO_NAME);
  const [thirdButtonLabel, setThirdButtonLabel] = useState(STAGE_THREE_NAME);

  const [isMinimapVisible, setIsMinimapVisible] = useState(false);
  const [actualMinimap, setActualMinimap] = useState(minimapDraw);
  const minimapRef = useRef(null);

  const [isObjectInfoVisible, setIsObjectInfoVisible] = useState(false);
  const [objectName, setObjectName] = useState('');
  const [objectMessage, setObjectMessage] = useState('');
  const objectRef = useRef(null);
  const [cursor, setCursor] = useState('');
  const [objectAnimation, setObjectAnimation] = useState('');


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

    console.log(currentStage);
    console.log(stage);
    console.log(buttonLabel);

    // Go Back to menu
    if (buttonLabel === 'Menu') {
      setCurrentStage(0);
      setTitleName('Sklep');
      setTitleVisible(false);
      if (stageNumber == 1) {
        setStage(1);
        setFirstButtonLabel(STAGE_ONE_NAME);
        playReverseAnimation(STAGE_ONE_FRAMES_AMOUNT, 0, startLocation);
      } else if (stageNumber == 2) {
        setStage(2);
        setSecondButtonLabel(STAGE_TWO_NAME);
        playReverseAnimation(STAGE_TWO_FRAMES_AMOUNT, 0, startLocation);
      } else {
        setStage(3);
        setThirdButtonLabel(STAGE_THREE_NAME);
        playReverseAnimation(STAGE_THREE_FRAMES_AMOUNT, 0, startLocation);
      }
        
    }
    // Go to First stage
    else if (buttonLabel === STAGE_ONE_NAME) {
      setStage(1);
      setCurrentStage(1);
      setTitleVisible(false);
      setFirstButtonLabel('Menu');
      setTitleName('Salon');

      // Go to first stage from menu
      if (stageNumber == 0) {
        playAnimation(STAGE_ONE_FRAMES_AMOUNT, 1, firstLocation);
      } 
      // Go back to first stage from second stage
      // Stage = 4 is animation from 1 to 2
      else if (stageNumber == 2) {
        setSecondButtonLabel(STAGE_TWO_NAME);
        setStage(4);
        playReverseAnimation(STAGE_FOUR_FRAMES_AMOUNT, 4, firstLocation);
      }
      // Go back to first stage from third stage
      // Stage = 5 is animation from 1 to 3
      else {
        setThirdButtonLabel(STAGE_THREE_NAME);
        setStage(5);
        playReverseAnimation(STAGE_FIVE_FRAMES_AMOUNT, 5, firstLocation);
      }
    }
    // Go to Second stage
    else if (buttonLabel === STAGE_TWO_NAME) {
      setTitleVisible(false);
      setStage(2);
      setCurrentStage(2);
      setSecondButtonLabel('Menu');
      setTitleName('Kuchnia');

      // Go to second stage from menu
      if (stageNumber == 0) {
        playAnimation(STAGE_TWO_FRAMES_AMOUNT, 2, secondLocation);
      } 
      // Go to second stage from first stage
      // Stage = 4 is animation from 1 to 2
      else if (stageNumber == 1) {
        setFirstButtonLabel(STAGE_ONE_NAME);
        setStage(4);
        playAnimation(STAGE_FOUR_FRAMES_AMOUNT, 4, secondLocation);
      }
      // Go back to second stage from third stage
      // Stage = 6 is animation from 2 to 3
      else {
        setThirdButtonLabel(STAGE_THREE_NAME);
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
      setTitleName('Pracownia');

      // Go to third stage from menu
      if (stageNumber == 0) {
        playAnimation(STAGE_THREE_FRAMES_AMOUNT, 3, thirdLocation);
      } 
      // Go to third stage from first stage
      // Stage = 5 is animation from 1 to 3
      else if (stageNumber == 1) {
        setFirstButtonLabel(STAGE_ONE_NAME);
        setStage(5);
        playAnimation(STAGE_FIVE_FRAMES_AMOUNT, 5, thirdLocation);
      }
      // Go to third stage from second stage
      // Stage = 6 is animation from 2 to 3
      else {
        setSecondButtonLabel(STAGE_TWO_NAME);
        setStage(6);
        playAnimation(STAGE_SIX_FRAMES_AMOUNT, 6, thirdLocation);
      }
    }
  };

  const toggleMinimap = () => {
    setIsMinimapVisible(!isMinimapVisible);
  };  

  const handleMinimapMove = (event) => {
    html2canvas(minimapRef.current).then(canvas => {
      let x = event.clientX;
      let y = event.clientY;
      
      if (currentStage != 1 && isInStage(1, x, y) == 1) {
        setActualMinimap(minimapDrawS1);
      }
      else if (currentStage != 2 && isInStage(2, x, y) == 2) {
        setActualMinimap(minimapDrawS2);
      }
      else if (currentStage != 3 && isInStage(3, x, y) == 3) {
        setActualMinimap(minimapDrawS3);
      }
      else if (currentStage != 0 && isInStage(0, x, y) == 0) {
        setActualMinimap(minimapDrawMenu);
      }
      else {
        setActualMinimap(minimapDraw);
      }
    });
  };

  const handleMinimapClick = (event) => {
    html2canvas(minimapRef.current).then(canvas => {
      let x = event.clientX;
      let y = event.clientY;
      
      if (currentStage != 1 && isInStage(1, x, y) == 1) {
        toggleMinimap();
        onButtonClick(currentStage, STAGE_ONE_NAME);
      }
      else if (currentStage != 2 && isInStage(2, x, y) == 2) {
        toggleMinimap();
        onButtonClick(currentStage, STAGE_TWO_NAME);
      }
      else if (currentStage != 3 && isInStage(3, x, y) == 3) {
        toggleMinimap();
        onButtonClick(currentStage, STAGE_THREE_NAME);
      }
      else if (currentStage != 0 && isInStage(0, x, y) == 0) {
        toggleMinimap();
        onButtonClick(currentStage, 'Menu');
      }
    })
  }

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
  
  const toggleObjectInfo = () => {
    if (!isObjectInfoVisible) {
      setIsObjectInfoVisible(true);
      setIsMinimapVisible(false);
      setTitleVisible(false);
    } else {
      setIsObjectInfoVisible(false);
      setTitleVisible(true);
    }
    
  };  

  const handleObjectClick = (event) => {
    html2canvas(objectRef.current).then(canvas => {
      let x = event.clientX;
      let y = event.clientY;
      console.log(x, y);
      
      if (currentStage == 1) {
        if (x >= STAGE_ONE_SOFA[0] && x <= STAGE_ONE_SOFA[1] && y >= STAGE_ONE_SOFA[2] && y <= STAGE_ONE_SOFA[3]) {
          toggleObjectInfo();
          setObjectName(SOFA_NAME);
          setObjectMessage(SOFA_MESSAGE);
          setObjectAnimation(st1Sofa);
        } else if (x >= STAGE_ONE_TABLE[0] && x <= STAGE_ONE_TABLE[1] && y >= STAGE_ONE_TABLE[2] && y <= STAGE_ONE_TABLE[3]) {
          toggleObjectInfo();
          setObjectName(TABLE_STAGE1);
          setObjectMessage(TABLE_STAGE1_MESSAGE);
          setObjectAnimation(st1Table);
        } 
      }
      else if (currentStage == 2) {
        if (x >= STAGE_TWO_TABLE[0] && x <= STAGE_TWO_TABLE[1] && y >= STAGE_TWO_TABLE[2] && y <= STAGE_TWO_TABLE[3]) {
          toggleObjectInfo();
          setObjectName(TABLE_STAGE2);
          setObjectMessage(TABLE_STAGE2_MESSAGE);
          setObjectAnimation(st2Table);
        }
        else if (
          (x >= STAGE_TWO_CHAIR_ONE[0] && x <= STAGE_TWO_CHAIR_ONE[1] && y >= STAGE_TWO_CHAIR_ONE[2] && y <= STAGE_TWO_CHAIR_ONE[3]) ||
          (x >= STAGE_TWO_CHAIR_TWO[0] && x <= STAGE_TWO_CHAIR_TWO[1] && y >= STAGE_TWO_CHAIR_TWO[2] && y <= STAGE_TWO_CHAIR_TWO[3]) ||
          (x >= STAGE_TWO_CHAIR_THREE[0] && x <= STAGE_TWO_CHAIR_THREE[1] && y >= STAGE_TWO_CHAIR_THREE[2] && y <= STAGE_TWO_CHAIR_THREE[3]) ||
          (x >= STAGE_TWO_CHAIR_FOUR[0] && x <= STAGE_TWO_CHAIR_FOUR[1] && y >= STAGE_TWO_CHAIR_FOUR[2] && y <= STAGE_TWO_CHAIR_FOUR[3]) ||
          (x >= STAGE_TWO_CHAIR_FIVE[0] && x <= STAGE_TWO_CHAIR_FIVE[1] && y >= STAGE_TWO_CHAIR_FIVE[2] && y <= STAGE_TWO_CHAIR_FIVE[3]) ||
          (x >= STAGE_TWO_CHAIR_SIX[0] && x <= STAGE_TWO_CHAIR_SIX[1] && y >= STAGE_TWO_CHAIR_SIX[2] && y <= STAGE_TWO_CHAIR_SIX[3]) ||
          (x >= STAGE_TWO_CHAIR_SEVEN[0] && x <= STAGE_TWO_CHAIR_SEVEN[1] && y >= STAGE_TWO_CHAIR_SEVEN[2] && y <= STAGE_TWO_CHAIR_SEVEN[3]) ||
          (x >= STAGE_TWO_CHAIR_EIGHT[0] && x <= STAGE_TWO_CHAIR_EIGHT[1] && y >= STAGE_TWO_CHAIR_EIGHT[2] && y <= STAGE_TWO_CHAIR_EIGHT[3])
          ) {
            toggleObjectInfo();
            setObjectName(CHAIR_STAGE2);
            setObjectMessage(CHAIR_STAGE2_MESSAGE);
            setObjectAnimation(st2Chair);
          }
      }
      else if (currentStage == 3) {
        if (x >= STAGE_THREE_DESK[0] && x <= STAGE_THREE_DESK[1] && y >= STAGE_THREE_DESK[2] && y <= STAGE_THREE_DESK[3]) {
          toggleObjectInfo();
          setObjectName(DESK_STAGE3);
          setObjectMessage(DESK_STAGE3_MESSAGE);
          setObjectAnimation(st3Desk);
        }
      }
    })    
  }

  const handleObjectLocation = (event) => {
    html2canvas(objectRef.current).then(canvas => {
      let x = event.clientX;
      let y = event.clientY;
      
      if (currentStage == 1) {
        if (
          (x >= STAGE_ONE_SOFA[0] && x <= STAGE_ONE_SOFA[1] && y >= STAGE_ONE_SOFA[2] && y <= STAGE_ONE_SOFA[3]) ||
          (x >= STAGE_ONE_TABLE[0] && x <= STAGE_ONE_TABLE[1] && y >= STAGE_ONE_TABLE[2] && y <= STAGE_ONE_TABLE[3])
          ) {
          setCursor('pointer');
        } else {
          setCursor('');
        }
      }
      else if (currentStage == 2) {
        if (
          (x >= STAGE_TWO_TABLE[0] && x <= STAGE_TWO_TABLE[1] && y >= STAGE_TWO_TABLE[2] && y <= STAGE_TWO_TABLE[3]) ||
          (x >= STAGE_TWO_CHAIR_ONE[0] && x <= STAGE_TWO_CHAIR_ONE[1] && y >= STAGE_TWO_CHAIR_ONE[2] && y <= STAGE_TWO_CHAIR_ONE[3]) ||
          (x >= STAGE_TWO_CHAIR_TWO[0] && x <= STAGE_TWO_CHAIR_TWO[1] && y >= STAGE_TWO_CHAIR_TWO[2] && y <= STAGE_TWO_CHAIR_TWO[3]) ||
          (x >= STAGE_TWO_CHAIR_THREE[0] && x <= STAGE_TWO_CHAIR_THREE[1] && y >= STAGE_TWO_CHAIR_THREE[2] && y <= STAGE_TWO_CHAIR_THREE[3]) ||
          (x >= STAGE_TWO_CHAIR_FOUR[0] && x <= STAGE_TWO_CHAIR_FOUR[1] && y >= STAGE_TWO_CHAIR_FOUR[2] && y <= STAGE_TWO_CHAIR_FOUR[3]) ||
          (x >= STAGE_TWO_CHAIR_FIVE[0] && x <= STAGE_TWO_CHAIR_FIVE[1] && y >= STAGE_TWO_CHAIR_FIVE[2] && y <= STAGE_TWO_CHAIR_FIVE[3]) ||
          (x >= STAGE_TWO_CHAIR_SIX[0] && x <= STAGE_TWO_CHAIR_SIX[1] && y >= STAGE_TWO_CHAIR_SIX[2] && y <= STAGE_TWO_CHAIR_SIX[3]) ||
          (x >= STAGE_TWO_CHAIR_SEVEN[0] && x <= STAGE_TWO_CHAIR_SEVEN[1] && y >= STAGE_TWO_CHAIR_SEVEN[2] && y <= STAGE_TWO_CHAIR_SEVEN[3]) ||
          (x >= STAGE_TWO_CHAIR_EIGHT[0] && x <= STAGE_TWO_CHAIR_EIGHT[1] && y >= STAGE_TWO_CHAIR_EIGHT[2] && y <= STAGE_TWO_CHAIR_EIGHT[3])
          ) {
          setCursor('pointer');
        } else {
          setCursor('');
        }
      }
      else if (currentStage == 3) {
        if (
          (x >= STAGE_THREE_DESK[0] && x <= STAGE_THREE_DESK[1] && y >= STAGE_THREE_DESK[2] && y <= STAGE_THREE_DESK[3]) 
          ) {
          setCursor('pointer');
        } else {
          setCursor('');
        }
      }
    })    
  }

  return (
    <div className="app" ref={objectRef} style={{ backgroundImage: `url(${mainBg})`, cursor: cursor }} onMouseDown={handleObjectClick} onMouseMove={handleObjectLocation}>

      {/* Main app */}
      <div className="minimap" style={{ display: !isMinimapVisible ? 'block' : 'none' }}>
        <div className="title" style={{ display: titleVisible ? 'block' : 'none' }}>
          <h1>{titleName}</h1>
        </div>
        <button className="map-button" onClick={toggleMinimap}>
          <img className="minimap-icon" src={minimap} alt="Map"/>
        </button>
        <div className="animation-container" style={{ display: isAnimationPlaying ? 'block' : 'none' }}>
          <img
            className="animation-frame"
            src={animationFrames[`./stage${stage}/${stage}_ (${frameNumber}).png`]}
            alt={`stage ${stage}, frame ${frameNumber}`}
          />
        </div>
      </div>
      
      {/* Mini map */}
      <div className="minimap" style={{ display: isMinimapVisible ? 'block' : 'none' }}>
        <button className="comeback-button" onClick={toggleMinimap}>
          <img src={comeBack} alt="Comeback" />
        </button>
        <div className="minimap-container" ref={minimapRef}>
          <img src={actualMinimap} alt="minmap" onMouseMove={handleMinimapMove} onMouseDown={handleMinimapClick}/>
        </div>
      </div>

      {/* Object properties */}
      <div className="object-info-container" style={{ display: isObjectInfoVisible ? 'block' : 'none' }}>
          <button className="comeback-button-objects" onClick={toggleObjectInfo}>
            <img src={comeBack} alt="Comeback" />
          </button>
          <h1>{objectName}</h1>
          <p>{objectMessage}</p>
          <video className="video-player" autoPlay={true} src={objectAnimation} controls/>
      </div>

      <div className="button-container" style={{ display: titleVisible ? 'block' : 'none' }}>
          <button className="button" onClick={() => onButtonClick(currentStage, firstButtonLabel)}>{firstButtonLabel}</button>
          <button className="button" onClick={() => onButtonClick(currentStage, secondButtonLabel)}>{secondButtonLabel}</button>
          <button className="button" onClick={() => onButtonClick(currentStage, thirdButtonLabel)}>{thirdButtonLabel}</button>
      </div>

    </div>
  );
}


const SOFA_NAME = 'Sofa';
const SOFA_MESSAGE = 'Very comfortable coach in grey color';

const TABLE_STAGE1 = 'Table';
const TABLE_STAGE1_MESSAGE = 'Very comfortable table for living room';

const CHAIR_STAGE2 = 'Chair';
const CHAIR_STAGE2_MESSAGE = 'Very practical chair for kitchen';

const TABLE_STAGE2 = 'Table';
const TABLE_STAGE2_MESSAGE = 'Very practical table for kitchen';

const DESK_STAGE3 = 'Desk';
const DESK_STAGE3_MESSAGE = 'Awesome desk to work';

const SHELF_STAGE3 = 'Shelf';
const SHELF_STAGE3_MESSAGE = 'Practical shelf for books';


export default App;
