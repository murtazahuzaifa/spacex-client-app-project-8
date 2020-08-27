import React, { useState, useContext, useEffect } from 'react';
import style from './App.module.css';
import MissionContainer from './components/Mission';
import MissionInfoContainer from './components/Missioninfo';
import LogoLoading from './components/LogoLoading';
import {GlobalContext} from './GlobalProviders/GlobalProvider';


export let windowIs1080:number, missionLoading:boolean, setMissionLoading:(val:boolean)=>void , missionInfoloading:boolean, setMissionInfoloading:(val:boolean)=>void, missionFeedBack:()=>void, missionInfoFeedBack:()=>void

const App = ()=>{
  [missionLoading, setMissionLoading] = useState<boolean>(true);
  [missionInfoloading, setMissionInfoloading] = useState<boolean>(true);
  const [windowIs1080, setWindowIs1080] = useState<boolean>(window.innerWidth < 1080? true: false );
  missionFeedBack = () => { setMissionLoading(false) };
  missionInfoFeedBack = () => { setMissionInfoloading(false) };
  const {leftPaneOpen, setLeftPaneOpen} = useContext(GlobalContext);
  const leftPaneClass = windowIs1080?`${leftPaneOpen?`${style.leftPaneDrawerOpen}`:`${style.leftPaneDrawerClose}`}`: `${style.leftPane}`

  const windowIs1080CallBack = ()=>{
    window.addEventListener('resize',()=>{
      if(window.innerWidth < 1080){
        setWindowIs1080(true);
      }else{
        setWindowIs1080(false);
      }
    })}

  useEffect(()=>{
    windowIs1080CallBack()
    },[])
  // if(true) return <LogoLoading />
  // if(missionContainerloading[0] && missionInfoContainerloading[0]) return <div className={`${style.loading}`}><LogoLoading /></div>

  return (
      <div className={`${style.App}`}>
        {(!missionLoading && !missionInfoloading) || <div className={`${style.loading}`}><LogoLoading /></div>}
        
        <div className={ leftPaneClass } onClick={()=>{setLeftPaneOpen(!leftPaneOpen)}} >
          <MissionContainer loadingFeedBack={missionFeedBack} />
        </div>
        
        <div className={`${style.rightPane}`}>
          <MissionInfoContainer loadingFeedBack={missionInfoFeedBack} />
        </div>
      </div>
  );
}
export default App;
