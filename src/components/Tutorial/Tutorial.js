//External Libraries
import React from 'react';

//Internal Libraries
import './Tutorial.css';
import '../../global.css';
import StepBox from '../StepBox/StepBox';

const cssClassName = 'Tutorial'

const Tutorial = (props) => {

    return (
        <div className={cssClassName}>
            <p className={`title`}>Using Custom Service Worker with Create-React-App</p>
            <p className={`subtext`}>This site is not a tutorial on how to create PWA's. That said we thought we could include a 
helpful tip for those of you who are interested in developing one using the React framework. <strong>Note:</strong> You can go through this section only if
you have worked with PWAs before and you are looking for a way to do the same with React, other readers should just continue down</p>
            <p className={`subtext`}>If you are using the React framework to create a progressive web app, you will soon realise that 
create-react-app (which you are most likely using) adds a service worker by default. 
But the default CRA service-worker only includes static caching out of the box and 
does not provide any other features. However in this website which was made with CRA, you'll notice we are using a lot more features than just
 static caching .To achieve this, we made use of a library called <a href="https://www.npmjs.com/package/cra-append-sw" rel="noopener noreferrer" target="_blank">cra-append-sw</a></p>
            <StepBox 
                title={`Step 1: Import the library using npm/yarn (npm i cra-append-sw --save)`} 
            />
            <StepBox
                title={`Step 2: Add these two scripts in your package json`}
                subtext={`"scripts": {
    "start": "react-scripts start && cra-append-sw --mode dev ./public/custom-sw-import.js",
    "build": "react-scripts build && cra-append-sw --skip-compile ./public/custom-sw-import.js"
}`}
            />
            <StepBox
                title={`Step 3: Create a file /public/custom-sw-import.js and put all your custom service worker code in file. The file will be imported by the CRA's service worker upon production`}
            />
            <p className={`subtext`}>If you wish to understand more about this, then visit the link shown above</p>
            <div className={`line`}/>
            </div>
    );
}

export default Tutorial;