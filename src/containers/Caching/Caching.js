//External Libraries
import React from 'react';

//Internal Libraries
import './Caching.css';
import CachingIcon from '../../assets/Caching.svg';
import Info from '../../components/Info/Info';
import StepBox from '../../components/StepBox/StepBox';

const cssClassName = 'Caching';

const Caching = () => {
    return (
        <div className={cssClassName}>
            <img className={`${cssClassName}img`} src={CachingIcon} alt="Caching"/>
            <Info
                titletop={30}
                title={`Caching`}
                subtext={`Caching is simply storing away important files (Ex: HTML,CSS and JS files) on your physical machine 
                for later use. This does literally what it sounds like, it takes any files that the User downloads when he visits your 
                site and stores it such that should the user revisit your site, even when offline, your site will immediately be loaded 
                via the cached files. This way, the speed of your website is drastically increased and it allows for offline support. 
                Caching gives a website the same advantage that a mobile app would give, that is that a user can access it whenever he 
                wants, online or offline. There are two main types of caching:-`} 
                removeLine={true}
            />
            <StepBox 
                title={`Static Caching`}
                subtext={`Caching Static files (files which do not change). Ex: Image Assets, HTML files etc`}
            />
            <StepBox
                title={`Dynamic Caching`}
                subtext={`Caching files which aren't immediately available and are downloaded later on. Ex: If the user stores images on your site`}
            />
            <Info
                titletop={30} 
                title={`Static Caching`}
                subtext={`Static Caching involves mostly storing your App Shell (which is basically a collection of files which make your 
                website i.e your html files, css files, js files and image assets). These are stored immediately when the user first visits 
                your site. These files are then accessed to load your site when the user revisits your site, as opposed to having to 
                re-download these files from the server your site is hosted on.`}
                removeLine={true}
            />
            <p className={`${cssClassName}subtext`} style={{fontWeight: 'bold'}}>This website was built using React which uses static caching by default. So to see this 
            in action simply switch off your internet connection and try reloading this page
            </p>
        </div>
    );
}

export default Caching;