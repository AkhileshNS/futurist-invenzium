//External Libraries
import React, {Component} from 'react';
import withRouter from 'react-router-dom/withRouter';

//Internal Libraries
import './AppBar.css';

const cssClassName = "AppBar";
const hashList = ['Home','Manifest','Caching','IndexedDB','BackgroundSync','Web Push Notifications','Native Device Features'];

class AppBar extends Component { 

    navigateTo = (value) => {

        if(this.props.history.location.pathname===value){}
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
        let open = "buttonopen";

        if(this.props.show===false){
            open = "buttonclose"
        }

        for (let i in hashList){
            list.push(<li key={hashList[i]} className={`${cssClassName}li`}>
                <button className={`${cssClassName}${open}`} onClick={() => this.navigateTo(hashList[i])}>{hashList[i]}</button>
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

export default withRouter(AppBar);