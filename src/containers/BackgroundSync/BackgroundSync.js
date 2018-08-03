//External Libraries
import React, {Component} from 'react';
import axios from 'axios';

//Internal Libraries
import './BackgroundSync.css';
import '../../global.css';
import BackgroundSyncIcon from '../../assets/backgroundsync.svg';
import Info from '../../components/Info/Info';
import Chatroom from '../../components/Chatroom/Chatroom';
import firebase from '../../firebase';

let cssClassName = "BackgroundSync";

class BackgroundSync extends Component {

    //=================================================================================================
    // LifeCycle Events
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            message: '',
            chats: [],
            requests: []
        };
    }

    componentDidMount() {

        //Get List of Chats
        firebase.database().ref().child('public/chatroom').on('child_added', (data) => {
            let chat = {
                title: data.val().name,
                subtext: data.val().message
            };
            console.log(chat);
            let chats = [chat ,...this.state.chats];
            let requests = this.state.requests;
            for (let chat of chats) {
                for (let i in requests) {
                    if (chat.title===requests[i].title && chat.subtext===requests[i].subtext){
                        requests.splice(i, 1);
                    }
                }
            }
            this.setState({chats, requests});
        });

        //Setup Chron Job
        firebase.database().ref().child('public/present_day').once('value', (snapshot) => {
            if (snapshot.exists()) {
                let date = new Date(snapshot.val() + " UTC");
                let currDate = new Date();
                console.log(currDate + " | " + date);
                if (date.getDate()!==currDate.getDate()){
                    axios.get('https://us-central1-teachers-notebook.cloudfunctions.net/updateByDate', {
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    .then((res) => {
                        console.log(res);
                    });
                }
            }
        });
    }

    //=================================================================================================
    // Custom Functions

    onNameChange = (name) => {
        this.setState({name});
    }

    onMessageChange = (message) => {
        this.setState({message});
    }

    sendChat = () => {
        let name = this.state.name;
        let message = this.state.message;

        if (name.trim()!=='' && message.trim()!==''){
            let request = {
                title:name,
                subtext:message};
            let requests = this.state.requests;
            if (requests===null){
                requests = [];
            }
            requests.push(request);
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                navigator.serviceWorker.controller.postMessage('set|' + JSON.stringify(request))
                setTimeout(() => {
                    navigator.serviceWorker.ready.then((sw) => {
                        sw.sync.register('sync-new-chat');
                    });
                }, 200);
            }
            this.setState({requests});
        }
    }

    //=================================================================================================
    // Main

    render() {
        return <div className={cssClassName}>
            <img className={cssClassName+'img'} src={BackgroundSyncIcon} alt="Background Synchronization Icon"/>
            <Info 
                titletop='30'
                title='Background Synchronization'
                subtext={`Web Users often experience net connectivity problems, one of these problems include when a user presses a button in
                your website that triggers a network call to get some data, but because they have lost connection, that call cannot be made and
                as a result, any data they were trying to upload or download is lost and has the user has redo this step again. This is where 
                BackgroundSync comes, we can store those network calls in a local storage like indexedDB and make them once the net connection
                returns. And the best part is that this works even if the user closes that tab or even the browser.`}
                removeLine={true}
            />
            <p className='subtext' style={{fontWeight: 'bold'}}>
                A classic use case of this is in a chat app/website where when a use types a chat message when offline and sends it, then 
                using BackgroundSync you could store those chats and send them when the user comes online. 
            </p>
            <div className="line" style={{marginTop: '30px'}}/>
            <p className='subtext'>
                Below is a demo of BackgroundSync in access. On the left you can see chats from a public common chatroom (All chats are deleted
                by the end of the day, so the chatroom is fresh each day). And on the right is a place for you to send messages and also shows 
                you any pending messages to be sent. Here we are using Dexie (indexedDB wrapper) to store any messages that cannot be sent immediately due 
                to net connectivity problems, they are sent automatically when connection returns.<strong> To see this in action simply go offline
                , send a message and come back online again.<br /><br />
                Please also note that BackgroundSync has little support as of right now, only Chrome supports it. To keep track of support, 
                please see : (<a href="https://developer.mozilla.org/en-US/docs/Web/API/SyncManager#Browser_compatibility"  rel="noopener noreferrer" target='_blank'>
                https://developer.mozilla.org/en-US/docs/Web/API/SyncManager#Browser_compatibility</a>)</strong>
            </p>
            <Chatroom 
                chats={this.state.chats} 
                requests={this.state.requests} 
                name={this.state.name}
                message={this.state.message}
                onNameChange={this.onNameChange}
                onMessageChange={this.onMessageChange}
                sendChat={this.sendChat}
            />
        </div>;
    }

}

export default BackgroundSync;