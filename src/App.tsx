import React, { useState } from 'react';
import style from './App.module.css';
import MissionContainer from './components/Mission';
import MissionInfoContainer from './components/Missioninfo';
import LoadingPage from './components/LoadingPage';

function App() {

  const missionContainerloading = useState(true);
  const missionContainerFeedBack = ()=>{missionContainerloading[1](false)}

  return (
    <div className={`${style.App}`}>
      {!missionContainerloading[0] || <LoadingPage /> }
      <div className={`${style.leftPane}`}>
        <MissionContainer loadingFeedBack={missionContainerFeedBack} />
      </div>
      <div className={`${style.rightPane}`}>
        <MissionInfoContainer id={114} />
      </div>
    </div>
  );
}

export default App;
