#### vue学习笔记

##### 基础篇：

##### 1、创建空白项目后使用初始化项目命令npm init -y;

##### 2、初始化完成后使用npm install vue --save项目内安装vue;

在页面可以直接引入vue.js

```js
<script src="node_modules/vue/dist/vue.js"></script>
```



##### 3、{{变量名}},将变量数据写入到页面div中显示出来；

##### 4、v-model双向绑定数据；

可使用在以下组件中，不在此范围内的组件无法使用此组件：

1）在select下拉单选框中其值是选中的标签的value值；

2）在input，如果是checkbox复选框中其值是一个value数组；

3）在input，如果是radio单选框其值是选中的标签的value值；

4）在textarea长文本中其值就是textarea文本框内的值；

5）components(vue中的自定义组件)

```vue
<div id="app">
    <!--下拉单选框-->
    <select v-model="selectLangch">
        <option value="java">java</option>
        <option value="php">php</option>
        <option value="python">python</option>
    </select><br/>
    <!--复选框-->
    <input type="checkbox" value="c1" name="c1" v-model="checkboxLangch">c1<br/>
    <input type="checkbox" value="c2" name="c2" v-model="checkboxLangch">c2<br/>
    <input type="checkbox" value="c3" name="c3" v-model="checkboxLangch">c3<br/>
    <input type="checkbox" value="c4" name="c4" v-model="checkboxLangch">c4<br/>
    <!--单选框-->
    <input type="radio" value="radios1" name="radios1" v-model="radioLangch">radios1<br/>
    <input type="radio" value="radios2" name="radios2" v-model="radioLangch">radios2<br/>
    <input type="radio" value="radios3" name="radios3" v-model="radioLangch">radios3<br/>
    <textarea name="textareas" v-model="textareasLangch"></textarea>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            num:1,
            selectLangch:'php',
            checkboxLangch:['c3'],
            radioLangch:'radios2',
            textareasLangch:'textareastest',
            msg:"",
        }
    })
</script>
```



##### 		5、v-on指令;

v-on:可以使用通配符@表示,如v-on:click=@click;

v-on的事件修饰符有：

.stop:阻止事件冒泡；默认情况下点击button事件后先执行button的点击事件后再依次冒泡向上执行其上层div之类的点击事件。增加.stop后点击只执行button的点击事件。

.prevent:阻止默认事件发生；例如a标签的默认点击时间是超链接打开.prevent会阻止打开超链接

.capture:使用事件捕获模式；多层嵌套时，默认情况下点击button事件后先执行button的点击事件后再依次冒泡向上执行其上层div之类的点击事件。div添加.capture事件标签后就会先执行添加.capture事件标签的div后，再按冒泡顺序去执行未执行的button按钮与上层div，如果在.capture标签后增加.stop标签只执行增加.capture标签。

.self:中有元素自身触发事件才执行（冒泡或捕获事件不执行）;增加.self事件标签后被点击的组件会被触发点击事件。外层都添加self只剩上层没有增加时就跟stop标签一样。

.once：只执行一次；例如点击事件增加.once标签后点击事件只能被触发一次

```vue
<div id="app">
    <div style="position: relative;width: 1000px;background-color: aqua;"
         @click="print('div被点击')">
        <button value="button1" @click.stop="print('button被点击')">.stop阻止冒泡事件
        </button><br/>
        默认情况下点击button事件后先执行button的点击事件后再依次冒泡向上执行其上层div之类的点击事件。增加.stop后点击只执行button的点击事件。
    </div>
    <div style="position: relative;width: 1000px;">
        <a href="http://www.baidu.com" @click.prevent="print('a标签被点击')">
            a标签的默认点击时间是超链接.prevent:阻止默认事件发生
        </a>
    </div>
    <div
         style="position: relative;width: 1000px;background-color:yellow;"
         @click="print('bigyellowdiv被点击')">
        <div @click.capture.stop="print('yellowdiv被点击')">
            <button value="button1" @click="print('yellow button被点击')">.capture:使用事件捕获模式
            </button><br/>
            默认情况下点击button事件后先执行button的点击事件后再依次冒泡向上执行其上层div之类的点击事件。div添加.capture事件标签后就会先执行div后再按冒泡顺序去执行未执行的button按钮与上层div，如果在.capture标签后增加.stop标签只执行增加.capture标签。
        </div>
    </div>

    <div style="position: relative;width: 1000px;" v-on:click.once='print(".once被点击")'>
        .once事件增加后点击事件只能被触发一次
    </div>
    <div
         style="position: relative;width: 1000px;background-color:aqua;"
         @click.self="print('big aqua div被点击')">
        <div @click.self="print('aqua div被点击')" style="position: relative;width: 1000px;background-color:aqua;">
            <button value="button1" @click="print('aqua button被点击')">.self:中有元素自身触发事件才执行（冒泡或捕获事件不执行
            </button><br/>
            增加.self事件标签后被点击的组件会被触发点击事件。
        </div>
    </div>
</div>

<script type="text/javascript">
    var app=new Vue({
        el :"#app",
        data:{
            num:1,
            buttonChange:''
        },
        methods:{
            print(str){
                console.log(str + "num="+(++this.num));
            }
        }
    });
</script>
```

可以在console控制台内通过app.变量名的方式修改变量值。

##### 	6、钩子函数

​	vue包含的钩子函数：

​	1）befroeCreate()页面dom创建之前执行方法；

​	2）created()页面dom创建之后执行方法；

​	3）befroeMount()页面dom挂载之前执行方法，相关的的render函数首次被调用；

​	4）mounted()页面dom挂载之后执行方法；

​	5）befroeUpdate()页面数据更新之前执行方法，发生在虚拟dom打补丁之前，这里在更新之前访问现有的DOM,比如手动移除已添加的事件监听器；

​	6）mounted()页面数据更新之后执行方法；

​	7）befroeDestroy()vue实例销毁之前，到这里时实例仍然完全可用；

​	8）destroy()vue实例销毁后调用，调用后vue实例指示的所有东西都会解除绑定，所有的事件监听器都会被移除，所有的子实例也会被销毁；

```
<button v-on:click="add" name="增加"><span>点我增加{{num}}次</span></button><br/>
<button @click="jianjian" name="减少">点我减少{{num}}次</button>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            num:1,
            msg:"",
        },
        beforeUpdate() {
            console.log(this.num);
            this.msg='<div>钩子函数beforeUpdate()</div>';
            console.log(this.msg);
        },
        updated() {
            this.msg='<div>钩子函数updated()</div>';
            console.log(this.msg);
        },
        beforeDestroy() {
            this.msg='<div>钩子函数beforeDestroy()</div>';
            console.log(this.msg);
        },
        destroyed() {
            this.msg='<div>钩子函数destroyed()</div>';
            console.log(this.msg);
        },
        mounted() {
            this.msg='<div>钩子函数mounted()</div>';
            console.log(this.msg);
        },
        beforeMount() {
            this.msg='<div>钩子函数beforeMount()</div>';
            console.log(this.msg);
        },
        created() {
            this.msg='<div>钩子函数create()</div>';
            console.log(this.msg);
        },
        beforeCreate() {
            this.msg='<div>钩子函数beforecreate()</div>';
            console.log(this.msg);
        },
        methods:{
            add:function (){
                this.num++;
                console.log("num="+this.num);
            },
            jianjian(){
            	this.num--;
            	console.log("num="+this.num);
            }
        }
    })
</script>
```



##### 	7、v-text

​	v-text写入文本数据，v-html写入html数据，v-text与v-html可以解决插值{{变量名/变量表达式}}在网络不好时闪烁的问题

```vue
<div id="app">
    <div v-text="texttest"></div>
    <div v-html="texttest"></div>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            texttest:'<div>this is texttest</div>',
        }
    })
</script>
```

##### 8、v-for循环操作

在没有:key时增加或减少数组数据时勾选信息会发生改变，而增加后不会变化；比如例子中原来选中的吕不韦在增加一条后勾选位置还是在2，但是吕不韦已经下移勾选没变化。增加:key后勾选框将与文字一起变动。

```vue
<div id="app">
    <div>
        <input type="text" v-model="name">
        <button @click="add">添加</button>
    </div>
    <div  v-for="(item, i) in list" :key="item.id">
        <input type="checkbox" @click="print(item)">
        {{item.name}}
    </div>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            name: '',
            newId: 3,
            itemchecks:"",
            list: [
                { id: 1, name: '李斯' },
                { id: 2, name: '吕不韦' },
                { id: 3, name: '嬴政' }
            ]
        },
        updated() {
            console.log(this.itemchecks);
        },
        methods:{
            add(){

                //方法可向数组的开头添加一个或更多元素，并返回新的长度。
                this.list.unshift({ id: ++this.newId, name: this.name });
                this.name = '';
            },
            print(i) {
                console.log(i)
            }
        }
    });
</script>
```

##### 9、v-if and v-show

v-if:通过一个点击事件，实现遍历数组结果的显示存在与否并遍历过程中使用v-if对数据进行判断处理

v-show:实现文本的隐藏与显示，配合v-if使用内容直接删除；如果单独使用v-show，只是将内容显示与隐藏而不会从区块删除。

```vue
    <div id="app">
        <div @click="show =!show">点我</div>
        <div v-if="show">v-if 配合v-show test!</div>
        <div v-show="show">v-show单独测试</div>
        <ul>
            <li v-for="(item,i) in list">
                <span v-if="item.male==1" style="background-color: pink">列表第{{ i+1
                    }}个用户{{ item.name }}，性别：女</span>
                <span v-else-if="item.male==0" style="background-color: yellow">列表第{{ i+1
                    }}个用户{{ item.name }}，性别：男</span>
                <span v-else style="background-color: red">列表第{{ i+1
                    }}个用户{{ item.name }}，性别：未知</span>
            </li>
        </ul>
    </div>
<script type="text/javascript">
    var app=new Vue({
       el:"#app",
       data:{
           show:true,
           list: [
               { id: 1, name: '李斯',male:1 },
               { id: 2, name: '吕不韦' ,male:0},
               { id: 3, name: '嬴政',male:2 }
           ]
       }
    });
</script>
```

##### 10、v-bind绑定方法

v-bind可以实用通配符:简写；

v-bind可对所有元素的属性设置vue实例的数据。

class有一个特殊的是v-bind写法，:class='{}'或者v-bind:class='{}'

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="node_modules/vue/dist/vue.js"></script>
    <style>
        .div{
            width: 200px;
            height: 200px;
            border: solid 1px grey;
        }
        .red{
            background-color: red;
        }
        .blue{
            background-color: blue;
        }
    </style>
</head>
<body>
<div id="app">
    <div v-bind:class="colors" @click="change(colors,1)">
        点击我使用传统的v-bind方法来改变class属性
    </div>
    <div :class="colors2" @click="change(colors2,2)">
        点击我使用通配符:表示v-bind方法来改变class属性
    </div>
    <div :class="{red:bool,blue:!bool}" @click="bool=!bool">
        点击我使用class的特殊方式{red:bool,blue:!bool}修改class
    </div>
</div>
<script type="text/javascript">
    var app=new Vue({
       el:"#app",
       data:{
           bool:false,
           colors:'blue',
           colors2:'red'
       },
       methods:{
           change(str,da){
               if(da==1){
                   this.colors=str=='blue'?'red':'blue';
               }else{
                   this.colors2=str=='blue'?'red':'blue';
               }
           }
       }
    });
</script>
</body>
</html>
```

##### 11、computed计算

computed计算属性的应用场景：可以应用在插值或指令表达式复杂的时候，可以将一些属性数据经过方法处理之后返回。

computed里的方法可以在页面直接通过插值表达式{{变量名}}引入变量名就是computed内的方法名，而methods里的变量需要通过插值表达式{{方法名())}}引入。

- computed用来监控自己定义的变量（方法名），该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；

- computed比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，举例：购物车里面的商品列表和总金额之间的关系，只要商品列表里面的商品数量发生变化，或减少或增多或删除商品，总金额都应该发生变化。这里的这个总金额使用computed属性来进行计算是最好的选择。

  

```vue
<div id="app">
    <h2>你的生是{{birth}}</h2>
    <textarea v-model="birthday"> 你的生是{{birth}}</textarea>
    <h2>method你的生是{{birth2()}}</h2>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            birthday:558633600000,
            birthdays:0,
        },
        computed:{
            birth(){
                const date=new Date(parseInt(this.birthday));
                console.log(date)
                return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate();
            }
        },
        methods:{
            birth2(){
                const date2=new Date(parseInt(this.birthday));
                return  date2.getFullYear()+"-"+(date2.getMonth()+1)+'-'+date2.getDate();
            }
        }
    })
</script>
```

##### 12、watch

watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，它可以监控一个变量，也可以是一个对象,监控对象时只能开启深度监控，deep:true；

使用场景分析：可以监听视图中数据的变化而做出响应；如：下拉框列表中，当如果选择了对于的下拉框选项之后，要根据最新的值去加载一些其它数据。

```vue
<div id="app">
    <textarea v-model="birthday"></textarea><br/>
    <input type="text" value="gaogg" name="" v-model="persons.name"/><br/>
    <input type="text" value="20" name="" v-model="persons.age"/>
    <input type="button" value="+"  @click="persons.age++"/><br/>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        data:{
            birthday:"this is watch test",
            persons:{"name":"gaoggt","age":18}
        },
        watch:{
            birthday(newData,oldData){
                console.log("newData="+newData+"    ,oldData="+oldData);
            },
            persons:{
                deep:true,
                handler(newData){
                    console.log(newData);
                }
            }
        }
    })
</script>
```

##### 13、componet组件

###### 1、父页面使用子组件时必须先导入组件

a、全局导入，在一个页面导入后其他地方就可以都可以直接使用Vue.component('ParentGiveDataToChridle',ParentGiveDataToChridle)；

b、局部导入在页面方法里使用components属性插入；components:{parentGiveDataToChridle}

c、单独组件页面需要要使用import 自定义组件名 from ‘自定义组件全路径’ 或者在components里使用components:{parentGiveDataToChridle:'url:/自定义组件全路径'}；单独组件页面.vue必须配置web插件组件才能在html页面使用

d、在使用组件时如果定义的组件名或组件内部方法名里有大写字段在使用时必须将大写字段改成小写字段在字段前加上-如：childrenMsg使用时需改成children-msg;

###### 2、组件与父页面相互传值

a、组件给父页面传值需使用this.$emit('组件定义的父页面调用名',ints)。父页面@组件定义的父页面调用名="父页面方法名"；

b、组件去传值父页面时需要使用组件页面方法去调用父页面方法来传值或改值。

```
<div id="app">
    <div>页面被点赞{{dianzan}}</div>
    <parent-give-data-to-chridle :children-msg="msg"
                                :children-items="list"></parent-give-data-to-chridle>
    <chrdledianzhan @parentusm="pusm"></chrdledianzhan>
</div>
<script type="text/javascript">
//    导入外部.vue组件 import ParentGiveDataToChridle from './componets/ParentGiveDataToChridle.vue'
//    import ParentGiveDataToChridle from './componets/ParentGiveDataToChridle.vue'
//全局导入组件，只要在项目里的任何页面都可以只用组件
//    Vue.component('ParentGiveDataToChridle',ParentGiveDataToChridle)

    const parentGiveDataToChridle={
       template:
           `<div class="hello">
                <h3>{{childrenMsg}}</h3>
                <ul>
                  <li v-for="item in childrenItems" :key="item.id">{{item.id}}--{{item.name}}</li>
                </ul>
              </div>`,
        props:{
            childrenMsg:'',
            childrenItems: {
                type: Array,
                default:[]
            }
        }
    };

    const chrdledianzhan={
        template: `<input type="button" @click="chridledpusm(10)" value="点赞"/>`,
        methods:{
            chridledpusm(ints){
                /*
                * $emit第一个属性表示父页面需要执行的方法，参数二表示子页面需要向父页面传的值
                * */
                console.log(ints)
                return this.$emit('parentusm',ints)
            }
        }
    }
    //Vue.component("parentGiveDataToChridle",parentGiveDataToChridle)
    var app=new Vue({
        el:"#app",
        data:{
            msg:'我是msg字符串，是父组件给子组件传的简单数据',
            list: [
                { id: 1, name: '李斯',male:1 },
                { id: 2, name: '吕不韦' ,male:0},
                { id: 3, name: '嬴政',male:2 }
            ],
            dianzan:1
        },
        //定义局部应用子组件
        components:{
            parentGiveDataToChridle,
            chrdledianzhan
        },
        methods:{
            pusm(pints){
                console.log(print)
               if(pints==0||pints==""){
                   this.dianzan++;
               }else{
                   this.dianzan=this.dianzan+parseInt(pints);
               }
            }
        }
    })
</script>
```

##### 14、axios获取数据

使用基于 promise 的 HTTP 客户端 [axios](https://github.com/axios/axios) 则是其中非常流行的一种。

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="node_modules/vue/dist/vue.js"></script>
    <script src="node_modules/axios/dist/axios.js"></script>
</head>
<body>
<div id="app">

</div>
<script type="text/javascript">
    var app=new Vue({
        el:"#app",
        created(){
            //axios.post
            axios.post('https://api.coindesk.com/v1/bpi/currentprice.json').then(res=>{
                //接口成功响应回值
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
            /*
            //axios.get
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res=>{
                //接口成功响应回值
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
            */
            /*
            //axios直接访问
            axios({
                url:'https://api.coindesk.com/v1/bpi/currentprice.json',
                method:'post'
            }).then(res=>{
                //接口成功响应回值
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
            */
        }
    })
</script>
</body>
</html>
```

