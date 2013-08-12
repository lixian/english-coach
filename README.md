# 个人英语阅读教练

## todo
-   在生词旁边，增加一键删除的按钮

## done
-   实现了一个标记生词的demo
-   插件化，不依赖于手写网页
-   把个人词库放到插件的localStorage里面
-   考虑各种变种词，比如说复数，时态等

## 个人词库保存在哪里？

1.  页面localStorage，不行，因为换一个页面，就没办法同步了

2.  插件localStorage，不行，因为在页面上没有办法进行增加，
    最终还是需要靠在页面上的点击来更新个人词库的。

3.  服务器
    -   页面加载完以后，发送jsonp到服务器去取个人词库
    -   进行展示
    -   如果需要个性，直接使用js本地先触发状态改动，再发jsonp请求到服务器

## API

1. 请求个人词库
    custom_keys?id={user id}

2. 管理个人词库
    custom_keys/add?word={new word}
    custom_keys/delete?word={new word}

