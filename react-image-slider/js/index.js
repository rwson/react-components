/**
 * React
 */

"use strict";

import React,{ Component } from "react";
import ReactDOM from "react-dom";

import Slider from "./Slider";

import "!css!less!../less/reset.less";
import "!css!less!../less/index.less";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const slderConfig = {
            "autoPlay": true,
            "interVal": 4000,
            "imgLists": [
                1,2,3,4,5
            ]
        };
        return (
            <div>
                <Slider slderConfig={slderConfig} />
            </div>
        );
    }

}

const container = document.querySelector("#app");

ReactDOM.render(<App/>, container);


