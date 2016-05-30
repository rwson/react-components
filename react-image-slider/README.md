# react-image-slider

图片滑动组件

---

##### 使用

没有发布到npm仓库(其实是不会发布😄),可以把仓库克隆到本地:

    git clone https://github.com/rwson/my-react-components.git


在文件中可以用下面的方法进行引用:


    "use strict";

    import React,{ Component } from "react";
    import ReactDOM from "react-dom";

    import Slider from "path/to/Slider";
    
    class App extends Component {

        constructor(props) {
            super(props);
        }
    
        render() {
            const slderConfig = {
                "autoPlay": true,
                "interVal": 5000,
                "imgLists": [
                    "imgs/1.jpg",
                    "imgs/2.jpg",
                    "imgs/3.jpg",
                    "imgs/4.jpg",
                    "imgs/5.jpg"
                ],
                "lazyLoad": false,
                "beforeChange": () => {
                    console.log("要开始换啦...");
                },
                "afterChange": () => {
                    console.log("切换完啦...");
                }
            };
            return (
                <div>
                    <Slider slderConfig={slderConfig} />
                </div>
            );
        }

    }

    const container = document.querySelector("#app");

    ReactDOM.render(<App/>, container);

#### API



属性名 | 意义 | 可选值
---|---|---
width | 宽度 |  数字
height | 高度 |  数字
autoPlay | 自动播放 |  true/false
interVal | 自动播放间隔 |  数字,毫秒为单位
lazyLoad | 是否支持栏加载 |  是否显示按钮
loading | 缓冲图片的路径 | 字符串
beforeChange | 切换前回调 |  函数
afterChange | 切换后回调 |  函数
