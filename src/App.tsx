import React, { useState } from 'react';
import style from './App.module.css';
import MissionContainer from './components/Mission';
import MissionInfoContainer from './components/Missioninfo';
import LoadingPage from './components/LoadingPage';
import {GlobalProvider} from './GlobalProvider/GlobalProvider';

function App() {

  const missionContainerloading = useState(true);
  const missionInfoContainerloading = useState(true);
  const missionContainerFeedBack = () => { missionContainerloading[1](false) }
  const missionInfoContainerFeedBack = () => { missionInfoContainerloading[1](false) }

  return (
    <GlobalProvider>
      <div className={`${style.App}`}>
        {(!missionContainerloading[0] && !missionInfoContainerloading[0]) || <LoadingPage />}
        <div className={`${style.leftPane}`}>
          <MissionContainer loadingFeedBack={missionContainerFeedBack} />
        </div>
        <div className={`${style.rightPane}`}>
          <MissionInfoContainer loadingFeedBack={missionInfoContainerFeedBack} />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
