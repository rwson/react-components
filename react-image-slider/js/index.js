/**
 * React
 */

"use strict";

import React,{ Componnet } from "react";
import ReactDOM from "react-dom";

import Slider from "./Slider";

import "!css!less!./less/reset.less";
import "!css!less!./less/index.less";

class App extends Componnet {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Slider
                    autoPlay={true}
                    interVal={}
                    />
            </div>
        );
    }

}

const container = document.querySelector("#app");

ReactDOM.render(<App/>, container);


