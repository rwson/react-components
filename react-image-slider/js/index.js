/**
 * React
 */

"use strict";

import React,{ Component } from "react";
import ReactDOM from "react-dom";

import Slider from "./Slider";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const slderConfig = {
            "autoPlay": true,
            "interVal": 5000,
            "imgLists": [
                "imgs/1.jpg",
                "imgs/2.jpg",
                "imgs/3.jpg",
                "imgs/4.jpg",
                "imgs/5.jpg"
            ],
            "lazyLoad": true,
            "loading": "imgs/loading.gif",
            "beforeChange": () => {
                console.log("要开始换啦...");
            },
            "afterChange": () => {
                console.log("切换完啦...");
            }
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


