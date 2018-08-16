//Internal Libraries
import React, {Component} from 'react';

//External Libraries
import '../../global.css';
import './WebPushNotifications.css';
import WPNIcon from '../../assets/notificationbell.svg';
import Info from '../../components/Info/Info';
import lightbulb from '../../assets/appicon_96x96.png';
import ImageDrop from '../../components/ImageDrop/ImageDrop';
import Spinner from '../../components/Spinner/Spinner';
import firebase from '../../firebase';

let cssClassName = "WPN";

class WebPushNotifications extends Component {

    //==================================================
    // LifeCycle Events
    
    constructor(props) {
        super(props);

        this.state = {
            isGranted: false,
            title: 'Message from SW',
            body: 'Successfully Subscribed to our Notification Service',
            icon: lightbulb,
            image: null,
            dir: 'ltr',
            vibrate: '100 50 200',
            badge: lightbulb,
            tag: '',
            renotify: false,
            iconLabel: 'Drop or Upload Image',
            imageLabel: 'Drop or Upload Image',
            badgeLabel: 'Drop or Upload Image'
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);
        if('Notification' in window){
            if(Notification.permission==='granted'){
                this.setState({isGranted: true});
            }
        }
    }

    //====================================================
    // Custom Functions

    askPermission = () => {
        Notification.requestPermission(result => {
            console.log('User Choice : ' + result);
            if (result==='granted'){
                this.setState({isGranted: true});
                this.showNotification();
            }
        });
    }

    subscribeToPush = () => {
        let SW;
        navigator.serviceWorker.ready
        .then((sw) => {
            SW = sw;
            return sw.pushManager.getSubscription();
        }).then((sub) => {
            if (sub===null) {
                SW.pushManager.subscribe({
                    userVisibleOnly: true
                });
                //Create a new Subscription
            } else {
                //Already have a Subscription
            }
        });
    }

    showNotification = () => {

        let vibrate = this.state.vibrate.split(" ");
        for (let i in vibrate){
            vibrate[i] = parseInt(vibrate[i],10);
        }

        let icon = this.state.icon;
        if (icon!=null){
            if(icon.preview!=null){
                icon = icon.preview;
            }
        }

        let image = this.state.image;
        if (image!=null){
            if(image.preview!=null){
                image = image.preview;
            }
        }

        let badge = this.state.badge;
        if (badge!=null){
            if(badge.preview!=null){
                badge = badge.preview;
            }
        }

        let renotify = false;
        if(this.state.renotify==='true' && this.state.tag.trim()!==''){
            renotify = true;
        }

        let options = {
            body: this.state.body,
            icon,
            image,
            dir: this.state.dir,
            lang: 'en-US',
            vibrate,
            badge,
            tag: this.state.tag,
            renotify,
            actions: [
                {action: 'confirm', title: 'Okay', icon: lightbulb},
                {action: 'cancel', title: 'Cancel', icon: lightbulb}
            ]
        };

        //console.log(options);

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
            .then((sw) => {
                sw.showNotification(this.state.title, options);
            })
        } 

        //new Notification('Message from SW', options);
    }

    urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
       
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
       
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    subscribeToPush = () => {
        let reg = null;
        navigator.serviceWorker.ready
        .then((sw) => {
            reg = sw;
            return sw.pushManager.getSubscription();
        })
        .then((sub) => {
            if (sub===null){
                let vapidKey = "BKudXyuxevsjeh09Zm9HrysWIE5Q5GxBEjVT0lvvE9vxl7kNGDSLlmM0bmd5F23pQ05CUM8BGkGuiQYh_JlMpKY";

                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(vapidKey)
                });
            } 
        })
        .then((newSub) => {
            let ref = firebase.database().ref().child('subscriptions').push();
            ref.set(newSub);
        })
        .catch(err => console.log(err));
    }

    //=====================================================
    // Form Functions

    onChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    onDropIcon = acceptedFiles => {
        //console.log(acceptedFiles[0]);
        this.setState({
            icon: acceptedFiles[0],
            iconLabel: acceptedFiles[0].name
        });
    }

    onDropImage = acceptedFiles => {
        //console.log(acceptedFiles[0]);
        this.setState({
            image: acceptedFiles[0],
            imageLabel: acceptedFiles[0].name
        });
    }

    onDropBadge = acceptedFiles => {
        //console.log(acceptedFiles[0]);
        this.setState({
            badge: acceptedFiles[0],
            badgeLabel: acceptedFiles[0].name
        });
    }

    //====================================================
    // Main
    
    render() {

        let askPermissionBtn = null;

        let Disp = 'none';
        if (this.state.isGranted===true){
            Disp = 'inline-block';
        }

        if ('Notification' in window && 'serviceWorker' in navigator) {
            askPermissionBtn = <button className='Button' style={{marginBottom: '30px'}} onClick={this.askPermission}>Ask Permission</button>;
        }

        return <div className={cssClassName}>
            <img className={cssClassName+'img'} src={WPNIcon} alt="Web Push Notifications" />
            <Info 
                titletop='30'
                title="Web Push Notifications"
                subtext={`Notifications are a great way to re-engage. They can be used (even when the browser is closed) to give more information about the ongoings of
                your site and entise users to revisit your website. For a long time however, Push Notifications were widely only available to
                native app users but now thanks to Progressive Web Apps, it is possible to subscribe for Push Notifications on the web. This 
                is achieved thanks to 2 APIs : The Notification API (Used to create and serve Notifications) and the Push API (Used to communicate
                with a server even when the web app is closed)`}
                removeLine={true}
            />
            <p className='subtext' style={{fontWeight: 'bold'}}>
                Note. Push Notifications as of right  are not supported by Safari and iOS. 
                To keep track of support : please check <a href="https://caniuse.com/#search=Push" rel="noopener noreferrer" 
                target='_blank'>https://caniuse.com/#search=Push</a>
            </p>
            <div className="line" style={{marginTop: '30px'}}/>
            <p className='subtext'>
                Before we can show you our demo of Push Notifications, you will need to first grant us permissions to send you notifications.
                Press the Button down below to be prompted for permission and then choose allow and scroll down. Note. If you do not see the button, then we 
                are sorry to inform that your browser/device does not support Push Notifications as of right now.
            </p>    
            {askPermissionBtn}<br />
            <p className='subtext' style={{display: Disp,marginTop: '0px'}}>
                Using the controls below, you can create your own custom notification. The notification API has a large number of properties that
                allow you to customize and add functionality to your website. To view these in detail, please check (<a rel="noopener noreferrer" 
                target='_blank' href="https://developers.google.com/web/fundamentals/push-notifications/display-a-notification">
                https://developers.google.com/web/fundamentals/push-notifications/display-a-notification</a>) 
            </p>
            <div className={cssClassName+"gen"} style={{display: Disp}}>
                <p className='title' style={{margin: '0px 10px 10px'}}>Enter Notification Details</p>
                <p>Note. Any blanks will be filled with defaults</p>
                <p className={cssClassName+'field'}>Enter Title</p>
                    <input 
                        value={this.state.title} 
                        onChange={e => this.onChange('title',e)} 
                        className={cssClassName+"input"} 
                        type="text" 
                        placeholder="title" 
                    />
                <p className={cssClassName+'field'}>Enter Message</p>
                    <input 
                        value={this.state.body} 
                        onChange={e => this.onChange('body',e)} 
                        className={cssClassName+"input"} 
                        type="text" 
                        placeholder="message" 
                    />
                <p className={cssClassName+'field'}>Choose Notification Icon : Recommended use 192x192 image</p> 
                    <ImageDrop label={this.state.iconLabel} onDrop={this.onDropIcon}/>
                <p className={cssClassName+'field'}>Choose an image to shown with the notification</p>
                    <ImageDrop label={this.state.imageLabel} onDrop={this.onDropImage}/>
                <p className={cssClassName+'field'}>Choose direction of text</p>
                    <Spinner 
                        value={this.state.dir} 
                        onChange={e=>this.onChange('dir',e)} 
                        values={['ltr','rtl','auto']} 
                        list={['ltr (left-to-right)','rtl (right-to-left)', 'auto']}
                    />
                <p className={cssClassName+'field'}>Give Vibrate Sequence in ms (Seperate numbers with space. Ex: 100 60 200)</p>
                    <input 
                        value={this.state.vibrate} 
                        onChange={e => this.onChange('vibrate',e)} 
                        className={cssClassName+"input"} 
                        type="text" 
                        placeholder="vibration sequence" 
                    />
                <p className={cssClassName+'field'}>Choose Notification Badge (It will automatically be converted into a gray icon)</p>
                    <ImageDrop label={this.state.badgeLabel} onDrop={this.onDropBadge}/>
                <p className={cssClassName+'field'}>Enter Tag (Notifications with the same tag will stack up)</p>
                    <input 
                        value={this.state.tag} 
                        onChange={e => this.onChange('tag',e)} 
                        className={cssClassName+"input"} 
                        type="text" 
                        placeholder="tag" 
                    />
                <p className={cssClassName+'field'}>Enable Renotify (Allows stacked notifications to vibrate phone) P.S tag cant be empty if this is set to true</p>
                    <Spinner 
                        value={this.state.renotify}
                        onChange={e => this.onChange('renotify', e)} 
                        values={['true','false']} 
                        list={['True','False']}
                    /><br /><br />
                <button className='Button' onClick={this.showNotification}>Send Notification</button>
            </div>
        </div>;
    }
}

export default WebPushNotifications;

