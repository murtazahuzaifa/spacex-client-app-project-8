import React from 'react';
import style from './style.module.css';

const LoadingPage = () => {
    return (
        <div className={`${style.LoadingPageContainer}`}>

            <svg className={`${style.logoSVG}`} viewBox="0 0 491.61 235.07">
                <g >
                    <path className={`${style.cls} ${style.curveBar}`} d="M66.9,240.3H11.8c0,0-11.5,0-4.6-9.2c0,0,158.3-167.5,488.8-222.6C496,8.6,229.8,70.5,66.9,240.3z" transform="translate(-4.5 -8.06)"  />
                </g>
                <g className={`${style.slashBar}`}>
                    <path className={`${style.cls}`} d="M85.2,148.5l48.2-27.5L80.6,82H9.5c0,0-11.5,4.6,2.3,13.8L85.2,148.5z" transform="translate(-4.5 -8.06)" />
                    <path className={`${style.cls}`} d="M186.2,157.7l103.3,75.7c0,0,6.9,9.2-4.6,9.2h-71.1l-68.8-50.5L186.2,157.7z" transform="translate(-4.5 -8.06)" />
                </g>
            </svg>
        </div>
    )
};

export default LoadingPage;