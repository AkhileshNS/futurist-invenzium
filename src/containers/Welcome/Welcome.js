//External Libraries
import React, {Component, Fragment} from 'react';

//Internal Libraries
import './Welcome.css';
import Intro from '../../components/Intro/Intro';
import Info from '../../components/Info/Info';
import Tutorial from '../../components/Tutorial/Tutorial';

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <Fragment>
                <section id={"Intro"}>
                    <Intro />
                </section>
                <section id={"Info"}>
                    <Info />
                </section>
                <section id={"Tutorial"}>
                    <Tutorial />
                </section>
            </Fragment>
        );

    }

}

export default Welcome;