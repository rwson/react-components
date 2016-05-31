/**
 * 日历选择器的实现
 */

"use strict";

import React,{ Component } from "react";

import Util from "../Util";

//  默认配置
const defConfig = {
    "format": "YYYY-MM-dd HH:mm:ss",        //  输出的时间格式
    "initDate": "now",                      //  初始化时间格式
    "triggerEv": "focus",
    "showLevel": "date",
    "maxDate": "2100-01-01",
    "minDate": "2100-01-01",
    "change": () => {},
    "close": () => {}
};

//  月份天数
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//  月份的英文名
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class DatePicker extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        //  闰年的二月操作
        if(Util.isLeapYear()) {
            monthDays[1] = 29;
        }
        const date = new Date();
        this.state = {
            "monthDays": monthDays,
            "showLevel": "date",
            "current": {
                "year": date.getFullYear(),
                "month": date.getMonth(),
                "date": date.getDate()
            }
        };
    }

    /**
     * 日期改变
     * @param date
     */
    changeDate(date) {}

    /**
     * 月份改变
     */
    changeMonth() {}

    /**
     * 上一月按钮
     */
    prevMonth() {}

    /**
     * 下一月按钮
     */
    nextMonth() {}

    /**
     * 年份发生改变
     * @param year  选中的年份
     */
    changeYear(year) {}

    /**
     * 渲染年份布局
     * @returns {XML}
     */
    renderYear() {}

    /**
     * 渲染月份布局
     * @returns {XML}
     */
    renderMonth() {}

    /**
     * 渲染日期布局
     * @returns {XML}
     */
    renderDate() {

        let numsArr = [];
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="date-picker-all">
                {this.renderYear()}
                {this.renderMonth()}
                {this.renderDate()}
            </div>
        );
    }

    /**
     * 组件被销毁
     */
    componentWillUnmount() {

    }

}
