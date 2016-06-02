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
            "content": "content2",
            "type": "content"
        },
        {
            "title": "title2",
            "content": "content2",
            "type": "list"
        },
        {
            "title": "title2",
            "content": "content2",
            "type": "list-link"
        }
    ],
    "initIndex": 1,
    "triggerChange": "click",
    "beforeChange": () => {
    },
    "afterChange": () => {
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
            "currentShow": 1
        };
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const { config } = this.props;
        this.setState({
            "config": Util.merge(defConfig, config)
        });
    }

    /**
     * 组件被实例化完成
     */
    componentDidMount() {
    }

    /**
     * 根据具体的索引切换显示内容
     * @param index 索引
     */
    changeCurrent(index) {
        this.setState({
            "current": index
        });
    }

    /**
     * 渲染tab切换的头部区域
     * @returns {XML||null}
     */
    renderTabTitle() {
        const { config, current } = this.state;
        const { tabs } = config;
        if (Util.isEmpty(tabs)) {
            return null;
        }
        let titles = tabs.map((item, index) => {
            return (
                <li key={ Util.random() }
                    className={`tab-controller-item ${classnames({
                    "active": (current == config.initIndex) || (current == index)
                })}`}>
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

    renderInner(item) {
    }

    renderTabContent() {
        const { config } = this.state;
        const { tabs } = config;
        if (Util.isEmpty(tabs)) {
            return null;
        }
        let contents = tabs.map((item, index) => {
            let displayStyle = {
                "display": (current == config.initIndex) || (current == index) ? "block" : "none"
            };
            return (
                <div key={ Util.random() }
                     className={`tab-content-item`}
                     style={ displayStyle }>

                </div>
            );
        });
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="tab-container">

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
