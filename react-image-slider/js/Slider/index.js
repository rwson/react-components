/**
 * 图片slider的实现
 */

"use strict";

import Util from "../Util";
import React,{ Component } from "react";

//  默认配置
const defConfig = {
    "width": 800,                       //  宽度
    "height": 300,                      //  高度
    "autoPlay": true,                   //  自动切换
    "interVal": 10000,                  //  自动切换时间
    "imgLists": [],                     //  图片对象
    "lazyLoad": true,                   //  懒加载
    "btnType": "number",                //  按钮类型(number/arrow)
    "btns": true,                       //  是否显示按钮
    "beforeChange": () => {},           //  切换前回调
    "afterChange": () => {}             //  切换后回调
};

//  定时器
let interval = null;

export default class Slider extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            "currentIndex": 0,
            "config": defConfig
        };
    }

    /**
     * 组件即将被实例化完成,取得相关参数
     */
    componentWillMount() {
        const { slderConfig } = this.props;
        this.setState({
            "config": Util.merge(defConfig,slderConfig || {})
        });
    }


    dealWithClass() {

    }

    renderCtrlBtns() {

    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="slider-all">
            </div>
        );
    }

    /**
     * 组件被销毁
     */
    componentWillUnmount() {
        clearInterval(interval);
        this.state = {
            "current": "fade",
            "effect": []
        };
    }

}
