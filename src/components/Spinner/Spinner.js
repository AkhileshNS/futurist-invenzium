//External Libraries
import React from 'react';

//Internal Libraries
import './Spinner.css'

let cssClassName = 'Spinner';

const Spinner = (props) => {
    let list = [];
    for (let i in props.list){
        list.push(<option key={props.values[i]} value={props.values[i]}>{props.list[i]}</option>);
    }
    return <select className={cssClassName+"sel"}
        value={props.value} 
        onChange={e => props.onChange(e)}>
        {list}
    </select>
}

export default Spinner;