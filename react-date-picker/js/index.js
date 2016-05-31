/**
 * React
 */

"use strict";

import React,{ Component } from "react";
import ReactDOM from "react-dom";

import DatePicker from "./DatePicker";

import "!style!css!less!../less/reset.less";
import "!style!css!less!../less/index.less";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <DatePicker />
            </div>
        );
    }

}

const container = document.querySelector("#app");

ReactDOM.render(<App/>, container);


