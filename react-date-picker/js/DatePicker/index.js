/**
 * 日历选择器的实现
 */

"use strict";

import React,{ Component } from "react";
import classnames from "classnames";

import Util from "../Util";

//  默认配置
const defConfig = {
    "format": "YYYY-MM-dd HH:mm:ss",        //  输出的时间格式
    "initDate": "now",                      //  初始化时间格式
    "showLevel": "day",                     //  显示级别(day:日|month:月)
    "maxDate": "2100-01-01",
    "minDate": "2100-01-01",
    "change": () => {
    },
    "close": () => {
    }
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
        if (Util.isLeapYear()) {
            monthDays[1] = 29;
        }
        const date = new Date();
        const dateInfo = {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "date": date.getDate()
        };
        this.state = {
            "monthDays": monthDays,
            "showLevel": "date",
            "storedDate": dateInfo,
            "date": date,
            "current": dateInfo,
            "renderData": {
                "years": [],
                "months": [],
                "days": []
            },
            "config": defConfig
        };
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        this.setState();
        this.calculatorInfo();
    }

    /**
     * 日期改变
     * @param date
     */
    changeDate(date) {
    }

    /**
     * 月份改变
     */
    changeMonth() {
    }

    /**
     * 上一月按钮
     */
    prevMonth() {
    }

    /**
     * 下一月按钮
     */
    nextMonth() {
    }

    /**
     * 年份发生改变
     * @param year  选中的年份
     */
    changeYear(year) {
    }

    /**
     * 计算日历相关信息
     */
    calculatorInfo() {
        const { current, storedDate, renderData } = this.state;

        /**
         * 计算年份 start
         */

        /**
         * 计算年份 end
         */

        /**
         * 计算月中的天数 start
         */
        let getInfos = {
            "prevYear": current.year,           //  上月对应的年
            "nextYear": current.year,           //  下月对应的年
            "prevMonth": current.month - 1,     //  上月对应的月
            "nextMonth": current.month + 1      //  下月对应的月
        };
        let daysInfo = {};                      //  每月的第一天的相关信息
        let renderDataDays = [];                //  用来渲染天的数组

        //  去年的情况
        if (getInfos.prevMonth < 0) {
            getInfos.prevMonth = 11;
            getInfos.prevYear--;
        }

        //  明年的情况
        if (getInfos.nextMonth > 11) {
            getInfos.nextMonth = 0;
            getInfos.nextYear++;
        }

        //  上月最后一天和下月第一天的相关信息
        daysInfo = {
            "prev": Util.getMonthFristDay(getInfos.prevYear, getInfos.prevMonth, monthDays[getInfos.prevMonth]),
            "next": Util.getMonthFristDay(getInfos.nextYear, getInfos.nextMonth),
            "prevMonthDays": monthDays[getInfos.prevMonth],
            "nextMonthDays": monthDays[getInfos.nextMonth]
        };


        //  上月不是最后一天星期六
        if (daysInfo.prev != 5) {
            for (let i = daysInfo.prevMonthDays - daysInfo.prev, prev = daysInfo.prevMonthDays; i <= prev; i++) {
                renderDataDays.push({
                    "num": i,
                    "today": false,
                    "active": false,
                    "id": Util.random(),
                    "type": "prev-month"
                });
            }
        }

        for(let i = 1,days = monthDays[current.month];i <= days;i ++) {
            renderDataDays.push({
                "num": i,
                "today": (current.year == storedDate.year) && (current.month == storedDate.month) && (i == storedDate.day),
                "active": false,
                "id": Util.random(),
                "type": "prev-month"
            });
        }

        //  下月不是第一天星期天
        if (daysInfo.next != 0) {
            for (let i = 1, next = 7 - daysInfo.next; i <= next; i++) {
                renderDataDays.push({
                    "num": i,
                    "today": false,
                    "active": false,
                    "id": Util.random(),
                    "type": "next-month"
                });
            }
        }

        renderData.days = renderDataDays;
        /**
         * 计算月中的天数 end
         */

        this.setState({
            "renderData": renderData
        });
    }

    /**
     * 渲染顶部部分
     */
    renderTop() {
        const { date } = this.state;
        return (
            <div className="top-area">
                <div className="btn-area">
                    <div className="left-btns">
                        <i className="prevYear">&lt;&lt;</i>
                        <i className="prevMonth">&lt;</i>
                    </div>
                    <div className="center-info">
                        { Util.convertTime(date, "YYYY-MM-dd") }
                    </div>
                    <div className="right-btns">
                        <i className="prevYear">&gt;&gt;</i>
                        <i className="prevMonth">&gt;</i>
                    </div>
                </div>
                <div className="weeks">
                    <span className="week-num">周日</span>
                    <span className="week-num">周一</span>
                    <span className="week-num">周二</span>
                    <span className="week-num">周三</span>
                    <span className="week-num">周四</span>
                    <span className="week-num">周五</span>
                    <span className="week-num">周六</span>
                </div>
            </div>
        );
    }

    /**
     * 渲染年份布局
     * @returns {XML}
     */
    renderYear() {
    }

    /**
     * 渲染月份布局
     * @returns {XML}
     */
    renderMonth() {
    }

    /**
     * 渲染日期布局
     * @returns {XML}
     */
    renderDate() {
        const { renderData } = this.state;
        let returnArr = [];                     //  返回的标签数组

        returnArr = renderData.days.map((item) => {
            return (
                <span key={ item.id } className={`day-item ${item.type} ${ classnames({
                    "today": item.today,
                    "active": item.active
                })}`}> { item.num } </span>
            );
        });

        return (
            <div className="days-container">
                { returnArr }
            </div>
        );
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="date-picker-all">
                {this.renderTop()}
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
