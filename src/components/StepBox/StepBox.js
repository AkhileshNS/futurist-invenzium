//External Libraries
import React, {Fragment} from 'react';

//Internal Libraries
import './StepBox.css';

const StepBox = (props) => {

    let content = <p className="StepBoxtitle">{props.title}</p>;
    if(props.subtext!=null){
        content = <Fragment>
            <p className="StepBoxtitle">{props.title}</p>
            <p className="StepBoxsubtext">{props.subtext}</p>
        </Fragment>;
    }

    return <Fragment><div className="StepBox">{content}</div><br/><br/></Fragment>
}

export default StepBox;