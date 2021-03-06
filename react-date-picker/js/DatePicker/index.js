/**
 * 日历选择器的实现
 */

"use strict";

import React,{ Component } from "react";
import classnames from "classnames";
import objectAssign from "object-assign";

import Util from "../Util";

import "!style!css!less!../../less/reset.less";
import "!style!css!less!../../less/index.less";

//  默认配置
const defConfig = {
    "format": "YYYY-MM-dd HH:mm:ss",        //  输出的时间格式
    "initDate": "now",                      //  初始化时间(now||"":当前|时间字符串)
    "showLevel": "day",                     //  显示级别(day:日|month:月|year:年)
    "maxDate": "2100-01-01",                //  最大日期
    "minDate": "2000-01-01",                //  最小日期
    "change": () => {
    },                  //  选择的日期发生改变回调
    "close": () => {
    }                    //  关闭回调
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
            "date": date,
            "storedDate": dateInfo,
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
        const { config } = this.props;
        this.setState({
            "config": Util.merge(defConfig, config || {})
        }, () => {
            this.calculatorInfo();
        });
    }

    /**
     * 点击顶部显示区域,改变显示层级
     * @param level     层级(day:日|month:月|year:年)
     */
    changeShowLevel(level) {
        const { config } = this.props;
        this.setState({
            "config": objectAssign({}, config, {"showLevel": level})
        });
    }

    /**
     * 显示今天
     */
    showToday() {
        const { config } = this.props;
        this.setState({
            "current": this.state.storedDate,
            "config": objectAssign({}, config, {"showLevel": "day"})
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 点击具体的日期发生改变
     * @param date  日期
     * @param type  类型
     */
    changeDate(date, type) {
        let { current } = this.state;
        let year = current.year;
        let month = current.month;
        if (type == "prev-month") {
            month -= 1;
            if (month < 0) {
                year -= 1;
                month = 11;
            }
        } else if (type == "next-month") {
            month += 1;
            if (month > 11) {
                year += 1;
                month = 0;
            }
        }
        let target = new Date(year, month, date);
        this.setState({
            "current": objectAssign({}, current, {
                "month": target.getMonth(),
                "year": target.getFullYear(),
                "date": date
            }),
            "date": target
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 月份改变
     * @param month 目标月份
     */
    changeMonth(month) {
        let { current, config } = this.state;
        let year = current.year;
        let target = new Date(year, month, 1);
        this.setState({
            "current": objectAssign({}, current, {
                "month": month,
                "year": target.getFullYear(),
                "date": 1
            }),
            "date": target,
            "config": objectAssign({}, config,{"showLevel": "day"})
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 年份发生改变
     * @param year  选中的年份
     */
    changeYear(year) {
        let { current, config } = this.state;
        let month = current.month;
        let target = new Date(year, month, 1);
        this.setState({
            "current": objectAssign({}, current, {
                "month": month,
                "year": year,
                "date": 1
            }),
            "date": target,
            "config": objectAssign({}, config,{"showLevel": "month"})
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 上一月按钮
     */
    prevMonth() {
        let { current } = this.state;
        let month = current.month - 1;
        let year = current.year;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        let target = new Date(year, month, 1);
        this.setState({
            "current": objectAssign({}, current, {
                "month": target.getMonth(),
                "year": target.getFullYear()
            }),
            "date": target
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 下一月按钮
     */
    nextMonth() {
        let { current, config } = this.state;
        let month = current.month + 1;
        let year = current.year;
        if (month > 11) {
            month = 0;
            year += 1;
        }
        let target = new Date(year, month, 1);
        this.setState({
            "current": objectAssign({}, current, {
                "month": target.getMonth(),
                "year": target.getFullYear()
            }),
            "date": target
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 上一年按钮
     */
    prevYear() {
        const { current, config } = this.state;
        let year = current.year - 1;
        let target = new Date(year, current.month, 1);
        //  超过临界
        if (target < new Date(config.minDate)) {
            return;
        }
        this.setState({
            "current": objectAssign({}, current, {"year": year}),
            "date": new Date(year, current.month, 1)
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 下一年按钮
     */
    nextYear() {
        const { current, config } = this.state;
        let year = current.year + 1;
        let target = new Date(year, current.month, 1);
        //  超过临界
        if (target > new Date(config.maxDate)) {
            return;
        }
        this.setState({
            "current": objectAssign({}, current, {"year": year}),
            "date": target
        }, () => {
            Util.runCallback(config.change,{
                "argus": {
                    "current": target,
                    "result": Util.convertTime(target,config.format)
                }
            });
            this.calculatorInfo();
        });
    }

    /**
     * 计算日历相关信息
     */
    calculatorInfo() {
        const { current, storedDate, date, renderData, config } = this.state;
        let getInfos = {
            "prevYear": current.year,           //  上月对应的年
            "nextYear": current.year,           //  下月对应的年
            "prevMonth": current.month - 1,     //  上月对应的月
            "nextMonth": current.month + 1      //  下月对应的月
        };
        let activeObj = {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "date": date.getDate()
        };                                      //  判断active
        let curYear = current.year;             //  当前年
        let minDate = new Date(config.minDate); //  最小日期
        let maxDate = new Date(config.maxDate); //  最大日期
        let daysInfo = {};                      //  每月的第一天的相关信息
        let renderDataYears = [];               //  用来渲染月的数组
        let renderDataMonths = [];              //  用来渲染月的数组
        let renderDataDays = [];                //  用来渲染天的数组
        let startYear = curYear - 7;            //  开始年份
        let endYear = curYear + 7;              //  结束年份

        /**
         * 计算年份 start
         */
        //  传入了一个有效的最小日期
        if (!isNaN(Date.parse(minDate))) {
            let minYear = minDate.getFullYear();
            startYear = startYear < minYear ? minYear : startYear;
        }

        //  传入了一个有效的最大日期
        if (!isNaN(Date.parse(maxDate))) {
            let maxYear = maxDate.getFullYear();
            endYear = endYear > maxYear ? maxYear : endYear;
        }

        for (let year = startYear; year <= endYear; year++) {
            renderDataYears.push({
                "text": year,
                "num": year,
                "current": year == storedDate.year,
                "active": year == activeObj.year,
                "id": Util.random()
            });
        }
        /**
         * 计算年份 end
         */

        /**
         * 计算月份 start
         */
        renderDataMonths = monthNames.map((item, index) => {
            return {
                "text": item,
                "num": index,
                "current": (current.year == storedDate.year) && index == storedDate.month,
                "active": index == activeObj.month,
                "id": Util.random()
            };
        });
        /**
         * 计算月份 end
         */

        /**
         * 计算月中的天数 start
         */
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
        if (daysInfo.prev != 6) {
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

        for (let i = 1, days = monthDays[current.month]; i <= days; i++) {
            renderDataDays.push({
                "num": i,
                "today": (current.year == storedDate.year) && (current.month == storedDate.month) && (i == storedDate.date),
                "active": (current.year == date.year) && (current.month == date.month) && (i == date.date),
                "id": Util.random(),
                "type": "current-month"
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
        /**
         * 计算月中的天数 end
         */

        this.setState({
            "renderData": objectAssign({}, renderData, {
                "years": renderDataYears,
                "months": renderDataMonths,
                "days": renderDataDays
            })
        });
    }

    /**
     * 渲染顶部部分
     */
    renderTop() {
        const { config, date } = this.state;
        const targetDate = Util.convertTime(date, "YYYY-MM-dd");
        return (
            <div className="top-area">
                <div className="btn-area">
                    <div className="left-btns">
                        <i className="prevYear" onClick={this.prevYear.bind(this)}>&lt;&lt;</i>
                        <i className="prevMonth" onClick={this.prevMonth.bind(this)}>&lt;</i>
                    </div>
                    <div className="center-info"
                         style={{display: config.showLevel == "year" ? "block" : "none"}}>
                        { targetDate }
                    </div>
                    <div className="center-info"
                         onClick={this.changeShowLevel.bind(this, "year")}
                         style={{display: config.showLevel == "month" ? "block" : "none"}}>
                        { targetDate }
                    </div>
                    <div className="center-info"
                         onClick={this.changeShowLevel.bind(this, "month")}
                         style={{display: config.showLevel == "day" ? "block" : "none"}}>
                        { targetDate }
                    </div>
                    <div className="right-btns">
                        <i className="nextMonth" onClick={this.nextMonth.bind(this)}>&gt;</i>
                        <i className="nextYear" onClick={this.nextYear.bind(this)}>&gt;&gt;</i>
                    </div>
                </div>
                <div className="weeks" style={{display: config.showLevel == "day" ? "block" : "none"}}>
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
        const { renderData, config } = this.state;
        let years = renderData.years.map((item) => {
            return (
                <span key={item.id}
                      onClick={this.changeYear.bind(this,item.num)}
                      className={`year-item ${classnames({
                        "current": item.current,
                        "active": item.active
                      })}`}>
                    { item.text }
                </span>
            );
        });
        return (
            <div className="years-container" style={{display: config.showLevel == "year" ? "block" : "none"}}>
                { years }
            </div>
        );
    }

    /**
     * 渲染月份布局
     * @returns {XML}
     */
    renderMonth() {
        const { renderData, config } = this.state;
        let months = renderData.months.map((item) => {
            return (
                <span key={ item.id }
                      onClick={this.changeMonth.bind(this,item.num)}
                      className={`month-item ${ classnames({
                        "current": item.current,
                        "active": item.active
                      })}`}>
                        { item.text }
                </span>
            );
        });
        return (
            <div className="months-container" style={{display: config.showLevel == "month" ? "block" : "none"}}>
                { months }
            </div>
        );
    }

    /**
     * 渲染日期布局
     * @returns {XML}
     */
    renderDate() {
        const { renderData, config } = this.state;
        let days = renderData.days.map((item) => {
            return (
                <span key={ item.id }
                      onClick={ this.changeDate.bind(this, item.num, item.type) }
                      className={`day-item ${item.type} ${ classnames({
                            "today": item.today,
                            "active": item.active
                        })}`}> { item.num } </span>
            );
        });

        return (
            <div className="days-container" style={{display: config.showLevel == "day" ? "block" : "none"}}>
                { days }
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
        this.state = {};
    }

}
