# nodejs&ES6

**babel-cli可以将ES6改成ES5进行低版本兼容**

### 1、exports模块化编程

> **exports **返回的是模块函数

```js
var exportFun={
    add:function (oneParam,towParam){
        return oneParam+towParam;
    },
    reds:function (oneParam,towParam){
        return oneParam-towParam;
    }
}
function multiply(oneParam,towParam){
    return oneParam*towParam;
}
var posts=444;
exports.posts=posts;
exports.multiply=multiply;
exports.exportFun=exportFun;
```

> **module.exports **返回的是模块对象本身，返回的是一个类

```js
var sayHello=function (chuan){
    console.log(chuan);
}
module.exports =sayHello;
```

使用上的区别是

> **exports的方法可以直接调用**

```js
var Demo=require("./export");
console.log("*****************************************")
console.log(Demo.multiply(2,4))
console.log("*****************************************")
console.log(Demo.exportFun.add(3,7));
console.log(Demo.posts)
```

> **module.exports需要new对象之后才可以调用**

```js
var sayHello=require('./modeExports');
var sayHello = new sayHello("test");
//或者直接调用
console.log(sayHello("ttt"));
```

### 2、http服务器及参数处理

```js
//引入node.js内置http模块及url模块
var http = require("http");
var url = require("url");
http.createServer(
    function (request,response){
        /*
        * 发送http头部
        * 参数1：响应状态码，200表示成功
        * 参数2：响应头部信息，content-type内容类型：纯文本
        * */
        response.writeHead(200,{"content-type": "text/pain"});
        // for (var i=0;i<10;i++){
        //     response.write('Hello World! \n');
        // }
        /*
        * 解析请求地址
        * 参数1：请求地址
        * 参数2：true的话使用query解析参数到一个对象，默认是false
        * */
        var params = url.parse(request.url,true).query;
        console.log(params)
        for(var key in params){
            console.log(key+"="+params[key]);
            response.write(key+"="+params[key]+' \n');
        }
        response.end("");
    }
).listen(28888);
console.log("服务器运行在http://127.0.0.1:28888")
```

### 3、包资源管理器NPM

> 可以到https://www.npmjs.com/进行包搜索

``` shell
#初始化
npm init
#进入项目后执行，项目按装某个模块，安装完后使用require命令应用
npm install <Module Name> 
#可简写为
npm i <Module Name>
#指定版本安装
npm install npm@5.9.1
#全局安装安装某个模块
npm install <Module Name> -g
#卸载安装的模块
npm uninstall <Module Name>
#查看项目内所安装的所有的模块
npm list 
#查看项目内指定模块的版本信息 
npm list <Module Name> 
#查看全局所安装的所有的模块
npm list -g  
#将全局npm设置为淘宝镜像
npm config set registry https://registry.npm.taobao.org --global
#安装nrm
npm install -g nrm 
#使用nrm工具切换淘宝源
npx nrm use taobao 
#使用nrm切换回官方源
npx nrm use npm	
#使用淘宝定制的cnpm（gzip压缩支持）命令行工具代替默认的npm
npm install -g cnpm --registry=https://registry.npm.taobao.org

#install -save在package文件的dependencies节点写入依赖
#dependencies：运行时依赖发布后，即生产环境下还需要用的模块
npm install -save moduleName

#install -save-dev在package文件的devDependencies节点写入依赖
#devDependencies：开发时的依赖。此模块里的内容仅开发时使用，发布时使用不到，比如：项目中使用的gulp,压缩css、js的模块。这些我们在项目时就不需要。
npm install -save-dev moduleName
```

### 4、Package.json说明

> package.json文件是在项目内npm init执行后会存在

> npm install module_name 项目内安装完模块后会在项目内出现package-lock.json文件

```js
name			//包名
version			//包的版本号
description		////包的描述
homepage		//包的官网url
author			//包的作者姓名
contributors	//包的其他贡献者姓名
dependencies	//依赖包列表；如果项目里没有依赖包，在项目里执行npm install命令，会根据dependencies信息来进行依赖包安装;
repositry		//包代码存放的地方的类型；可以是git或svn;
main			//main字段指定程序的主入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js;
scripts			//设置执行脚本，可以通过npm run 脚本名；例如：查看目录'dir',设置为"dirName":"dir",执行时npm run dirName
keywords		//关键字
//package.json中dependencies内文件版本号说明
"5.0.3"		//表示安装指定5.0.3版本
"^5.0.3"	//表示安装5.X.X版本，安装5版本中最新版本
"~5.0.3"	//表示安装5.0.X版本，安装5.0版本中最新版本
```

> Package.json

```json
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "this is a nodejs test project",
  "main": "index.js",
  "scripts": {
    "description": "运行脚本设置",
    "dirName": "dir"
  },
  "keywords": [
    "node",
    "vue"
  ],
  "author": "gaogg",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.12"
  },
  "devDependencies": {
    "jquery": "^3.6.0"
  }
}
```

### 5、ES6低版本浏览器兼容

使用babel-cli脚手架，将ES6转换成ES5来兼容低版本IE

#### 5.1babel-cli安装

babel提供的一个编译工具babel-node，也可执行我们的js代码（babel-node index.js）

```shell
npm install --save-dev babel-cli	#将babel-cli安装到测试项目
```

#### 5.2项目里创建babel的配置文件.babelrc

**babel-ctl脚手架的使用必须在项目内配置.babelrc文件，下面的文件是固定的。**

```json
{
    "presets":["es2015","stage-2"],	//设置转码规则
    "plugins":["transform-runtime"]	//设置插件
}
```

#### 5.3相关插件安装

```shell
npm install babel-core babel-preset-es2015 babel-plugin-transform-runtime babel-preset-stage-2 --save-dev
```

#### 5.5创建文件目录

> 将需要转换的文件放置一个特定的目录内，例如src目录

> 创建一个目录存放降级后的文件，例如lib目录

#### 5.4在package.json中的scripts内设置运行脚本

```json
{"scripts":{"babelBuild":"babel src -w -d lib"}}
```

>编译src目录并将结果输出到lib目录。-w表示-watch，监听文件实时编译输出

> 进行内容编译 npm run babelBuild

> 运行降级后的代码node xxx.js

#### 5.5在线降低版本

> 此方法需要实时在线转换，兼容性与网络要求太高不建议使用，建议线下编译转换

页面里引入

```js
<script src="https://lib.baomitu.com/babel-core/6.1.19/browser.js"></script>
```

编写程序类型由javascript改为babel

```js
<script type="text/babel">
const name="这是一个静态常量";
console.log(name)
</script>
```

### 6、yarn安装及命令

**yarn（并发）相对npm5.0（单进程）之前有较快下载的速度，版本统一易控制，命令简洁，简洁的输出**

> yarn安装

``` shell
npm install -g yarn
```

> yarn命令

```shell
#yarn设置淘宝镜像及淘宝sass二进制文件下载，sass是解析css层叠文件
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
#初始化
yarn init
#添加依赖包
yarn add package		or 		yarn add package@[version]
#添加以来包到dependencies
yarn add package --dev / -D	or 		yarn add package@[tag]
#添加以来包到peerDependencies
yarn add package --peer / -P
#添加以来包到optionalDependencies
yarn add package --optional / -O
#安装包的精确版。只安装指定版本
yarn add --exact / -E
#安装包的次要版本里的最新版本;例如 yarn add foo@1.2.3 -T会接受1.2.9但不会接受1.3.0
yarn add --tilde / -T
#安装package.json里的包
yarn install
#安装一个包的单一版本
yarn install --flat
#强制重新下载所有包
yarn install --force
#只安装dependencies里的包
yarn install --production
#不读取或生成yarn.lock
yarn install --no-lockfile
#不生成yarn.lock
yarn install --pure-lockfile
#发布包
yarn publish
#移除包
yarn remove packageName
#更新一个依赖
yarn upgrade
#运行脚本
yarn run scriptName
#列出已缓存的每个包
yarn cache list
#返回全局缓存的位置
yarn cache dir
#清空缓存
yarn cache clean

#1.改变 yarn 全局安装位置
yarn config  set global-folder "你的磁盘路径"
#2.然后你会在你的用户目录找到 `.yarnrc` 的文件，打开它，找到 `global-folder` ，改为 `--global-folder`
#这里是我的路径
yarn config  set global-folder "D:\workProgram\paths\yarnRepository\yarnGlobal"
#检查当前 yarn 的 全局安装位置
yarn global dir

#2. 改变 yarn 缓存位置
yarn config set cache-folder "你的磁盘路径"
#这里是我的路径
yarn config set cache-folder "D:\workProgram\paths\yarnRepository\yarnCache"
#检查当前yarn 的 bin的 位置
yarn global bin
#我本地的bin的目录是D:\workProgram\paths\nodesRepository\node_global\bin
#我们需要将 D:\workProgram\paths\nodesRepository\node_global\bin整个目录添加到系统环境变量中去，否则通过yarn 添加的全局包 在cmd 中是找不到的。
```

更多命令请参考：[Yarn中文文档](https://yarn.bootcss.com/docs/cli/)

### 7、webpack

#### 7.1、可以使用webpack搭建开发环境

![image-20210430113327963](.\images\image-20210430113327963.png)

```shell
#控制台运行命令
#开发环境
webpack --mode development
#指定入口与编译文件路径
webpack ./src/index.js -o ./build/index.js --mode development
#生产环境
webpack --model production
#指定入口与编译文件路径
webpack ./src/index.js -o ./build/main.js --mode production
```

可以使用webpack打包优化项目

#### 7.2、webpack.config.js配置webpack打包信息

![image-20210506173039015](.\images\image-20210506173039015.png)

`webpack.config.js`,编写webpack.json.js文件后后期编译就可以在命令行直接输入webpack使用。

```js
const {resolve}=require('path');
module.exports={
    /*入口js*/
    //单入口时使用字符串指定一个入口文件，打包一个chunk,输出一个bundle,chunk的名称是默认的
    //entry:"./src/index.js",
    /*
    多入口
    1、打包一个chunk,所有入口输出一个bundle,chunk的名称是默认的
    */
    /*
    entry:[
        "./src/index.js",
        "./src/getUseDemo.js"
    ],
    */
    //2、多入口有几个文件生成几个chuck,并输出几个bundle,chunk的名称是entry下的key名，如：index、useDemo
   /*
    entry: {
       index: "./src/index.js",
       useDemo: "./src/getUseDemo.js"
    },
    */
    //3、特殊用法，有几个入口文件生成几个chuck，并输出几个bundle,此时会将"./src/index.js","./src/getUseDemo.js"打包到一个入口里，将"./src/getUseDemo.js"单独打包到一个入口
    entry: {
        index: ["./src/index.js","./src/getUseDemo.js"],
        useDemo: "./src/getUseDemo.js"
    },
    /*
    * webpack打包后输出路径
    * filename:输出文件名,[name]通过name变量获取entry里配置的key名，如：index、useDemo
    * path:输出路径
    * resolve(__dirname,'build'):__dirname表示webpack.config.js文件所在的路径，'build'：新建目录的名字
    * */
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'build')
    },
    /**
     * webpack处理的费js资源，如html、css、sass等
     */
    module:{
        rules:[

        ]
    },
    /*
    * 插件
    * */
    plugins:[

    ],
    /*
    * 打包模式：development开发这模式，production生产模式
    * */
    mode:"development"
}
```

![image-20210506222704860](.\images\image-20210506222704860.png)

![image-20210506221943586](.\images\image-20210506221943586.png)

#### 7.3 html\css压缩

1. webpack压缩页面需要使用html-webpack-plugin插件；

2. webpack压缩多页面时每个页面需要一个htmlWebpackPlugin，通过chunks标签（数组数据）指定压缩页面引入的js；

3. chunks引用js的顺序是从上到下，由右往左，最需应用的js按此（最上面，或最右边）顺序排放；

4. webpack压缩css需要使用style-loader与css-loader**需要在web-ack.config.js里module里配置通配数据**`{test:/\.css$/,use:['style-loader','css-loader']}`；

5. loader的顺序是从上到下，由右往左，最需应用的js按此（最上面，或最右边）顺序排放；

6. webpack压缩less需要用到style-loader、css-loader、less包及less-loader;压缩sass需要用到style-loader、css-loader、node-sass包及sass-loader**需要在web-ack.config.js里module里配置通配数据**`{test:/\.less$/,use:['style-loader','css-loader','less-loader']},{test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}`;

7. 使用`mini-css-extract-plugin`将csss我当然知道成单独的文件，而不是页面里的style属性，**需要在web-ack.config.js里module里配置通配数据**`{test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']}`**plugins里应用MiniCssExtractPlugin插件，**`new MiniCssExtractPlugin({filename:'gao.css'}) //filename:'gao.css'设置css文件名。`；

8. 使用post-loader与postcss-preset-env来进行css兼容处理，需要增加一个`postcss.config.js`文件并暴露出postcss-preset-env方法,并在`package.json`文件中配置浏览器兼容信息`"browserslist": [">0.1%","last 2 versions","not ie <=6"]`；

   ```js
   module.exports={
       plugins:[
           require('postcss-preset-env')()
       ]
   }
   ```

9. 

![image-20210508165246954](.\images\image-20210508165246954.png)

![image-20210508202505023](.\images\image-20210508202505023.png)

![image-20210508094442099](.\images\image-20210508094442099.png)

![image-20210508100241923](.\images\image-20210508100241923.png)

![image-20210508121247318](.\images\image-20210508121247318.png)