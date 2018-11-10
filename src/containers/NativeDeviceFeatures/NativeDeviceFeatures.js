
// external libraries
import React, {Component} from 'react';
import WebCam from 'react-webcam';

// internal libraries
import './NativeDeviceFeatures';
import Info from '../../components/Info/Info';
import NDFlogo from '../../assets/NDFlogo.svg';

let cssClassName = 'NDF';

let player = {
    display: 'block',
    width: '95%',
    maxWidth: '512px',
    margin: '0px auto 30px',
    border: '5px solid black',
    borderRadius: '5px'
}

class NativeDeviceFeatures extends Component {

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {

        return <div className={cssClassName}>
            <img style={{marginTop: '75px', width: '100%', height: '150px', }} src={NDFlogo} alt="Native Device Features" />
            <Info 
                titletop="30"
                title="Native Device Features"
                subtext={`One of the biggest drawbacks of the web has been its inability to access native device features like
                the camera, microphone or bluetooth services. But now with the power of progressive web apps, this is no longer a problem .
                Here we have built a simple demo using the react-webcam library to stream the output of your local camera. P.S: if you 
                don't see anything, then you have either denied permissions or your browser still does not support this feature.`}
                removeLine={true}
            />
            <WebCam style={player} audio={false}/>
        </div>;
    }

}

export default NativeDeviceFeatures;