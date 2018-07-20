//External Libraries
import React, {Component} from 'react';

//Internal Libraries
import './AppBar.css';

const cssClassName = "AppBar";
const hashList = ['Home','Manifest','Caching','IndexedDB','BackgroundSync','Web Push Notifications','Native Device Features'];

class AppBar extends Component { 
    
    render() {

        let list = [];
        let open = "buttonopen";

        if(this.props.show===false){
            open = "buttonclose"
        }

        for (let i in hashList){
            list.push(<li key={hashList[i]} className={`${cssClassName}li`}>
                <button className={`${cssClassName}${open}`}>{hashList[i]}</button>
            </li>);
        }

        return (
            <header>
                <div className={`${cssClassName}menu`} onClick={() => this.props.showMenu()}>
                    <div className={`${cssClassName}menubar`} />
                    <div className={`${cssClassName}menubar`} />
                    <div className={`${cssClassName}menubar`} />
                </div>
                <ul className={`${cssClassName}ul`}>
                    {list}
                </ul>
                <p>Futurist-Invenzium</p>
            </header>
        );
    }
}

export default AppBar;