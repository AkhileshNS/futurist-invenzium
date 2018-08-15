//External Libraries
import React from 'react';
import Dropzone from 'react-dropzone';

//Internal Libraries
import './ImageDrop.css';

let cssClassName = "ImageDrop"

const ImageDrop = (props) => (<Dropzone 
    onDrop={props.onDrop.bind(this)} 
    className={cssClassName+'defdrop'} 
    accept="image/jpeg, image/png"
    acceptStyle={{backgroundColor: 'green'}}
    rejectStyle={{backgroundColor: 'red'}}>
    <p className={cssClassName+'droptext'}>{props.label}</p>
</Dropzone>);

export default ImageDrop;