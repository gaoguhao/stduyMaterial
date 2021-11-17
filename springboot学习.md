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

