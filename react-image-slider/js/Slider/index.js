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
    "imgLists": [],                     //  图片数组
    "lazyLoad": true,                   //  懒加载
    "btnType": "number",                //  按钮类型(number/arrow)
    "btns": true,                       //  是否显示按钮
    "beforeChange": () => {},           //  切换前回调
    "afterChange": () => {}             //  切换后回调
};

//  定时器
let interval = null;

//  已经加载过的图片地址,防止后面继续加载
let loaded = [];

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

    /**
     * 根据传入的下标进行切换
     * @param number    切换到第几张图
     */
    ctrlChangeByNumber(number) {
        const { config } = this.state;
        Util.runCallback({
            "callback": config.beforeChange
        });
        this.setState({
            "currentIndex": number
        });
        Util.runCallback({
            "callback": config.afterChange
        });
    }

    /**
     * 切换到下一张
     */
    changeNext() {
        const { config ,currentIndex } = this.state;
        let index = currentIndex++;
        if(index >= config.imgLists.length) {
            index = 0;
        }
        this.setState({
            "currentIndex": index
        });
    }

    /**
     * 控制按钮
     * @returns {XML||null}
     */
    renderCtrlBtns() {
        const { config } = this.state;
        if(config.btns && !!config.imgLists) {
            let btnArr = [];
            for(let i = 0,len = config.imgLists.length; i < len; i ++) {
                btnArr.push(`<span
                                className="btn-item"
                                onClick={this.ctrlChangeByNumber.bind(this,i)}>${i + 1}</span>`);
            }
            return (
                <div className="btn-container btn-number">{btnArr}</div>
            );
        } else {
            return null;
        }
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
