//External Libraries
import React, {Component} from 'react';

//Internal Libraries
import './Features.css';
import '../../global.css';
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

class Features extends Component {

    navigateTo = (value) => {

        if(this.props.history.location.pathname===`/${value}`){}
        //The User is currently at home and he pressed something
        else if(this.props.history.location.pathname==='/'){
            if(value==='Home'){
    
            } else {
                this.props.history.push(`/${value}`);
                console.log(`pushed ${value}`);
            }
        } 
        //The User is not currently at home and he pressed something
        else {
            if(value==='Home'){
                this.props.history.goBack();
                console.log(`popped`);
            } else {
                this.props.history.replace(`/${value}`);
                console.log(`replaced with ${value}`);
            }
        }
    
    }

    render() {

        let list = [];

        for (let i in hashList){
            list.push(<li key={hashList[i]} className={`${cssClassName}li`} onClick={() => this.navigateTo(hashList[i])}>
                <div className={`${cssClassName}lidiv`}>
                    <p style={LinkStyle}>{hashList[i]}</p>
                </div>
                <p className={`${cssClassName}subtext`}> {descList[i]}</p>
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
                <div className={`line`}/>
            </div>
        );

    }
}

export default Features;