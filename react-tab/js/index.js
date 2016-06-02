/**
 * React
 */

"use strict";

import React,{ Component } from "react";
import ReactDOM from "react-dom";

import Tab from "./Tab";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const config = {
            "tabs": [
                {
                    "title": "title1",
                    "content": "content1",
                    "type": "content"
                },
                {
                    "title": "title2",
                    "content": [
                        "item1",
                        "item2",
                        "item3"
                    ],
                    "type": "list"
                },
                {
                    "title": "title3",
                    "content": [
                        {
                            "title": "google",
                            "link": "https://www.google.com.hk"
                        },
                        {
                            "title": "github",
                            "link": "https://github.com"
                        },
                        {
                            "title": "youtube",
                            "link": "https://github.com"
                        }
                    ],
                    "type": "list-link"
                }
            ],
            "initIndex": 0,
            "beforeChange": () => {
                alert("切换前....");
            },
            "afterChange": () => {
                alert("切换后....");
            }
        };
        return (
            <div>
                <Tab />
            </div>
        );
    }

}

const container = document.querySelector("#app");

ReactDOM.render(<App/>, container);


