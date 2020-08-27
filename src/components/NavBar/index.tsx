import React, { useContext } from 'react';
import style from './style.module.css'
import { GlobalContext } from '../../GlobalProviders/GlobalProvider';

let leftPaneOpen: boolean, setLeftPaneOpen: (val: boolean) => void
export let util = { setLeftPaneOpen: (val: boolean) => { setLeftPaneOpen(val) } }

const Header = () => {

    leftPaneOpen = useContext(GlobalContext).leftPaneOpen;
    setLeftPaneOpen = useContext(GlobalContext).setLeftPaneOpen;

    return (
        <div className={`${style.navBar}`}>

            <div className={`${style.navLeft}`} >
                <div className={`${style.hamburger}`} onClick={() => { util.setLeftPaneOpen(!leftPaneOpen) }} >
                    <span /><span /><span />
                </div>
            </div>

            <div className={`${style.navMid}`}>
                <label htmlFor="logo"><img id="logo" className={`${style.logo}`} src={require("../../images/logo.png")} alt="logo" /></label>
            </div>

            <div className={`${style.navRight}`}> </div>
        </div>
    )
}


export default Header;
