# RabbitMQ

## 一、安装

RabbitMQ server是依托于Erlang的在安装时必须先安装对应版本的Erlang。

### 1、window环境：

RabbitMQ与Erlang安装均需使用管理员权限默认安装，可修改安装路径，安装路径不能存在空格

Erlang下载安装后需要在系统环境变量里配置想换开发环境：

ERLANG_HOME安装路径D:\programs\erl-23.2.6

path配置%ERLANG_HOME%\bin;

可以在命令行输入erl，进入Erlang输入界面

### 2、RabbitMQ管理工具

在Windows上，与其他平台相比，CLI工具具有.bat后缀。例如， rabbitmqctl在Windows上被调用为rabbitmqctl.bat，rabbitmqctl为RabbitMQ的CTL工具。

RabbitMQ的管理工具均在安装目录下的sbin目录内：

D:\programs\RabbitMQServer\rabbitmq_server-3.8.14\sbin

##### 2.1 RabbitMQ可视化后台安装

RabbitMQ安装后需要通过管理员权限在dos界面进入到RabbitMQ安装目录的sbin目录里安装后台可视化管理工具。默认端口是15672。可通过http://127.0.0.1:15672进行访问，默认账户与密码军事guest。

```dos
rabbitmq-plugins.bat enable rabbitmq_management
```

注：RabbitMQ启动时可能会报错

Error: unable to perform an operation on node 'rabbit@LAPTOP-VTKUK0VT'. Please see diagnostics information and suggestions below.

解决方法：

修改系统中 .erlang.cookie ，把C:\Users\admin下的.erlang.cookie，复制并替换掉

##### 2.2 停止节点

使用rabbitmqctl.bat在sbin目录

```dos
rabbitmqctl.bat stop
```

##### 2.3 检查节点状态

使用rabbitmqctl.bat在sbin目录

```dos
rabbitmqctl.bat status
```

