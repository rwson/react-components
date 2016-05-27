/**
 * 图片slider的实现
 */

"use strict";

import Util from "./Util";
import React,{ Component } from "react";

const defConfig = {
    "width": 500,
    "height": 300,
    "autoPlay": true,
    "interVal": 10000,
    "effects": "fade",
    "btns": true,
    "beforeChange": () => {},
    "afterChange": () => {}
};

let interval = null;

export default class Slider extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            "current": "fade",
            "effects": []
        };
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const props = this.props;
        const config = {};
    }

    render() {

    }


    componentWillUnmount() {}

}
