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
    "loading": "",                      //  加载小菊花
    "btns": true,                       //  是否显示按钮
    "beforeChange": () => {},           //  切换前回调
    "afterChange": () => {}             //  切换后回调
};

//  定时器
let interval = null;

//  已经加载过的图片地址,防止后面继续加载
let loaded = [];

//  当前播放
let currentPlay = 0;

export default class Slider extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
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
     * 组件被实例化完成
     */
    componentDidMount() {
        const { config } = this.state;
        interval = setInterval(() => {
            this.changeNext();
        }, config.interVal);
    }

    /**
     * 操作元素样式类
     * @param domNode       dom节点
     */
    operateClass(domNode) {
        let curClass = "pic-show";
        let commonClass = "";
        //  获取标签名,后面用来判断
        let tagName = domNode.tagName.toLowerCase();
        //  获取所有子节点对象
        let child = Array.prototype.slice.call(domNode.parentNode.childNodes);
        if(tagName == "img") {
            curClass = "pic-show";
            commonClass = "pic-hide";
        } else {
            curClass = "current-btn";
        }
        //  样式控制
        child.forEach((item, index) => {
            if(item.classList.contains(curClass)) {
                item.classList.remove(curClass);
                if(commonClass) {
                    item.classList.remove(commonClass);
                }
            }
            //  当前节点样式控制
            if(item == domNode) {
                item.classList.add(curClass);
            } else {
                if(commonClass) {
                    item.classList.add(commonClass);
                }
            }
        });
    }

    /**
     * 根据传入的下标进行切换
     * @param number    切换到第几张图
     */
    ctrlChangeByNumber(number) {
        const { config } = this.state;
        if(currentPlay == number) {
            return;
        }
        Util.runCallback({
            "callback": config.beforeChange
        });
        currentPlay = number;
        //  取得切换图片和按钮的javascript对象
        let sliders = this.refs["sliders"];
        let btns = this.refs["btns"];
        let curImg = sliders.querySelectorAll(".img-item")[currentPlay];
        let curBtn = btns.querySelectorAll(".btn-item")[currentPlay];
        //  图片之前没有加载过
        if(config.lazyLoad && loaded.indexOf(currentPlay) < 0) {
            let img = new Image();
            img.src = config.imgLists[currentPlay];
            img.onload = () => {
                curImg.src = config.imgLists[currentPlay];
                this.operateClass(curImg);
                this.operateClass(curBtn);
                Util.runCallback({
                    "callback": config.afterChange
                });
                loaded.push(currentPlay);
            };
        } else {
            this.operateClass(curImg);
            this.operateClass(curBtn);
            Util.runCallback({
                "callback": config.afterChange
            });
        }
    }

    /**
     * 切换到下一张
     */
    changeNext() {
        const { config } = this.state;
        let index = currentPlay + 1;
        if(index >= config.imgLists.length) {
            index = 0;
        }
        this.ctrlChangeByNumber(index);
    }

    /**
     * 控制按钮
     * @returns {XML|null}
     */
    renderCtrlBtns() {
        const { config } = this.state;
        const len = config.imgLists.length;
        const width = len * 30;
        if(config.btns && len > 0) {
            let btnArr = [];
            for(let i = 0; i < len; i ++) {
                let className = "btn-item";
                if(i == currentPlay) {
                    className += " current-btn";
                }
                btnArr.push((<i
                    key={Util.random()}
                    className={className}
                    onClick={this.ctrlChangeByNumber.bind(this,i)}>{i + 1}</i>));
            }
            return (
                <div className="btn-container btn-number" style={{width: width,marginLeft: -width / 2}} ref="btns">{btnArr}</div>
            );
        } else {
            return null;
        }
    }

    /**
     * 渲染图片列表
     * @returns {XML|null}
     */
    renderPicList() {
        const { config } = this.state;
        let imgArrs;
        if(config.imgLists) {
            imgArrs = config.imgLists.map((item, index)=> {
                let className = "img-item";
                if(index == currentPlay) {
                    className += " pic-show";
                } else {
                    className += " pic-hide";
                }
                if(config.lazyLoad && loaded.indexOf(index) < 0 && index != 0) {
                    return (
                        <img className={className} key={Util.random()} src={config.loading} />
                    );
                } else if(index == 0) {
                    loaded.push(0);
                    return (
                        <img className={className} key={Util.random()} src={item} />
                    );
                }
            });
        } else {
            imgArrs = null;
        }
        return (<div className="img-container"
                     style={{width: config.width,height: config.height}}
                     ref="sliders">{imgArrs}</div>);
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="slider-all">
                {this.renderPicList()}
                {this.renderCtrlBtns()}
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
