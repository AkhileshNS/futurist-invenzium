//External Libraries
import React, {Component} from 'react';

//Internal Libraries
import './Indexed.css';
import '../../global.css';
import db from '../../components/db';
import indexeddb from '../../assets/indexeddb.svg';
import Info from '../../components/Info/Info';

let cssClassName = 'Indexed';

const LinkStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.6em',
    textDecoration: 'none',
};

class Indexed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            list: []
        };
    }

    updateTitleValue(e) {
        this.setState({
          title: e.target.value
        });
    }

    updateContentValue(e) {
        this.setState({
          content: e.target.value
        });
    }

    componentDidMount() {
        db.table('posts')
        .toArray()
        .then((posts) => {
            this.setState({
                list: posts
            });
        });
    }

    addPost = () => {
        let Post = {
            title: this.state.title,
            subtext: this.state.content
        };
        db.table('posts')
        .add(Post)
        .then((id) => {
            const newList = [...this.state.list, Object.assign({}, Post, {id})];
            this.setState({
                list: newList
            });
        });
    }

    deletePost = (id) => {
        db.table('posts')
        .delete(id)
        .then(() => {
            const newList = this.state.list.filter((post) => post.id !== id);
            this.setState({ list: newList });
        });
    }

    render() {

        let list = [];
        let mainList = this.state.list;

        for (let i in mainList){
            list.push(<li key={mainList[i].id} className={`${cssClassName}li`}>
                <div className={`${cssClassName}lidiv`} onClick={() => this.deletePost(mainList[i].id)}>
                    <p style={LinkStyle}>{mainList[i].title}</p>
                </div>
                <p className={cssClassName+`subtext`}> {mainList[i].subtext}</p>
            </li>);
        }

        return (
            <div className={cssClassName}>
                <img className={cssClassName+'img'} src={indexeddb} alt="Indexed DB" />
                <Info 
                    titletop='30'
                    title="IndexedDB"
                    subtext={`While not necessarily a feature directly connected to PWAs, IndexedDB is an excellent alternate to dynamic caching
                    for storing and manipulating JSON data. IndexedDB is essentially a NoSQL database for your website. There have been many
                    attempts to try to give web developers use of some type of local storage for their websites such as WebSQL, localStorage
                    and sessionStorage but IndexedDB is by far the best. Since it is a NoSQL database, it saves data in the form of key-value 
                    pairs where the values can be anything from objects to even files. Below we have provided a demo of IndexedDB in use.`}
                    removeLine={true}
                />
                <p className="subtext" style={{fontWeight: 'bold'}}>
                    Please Note. If you want to use IndexedDB we recommend using a IndexedDB wrapper 
                    like <a href="http://dexie.org/" rel="noopener noreferrer" target='_blank'>dexie</a> or <a href="https://github.com/jakearchibald/idb" rel="noopener noreferrer" target='_blank'>idb by JohnArchibald</a>. For this site,
                    we are using dexie.
                </p>
                <div className='line' style={{marginTop: '30px'}}/>
                <p className='subtext'>
                    We have implemented IndexedDB to create a simple post-it application: Here you can type in a post name and write the 
                    contents of the post-it and it will be saved to IndexedDB. And since we are using IndexedDB, any of the posts you created 
                    will be saved locally meaning when you revisit the site later or go offline, your posts will still be availabe. Even better,
                    since IndexedDB is essentially a local Database, once combined with static caching, you can even create and edit posts 
                    completely offline (something which you could, in the past, only do with mobile apps). To try this, simply switch off your net 
                    connection and try creating/editing posts.<br /><strong>Note: If you want to delete a post, just click on it's title.</strong>
                </p>
                <div className={cssClassName+'inputbox'}>
                    <input
                        value={this.state.title} 
                        onChange={e => this.updateTitleValue(e)}
                        className={cssClassName+"input"} 
                        type="text" 
                        placeholder="Post Title"
                    />
                    <textarea
                        value={this.state.content}
                        onChange={e => this.updateContentValue(e)} 
                        className={cssClassName+"textarea"} 
                        placeholder="Post Description"
                        style={{height: '100px'}}
                    />
                    <button className='Button' onClick={() => this.addPost()}>Create Post</button>
                </div>
                <ul className={cssClassName+'ul'} style={{listStyleType: 'none', marginTop: '30px'}}>
                    {list}
                </ul>
                <div className="line" style={{marginTop: '30px'}}/>
            </div>
        );
    }
}

export default Indexed;