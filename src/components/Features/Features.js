//External Libraries
import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';

//Internal Libraries
import './Features.css';
import Info from '../Info/Info';

const cssClassName = 'Features';

const LinkStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.6em',
    textDecoration: 'none',
};

const hashList = ['Manifest','Caching','IndexedDB','BackgroundSync','Web Push Notifications','Native Device Features'];
const descList = [
    'Allow the user to install your website as a native app',
    'Allow your website to function when offline',
    'A local NoSQL database for your website',
    'Store network calls when offline and send them when back online',
    'Send Notifications to drive your user experience',
    'Access Native Device Features. Ex: Camera'
];

const Features = () => {

    var list = [];

    for (var i in hashList){
        list.push(<li key={hashList[i]} className={`${cssClassName}li`}>
            <div className={`${cssClassName}lidiv`}>
                <Link style={LinkStyle} to={`/#${hashList[i]}`} smooth>{hashList[i]}</Link>
            </div>
            <p className={`${cssClassName}subtext`} > {descList[i]}</p>
        </li>)
    }

    return (
        <div className={cssClassName}>
            <Info 
                title={`PWA Features`} 
                subtext={`Progressive Web Apps allow web developers to significantly enhance their website while still making few changes to their original code and only making some additions. In this demo, you can see all the features present in a PWA live. Note: Tap/Click the titles to navigate to that section`}
                removeLine={true}
            />
            <ul className={`${cssClassName}ul`}>
                {list}
            </ul>
            <div className={`${cssClassName}line`}/>
        </div>
    );
}

export default Features;