/**
 * Tab切换
 */

"use strict";

import React, { Component } from "react";
import classnames from "classnames";

import Util from "../Util";

import "!style!css!less!../../less/reset.less";
import "!style!css!less!../../less/index.less";

const defConfig = {
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
    "triggerChange": "click",
    "beforeChange": () => {
        alert("切换前....");
    },
    "afterChange": () => {
        alert("切换后....");
    }
};

export default class Tab extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            "config": defConfig,
            "currentShow": 0
        };
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const { config } = this.props;
        const mergedObject = Util.merge(defConfig, config);
        this.setState({
            "config": mergedObject,
            "currentShow": mergedObject.initIndex
        });
    }

    /**
     * 根据具体的索引切换显示内容
     * @param index 索引
     */
    changeCurrent(index) {
        const { config } = this.state;
        Util.runCallback({
            "callback": config.beforeChange
        });
        this.setState({
            "currentShow": index
        });
        Util.runCallback({
            "callback": config.afterChange
        });
    }

    /**
     * 渲染tab切换的头部区域
     * @returns {XML||null}
     */
    renderTabTitle() {
        const { config, currentShow } = this.state;
        const { tabs } = config;
        if (Util.isEmpty(tabs)) {
            return null;
        }
        let titles = tabs.map((item, index) => {
            return (
                <li key={ Util.random() }
                    className={`tab-controller-item ${classnames({
                        "active": ((currentShow == config.initIndex) && (currentShow == index)) || (currentShow == index)
                    })}`}
                    onClick={ this.changeCurrent.bind(this, index) }>
                    { item.title }
                </li>
            );
        });
        return (
            <div className="tab-titles">
                <ul className="tab-controllers">
                    { titles }
                </ul>
            </div>
        );
    }

    /**
     * 根据当前项下type对应的值具体渲染一种类型
     * @param item  当前项
     */
    renderInner(item) {
        let returnVal = null;
        switch (item.type) {

            //  简单内容
            case "content":
                returnVal = (
                    <div className="tab-simple-content">
                        { item.content }
                    </div>
                );
                break;

            //  简单列表
            case "list":
                returnVal = (
                    <ul className="tab-simple-list">
                        {
                            item.content.map((contentI) => {
                                return (
                                    <li key={ Util.random() }
                                        className="tab-simple-list-item">
                                        { contentI }
                                    </li>
                                );
                            })
                        }
                    </ul>
                );
                break;

            //  列表项链接
            case "list-link":
                returnVal = (
                    <ul className="tab-link-list">
                        {
                            item.content.map((contentI) => {
                                return (
                                    <li key={ Util.random() }
                                        className="tab-link-item-item">
                                        <a target="_blank"
                                            href={ contentI.link }>
                                            { contentI.title }
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                );
                break;

            default :break;
        }
        return returnVal;
    }

    /**
     * 渲染tab下面的显示部分
     * @returns {XML||null}
     */
    renderTabContent() {
        const { config, currentShow } = this.state;
        const { tabs } = config;
        if (Util.isEmpty(tabs)) {
            return null;
        }
        let contents = tabs.map((item, index) => {
            let displayStyle = {
                "display": ((currentShow == config.initIndex) && (currentShow == index)) || (currentShow == index) ? "block" : "none"
            };
            return (
                <div key={ Util.random() }
                     className={`tab-content-item`}
                     style={ displayStyle }>
                    { this.renderInner(item) }
                </div>
            );
        });
        return (
            <div className="tab-contents">
                { contents }
            </div>
        );
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="tab-container">
                { this.renderTabTitle() }
                { this.renderTabContent() }
            </div>
        );
    }

    /**
     * 组件即将被销毁
     */
    componentWillUnmount() {
        this.state = {};
    }

}
