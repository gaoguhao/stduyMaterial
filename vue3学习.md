# vue3

## 一、vue基础

### 1、provide多层父页面传值与inject多层子页面获取值(跨级通信)

#### 1）简单数据类型provide与inject，传输的是静态数据，不能修改

```js
//祖集页面
<script>
import HelloWorld from './components/HelloWorld.vue'
export default{
  data(){
    return{}
  },
  components:{
    HelloWorld
  },
  //简单数据类型
  provide:{
    message:"hello app"
  }
}
</script>

<template>
  <HelloWorld />
</template>
//子页面
<template>
    <div>
        hello page
        <h2>{{message}}</h2>
    </div>
</template>
<script>
    export default{
        data(){
            return{};
        },
        inject:['message']
    }
</script>
```

#### 2）动态数据的传输

```js
//祖集页面
<script>
import HelloWorld from './components/HelloWorld.vue'
export default{
  data(){
    return{
      message:"hello app",
      obj:{
        message:"hello app"
      }
    }
  },
  components:{
    HelloWorld
  },
  //动态数据更新
  provide(){
    return{
      //方法1传输一个对象类型
      //obj:this.obj
      //方法2 
      message:()=>this.message
    }
  }
}
</script>
<template>
  <HelloWorld />
</template>
//子页面
<template>
    <div>
        hello page
       <!-- <h2>{{obj.message}}</h2> -->
        <h2>{{message()}}</h2>
    </div>
</template>
<script>
    export default{
        data(){
            return{};
        },
        inject:['message']
    }
</script>
```

## 二、vue setup

### 1、响应式处理基本数据类型,ref

```js
import {ref} from 'vue'
<script>
setup(){
    const counter=ref(1);
    function sumCounter(){
        counter++;
    }
    return {
        counter,
        sumCounter
    }
}
</script>
<template>
   <div>
    {{setupRef}}
    <button @click="countD">点击改变obt</button>
  </div> 
</template>
```

### 2、setup响应式处理对象数据数据，reactive

```js
import {reactive} from 'vue'
<script>
setup(){
    const obj=reactive({
        name:'张三',
        age:18,
        children:{
            name:'小张三'
        }
    });
    function changeObj(){
       obj.name='李四';
       obj.children.name='小李四';
    }
    return {
        obj,
        changeObj
    }
}
</script>
<template>
   <div>
     {{obj.name}}---{{obj.children.name}}
    <button @click="changeObj">点击改变obt</button>
  </div> 
</template>
```

### 3、setup解构对象后直接让页面使用，如果直接通过es6的方法（...）解构的数据是静止的不可以响应改变,toRefs

```js
import {reactive,toRefs} from 'vue'
<script>
setup(){
    const obj=reactive({
        name:'张三',
        age:18,
        children:{
            name:'小张三'
        }
    });
    //解构方法二
    let {name,children}=...toRefs(obj);
   function changeObj(){
       obj.name='李四';
       obj.children.name='小李四';
    }
    return {
        obj,
        changeObj,
        //解构方法1
        //...toRefs(obj)
        //解构方法二
        name,children
    }
}
</script>
<template>
   <div>
     {{name}}---{{children.name}}
    <button @click="changeObj">点击改变obt</button>
  </div> 
</template>
```

### 4、setup使用watch响应式监听数据类型及watchEffect监听对象类型

> watchEffect只传入回调函数，在初始化时就会自动执行一次，用来收集依赖，watch不需要，一开始就指定

>watch可以获取到新值与旧值，watchEffect拿不到

> wacthEffect不需要指定监听的属性，自动收集依赖，只要在回调中引用到响应试的属性，只要这些属性发生改变，回调就会执行

```js
<template>
  <HelloWorld/>
  <div>
    {{counter}}-----{{obj.name}}-----{{obj.age}}
    <button @click="counterChange">messageChange</button><br/>
    <button @click="objChange">objChange</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref,reactive, watch, watchEffect} from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{

    }
  },
  setup(){
    let counter=ref("hello");
    watch(counter,(newValue,oldValue)=>{
      console.log("newValue--------",newValue);
      console.log("oldValue--------",oldValue);
    });

    let obj=reactive({
    name:'gaogg',
    age:18
   });
   let obj2=reactive({
    name:'gaogg',
    age:18
   });
    watch(obj,(newVal,oldVal)=>{
      console.log("newValue--------",newVal);
      console.log("oldValue--------",oldVal);
    });
    function counterChange(){
      counter.value="lisi";
    };
    function objChange(){
      obj.age++;
      obj2.name=obj2.name+(obj2.age++)
    }
   //watchEffect直接传入回调函数，页面初始化时自动收集依赖，需要指定监听属性，
    watchEffect(()=>{
      console.log(obj.age)
      console.log(obj2.name)
      console.log(obj2.age)
    })
   return{counter,counterChange,obj,objChange}
  },
  methods:{
    
  }
}
</script>
```

### setup响应式使用computed计算属性

```js
<template>
  <HelloWorld/>
  <div>
    {{message}}------>{{reverseMeg}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref, computed} from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{

    }
  },
  setup(){
    let message=ref('hello gaogg');
   let reverseMeg= computed(function(){
      return message.value.split('').reverse().join('');
    });
   return{message,reverseMeg}
  },
  methods:{
    
  }
}
</script>
```

###  5、setup使用provide跨级传数据及inject跨级接受数据

**为了动态属性在传值时直接传参数不需解值传送，如果解值传送（object.value）就失去动态绑定功能**

```js
//祖集
<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref,reactive,provide } from 'vue'
export default{
  data(){
    return{
      
    }
  },
  setup(){
    let name=ref('张三');
    let obj=reactive({
      message:'hello app',
      age:18
    })
    function changeName(){
      name.value="李四";
    }
    function changeObj(){
      obj.message="改为李四";
      obj.age=19;
    }
    provide('name',name);
    provide('obj',obj);
    return{
      name,
      obj,
      changeName,
      changeObj
    }
  },
  components:{
    HelloWorld
  }
}
</script>

<template>
  <HelloWorld />
  <button @click="changeName">changeName</button>
  <button @click="changeObj">changeObj</button>
</template>
//子孙集
<template>
    <div>
        hello page
        <h2>{{name}}</h2>
        <h2>{{obj}}</h2>
    </div>
</template>
<script>
    import { inject } from 'vue';
    export default{
        data(){
            return{};
        },
        setup(){
            let name=inject('name');
            let obj=inject('obj');
            console.log(name)
            return{name,obj}
        }
    }
</script>
```

### 6、setup属性组合式api，script添加setup属性后会自动的进行数据的返回及模板调用的注册

**setup组合式api后要使用provide及ref,reactive,inject还是需要通过import引入**

**使用组合式api后简便开发代码**

```js
<script setup>
import Hello from './Hello.vue'
import { inject } from 'vue';
let name=inject('name');
let obj=inject('obj');
</script>

<template>
  <h2>hello world</h2>
  <h2>{{name}}</h2>
  <h2>{{obj}}</h2>
  <Hello></Hello>
</template>
```

## 三、路由vue-router

### 1、路由及参数，正切匹配参数，404报错规则，Vue2里通过$.router.params.id,vue3里setup通过引入useRoute，再通过useRoute.params.id获取

```js
//router.js
//创建路由列表
import Home from '../views/Home.vue'
import Youjiao from '../views/Youjiao.vue'
import Error from '../views/Error.vue'
import {createRouter, createWebHistory} from 'vue-router'
const routes=[
    {
        path:'/',
        component:Home
    },
    {   //参数正切表达式
        // /youjiao/:id 表示连接后面必须带一个参数
        // /youjiao/:id* 表示连接后面参数可有可无，后面可以带多个参数
        // /youjiao/:id? 表示连接后面参数可有可无，但是只能带一个参数
        // /youjiao/:id(\\d+)确定参数均为数字
        path:'/youjiao/:id*',
        component:Youjiao
    },
    // /:path(.*)除上面的连接外其他全跳转到默认指向连接
    {
        path:'/:path(.*)',
        component:Error
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes,
})
export default router;
```

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

let app=createApp(App);
app.use(router)
app.mount('#app')

```

```vue
//route主页面
<script setup>

</script>

<template>
<div>
  <h2>
    hello app 
  </h2>
  <router-link to="/">首页</router-link>
  <span> | </span>
  <router-link to="/youjiao/11">幼教</router-link>
  <span> | </span>
  <router-link to="/chuzhong">初中</router-link>
  <router-view></router-view>
</div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
//子页面
<script setup>
import {useRoute} from 'vue-router'
//通过useRoute里的params.id获取参数信息
    const params= useRoute().params.id
</script>

<template>
  <h2>
    hello 幼教 ---参数为：{{params}}
  </h2>
</template>

```

## 2、嵌套路由，子路由

```js
//创建路由列表
import Home from '../views/Home.vue'
import Youjiao from '../views/Youjiao.vue'
import Error from '../views/Error.vue'
import YoujiaoCh1 from '../views/YoujiaoCh1.vue'
import YoujiaoCh2 from '../views/YoujiaoCh2.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes=[
    {
        path:'/',
        component:Home
    },
    {   //参数正切表达式
        // /youjiao/:id 表示连接后面必须带一个参数
        // /youjiao/:id* 表示连接后面参数可有可无，后面可以带多个参数
        // /youjiao/:id? 表示连接后面参数可有可无，但是只能带一个参数
        // /youjiao/:id(\\d+)确定参数均为数字
        path:'/youjiao',
        component:Youjiao,
        children:[
            {
                path:':id*',
                component:Youjiao
            },
            {
                path:'youjiaoCh1/:id*',
                component:YoujiaoCh1
            },
            {
                path:'youjiaoCh2/:id*',
                component:YoujiaoCh2
            }
        ]
    },
    // /:path(.*)除上面的连接外其他全跳转到默认指向连接
    {
        path:'/:path(.*)',
        component:Error
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
```

```vue
<script setup>
import {useRoute} from 'vue-router'
//通过useRoute里的params.id获取参数信息
    const params= useRoute().params.id
</script>

<template>
  <h2>
    hello 幼教 ---参数为：{{params}}
  </h2>
  <router-view></router-view>
</template>


//路由子页面
<script setup>
import {useRoute} from 'vue-router'
//通过useRoute里的params.id获取参数信息
    const params= useRoute().params.id
</script>

<template>
  <h2>
    hello 幼教子页面1 ---参数为：{{params}}
  </h2>
</template>

```

## 四、自定义数据共享进行状态管理

### 1、自定义数据共享进行状态管理

```js
//自定义数据共享进行状态管理类stores.js
import {ref,reactive} from 'vue'
import axios from 'axios';

const store={
    pathUrl:ref('http://api.school.cnrmobile.com/'),
    indexListDatas:reactive({}),
    changeUrl:function(value){
        this.pathUrl=value;
    },
    changeIndexListDatas:function(value){
        this.indexListDatas=value;
    },
    getData:function(url){
        axios.get(url).then(res=>{
            console.log(res);
        })
    }
}
export default store;
```

```vue
//自定义状态管理数据调用，可以在app.vue里引入自定义状态管理类stores.js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import store from './stores';
import {provide} from 'vue'
provide('store',store)
</script>
<template>
  <HelloWorld/>
</template>

//helloworld.vue里通过inject处理自定义状态管理
<script setup>
import { inject } from 'vue';
const store=inject('store')
console.log(store.getData("/patch/api/mmdb/movie/v3/list/hot.json?ct=%E5%8D%97%E4%BA%AC&ci=55&channelId=4"));
</script>
```

### 2、vite创建项目proxy反向代理处理跨域问题

```js
//打开vite.config.js
export default defineConfig({
  plugins: [vue()],
  server:{//  中转服务器
    proxy:{//反向代理实现跨域
      '/patch':{
        target:'https://i.maoyan.com/',//替换的服务器地址
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/patch/,'')
      }
    }
  }
})
```

### 3、vue-clt创建项目proxy反向代理处理跨域问题

```js
//打开vue.config.js
export default defineConfig({
  plugins: [vue()],
  devServer:{//  中转服务器
    proxy:{//反向代理实现跨域
      '/patch':{
        target:'https://i.maoyan.com/',//替换的服务器地址
        changeOrigin:true,
        pathRewrite:{//重写rewrite,将/patch转换成''
            '^/patch':''
        },
        //rewrite:path=>path.replace(/^\/patch/,''), //重写rewrite,将/patch转换成''
      }
    }
  }
})
```

## 五、vuex状态管理

```js
import { createStore } from 'vuex'
import axios from 'axios';

const moudela={
  state:{
    moudleaNmae:"lisi"
  },
  mutations:{
    changeAName:function(state,value){
      state.moudleaNmae=value;
    }
  },
  getters:{
    //state本模块的state,
    //getters为所有模块与根节点合并后的getters,
    //rootstate是根节点的state,
    //action与getters类似
    changeWord:function(state,getters,rootstate){
      console.log(getters);
      console.log(rootstate)
      return state.moudleaNmae.split('').reverse().join('');
    }
  }
}

export default createStore({
  //页面通过$store.state.count方式动态获取state里的属性
  state: {
    count:13,
    names:"hello gaogg",
    listdatas:{}
  },
  //计算属性
  //计算属性的调用使用$store.getters.changeNames方式动态获取getters里的属性
  getters: {
    changeNames:function(state){
      return state.names.split('').reverse().join('');
    }
  },
  //修改属性通过this.$store.commit('changeCountdata',20)调用传值方法对state里的属性进行统一修改
  //mutation修改时第一个参数默认是state,第二个参数是你的传参值
  mutations: {
    changeCountdata:function(state,value){
      // eslint-disable-next-line
      console.log(state);
      state.count=value;
      // eslint-disable-next-line
      console.log(state.count)
    },
    changeListDatas:function(state,value){
      state.listdatas=value;
    }
  },
  //分发执行函数，需要改变参数时使用metation里的方法
  //actions里的第一个参数context相当于state，第二个参数是value或者patch
  //this.$store.dispatch('getdatas','/patch/api/mmdb/movie/v3/list/hot.json?ct=%E5%8D%97%E4%BA%AC&ci=55&channelId=4')
  actions: {
    getdatas:function(context,value){
      axios.get(value).then(res=>{
        context.commit('changeListDatas',res.data);
        // eslint-disable-next-line
        console.log(context.state.listdatas)
    })
    }
  },
  //模块
  //1、模块化后哥特式state里的数据调用是$store.state.a.moudleaNmae来获取变量，a是模块名，moudleaNmae变量名
  //2、getter计算方法的调用还是$store.getter.changeWord,changeWord方法名

    //state本模块的state,
    //getters为所有模块与根节点合并后的getters,
    //rootstate是根节点的state,
    //action与getters类似

  //3、mutation改变方法的调用学是$store.commit('changeAName'),changeAName方法名
  modules: {
    a:moudela
  }
})
