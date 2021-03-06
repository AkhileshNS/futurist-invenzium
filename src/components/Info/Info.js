//External Libraries
import React from 'react';

//Internal Libraries
import './Info.css';
import '../../global.css';

const cssClassName = 'Info';

const Info = (props) => {

    var title = "What are Progressive Web Apps?";
    var subtext = "Progressive web apps (PWA's for short) were introduced by the developers at Google Chrome and could be described as steroids for websites. They are essentially a list of features that can be added onto any website to progressively enhance it. These include features like offline support, web push notifications and access to native device features like the camera and microphone, you will see all these features and much more in action right here in our demo. In our demo, we have created a progressive web app using the extremely popular React framework "
    var line = <div className={`line`}/>;

    if (props.title!=null && props.subtext!=null){
        title = props.title;
        subtext = props.subtext;
    }

    if (props.removeLine===true){
        line=null;
    }

    if (props.titletop===null){
        props.titletop = 120;
    }

    return (
        <div className={cssClassName}>
            <p className={`title`} style={{marginTop: `${props.titletop}px`}}>{title}</p>
            <p className={`subtext`}>{subtext}</p>
            {line}
        </div>
    );
}

export default Info;