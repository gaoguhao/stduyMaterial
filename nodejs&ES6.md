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
    "plugins":[
        "transform-runtime",
    	"transform-remove-strict-mode", //关闭严格模式的插件
    ]	//设置插件
}
```

>  **使用babel进行es6转es5时，默认转化之后是严格模式，有些时候我们想去除严格模式,解决方法：npm install babel-plugin-transform-remove-strict-mode**

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
webpack --mode production
#指定入口与编译文件路径
webpack ./src/index.js -o ./build/main.js --mode production
```

可以使用webpack打包优化项目

#### 7.2、webpack.config.js配置webpack打包信息

![image-20210506173039015](.\images\image-20210506173039015.png)

`webpack.config.js`,编写webpack.json.js文件后后期编译就可以在命令行直接输入webpack使用。

#### 7.2.1webpack优化需要用到的插件

```shell
#1、css-loader style-loader 安装 
npm install --save-dev css-loader style-loader
#2、css打包成单独文件
npm install --save-dev mini-css-extract-plugin
#3、css向下兼容插件，postcss-loader需要建postcss配置文件postcss.config.js
npm i postcss-loader postcss postcss-preset-env -D
#4、webpack5集成babel对js的es6语法做降级处理,在webpack.config.js里配置target:['web','es5'], 链接https://webpack.docschina.org/configuration/target/
npm install babel-loader @babel/preset-env -D
#5、less打包成css
npm install less less-loader --save-dev 
#6、sass打包成css
npm install sass-loader sass webpack --save-dev
#7、打包时过滤无用css文件插件
npm i purgecss-webpack-plugin -D
#8、eslint-loader检查js是否规范开发阶段不建议使用上线前对语法做统一处理
npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D
#9、打包html资源
npm i html-webpack-plugin -D

#4.2、 webpack4集成babel对js的es6语法做降级处理,需要降级处理的入口程序里引入corejs,import "core-js";
npm install babel-loader @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime  @babel/core @babel/runtime -D
npm install core-js
#10、webpack4对图片的打包
npm install url-loader html-loader --save-dev
#11、webpack4使用file-loader打包静态资源
npm install file-loader --save-dev
```

#### 7.2.2webpack配置文件

```js
const {resolve,join}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob=require('glob');
//join方法是path里面的path.join（[...path]）是使用分隔符将所有的字段连接起来，然后对路径规范化，例如path.join('a','b','\c')输出是a/b/c
const PATHS={src:join(__dirname,'src')};
//去除无用的css
const PurgecssPlugin=require('purgecss-webpack-plugin');


module.exports={
    // 入口路径的配置,指示webpack以哪个文件作为入口起点开始打包
    //入口文件如果是单个文件可以用字符串'./src/index.js'指定一个入口文件，打包一个chunk,输出一个bundle，chunk名为默认的main，
    //如果是多个文件可以用数组引入['index.js','index.html']或者json格式{index:'index.js',}
    entry:{
        //我们想要从应用程序文件中输出 index 页面的 index.js 和 index.css，为 list 页面输出 list.js 和 list.css
        //index页面只想调用index.js与index.css需要要HtmlWebpackPlugin内配置chunks:['index']
        index:['./src/index.js','./src/index.css','./src/font/stylesheet.css','./src/index.html'],
        list:['./src/list.js','./src/list.css']
    },
    //输出,是json格式
    output:{
        //
        filename: 'js/[name].js',
        //打包后文件输出路径
        path:resolve(__dirname,'gaogg')
    },
    //
    module:{rules:[
        //css-loader 安装 npm install --save-dev css-loader
        //css打包成单独文件
        //安装 npm install --save-dev mini-css-extract-plugin

        //css向下兼容插件 npm i postcss-loader postcss postcss-preset-env -D
        //postcss-loader需要建postcss配置文件postcss.config.js
        
         /*
         postcss.config.js

         module.exports={
            plugins:[
                require('postcss-preset-env')()
            ]
        }
         */
        //需要在package.json里配置浏览器兼容属性
        /**
         * 
         * "browserslist":[
                ">0.1%",    //全球超过0.1%人使用的浏览器
                "last 2 versions",  //所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本
                "not ie <=5"    //方向排除部分版本ie大于5

            ],
         */
        {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']},
        {test:/\.sass$/,use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']},
        {test:/\.less$/,use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']},
        //webpack集成babel对js的es6语法做降级处理
        //npm install babel-loader @babel/core @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/preset-env @babel/runtime -D
        //npm install core-js
        //如果webpack4是在需要降级处理的入口程序里引入corejs,import "core-js";如果是webpack5需要在webpack.config.js里配置target:['web','es5'], 链接https://webpack.docschina.org/configuration/target/
        //babel插件使用需要在package.json同源目录下创建.babelrc文件
        /*
        .babelrc

        {
            "presets": [["@babel/preset-env",{
                // "targets":{
                //     "chrome":"58",
                //     "ie":"7"
                // },
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "58",
                    "safari": "11.1",
                    "ie": "6"
                },
                "useBuiltIns":"usage",   //usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
                "corejs": {
                     //core-js的版本
                    "version":3
                }
            }]
            //, "@babel/preset-typescript" //对ts的支持插件
        ],
            "plugins": ["@babel/plugin-transform-runtime"]
        }
        */
        {
            test:/\.js$/i,
            exclude:/(node_modules|bower_components)/,
            use:[{
                loader:'babel-loader',
                // options:{
                //     "presets": ['@babel/preset-env'],
                // }
            }]
        },

        //npm install --save-dev style-loader   css直接写入到页面不以单独文件存在
        // {test:/.css$/,use:['style-loader','css-loader']}

        // npm install less less-loader --save-dev less打包成css
        // {test:/.less$/,use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']}
        //npm install sass-loader sass webpack --save-dev   sass打包成css
        // {test:/.sass$/,use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']}

        //图片压缩不推荐使用，推荐使用file-loader npm install url-loader --save-dev
        //url-loader文件名不能改变，是以base64命名的
        //url-loader与html-loader结合使用让css与html内图片能正常打包
        /*
        {
            test:/\.(png|jpg|jpeg|gif)$/,
            use:[
                {
                    loader:'url-loader',
                    options:{
                        //限制图片的大小，大于6kb的图我们进行图片压缩
                        //limit:1024*6,
                    }
                }
            ]
            
        },

        // //使用html-loader对页面图片进行打包
        {
            test:/\.html$/,
            loader:'html-loader'
        },

        //使用file-loader打包静态资源
        {
            test:/\.(png|jpg|jpeg|gif)$/,
            use:[
                {
                    loader:'file-loader', 
                    options:{
                        name:'[name].[ext]',
                        outputPath:'images/',
                    }
                }
            ]
        },
        */

        //webpack5之后版本图片等静态资源的内联都是通过Resource资源来实现
        //https://webpack.docschina.org/guides/asset-modules/#resource-assets
        {
            test:/\.(png|jpg|jpeg|gif)$/i,
            type:'asset/resource',
            generator:{
                filename:'images/[name][ext]'
            }
        },
        //通过html-loader对页面内图片进行打包
        {
            test:/\.html$/,
            loader:'html-loader'
        },
        //字体打包
        {
            test:/\.(woff|woff2|eot|ttf|otf)$/i,
            type:'asset/resource',
            generator:{
                filename:'font/[name].[ext]'
            }
        },

        //eslint-loader检查js是否规范开发阶段不建议使用上线前对语法做统一处理
        //npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D
        //eslint-loader的使用需要在package.json里配置'eslintConfig':{"extends":"airbnb-base"} //使用eslint-config-airbnb-base检索规则
/*
        {
            test:/\.js$/i,
            //排除node_modules模块下的js
            exclude:/node_modules/,
            use:[{
                loader:'eslint-loader',
                options:{
                    //eslint自动修复语法错误
                    //针对console.log可以配置//eslint-disable-next-line实现语法检查跳过
                    fix:true,
                }
            }]
        }
*/        
    ]},
    //插件
    plugins:[
        //html打包插件npm i --save-dev html-webpack-plugin
        new HtmlWebpackPlugin(
            {   
                //打包html模板
                template:"./src/index.html",
                //z指定页面调用css及js的文件名，如果不配置默认是all
                chunks:['index'],
                //输出html文件名 
                filename:"page/index.html"
            }
        ),
        new HtmlWebpackPlugin(
            {   
                //打包html模板
                template:"./src/list.html",
                chunks:['list'],
                //输出html文件名 
                filename:"page/list.html"
            }
        ),
        //打包成单独css文件插件
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        //打包时过滤无用css文件插件npm i purgecss-webpack-plugin -D
        new PurgecssPlugin({
            //${PATHS.src}获取定义的json变量里的信息，${PATHS.src}/**/*标识这个文件夹下的目录及其子目录的全部内容
            paths:glob.sync(`${PATHS.src}/**/*`,{nodir:true})
        })
    ],

    //安装webpack server，安装命令，并在package.json里的scripts内配置上启动命令"dev": "npx webpack serve --mode development --open"
    
    // webpack5之后版本需要加上target:'web'来实现浏览器自动刷新
    //webpack5解决es6编译成es5语法需要在target里加上es5
    target:['web','es5'],
    //webpack server属性配置,webpack5默认热加载是开启的，页面要热刷新需要在入口文件里将html文件加入活着将hot改为false就是关闭热刷新
    devServer:{
        compress:true,  //页面使用压缩 
        //hotOnly:true,  //页面构建失败刷新页面
        hot:true
    }
    // 配置webpack的启动环境，'production'为正式环境，'development'为开发环境;

    //webpack会自动去除无用的js代码，必须是es6语法的js代码同时必须是生产环境打编译webpack --mode production

    //还可以通过webpack --mode 'production'通过启动配置项来配置，启动配置项可以配置到package.json里"build": "webpack --mode production"后期通过npm命令来执行 npm run build
    //mode:'production'
}
```

![image-20220224105925437](.\images\image-20220224105925437.png)

![image-20220224180134642](.\images\image-20220224180134642.png)

![image-20220224110104891](.\images\image-20220224110104891.png)

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

### 8、prototype属性

prototype，原型

javascript是基于原型的语言，当我们调用一个对象的属性时，如果对象没有该属性，javascript解释器就会从对象的原型对象上去找改属性，如果原型上也没有该属性，就去找原型的原型直到最后返回为null,null没有原型。这种属性查找的方式称为原型链(protoype chain)

```javascript
var TestPrototype = function() {
    this.propA = 1;
    // this.initialize.apply(this , arguments);
    this.methodA = function (v){
        return this.propA=v
    }
}
TestPrototype.prototype.methodB =function(){
    console.log(this.propA)
    this.propA =v
    console.log(this.propA)
    // return this.propA =v
}
TestPrototype.prototype.methodC=function(){
    console.log(this.propA)
}
var objb =new TestPrototype();
```

![image-20220831143841449](E:\WorkPath\gitWord\mine\stduyMaterial\images\image-20220831143841449.png)

可以看出，该实例对象有3个属性，其中并没有methodB与methodC,这就是方法在构造函数内声明和在原型上声明的区别之一，我们展开Prototype(__proto__),发现methodB与methodC在里面。

![image-20220831144709426](E:\WorkPath\gitWord\mine\stduyMaterial\images\image-20220831144709426.png)

Object.prototype的**proto**属性是一个访问器属性（一个getter函数和一个setter函数），它公开访问它的对象的内部[[Prototype]]（对象或null）。
**proto**的使用是有争议的，尽量不要使用。 它从来没有被包括在EcmaScript语言规范中，但是现代浏览器实现了它。**proto**属性已在ECMAScript 6语言规范中标准化，用于确保Web浏览器的兼容性，因此它未来将被支持。它不赞成使用Object.getPrototypeOf / Reflect.getPrototypeOf和Object.setPrototypeOf / Reflect.setPrototypeOf（如果关注性能的话，应该避免设置对象的[[Prototype]]这样缓慢的操作）。
( [Object.prototype.proto - JavaScript | MDN](https://link.zhihu.com/?target=https%3A//%3Cb%3Edevel%3C/b%3Eoper.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

那么这样写有什么好处呢？
现在我们再实例化一个objB对象出来：

```text
var objB = new TestPrototype();
```

![img](E:\WorkPath\gitWord\mine\stduyMaterial\images\v2-10302df5d95ec56227c66c4cef6a3acf_720w.jpg)

和objA是不是长得一样，其实他们并不是相等的

![img](E:\WorkPath\gitWord\mine\stduyMaterial\images\v2-fea70de08420e2fd15e76054ccf3cd05_720w.jpg)

可以发现，methodA返回的是false，methodB是true。

*把方法写在构造函数的内部，增加了通过构造函数初始化一个对象的成本（内存占用，因为两个实例对象就创建了两个一样的methodA），把方法写在prototype属性上就有效的减少了这种成本（他们指向了同一个methodB）。*你也许会觉得，调用对象上的方法要比调用它的原型链上的方法快得多，其实并不是这样的，如果你的那个对象上面不是有很多层原型的话，它们的速度其实是差不多的。

从上面的例子可以看出，这种重复性的方法就可以写在原型中，当你的构造函数有相当多的方法，并且实例化也非常多时，提升是非常大的。
在前端入门时必须掌握的一个框架就是jQuery，其实你每次调用$(“…”)时，都会返回一个实例化的新的jQuery对象出来（内部帮你执行了new方法，关于jQuery初始化这一段也是jQuery的精髓之一，实现的相当巧妙，有兴趣可以去看看），这样做既没有使实例对象私有属性相互影响（如上面的propA），又能共用方法（如上面的methodB）。

#### JavaScript 是基于原型的语言

想想我们是怎么创建新对象的：`var obj = {}`其实最终是通过`var obj = new Object()`创建的。是不是和上面的例子很像：通过new 构造函数 生成一个对象。
当我们创建一个对象后，就可以通过“点”方法名的方式调用一些并不是我们手写的方法了，如`obj.toString()`

![img](https://pic3.zhimg.com/80/v2-d5e5be87984f62c7adf0c7a698c1eb1e_720w.jpg)

其实我们调用的是Object.prototype.toString。现在是不是对 *JavaScript 是基于原型的语言*这句话有些理解了。
其实不止Object是这样的，Array、String、Number等都是这样的原理。

#### ”JavaScript一切皆对象“

![img](https://pic2.zhimg.com/80/v2-e716ee5bd912a94863c03d045fa29c19_720w.jpg)

是不是很神奇，居然全等。想想这是为什么？还记得上面说的原型链吗？

#### 8.1arguments属性与initialize方法

```javascript
var Class = {
    create: function() {
        return function() {
            console.log(this)
            console.log(self)
            console.log(arguments)
            this.initialize.apply(this , arguments);
        }
    }
}
var A=Class.create();
A.prototype = {
    initialize : function(v){
        this.value = v;
        console.log(v)
    },
    showValue : function(){
        console.log(this.value)
    }
}
var a = new A('hello world!',1,2)
a.showValue()
```

arguments属性里面会接受到new方法创建时传入的所有参数数组。

执行后alert(typeof arguments);会显示object，说明arguments是对象。然后会依次打出1、2、3。说明arguments就是调用函数的实参数组。

![image-20220831151336948](E:\WorkPath\gitWord\mine\stduyMaterial\images\image-20220831151336948.png)

```js
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this , arguments);
        }
    }
}
```

arguments 就是create返回的构造函数的实参数组，那么在
var a = new A(‘helloWord!');
的时候‘helloWord!'就是实参数组（虽然只有一个字符串），传递给方法apply，然后在调用initialize 的时候作为参数传递给初始化函数initialize。

#### 8.1.2initialize

initialize不过是个变量，代表一个方法，用途是类的构造函数

JS中的函数和类是一样的，ClassName就是一个函数，当出现在new后面的时候就作为一个构造函数来构造对象。
如代码如下:
var objectName1 = new ClassName(“a”);//得到一个对象

其中objectName1就是执行ClassName构造函数后得到的对象，而在ClassName函数中的this指的就是new之后构造出来的对象，所以objectName1会后一个属性和两个方法。可以通过这样来调用他们：

代码如下:
objectName1.setValue(''hello'');
alert(objectName1.getValue());//对话框hello
alert(objectName1.value) ;//对话框hello

那么

代码如下:
var objectName2 = ClassName(“b”);//得到一个对象

这样objectName2得到的是什么呢？显然是方法的返回值，这里ClassName只作为了一个普通的函数（虽然首字母大写了）。但是在之前写的ClassName中并没有返回值，所以objectName2会是undifinded那么“b”赋给谁了呢？在这并没有产生一个对象，而只是单纯的执行这个方法，所以这个“b”赋值给了调用这个方法的对象window，证据如下：
var objectName2 = ClassName(“b”);//得到一个对象
alert(window.value)；//对话框b
所以JS中的所有function都是一样的，但是用途可能是不同的（用作构造对象抑或是执行一个过程）。
下面该回到主题了initialize是干什么的？

```js
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this , arguments);
        }
    }
}
var A = Class.create();
```

这段代码是构造个一个function复制给A，这个function是

```js
function() {
    this.initialize.apply(this , arguments);
}
```

并且后面这个方法是用来做构造函数的。当使用这个构造函数来构造对象的时候，会让构造出来的这个对象的initialize变量执行apply()方法，apply()的用途后面在说，继续说initialize。这样在初始化对象的时候会联系到initialize（怎么联系就要看apply的了）。

```js
A.prototype={
    initialize:function(v){
        this .value=v;
    }
    showValue:function(){
        alert(this.value);
    }
}
```

Prototype是“原型”的意思。A是一个function（），那么A. prototype，就是function中的一个变量，其实是个对象。这个对象拥有什么方法，那么function产生的对象就拥有什么方法，故
var a = new A(‘helloWord!');
a. showValue();//弹出对话框helloWord！
所以a对象也会有initialize方法，不只如此，每一个有A构造出来的对象都会有一个initialize方法，而在前面说过，构造的时候会调用构造函数，构造函数里面会让initialize去调用apply方法，于是在new A(‘helloWord!')的时候initialize回去调用apply方法。这也就是调用了一个初始化的方法。

#### 8.2 call()和apply()

下面开始研究apply()，在网上找了几个资料，并结合自己的研究，了解了call()和apply()的功能。功能基本一样，function().call(object,{},{}……)或者function().apply (object,[……])的功能就是对象object调用这里的funciton()，不同之处是call参数从第二个开始都是传递给funciton的，可以依次罗列用“，”隔开。而apply只有两个参数，第二个是一个数组，其中存储了所有传递给function的参数。
this.initialize.apply(this , arguments);
是什么意思？
这里的第一个this，是指用new调用构造函数之后生成的对象，也就是前面的a，那么第二个this也当然应该是指同一个对象。那这句话就是this（也就是a）调用initialize方法，参数是arguments对象（参数的数组对象），所以在构造函数执行的时候，对象a就会去执行initialize方法来初始化，这样就和单词“initialize”的意思对上了。
那么执行initialize方法的参数怎么传递进去的呢？

### 9、npm镜像安装及切换

#### 9.1、npm镜像安装

> 镜像源链接切换

**全局切换镜像源：**

```shell
npm config set registry http://registry.npm.taobao.org
```

**查看镜像源使用状态:**

```shell
npm get registry
```

**全局切换官方镜像源：**

```shell
npm config set registry http://registry.npmjs.org
```

**设置代理节点：**

```js
npm install -g taobao --registry=https://registry.npmmirror.com/
```

```js
*npm ---------- https://registry.npmjs.org/
 yarn --------- https://registry.yarnpkg.com/
 tencent ------ https://mirrors.cloud.tencent.com/npm/
 cnpm --------- https://r.cnpmjs.org/
 taobao ------- https://registry.npmmirror.com/
 npmMirror ---- https://skimdb.npmjs.com/registry/
 21cn --------- http://npm.tech.21cn.com/
```

**21cn内部源需要使用nrm来安装**

```shell
nrm add 21cn http://npm.tech.21cn.com
```

![image-20220906174508921](D:\bakPath\git\github\stduyMaterial\image-20220906174508921.png)

#### 9.2使用nrm查看及切换镜像源

**下载nrm:**

```shell
npm install -g nrm
```

**使用nrm查看镜像源:** （*表示正在使用的镜像源）

```shell
nrm ls
```

**使用nrm切换到淘宝镜像源:**

```shell
nrm use taobao
```

#### 9.3注意：

在linux系统环境里面如果下载nrm后执行nrm ls命令出现未找到命令，需要配置全局的软链接:

```shell
sudo ln -s /home/nodejs/bin/nrm /usr/local/bin/
```

其中/home/nodejs/bin/nrm/是指你本地安装nodejs包的路径，/use/local/bin/路径是你的程序命令执行路径，相当与windows的环境变量PATH路径，配置后可以在系统的任意位置执行你的命令。

### 10、class类

Es6中calss作为对象的模板被引入，可以通过对class关键字定义类。它可以被看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

实际上就是个“特殊函数”就像你能够定义的函数[表达式](https://so.csdn.net/so/search?q=表达式&spm=1001.2101.3001.7020)和函数声明一样，类语法有两个组成部分：类表达式和类声明

**类与模块的内部默认就是严格模式，不需要使用use strict指定运行模式**

#### 10.1类声明

定义一个类的一种方法是使用一个类声明，即用带有class关键字的类名（这里是"Person"），

```js
class Person{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}
var person = new Person()
```

**函数声明和类声明之间的一个重要区别是函数声明会提升，类声明不会。需要先进行声明，再去访问否则会报错。**

**错误：**

```js
var person = new Person()
class Person{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}
// 报错：
// index.html:10 Uncaught ReferenceError: Cannot access 'Person' before initialization
```

> 类声明不可以重复

```js
class Person {}
class Person {}
// TypeError Identifier 'Person' has already been declared
```

> 类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，就是后者不用 new 也可以执行

```js
class Person {
	constructor(x, y) {
    this.x = x
    this.y = y
  }
}

Person() 
// TypeError Class constructor Person cannot be invoked without 'new'
```

#### 10.2类表达式

**类表达式可以是被命名的或匿名的**

```js
/* 匿名类 */ 
let Person = class {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
 
/* 命名的类 */ 
let Person = class Person {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
```

#### 10.3类的constructor 方法

**constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法（默认返回实例对象 this）。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。一个类只能拥有一个名为 “constructor” 的特殊方法，如果类包含多个 constructor 的方法，则将抛出 一个 SyntaxError 。**

```js
class Person {
   constructor(x, y) {
    this.x = x    // 默认返回实例对象 this
    this.y = y
  }
  toString() {
    console.log(this.x + ', ' + this.y)
  }
}
```

**注：**

>1. 在类中声明方法的时候，方法前不加 function 关键字
>2. 方法之间不要用逗号分隔，否则会报错
>3. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
>4. 一个类中只能拥有一个 constructor 方法

#### 10.4静态方法

> **静态方法可以通过类名调用，不能通过实例对象调用，否则会报错**

```js
class Person{
    static sum(a , b){
        console.log(a + b)
    }
}
let person = new Person()
person.sum(1,2) //  TypeError p.sum is not a function
Person.sum(1,2)  // 3
```

#### 10.5原型方法

> **类的所有方法都定义在类的 prototype 属性上面，在类的实例上面调用方法，其实就是调用原型上的方法**

> **原型方法可以通过实例对象调用，但不能通过类名调用，会报错**

```js
class Person{
    constructor(x , y){
        this.x = x
        this.y = y
    }
    sum(){
        this.x + this.y
    }
    toString() {
        console.log(this.x + ',' + this.y)
    }
}
//给person的原型加方法
Person.prototype.toVal = function(){
    console.log("i am is toVal")
}
var p =new Person(1,2)
p.toString()       // 123456
p.toVal()          // I am is toVal
Person.toString()  // TypeError Person.toStringis not a function
Person.toVal()  // TypeError Person.toVal is not a function
```

#### 10.6实例方法

```js
class Person {
    constructor() {
        this.sum = function(a, b) {
            console.log(a + b)
        }
    }
}
var p = new Person()
p.sum(1,2)       // 3
Person.sum(1,2)  // TypeError Person.sum is not a function
```

