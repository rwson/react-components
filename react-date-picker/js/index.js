/**
 * React
 */

"use strict";

import React,{ Component } from "react";
import ReactDOM from "react-dom";

import DatePicker from "./DatePicker";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const config = {
            "format": "YYYY-MM-dd HH:mm:ss",
            "initDate": "now",
            "showLevel": "day",
            "maxDate": "2100-01-01",
            "minDate": "2000-01-01",
            "change": () => {
            },
            "close": () => {
            }
        };
        return (
            <div>
                <DatePicker config={ config } />
            </div>
        );
    }

}

const container = document.querySelector("#app");

ReactDOM.render(<App/>, container);


