//External Libraries
import React from 'react';

//Internal Libraries
import './Intro.css';
import lightbulb from '../../assets/lightbulb.svg';

const cssClassName = 'Intro';

const Intro = () => {
    return (
        <div className={cssClassName}>
            <header>
                <p>Futurist-Invenzium</p>
            </header>
            <img src={lightbulb} alt=""/>
            <p className={`${cssClassName}subtext`}>Progressive Web Apps are the future of websites. And in this site, we give you a live demo of all the features and advantages they offer. Don't know what a progressive web app is? don't worry, we'll tell you about that too</p>
            <div className={`${cssClassName}line`} />
        </div>
    );
};

export default Intro;