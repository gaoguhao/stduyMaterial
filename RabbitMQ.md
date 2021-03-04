# RabbitMQ

## 一、安装

RabbitMQ server是依托于Erlang的在安装时必须先安装对应版本的Erlang。两者的安装均需使用管理员权限进行安装。

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

1、确认下 .erlang.cookie文件大部分情况可以解决。修改系统中 .erlang.cookie ，把C:\Users\admin下的.erlang.cookie，复制并替换掉C:\Windows\System32\config\systemprofile

2、如果方法1未能解决可能跟开启的账号相关，需要到“服务”里去设置RabbitServer的启动用户，设置RabbitServer的启动用户后重启下RabbitServer服务。

##### 2.2 重启节点

使用rabbitmqctl.bat在sbin目录

```dos
rabbitmqctl.bat restart
//启动节点
rabbitmqctl.bat start_app
```

##### 2.3 停止节点

使用rabbitmqctl.bat在sbin目录

```dos
rabbitmqctl.bat stop
```

##### 2.4 检查节点状态

使用rabbitmqctl.bat在sbin目录

```dos
rabbitmqctl.bat status
```

##### 2.5 用户角色

在控制界面点击add a user进行角色创建及角色权限设置

![image-20210303215752956](E:\gitTest\images\rabbitmq-userCreate.png)

##### 2.6 Virtual Hosts配置

RabbitMQ中可以虚拟消息服务器Virtual Hosts（虚拟主机），每个Virtual Hosts相当于一个相对独立的RabbitMQ服务器，每个Virtual Host之间是相互隔离的，exchange、queue、message不能互通。可理解为mysql中的db。Virtual Name一般以/开头。

2.6.1 虚拟主机创建

点击admin侧边栏目里的Virtual Hosts后点击add a Virtual Host进行虚拟机创建

![image-20210303220403612](E:\gitTest\images\rabbitMQ-virtualHostCreate.png)

点击虚拟机名进入到虚拟机权限设置界面

![image-20210303220751763](E:\gitTest\images\rabbitMQ-virtualHostSetPermission.png)

### 3、docker安装RabbitMQ

##### 3.1获取镜像

```shell
#指定版本，该版本包含了web控制页面
docker pull rabbitmq:3.8.14-management
```

##### 3.2运行镜像

###### 3.2.1镜像创建和启动容器

说明：

- -d 后台运行容器；
- --name 指定容器名；
- -p 指定服务运行的端口（5672：应用访问端口；15672：控制台Web端口号）；
- -v 映射目录或文件；
- --hostname 主机名（RabbitMQ的一个重要注意事项是它根据所谓的 “节点名称” 存储数据，默认为主机名）；
- -e 指定环境变量；（RABBITMQ_DEFAULT_VHOST：默认虚拟机名；RABBITMQ_DEFAULT_USER：默认的用户名；RABBITMQ_DEFAULT_PASS：默认用户名的密码）

查看正在运行容器

```shell
#方式一：默认guest 用户，密码也是 guest
docker run -d --hostname gaorabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq:management

#方式二：设置用户名和密码
docker run -d --name gaorabbit --hostname myRabbit -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=a12345678  -e RABBITMQ_DEFAULT_VHOST=gaoggvh -v /data/rabbitMQ:/var/lib/rabbitmq rabbitmq:3.8.14-management
```

###### 3.2.2启动rabbitmq_management

```shell
docker exec -it gaorabbit rabbitmq-plugins enable rabbitmq_management
```

