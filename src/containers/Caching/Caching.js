//External Libraries
import React, {Component} from 'react';
import axios from 'axios';

//Internal Libraries
import './Caching.css';
import '../../global.css';
import CachingIcon from '../../assets/Caching.svg';
import Info from '../../components/Info/Info';
import StepBox from '../../components/StepBox/StepBox';

const cssClassName = 'Caching';

class Caching extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            netErr: false
        }
    }

    addToList = () => {
        let v0 = performance.now();

        let prevList = [...this.state.list];
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then((res) => {
            let v1 = performance.now();
            let time = Math.round(v1-v0);
            prevList.push({
                val: JSON.stringify(res.data,null, 2),
                time
            });
            this.setState({
                list: prevList,
                netErr: false
            }); 
        }).catch((err) => {
            console.log(`Error Getting data from jsonplaceholder\n${err}`);
            this.setState({
                netErr: true
            })
        });
    }

    clearCache = () => {
        if ('serviceWorker' in navigator){
            navigator.serviceWorker.controller.postMessage('clear|');
        }
    }

    render() {

        let list = [];
        let populus = this.state.list;
        let network_error = null;

        for (let i in populus) {
            list.push(<li className={`${cssClassName}li`} key={i}>
                <textarea className={`${cssClassName}input`} defaultValue={populus[i].val} />
                <p>{populus[i].time}ms</p>
            </li>);
        }

        if(this.state.netErr===true){
            network_error = <p className='subtext'>No Internet Connection and Cached data is empty, please switch on internet and try again.</p>
        }

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
                <p className='subtext'>You can check support for this feature here : (
                    <a href='https://caniuse.com/#search=service' rel="noopener noreferrer" target='_blank'>Check Here</a>)
                </p>
                <StepBox 
                    title={`Static Caching`}
                    subtext={`Caching Static files (files which do not change). Ex: Image Assets, HTML files etc`}
                />
                <StepBox
                    title={`Dynamic Caching`}
                    subtext={`Caching files which aren't immediately available and are downloaded later on. Ex: If the user stores images on your site`}
                />
                <div className='line'/>
                <Info
                    titletop='90'
                    title={`Static Caching`}
                    subtext={`Static Caching involves mostly storing your App Shell (which is basically a collection of files which make your 
                    website i.e your html files, css files, js files and image assets). These are stored immediately when the user first visits 
                    your site. These files are then accessed to load your site when the user revisits your site, as opposed to having to 
                    re-download these files from the server your site is hosted on.`}
                    removeLine={true}
                />
                <p className={`subtext`} style={{fontWeight: 'bold'}}>This website was built using React which uses static caching by default. So to see this 
                in action simply switch off your internet connection and try reloading this page and navigating around the site.
                </p>
                <div className='line'/>
                <Info
                    titletop='90'
                    title={`Dynamic Caching`}
                    subtext={`Dynamic Caching involves intercepting all network calls (this could be uploading files from the User's computer or 
                downloading files from another site) made by your site and storing these files in a similar fashion to static caching.`}
                    removeLine={true}
                />
                <p className={`subtext`}><strong>
                    IMPORTANT PLEASE NOTE: We are downloading json data in this demo, generally however this is not recommended for caching, it is 
                    better to use IndexedDB instead for storing JSON data. This demo is for presentation purposes only. Generally speaking, it is
                    better to replace dynamic caching entirely with IndexedDB since it is better designed to store dynamic content</strong><br /><br />
                    We have built a simple demo that will show you how Dynamic caching works. In the below example, when you press the download
                    button for the first time ,a network call is made (to <a href='https://jsonplaceholder.typicode.com/photos' rel="noopener noreferrer" 
                    target='_blank'>https://jsonplaceholder.typicode.com/photos</a>) for the first time and as a result depending on the type of 
                    network connection you have, we recommend a slower one just to better see how this works, you should experience a delay. 
                    But after this if you tap the download button again, it will instantaneously load, and this is bcoz this time we are getting
                    it from local cache instead of downloading it again from the above site. As a result, you can turn off the internet and 
                    tap download again and it will still work <br/><br/>If you tap/click the clear button it will clear
                    the cache and you should see the network delay again when you tap/click the download button (Needless to say,this is because the network
                    call is being made again, you will need internet connection for it to work as well). P.S: here the delay (in ms) indicates
                    the gap between when the network call is made and the response is received, time taken to render the new content is not taken into
                    account.
                </p>
                <button className='Button' onClick={this.addToList}>Download</button>
                <button className='Button' onClick={this.clearCache} style={{marginLeft: '4px'}}>Clear</button><br />
                {network_error}
                <ul className={`${cssClassName}ul`}>
                    {list}
                </ul>
                <div className='line'/>
            </div>
        );
    }
}

export default Caching;