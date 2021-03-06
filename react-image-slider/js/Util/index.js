/**
 * 工具方法
 */

"use strict";

export default class Util {

    /**
     * 获取两个数中的较大者
     * @param num1  第一个数字
     * @param num2  第二个数字
     * @returns {*}
     */
    static getMin(num1, num2) {
        let tansit = num1;
        if (num2 < num1) {
            tansit = num2;
        }
        return tansit;
    }

    /**
     * 获取两个数中的较大者
     * @param num1  第一个数字
     * @param num2  第二个数字
     * @returns {*}
     */
    static getMax(num1, num2) {
        let tansit = num1;
        if (num2 > num1) {
            tansit = num2;
        }
        return tansit;
    }

    /**
     * 根据指定参数合并两个对象
     * @param obj       第一个被合并的对象
     * @param obj2      第二个被合并的对象
     * @param override  如果第二个对象和第一个对象相同属性对应的值相同,指定为true,第一个的将被复写,否则被忽略
     * @returns {*}
     */
    static merge(obj, obj2, override) {
        let res = obj;
        //  遍历第二个对象(非空)
        if(!this.isEmpty(obj2)){
            for (var i in obj2) {
                //  支持重写,且原对象存在该属性值
                if (override && !!res[i]) {
                    res[i] = obj2[i];
                } else {
                    res[i] = obj2[i];
                }
            }
        }
        return res;
    }

    /**
     * 获取一个随机字符串
     * @returns {string}
     */
    static random() {
        return (Math.random() * 9999).toString(16).replace(/\./g, "");
    }

    /**
     * 生成指定范围内的随机数
     * @param min   最小值
     * @param max   最大值
     * @returns {number}
     */
    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 获取对象原型下的类名
     * @param obj   被获取的对象
     * @returns {*}
     */
    static getProType(obj) {
        return Object.prototype.toString.call(obj).toLowerCase().replace(/\[|\]/g, "").split(" ")[1];
    }

    /**
     * 格式化时间
     * @param date      时间对象
     * @param format    要输出的时间格式
     * @returns {string}
     */
    static convertTime(date, format) {
        //  最终的日期对象
        let finalDate = date instanceof  Date ? date : new Date();

        //  日期相关信息
        let dateInfo = {
            "year": finalDate.getFullYear(),
            "month": _toDouble(finalDate.getMonth() + 1),
            "date": _toDouble(finalDate.getDate()),
            "hour": _toDouble(finalDate.getHours()),
            "minutes": _toDouble(finalDate.getMinutes()),
            "seconds": _toDouble(finalDate.getSeconds())
        };

        //  最后要输出时间格式
        let finalFormart = format || "yyyy-mm-dd HH:MM:ss";

        //  组织个数组方便转换
        let formatArr = (/\s/).test(finalFormart) ? finalFormart.split(" ") : [finalFormart];

        //  最后要输出结果的数组
        let res = [];

        //  遍历最后出来的数组进行替换
        formatArr.forEach((item, index)=> {
            if (index == 0) {
                res.push(item.replace(/y{4}/ig, dateInfo.year).replace(/m{2}/gi, dateInfo.month).replace(/d{2}/ig, dateInfo.date));
            } else if (index == 1) {
                res.push(item.replace(/h{2}/ig, dateInfo.hour).replace(/m{2}/gi, dateInfo.minutes).replace(/s{2}/ig, dateInfo.seconds));
            }
        });

        return res.join(" ");
    }

    /**
     * 判断对象是否为空
     * @param obj   被判断的对象
     * @returns {boolean}
     */
    static isEmpty(obj) {
        var _res = false;
        if (["null", "undefined"].indexOf(this.getProType(obj)) > -1) {
            _res = true;
        } else if (this.getProType(obj) == "object") {
            _res = !Object.keys(obj).length;
        } else {
            _res = !obj.length;
        }
        return _res;
    }

    /**
     * 运行回调函数
     * @param config    配置参数
     */
    static runCallback(config) {
        let defaults = {
            "callback": () => {},
            "context": {},
            "argus": []
        };
        config = this.merge(defaults,config);
        if(this.getProType(config.callback) == "function") {
            config.callback.apply(config.context || window, config.argus);
        }
    }
}

/**
 * 小于10的数字转成两位输出
 * @param num   被转换的数字
 * @returns {*}
 * @private
 */
function _toDouble(num) {
    return num > 9 ? num : "0" + num;
}
