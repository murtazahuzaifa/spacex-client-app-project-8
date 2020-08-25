import React, { useState } from 'react';
import MissionContainer from '../Mission';
import style from './style.module.css'

const Header = () => {

    const [leftPaneOpen, setLeftPaneOpen] = useState<boolean>(false);

    return (
        <div className={`${style.navBar}`}>

            <div className={`${style.navLeft}`} >
                <div className={`${style.hamburger}`} onClick={()=>{setLeftPaneOpen(!leftPaneOpen)}} >
                    <span /><span /><span />
                </div>
            </div>

            <div className={`${style.navMid}`}>
                <label htmlFor="logo"><img id="logo" className={`${style.logo}`} src={require("../../images/logo.png")} alt="logo" /></label>
            </div>

            <div className={`${style.navRight}`}> </div>

            <div className={`${style.leftPane}`} style={{visibility: leftPaneOpen?"visible":"hidden"}} onClick={()=>{setLeftPaneOpen(!leftPaneOpen)}} >
                <MissionContainer />
            </div>
        </div>
    )
}


export default Header;
