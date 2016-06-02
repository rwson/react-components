# react-tab

react版tab

---

##### 使用

没有发布到npm仓库(其实是不会发布😄),可以把仓库克隆到本地:

    git clone https://github.com/rwson/my-react-components.git


在文件中可以用下面的方法进行引用:


    "use strict";

    import React,{ Component } from "react";
    import ReactDOM from "react-dom";

    import Tab from "./Tab";

    class App extends Component {

        constructor(props) {
            super(props);
        }
    
        render() {
            const config = {
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
            return (
                <div>
                    <Tab />
                </div>
            );
        }

    }
    
    const container = document.querySelector("#app");
    
    ReactDOM.render(<App/>, container);

#### API



属性名 | 意义 | 可选值
---|---|---
tabs | tab项 | [Object],有三种可选,详见下方备注
initIndex | 初始化显示第几个 |  从0开始
beforeChange | 切换前回调 |  函数
afterChange | 切换后回调 |  函数


注:
可以指定类型来决定(type)改tab显示的内容

1. content      ->  简单内容
2. list         ->  简单列表(content需要传入字符串类型的数组)
3. list-link    ->  列表链接(content需要传入对象类型的数组,每一项由title和link组成)

