# springboot学习

## 1、springboot起步依赖分析

> 在spring-boot-starter-parent中定义了各种技术的版本信息，通过在父工程肿使用dependencyManagement版本锁将版本指定好，组合了一套最优搭配的技术版本；

> 在各种starter中，定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程；

>我们的工程继承parent,引入starter后，通过依赖传递，就可以简单方便获得需要的jar包，并且不会存在版本冲突等问题。

## 2、springboot配置

bootstrap.properties

bootstrap.yml

application.properteis

application.yml

application.yaml

> springboot提供了2种配置文件类型：properties和yml/yaml

>springboot默认的配置文件名为:application，application里面配置的是应用级内容，例如tomcat插件端口的管理，spring cloud的配置信息，数据库信息等

> 在同一级目录下优先级为:propertis>yml>yaml

### 2.1spring.profile.active配置不同版本的配置文件

<hr>

**针对不同环境下properties配置文件我们可以在application后面加上特定的字段做区分：**

application-test.properties做测试环境；

application-pro做为生产环境;

application-dev做开发环境；

**不同环境的选择可以在application.properties里通过spring.profiles.active=dev或者pro或者test之类的选择文件。dev之类的就是application后面-的文件名。**

<hr>

<strong style="color:red;">application.yaml可以在同一个文件里进行多配置区块的指定</strong>

**需要连续使用---三个-来实现区块分割**

**(spring-boot2.4后版本)需要要在每个区块里使用spring.config.activate.on-profile: dev配置区块名为dev**

**(springboot2.4版本前)需要在每个区块里使用spring.profile: dev配置区块名为dev**

<hr>

### 2.2项目内置配置文件

springboot的内置文件有properites与yaml/yml等两种格式，内置配置文件根据加载顺序从高到低排列分别是1、项目根目录下的config目录里，2、项目根目录下，3、项目classpath路径下的config目录里，4、项目classpath路径下。<strong style="color:blue">其中1，2两个路径下的配置文件在项目打包时不会被编译到jar包内</strong>。高级别文件可以覆盖低级文件

<hr>

### 2.3外部配置文件

springboot外部配置文件有17种加载方法，我们用法比较多的在配置参数较少的情况下我们可以使用在启动命令后增加参数的方式，需要在参数前使用--配置

例如:

```java
#单独配置启动参数,启动开发环境配置文件，配置端口为8081，配置servlet拦截地址为/hello
java -jar springboottest.jar --spring.profile=dev --server.prot=8081 --server.servlet.context-path=/hello
    
#读取配置指定路径下的配置文件,加载classpath下的application.properties，加载c盘下的application.properties文件
java -jar springboottest.jar --spring.config.location=classpath:/application.properties,c://application.properties
#读取特定路径下的配置文件不需要指定参数
 将application.properties文件与jar包文件放在同一个目录下，在jar运行时会被自动加载
```

![image-20211119191356497](.\images\image-20211119191356497.png)

**在java运行时会按顺序在运行目录下自动读取目录下的application-*.properties或yaml文件再去读取项目内打入jar包的application-*.properties或yaml文件，再去读取java运行目录下的的application.properties或yaml文件最后去加载jar内的application-*.properties或yaml文件**

<strong style="color:red">同一根目录下config目录内的配置文件会优先于config目录外的文件加载</strong>

<span style="color:#e7374a">外部文件配置主要解决每次修改配置文件需要重新打包的问题</span>
