//Internal Libraries
import React from 'react';

//External Libraries
import './Chatroom.css';

const cssClassName = "Chatroom";

const Chatroom = (props) => {

    let chats = [];
    let requests = [];

    for (let i in props.chats) {
        chats.push(
            <li className={cssClassName+'li'} key={i}>
                <p className={cssClassName+'title'}>
                    {props.chats[i].title}
                </p>
                <p className={cssClassName+'subtext'}>
                    {props.chats[i].subtext}
                </p>
                <div className={cssClassName+'line'}/>
            </li>
        );
    }

    for (let i in props.requests) {
        requests.push(
            <li className={cssClassName+'li'} key={i}>
                <p className={cssClassName+'title'}>
                    {props.requests[i].title}
                </p>
                <p className={cssClassName+'subtext'}>
                    {props.requests[i].subtext}
                </p>
                <div className={cssClassName+'line'}/>
            </li>
        );
    }

    return <div className={cssClassName}>
        <div className={cssClassName+'list'}>
            <ul className={cssClassName+'ul'}>
                {chats}
            </ul>
        </div>
        <div className={cssClassName+'messager'}>
            <ul className={cssClassName+'ul'} style={{height: '250px'}}>
                {requests}
            </ul>
            <input 
                className={cssClassName+"input"} 
                value={props.name} 
                onChange={e => props.onNameChange(e.target.value)}
                placeholder="Temporary Username"
            /><br />
            <textarea 
                className={cssClassName+"input"} 
                value={props.message} placeholder="Message" 
                minLength="2"
                onChange={e => props.onMessageChange(e.target.value)}
            /><br />
            <div style={{textAlign: 'end', width: '90%', display: 'inline-block'}}>
                <button 
                    className="Button" 
                    style={{marginTop: '10px'}} 
                    onClick={() => props.sendChat()}>
                    Send
                </button>
            </div>
        </div>
    </div>;
}

export default Chatroom;