//External Libraries
import React from 'react';

//Internal Libraries
import './Intro.css';
import '../../global.css';
import lightbulb from '../../assets/lightbulb.svg';

const cssClassName = 'Intro';

const Intro = () => {
    return (
        <div className={cssClassName}>
            <img src={lightbulb} alt=""/>
            <p className={`subtext`}>Progressive Web Apps are the future of websites. And in this site, we give you a live demo of all the features and advantages they offer. Don't know what a progressive web app is? don't worry, we'll tell you about that too</p>
            <div className={`line`} />
        </div>
    );
};

export default Intro;