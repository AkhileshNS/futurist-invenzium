//External Libraries
import React from 'react';

//Internal Libraries
import './Manifest.css';
import '../../global.css';
import installappscreen from '../../assets/installappscreen.svg';
import Info from '../../components/Info/Info';

let cssClassName = 'Manifest';

const Manifest = (props) => { 

        let installbtn = null;

        if(props.deferredPrompt!=null){
            installbtn = <button className='Button' onClick={() => props.showPrompt()}>Install as App</button>;
        }

        return <div className={cssClassName}>
            <img className={cssClassName+'img'} src={installappscreen} alt="Install as Application"/>
            <Info 
                titletop="30"
                title="Manifest"
                subtext={`The manifest is a JSON file that defines various properties and details about your website such as the name, description,
                icons and other details. Recently the developers of chrome introduced the concept of progressive web app and one of its features
                included giving a browser the ability to install native apps. To do this, we merely need to define some properties in the manifest
                that tells the browser how it should create and install it (For example these properties could include: orientation, display ,
                primary color, theme color etc). A demo of this is given below.`}
                removeLine={true}
            />
            <p className='subtext' style={{fontWeight: 'bold'}}>
                Click on the button down below to install the website as an app to your device. Note. If you do not see any button, it means 
                that either your device or browser does not support this feature. For more information regarding this (
                <a href='https://caniuse.com/#search=Manifest' rel="noopener noreferrer" target='_blank'>Click Here</a>)
            </p>
            {installbtn}
            <br /><div className='line' style={{marginTop: '60px'}}/>
            <p className='subtext'><strong>For Details regarding how to create you own 
                manifest and add it to your website : check out <a href='https://developer.mozilla.org/en-US/docs/Web/Manifest' rel="noopener noreferrer" target='_blank'>
                https://developer.mozilla.org/en-US/docs/Web/Manifest
                </a>
                </strong><br /><br />
                The Manifest for this site is defined as below:
            </p>
            <textarea className={cssClassName+'input'} defaultValue=
            {
                `{
    "short_name": "FI_PWA",
    "name": "Futurist Invenzium",
    "description": "An Invenzium of Futuristic Technologies like PWAs",
    "icons": [
        {
            "src": "icons/appicon_48x48.png",
            "sizes": "48x48",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_96x96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_144x144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_256x256.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "icons/appicon_512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "start_url": "./index.html",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff",
    "scope": ".",
    "dir": "ltr",
    "lang": "en-US",
    "orientation": "any"
}`
            } /><div className='line' style={{marginTop: '60px'}}/>
        </div>;
}

export default Manifest;