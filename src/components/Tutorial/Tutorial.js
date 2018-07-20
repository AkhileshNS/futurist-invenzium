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
does not provide any other features. We have discovered a relatively simple hack which should 
allow you to append custom service-worker code to the default CRA script.</p>
            <StepBox 
                title={`Step 1: Open node_modules/react-scripts/config/paths.js and add the following line and import`} 
                subtext={`const sWPrecacheImportScript = fs.existsSync(resolveApp('public/service-worker-import.js'))
? 'service-worker-import.js'
: undefined;
              
module.exports = {
    //...
    sWPrecacheImportScript: sWPrecacheImportScript,
};`}
            />
            <StepBox
                title={`Step 2: Open node_modules/react-scripts/config/webpack.config.prod.js and add this option`}
                subtext={`module.exports = {
    //...
    plugins: [
        //...
        new SWPrecacheWebpackPlugin({
            //...
            importScripts: paths.sWPrecacheImportScript ? [paths.sWPrecacheImportScript] : undefined,
        })
    ]
}`}
            />
            <StepBox
                title={`Step 3: Create a file /public/service-worker-import.js and put all your custom service worker code in file. The file will be imported by the CRA's service worker upon production`}
            />
            <p className={`subtext`}>P.S: All these changes exist inside your node_modules. Therefore if you ever reinstall your node_modules folder, you will have to repeat these steps</p>
            <div className={`line`}/>
            </div>
    );
}

export default Tutorial;