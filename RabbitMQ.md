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

![image-20210303215752956](images\rabbitmq-userCreate.png)

##### 2.6 Virtual Hosts配置

RabbitMQ中可以虚拟消息服务器Virtual Hosts（虚拟主机），每个Virtual Hosts相当于一个相对独立的RabbitMQ服务器，每个Virtual Host之间是相互隔离的，exchange、queue、message不能互通。可理解为mysql中的db。Virtual Name一般以/开头。

2.6.1 虚拟主机创建

点击admin侧边栏目里的Virtual Hosts后点击add a Virtual Host进行虚拟机创建

![image-20210303220403612](images\rabbitMQ-virtualHostCreate.png)

点击虚拟机名进入到虚拟机权限设置界面

![image-20210303220751763](images\rabbitMQ-virtualHostSetPermission.png)

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
- -e 指定环境变量,可选；（RABBITMQ_DEFAULT_VHOST：默认虚拟机名；RABBITMQ_DEFAULT_USER：默认的用户名；RABBITMQ_DEFAULT_PASS：默认用户名的密码）

查看正在运行容器

```shell
#方式一：默认guest 用户，密码也是 guest
docker run -d --hostname gaorabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq:management

#方式二：设置用户名和密码
docker run -d --name gaorabbit --hostname myRabbit -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=a12345678 -v /data/rabbitMQ:/var/lib/rabbitmq rabbitmq:3.8.14-management
```

###### 3.2.2启动rabbitmq_management

```shell
docker exec -it gaorabbit rabbitmq-plugins enable rabbitmq_management
```

##### 3.3 componse安装

###### 3.3.1单机docker-compose.yml文件

```yaml
version: "3.8"
services:
  #节点1名称
  gaorabbitmq: 
    #构建镜像,如果build开启需要手动指定Dockerfile文件
    #会报错unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /data/ymlWorld/Dockerfile: no such file or directory
    #build: .
    image: rabbitmq:3.8.14-management
    hostname: gaorabbit1
    #容器名称
    container_name: gaorabbitmq1
    #总是重启后启动
    restart: always
    #端口映射
    ports:
    - 4369:4369
    - 5671:5671
    - 5672:5672
    - 15691:15691
    - 15692:15692
    - 15671:15671
    - 15672:15672
    #环境变量
    environment:
    - RABBITMQ_DEFAULT_VHOST=/
    - RABBITMQ_DEFAULT_USER=admin
    - RABBITMQ_DEFAULT_PASS=a
    #挂载
    volumes:
    #- /data/rabbitMQ/rabbitmq/rmq_rabbitmq1:/etc/rabbitmq
    - /data/rabbitMQ/lib/rmq_lib1:/var/lib/rabbitmq
    - /data/rabbitMQ/log/rmq_log1:/var/log/rabbitmq
    privileged: true
```

###### 3.3.2集群docker-compose.yml文件

```yaml
version: "3.8"
services:
  gaorabbitmq1: 
    image: rabbitmq:3.8.14-management
    hostname: gaorabbitmq1
    #容器名称
    container_name: gaorabbitmq1
    #总是重启后启动
    restart: always
    #端口映射
    ports:
    - 5672:5672
    - 15672:15672
    #环境变量
    environment:
    #注意：多机配置集群时在挂载参数中，必须加上“- /etc/hosts:/etc/hosts”，否则集群无法成功会报“Error: unable TO perform an operat
ion ON node 'rabbit@rabbitmq1'. Please see diagnostics information AND suggestions below.”
    #- /etc/hosts:/etc/hosts
    #- RABBITMQ_ERLANG_COOKIE=rabbitcookie
    - RABBITMQ_DEFAULT_USER=admin
    - RABBITMQ_DEFAULT_PASS=passwd
    #挂载
    volumes:
    - /data/rabbitMQ/lib/rmq_lib1:/var/lib/rabbitmq
    - /data/rabbitMQ/log/rmq_log1:/var/log/rabbitmq
    - /data/rabbitMQ/shell/gaorabbit1.sh:/etc/rabbitmq/rabbitmq.sh
  gaorabbitmq2: 
    image: rabbitmq:3.8.14-management
    hostname: gaorabbitmq2
    #容器名称
    container_name: gaorabbitmq2
    #总是重启后启动
    restart: always
    #端口映射
    ports:
    - 5673:5672
    - 15673:15672
    #环境变量
    environment:
    #注意：多机配置集群时在挂载参数中，必须加上“- /etc/hosts:/etc/hosts”，否则集群无法成功会报“Error: unable TO perform an operat
ion ON node 'rabbit@rabbitmq1'. Please see diagnostics information AND suggestions below.”
    #- /etc/hosts:/etc/hosts
    #- RABBITMQ_ERLANG_COOKIE=rabbitcookie
    - RABBITMQ_DEFAULT_USER=admin
    - RABBITMQ_DEFAULT_PASS=passwd
    #links:
    #- gaorabbitmq1
    #挂载
    volumes:
    - /data/rabbitMQ/lib/rmq_lib2:/var/lib/rabbitmq
    - /data/rabbitMQ/log/rmq_log2:/var/log/rabbitmq
    - /data/rabbitMQ/shell/gaorabbit2.sh:/etc/rabbitmq/rabbitmq.sh
```

###### 3.3.3启动MQ

###### 3.3.3.1单机docker-compose.yml启动

```shell
docker-compose up -d
#指定yml文件
docker-compose -f docker-compose.yml up -d
```

###### 3.3.3.2集群docker-compose.yml启动

```shell
docker-compose up -d
#指定yml文件
docker-compose -f docker-compose.yml up -d
```

> 从主节点拷贝.erlang.cookie到从节点,从节点获取到cookie后需要使用docker restart gaorabbitmq2重启下从节点镜像，否则会报错cookie值不对。

```shell
#将主节点的.erlang.cookie拷贝到主机
docker cp gaorabbitmq1:/var/lib/rabbitmq/.erlang.cookie /data/rabbitMQ/.erlang.cookie
#再从主机将.erlang.cookie拷贝到从节点
docker cp /data/rabbitMQ/.erlang.cookie gaorabbitmq2:/var/lib/rabbitmq/.erlang.cookie
```

> 主节点启动rabbitmq节点容器(gaorabbit1.sh)

```shell
#通过docker exec进入主节点
docker exec -it gaorabbitmq1 /bin/bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
```

> 从节点启动rabbitmq节点容器(gaorabbit2.sh)

```java
docker exec -it rabbitmqCluster02 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbitmq01
rabbitmqctl start_app
```

# 二、java代码实现

### 1、简单模式

##### 1.1、创建简单模式工程

在pox.xml文件中导入maven依赖

```xml
<dependency>
	<groupId>com.rabbitmq</groupId>
	<artifactId>amqp-client</artifactId>
	<version>5.11.0</version>
</dependency>
```

##### 1.2、共有工具类，配置RabbitMQ服务信息，同时创建连接

```java
public class ConnectionUtil {
    private static String HostName="1.15.71.35";
    private static Integer QueuePort=5672;
    private static String QueueName="admin";
    private static String QueuePasswd="a";
    private static String QueueVHost="/gaoggVhost";

    public static Connection getConnection() throws IOException, TimeoutException {
        //创建工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        //设置rabbitmq服务器信息
        connectionFactory.setHost(HostName);
        connectionFactory.setPort(QueuePort);
        connectionFactory.setUsername(QueueName);
        connectionFactory.setPassword(QueuePasswd);
        connectionFactory.setVirtualHost(QueueVHost);
        //创建连接
        Connection connection = connectionFactory.newConnection();
        return connection;
    }
}
```

##### 1.3、服务提供方编写（生产者）

```java
//设置简单的队列名（queue）
    public static String QUEUE_NAME="simple_queue";
    public static void main(String[] args) throws IOException, TimeoutException {
        //通过工厂类创建工厂
        Connection connection = ConnectionUtil.getConnection();
        //创建频道
        Channel channel = connection.createChannel();
        //声明队列
        /**
         * 参数说明：
         *  1、队列名
         *  2、是否为持久化队列（消息持久化保存在服务器上），true是|false否
         *  3、是否独占本连接
         *  4、是否在不使用的时候队列自动删除
         *  5、其他参数
         */
        channel.queueDeclare(QUEUE_NAME,true,false,false,null);
        String SendMessages="我是producer，我发送了一条简单的文字信息做测试";
        //发送消息
        /**
         * 发送消息参数说明：
         *  1、交换机名，“”表示默认的交换机
         *  2、路径key。简单模式中可以使用队列名填写
         *  3、消息其他属性
         *  4、消息内容，转换为字节流
         */
        channel.basicPublish("",QUEUE_NAME,null,SendMessages.getBytes());
        //关闭资源
        channel.close();
        connection.close();
    }
```

##### 1.4、消息接受方（消费者）

消费者创建后(DefaultConsumer defaultConsumer = new DefaultConsumer(channel))需要编写消费监听事件channel.basicConsume(QUEUE_NAME,true,defaultConsumer)，要不然消费者代码将不起效果

```java
    public static void main(String[] args) throws IOException, TimeoutException {
        //创建rabbitmq方法
        Connection connection = ConnectionUtil.getConnection();
        //创建频道
        Channel channel = connection.createChannel();
        //设置队列
        /**
         * 参数说明：1、队列名称，2、是否为持久化队列，3、是否为独占本链接，
         * 4、是否在空闲时自动删除队列，5、其他参数
         */
        channel.queueDeclare(Producer.QUEUE_NAME,true,false,false,null);
        //创建消费者
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("路由key："+envelope.getRoutingKey());
                System.out.println("交换机:"+envelope.getExchange());
                System.out.println("消息id："+envelope.getDeliveryTag());
                System.out.println("接受到的消息:"+body.toString());
            }
        };
        //监听队列
        /**
         * 参数说明：1、队列名称，
         * 2、是否要自动确认，
         *  true表示消息接收到后自动向MQ回复接受到了，MQ则会将消息从队列中删除
         *  false则需要手动确认，才会删除
         *  3、消费者代码
         * */
        channel.basicConsume(Producer.QUEUE_NAME,true,defaultConsumer);
    }
```

##### 1.5测试及总结

总结：

生产者发送消息到RabbitMQ队列（simple_queue,java自定义的队列名）

消费者接受RabbitMQ队列消息

简单模式：生产者发送消息到队列中，一个消费者从队列中接收消息。

> 在RabbitMQ中消费者只能从队列接收消息。
>
> 

生产者发送消息后会在MQ后台查询到消息，当消费者获取并处理了消息后MQ后台将会显示消息以处理（消息为空）

生产者发送消息

![image-20210304201532131](images\RabbitMQ-Message-producer.png)

消费者获取并处理了消息

![image-20210304201933336](images\rabbitMQ-Messages-Consumer.png)

### 2、work-queue模式

多个消费者绑定一个队列，消费被各个消费者进行抢占。类似负载均衡的轮询策略；消息a被消费者1使用，消费者2就在消费者1繁忙时就会执行消息b。代码与简单模式相近，区别在于简单模式是1对1，workqueue是1对多。

### 3、订购模式

订阅模式分三种：发布订阅模式（基于fanout广播）、Routing路由模式(direct)，通配符模式（topics）

#### 3.1、发布与订购模式

使用交换机exchange及交换机fanout（广播）模式，将消费者与消息队列进行绑定，消费者只能接受绑定路由的绑定队列的消息。

> 需要定义交换机 FANOUT_EXCHANGE_NAME；
>
> 需要创建频道与交换的绑定关系：chanel.exchangeDeclare("交换机名"，“交换机类型”),
>
> 需要绑定队列与叫关系：queueBind("序列名","交换机名“,"路由key")

##### 3.1.1生产者代码

```java
public class FanoutProducer {
    public static String FANOUT_EXCHANGE_NAME="fanout_exchange_name";
    public static String FANOUT_QUEUE_NAME1="fanout_QUEUE_NAME1";
    public static String FANOUT_QUEUE_NAME2="fanout_QUEUE_NAME2";
    public static void main(String[] args) throws IOException, TimeoutException {

        Connection connection = ConnectionUtil.getConnection();
        Channel channel = connection.createChannel();
        //绑定交换机，1、交换机名；2、交换机类型（fanoun）
        channel.exchangeDeclare(FANOUT_EXCHANGE_NAME, BuiltinExchangeType.FANOUT);
        channel.queueDeclare(FANOUT_QUEUE_NAME1,true,false,false,null);
        channel.queueDeclare(FANOUT_QUEUE_NAME2,true,false,false,null);
        String messages;
        for(int i=1;i<=10;i++){
            //队列绑定到交换机
            /**
             * 1、队列名；2、交换机名；3、路由key
             */
            channel.queueBind(FANOUT_QUEUE_NAME1,FANOUT_EXCHANGE_NAME,"");
            channel.queueBind(FANOUT_QUEUE_NAME2,FANOUT_EXCHANGE_NAME,"");
            messages="我是发布与订阅模式：FANOUT广播方法发送的信息"+i;
        /*
        1、交换机名；2、路由key;3、其他参数；4、发送的消息
         */
            channel.basicPublish(FANOUT_EXCHANGE_NAME,"",null,messages.getBytes());
        }

        channel.close();
        connection.close();
    }
}
```

##### 3.1.2消费者代码

```java
public class FanoutConsumer1 {
    public static void main(String[] args) throws IOException, TimeoutException {
        Connection connection = ConnectionUtil.getConnection();
        Channel channel = connection.createChannel();
        //配置交换机,1、交换机名，交换机类型
        channel.exchangeDeclare(FanoutProducer.FANOUT_EXCHANGE_NAME, BuiltinExchangeType.FANOUT);
        channel.queueDeclare(FanoutProducer.FANOUT_QUEUE_NAME1,true,false,false,null);
        channel.queueBind(FanoutProducer.FANOUT_QUEUE_NAME1,FanoutProducer.FANOUT_EXCHANGE_NAME,"");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("consumer1路由key："+envelope.getRoutingKey());
                System.out.println("consumer1交换机:"+envelope.getExchange());
                System.out.println("consumer1消息id："+envelope.getDeliveryTag());
                System.out.println("consumer1接受到的消息:"+new String(body,"utf-8"));
            }
        };
        /**
         * 1、队列名；2、是否要自动确认;3、消费者信息
         * 监听队列
         */
        channel.basicConsume(FanoutProducer.FANOUT_QUEUE_NAME1,true,defaultConsumer);
    }
}
```

#### 3.2Routing路由模式

>与发布订购模式的区别在于交换机模式由广播fanout改为了路由direct同时需要设置路由key
>
>需要建立队列，交换机，路由的绑定关系
>
>发送消息时需要绑定路由
>
>消费者只能收取绑定路由key消息

##### 3.2.1生产者代码

```java
public class RoutingProducer {
    public static String ROUTING_EXCHANGE_NAME="routing_exchange_name";
    public static String ROUTING_QUEUE_INSERT="routing_queue_insert";
    public static String ROUTING_QUEUE_DELETE="routing_queue_delete";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = ConnectionUtil.getConnection().createChannel();
        //创建交换机
        channel.exchangeDeclare(ROUTING_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        //创建队列
        channel.queueDeclare(ROUTING_QUEUE_INSERT,true,false,false,null);
        channel.queueDeclare(ROUTING_QUEUE_DELETE,true,false,false,null);

        //绑定队列，交换机，路由关系，参数分别是，队列名，交换机名，路由key
        channel.queueBind(ROUTING_QUEUE_INSERT,ROUTING_EXCHANGE_NAME,"gaogg.insert");
        channel.queueBind(ROUTING_QUEUE_DELETE,ROUTING_EXCHANGE_NAME,"gaogg.delete");
        //发送消息
        String messages="我是Routing路由模式：DIRECT路由发送的insert信息";
        //交换机名，路由key,消息其他参数，消息内容
        channel.basicPublish(ROUTING_EXCHANGE_NAME,"gaogg.insert",null,messages.getBytes());
        messages="我是Routing路由模式：DIRECT路由发送的delete信息";
        channel.basicPublish(ROUTING_EXCHANGE_NAME,"gaogg.delete",null,messages.getBytes());
    }
}
```

##### 3.2.2消费者代码

```java
public class RoutingConsumerInsert {
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = ConnectionUtil.getConnection().createChannel();
        channel.exchangeDeclare(RoutingProducer.ROUTING_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        channel.queueDeclare(RoutingProducer.ROUTING_QUEUE_INSERT,true,false,false,null);
        channel.queueBind(RoutingProducer.ROUTING_QUEUE_INSERT,
                RoutingProducer.ROUTING_EXCHANGE_NAME,"gaogg.insert");
        DefaultConsumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println("RoutingInsert路由key："+envelope.getRoutingKey());
                System.out.println("RoutingInsert交换机:"+envelope.getExchange());
                System.out.println("RoutingInsert消息id："+envelope.getDeliveryTag());
                System.out.println("RoutingInsert接受到的消息是："+new String(body,"utf-8"));
            }
        };
        channel.basicConsume(RoutingProducer.ROUTING_QUEUE_INSERT,true,consumer);
    }
}
```

3.3Topic通配符模式

> 与路由模式区别在于，路由模式是通过路由1对1精确查询的，而通配符模式是通过路由1对多模糊匹配。
>
> 通配符模式分为2个通配符：
>
> #匹配多个字符串，gaogg.abbc.cc就可以通过gaogg.#或者#.cc匹配到
>
> ```shell
> *匹配单个字符串,gaogg.abbc.cc可以通过 *.abbc.* 来匹配到
> ```

### 4、RabbitMQ与spring整个

#### 4.1通用配置

pom.xml文件内导入spring与amqp的相关依赖关系及打包插件,配置rabbitmq.properties文件

```xml
<properties>
    <spring.version>5.1.7.RELEASE</spring.version>
    <rabbit.version>2.1.8.RELEASE</rabbit.version>
    <junit.version>4.12</junit.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit</artifactId>
        <version>${rabbit.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${junit.version}</version>
        <scope>test</scope>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.0</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

rabbitmq.properties

```properties
rabbitmq.host=ip
rabbitmq.port=5672
rabbitmq.username=username
rabbitmq.password=userpassword
rabbitmq.virtual-host=/visalhost
```

#### 4.2生产者整合

spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">

<!--加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>
    <!--配置rabbitmq connectFactory信息-->
    <rabbit:connection-factory id="connectionFactory"
                               host="${rabbitmq.host}"
                               port="${rabbitmq.port}" 
                               username="${rabbitmq.username}" 
                               password="${rabbitmq.password}" 
                               virtual-host="${rabbitmq.virtual-host}"/>
    <!--定义管理交换机，对列-->
    <rabbit:admin connection-factory="connectionFactory" />
    <!--定义rabbittemplate对象操作可以在代码中方便发送消息-->
    <rabbit:template id="rabbitTemplate" connection-factory="connectionFactory"/>
    <!--定义队列，auto-declare为不存在自动创建实例-->
    <rabbit:queue id="springqueue" name="springqueue" auto-declare="true"/>
    <!--生成广播交换机中持久化对列，不存在自动创建-->
    <rabbit:queue id="spring_fanout_queue1" name="spring_fanout_queue1" auto-declare="true"/>
    <rabbit:queue id="spring_fanout_queue2" name="spring_fanout_queue2" auto-declare="true"/>
    <rabbit:queue id="spring_fanout_queue3" name="spring_fanout_queue3" auto-declare="true"/>
    <!--定义广播fanout类型交换机，并绑定上述的3个队列-->
    <rabbit:fanout-exchange id="spring_fanout_exchange" name="spring_fanout_exchange" auto-declare="true">
        <rabbit:bindings>
            <rabbit:binding queue="spring_fanout_queue1"/>
            <rabbit:binding queue="spring_fanout_queue2"/>
            <rabbit:binding queue="spring_fanout_queue3"/>
        </rabbit:bindings>
    </rabbit:fanout-exchange>
    <!--生成路由routing交换机，不存在自动创建-->
    <rabbit:queue id="spring_direct_queue1" name="spring_direct_queue1" auto-declare="true"/>
    <rabbit:queue id="spring_direct_queue2" name="spring_direct_queue2" auto-declare="true"/>
    <rabbit:queue id="spring_direct_queue3" name="spring_direct_queue3" auto-declare="true"/>
    <rabbit:direct-exchange id="spring_direct_exchange" name="spring_direct_exchange"
                            auto-declare="true">
        <rabbit:bindings>
            <rabbit:binding  queue="spring_direct_queue1"/>
            <rabbit:binding queue="spring_direct_queue2"/>
            <rabbit:binding queue="spring_direct_queue3"/>
        </rabbit:bindings>
    </rabbit:direct-exchange>
    
    <rabbit:queue id="spring_topic_queue" name="spring_topic_queue" auto-declare="true"/>
    <rabbit:topic-exchange id="spring_topic_exchange" name="spring_topic_exchange">
        <rabbit:bindings>
            <rabbit:binding pattern="gao.#" queue="spring_topic_queue"></rabbit:binding>
        </rabbit:bindings>
    </rabbit:topic-exchange>
    <!--定义通配topic交换机，不存在自动创建-->
    <rabbit:queue id="spring_topic_queue" name="spring_topic_queue" auto-declare="true"/>
    <rabbit:topic-exchange id="spring_topic_exchange" name="spring_topic_exchange">
        <rabbit:bindings>
            <!--pattern为路由key,queue队列名-->
            <rabbit:binding pattern="gao.#" queue="spring_topic_queue"></rabbit:binding>
        </rabbit:bindings>
    </rabbit:topic-exchange>
</beans>
```

代码发送消息

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:springRabbitMQProducer.xml")
public class SpringQueueTest {
 @Autowired
 public RabbitTemplate rabbitTemplate;
 @Test
 public void springQueuetest1(){
	String message="springqueue队列发送的数据";
	rabbitTemplate.convertSendAndReceive("springqueue",message.getBytes());
}
```

#### 4.3消费者整合

spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">

    <context:property-placeholder location="classpath:rabbitmq.properties"/>
    <!--配置rabbit工厂-->
    <rabbit:connection-factory id="connectionFactory"
                               host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}"/>
    <!--通过包扫描的方式将lister下的所有加有注解@component的实体类注册成消费者拦截器bean对象-->
    <context:component-scan base-package="com.gaogg.lister"/>
    <!--单个配置消费者拦截器bean对象，实体类多的情况下建议使用包扫描的方式配置-->
<!--    <bean id="springConsumerLister" class="com.gaogg.lister.SpringConsumerLister"/>-->
    <!--配置拦截器-->
    <rabbit:listener-container connection-factory="connectionFactory">
        <rabbit:listener ref="springConsumerLister" queue-names="springqueue"/>
    </rabbit:listener-container>
</beans>
```

代码实现：

> 消费者要继承MessageListener实体类或其子类，并要实现其内部onMessage方法
>
> 消费者项目测试时只会启动项目保证spring配置文件被调用，拦截器被使用了功能就能正常使用

```java
@Component
public class SpringConsumerLister implements MessageListener {

    @Override
    public void onMessage(Message message) {
        System.out.println(message.getBody());
    }
}
```

### 5、RabbitMQ高级特性

#### 5.1	消息的可靠投递

消息的可靠投递分两种：

##### 1、confirm确认模式：

> 交换机exchange接受消息后就会调用confirm方法，如果返回boolean参数为true则表示成功，如false则失败需要处理；
>
> 方法的使用：
>
> 1）spring配置文件中设置rabbit:connection-factory 的publisher-confirms=true
>
> ```xml
> <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}" port="${rabbitmq.port}" username="${rabbitmq.username}" password="${rabbitmq.password}" virtual-host="${rabbitmq.virtual-host}" publisher-confirms="true"/>
> ```
>
> 2)在方法里设置setConfirmsCallback在setConfirmsCallback内部实现new ConfirmsCallback()方法
>
> ```java
> @RunWith(SpringJUnit4ClassRunner.class)
> @ContextConfiguration(locations = "classpath:springRabbitMQProducer.xml")
> public class SpringQueueTest {
>     @Autowired
>     public RabbitTemplate rabbitTemplate;
>     @Test
>     public void springQueuetest1(){
>         String message="springqueue队列发送的数据";
>         rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
>             @Override
>             /**
>              * correlationData  相关配置信息
>              * ack    exchange交换机接受到信息后的boolean回值，true成功，false失败
>              * cause    报错信息，b为true时，s=null,false时为报错信息
>              */
>             public void confirm(CorrelationData correlationData, boolean ack, String cause) {
>                 if(ack){
>                     System.out.println("交换机接受成功:"+s);
>                 }else{
>                     System.out.println("交换机接受失败:"+s); 
>                 } 
>             }
>         });
>         rabbitTemplate.convertSendAndReceive("springqueue",message.getBytes());
>     }
> }
> ```

##### 2、return回退模式：

> exchange交换机接受到消息后，exchange路由到queue队列失败时才会发起的回调returncallback
>
> 方法的使用：
>
> 1)在spring配置文件中设置rabbit:connect-factory里的publisher-returns=true
>
> ```xml
> <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}" port="${rabbitmq.port}" username="${rabbitmq.username}" password="${rabbitmq.password}" virtual-host="${rabbitmq.virtual-host}" publisher-returns="true"/>
> ```
>
> 2)在方法里设置setMandatory为true表示开启returnback回值开启，默认回值是丢弃的，如果不开启将无法获取到回值
>
> 3）方法里设置setReturnCallback在setConfirmsCallback内部实现new ReturnCallback()方法
>
> ```java
> @RunWith(SpringJUnit4ClassRunner.class)
> @ContextConfiguration(locations = "classpath:springRabbitMQProducer.xml")
> public class SpringQueueTest {
>     @Autowired
>     public RabbitTemplate rabbitTemplate;
>     @Test
>     public void springQueuetest1(){
>         String message="springqueue队列发送的数据";
>         rabbitTemplate.setMandatory(true);
>         rabbitTemplate.setReturnCallback(new RabbitTemplate.ReturnCallback() {
>             @Override
>            /**
>                  * message  消息信息
>                  * replyCode    错误码
>                  * replyText    错误信息
>                  * exchange   交换机
>                  * routingKey   路由
>                  */
>                 public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
>                         System.out.println(message);
>                         System.out.println(replyCode);
>                         System.out.println(replyText);
>                         System.out.println(exchange);
>                         System.out.println(routingKey);
>                 }
>         });
>         rabbitTemplate.convertSendAndReceive("springqueue",message.getBytes());
>     }
> }
> ```

##### 3、事务控制

RabbitMQ提供了事务机制，但是性能较差不建议使用；

在channel下面提供了完成事务控制的方法：

txSelect()用于将当前channel设置成transaction模式，就是事务开启；

txCommit()用于事务提交；

txRollback()用于事务的回滚。

##### 4、消费者确认ACK(Acknowledge)

>分成3种模式：1、手动确认模式acknowledge="manual"；2、自动确认模式acknowledge="auto"；3、根据异常情况确认模式acknowledge="none"，此方式较为麻烦不推荐使用；
>
>ACK默认是自动确认模式，在使用中我们需要手动的开启才能使用手动确认模式。需要在spring配置文件内rabbit拦截器rabbit:listener-container后面增加acknowledge="manual"

```xml
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual">
        <rabbit:listener ref="springConsumerLister" queue-names="springqueue"/>
</rabbit:listener-container>
```

> 业务处理后需要调用channel.basicAck()进行手动签收，如果出现异常则需要调用channel.basicNack()多值或channel.basicReject()单值方法，让其自动重新发送消息。

```java
@Component
public class SpringConsumerLister implements ChannelAwareMessageListener {
    /**
     * consumer ACK手动确认:
     * 1、需要在xml设置acknowledge="manual"；2、实体类中实现ChannelAwareMessageListener;
     * 3、确认成功调用channel.basicAck()签收；4、失败调用channel.basicNack()拒绝签收,broker重新发送给consumer;
     * 接口同时实现onMessage方法
     * @param message
     * @param channel
     * @throws Exception
     */
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        Thread.sleep(3000);
        Long messageTag=message.getMessageProperties().getDeliveryTag();
        try{
            //1、接受到消息
            System.out.println(new String(message.getBody(),"UTF-8"));
            //2、业务逻辑处理
            //强制报错让业务进入重发
            int i=3/0;
            /**
             *  deliveryTag:   当前消息的tag标签
             *  multiple：   签收消息，如果为true会签收deliveryTag及其之前的所有的消息，允许多条消息被签收；如果是false则不签收
             */
            //手动签收
            channel.basicAck(messageTag,true);
        }catch (Exception e){
            /**
             * requeue： 重回队列，为true时消息会重新回到queue队列里面，broker会重新将消息下发给用户
             */
            channel.basicNack(messageTag,true,true);
            //单个内容返回队列
            //channel.basicReject(messageTag,true);
        }
    }
}
```

#### 5.2消息限流及TTL

##### 1、消息限流

>使用场景，1、秒杀活动，2、消息推送，app重新安装后历史小时显示
>
>消息限流必须是ack机制手动确认模式；
>
>消费的按限流值1秒执行几条；prefetch的值就是一秒执行的条数，直到手动确认消费完毕后，才会继续拉下一条消息；
>
>spring配置文件里在rabbit拦截器listener-container里配置prefetch=“2”

```xml
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" 
                               prefetch="2">
        <rabbit:listener ref="springConsumerLister" queue-names="springqueue"/>
    </rabbit:listener-container>
```

> 实现代码,代码里没有特殊配置

```java
@Component
public class SpringConsumerLister implements ChannelAwareMessageListener {
    /**
     * consumer ACK手动确认:
     * 1、需要在xml设置acknowledge="manual"；2、实体类中实现ChannelAwareMessageListener;
     * 3、确认成功调用channel.basicAck()签收；4、失败调用channel.basicNack()拒绝签收,broker重新发送给consumer;
     * 接口同时实现onMessage方法
     * @param message
     * @param channel
     * @throws Exception
     */
    Integer i=0;
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        Thread.sleep(3000);
        Long messageTag=message.getMessageProperties().getDeliveryTag();
        try{
            //1、接受到消息
            System.out.println(new String(message.getBody(),"UTF-8"));
            System.out.println("i="+i);
            //2、业务逻辑处理
            if(i==5){
                int i=3/0;
            }
            /**
             *  deliveryTag:   当前消息的tag标签
             *  multiple：   签收消息，如果为true会签收deliveryTag及其之前的所有的消息，允许多条消息被签收；如果是false则不签收
             */
            //手动签收
            channel.basicAck(messageTag,true);
            i++;
        }catch (Exception e){
            /**
             * requeue： 重回队列，为true时消息会重新回到queue队列里面，broker会重新将消息下发给用户
             */
            channel.basicNack(messageTag,true,true);
        }
    }
}
```

##### 2、TTL(Time To Live)的缩写, 也就是生存时间

> a、只有内容在队列的最上方时TTL才会被消费；例如有10条内容，其中单条配置了TTL是在第2条，如果第一条没有被消费时即使消息时间超过了TTL的时间其第2条内容也不会消失，只有第二条被消费时到TTL时间后第二条会自动处理，如果被消费了则不做处理，如果没有被消费则会进入死信队列；
>
> b、当队列TTL与单条TTL同时存在时以时间短的为效；

1）队列TTL配置文件配置

>rabbit:queue添加rabbit:queue-arguments属性配置entry属性里增加key="x-message-ttl",设置value为过期时间，并且通过value-type="java.lang.Integer"指定value的类型。
>
>key值可以通过管理后台通过增加队列里获取
>
>![image-20210318221453406](images\queue-info-data.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">

<!--加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>
    <!--配置rabbitmq connectFactory信息-->
    <rabbit:connection-factory id="connectionFactory"
                               host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.password}"
                               virtual-host="${rabbitmq.virtual-host}" publisher-confirms="true" publisher-returns="true"/>
    <!--定义管理交换机，对列-->
    <rabbit:admin connection-factory="connectionFactory" />
    <!--定义rabbittemplate对象操作可以在代码中方便发送消息-->
    <rabbit:template id="rabbitTemplate" connection-factory="connectionFactory"/>
    <!--消息过期时间TTL配置-->
    <rabbit:queue id="queue_ttl" name="queue_ttl" >
        <rabbit:queue-arguments>
            <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer"/>
        </rabbit:queue-arguments>
    </rabbit:queue>
    <rabbit:topic-exchange id="exchange_ttl" name="exchange_ttl">
        <rabbit:bindings>
            <!--pattern路由key,queue队列名-->
            <rabbit:binding pattern="gao.#" queue="queue_ttl"></rabbit:binding>
        </rabbit:bindings>
    </rabbit:topic-exchange>
</beans>
```

2）单条内容TTL设置

设置单条内容TTL需要生产者发创建消息时在java代码内生产MessagePostProcessor对象的postProcessMessage实现方法使用setExpiration("5000")对象设置TTL时间

```java
@Test
    public void springQueuetest3(){
        String message = "springqueue队列发送的数据";
        //消息后处理对象，设置一些消息的参数信息
        MessagePostProcessor messagePostProcessor = new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                 message.getMessageProperties().setExpiration("5000");//设置过期时间
                return message;
            }
        };
        rabbitTemplate.convertSendAndReceive("exchange_ttl","gao.qttl", message.getBytes(),messagePostProcessor);
    }
```

程序执行后

![image-20210318220415959](images\rabbitmq_ttl.png)

TTL时间到后

![image-20210318220514232](images\rabbitmq_ttl_after.png)

#### 5.3死信队列（DLX）

##### 5.3.1死信队列产生情况分析

死信会在以下几种情况产生：

###### 1）TTL到期(生产者配置)

>a、队列TTL设置，在spring配置文件内配置rabbit:queue标签的子标签rabbit:queue-arguments 内的子标签entry标签的TTL属性名：key="x-message-ttl"，键值：value="10000"，键值类型：value-type="java.lang.Integer"属性；
>
>b、单个内容TTL设置，在实现代码里生成MessagePostProcessor实现类里的postProcessMessage方法使用message.getMessageProperties().setExpiration("5000")设置过期时间；

###### 2）队列长度超过(生产者配置)

>超过队列设置长度的内容会直接进入死信队列，如果没有配置死信队列直接会被丢弃；

###### 3）消费者拒绝消费消息(消费者配置)

> 需消费者ACK设置为手动模式并且basicNack()/basicReject()，并且不把消息重新放回原队列，requeue=false;

![image-20210319112144704](images\rabbitmq-dlx.png)

死信队列消费图

##### 5.3.2功能编写

消费者实现DLX主要是xml配置,代码是正常的消息发送

> 使用队列长度超过的方式来测试，队列在spring配置文件内配置rabbit:queue标签的子标签rabbit:queue-arguments 内的子标签entry标签的key=“x-max-length",键值：value="5"，键值类型：value-type="java.lang.Integer"属性；

```xml
<!--消息过期时间TTL配置-->
    <rabbit:queue id="queue_dlx" name="queue_dlx" auto-declare="true">
        <rabbit:queue-arguments>
            <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer"/>
            <entry key="x-max-length" value="5" value-type="java.lang.Integer"/>
            <!--绑定死信交换机与路由-->
            <entry key="x-dead-letter-exchange" value="exchange_dlx_dead"/>
            <entry key="x-dead-letter-routing-key" value="gaodead.news"/>
        </rabbit:queue-arguments>
    </rabbit:queue>
    <rabbit:topic-exchange id="exchange_dlx" name="exchange_dlx" auto-declare="true">
        <rabbit:bindings>
            <!--pattern路由key,queue队列名-->
            <rabbit:binding pattern="gao.#" queue="queue_dlx"></rabbit:binding>
        </rabbit:bindings>
    </rabbit:topic-exchange>
    <!--设置死信路由及交换机-->
    <rabbit:queue id="queue_dlx_dead" name="queue_dlx_dead" auto-declare="true"/>
    <rabbit:topic-exchange id="exchange_dlx_dead" name="exchange_dlx_dead"
                           auto-declare="true">
        <rabbit:bindings>
            <rabbit:binding pattern="gaodead.#" queue="queue_dlx_dead"/>
        </rabbit:bindings>
    </rabbit:topic-exchange>
```

消费者实现DLX主要是代码实现

```java
@Component
public class ConsmuerDLXLister implements ChannelAwareMessageListener {
    int i=0;
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {

        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try{
            if(i==5){
                int t=3/0;
            }else{
                channel.basicAck(deliveryTag,true);
                i++;
            }
        }catch (Exception e){
            //报错代码不再重回队列
            channel.basicNack(deliveryTag,true,false);
        }
    }
}
```

#### 5.4延时队列

RabbbitMQ没有提供直接的队列延时的方法，但是可以使用TTL及死信队列相结合的方式来实现延时队列的。

> 使用场景用户在下单时消息中心会创建一个TTL例如为30分钟后过期的消息，当TTL时间到达时消息进入私信队列DLX，当订单中心收到死信队列消息后进行订单状态判断，如果没有支付就进行数据回滚操作，如果支付了就不做处理。

#### 5.5消息追踪

Rabbit中可以使用Firehose或者rabbitmq_tracing插件功能来实现消息追踪。

>Firehose是将生产者投递给rabbitmq的消息，按指定的格式发送给默认的exchange上，默认的exchange是amq.rabbitmq.trace，他是一个topic类型的exchange。发到此exchange上消息的routing key为publish.exchangename 和deliver.queuename。exchangename 与queuename为exchange与queue的实际使用名称，分别对应生产者投递到exchange的消息和消费者从queue上获取的消息。

> Firehose使用

```shell
rabbitmqtcl trace_on 	#开启Firehose命令
rabbitmqtcl trace_off 	#关闭Firehose命令
```

开启方法：

1、后台queue栏目里新建一个队列例如：gao_queue_trace

![image-20210319153729776](images\image-20210319153729776.png)

2、将queue与默认的exchange（amq.rabbitmq.trace）进行绑定，如果要绑定所有的路由消息需要在routingkey内填写通配符#,如果要绑定已gao开头的路由信息则需要在routingkey内填写gao#;

![image-20210319153954099](images\image-20210319153954099.png)

> rabbitmq_tracing使用

```shell
#方法一 进入gaorabbit1
docker exec -it gaorabbitmq1 /bin/bash
rabbitmq-plugins list查看所有插件
#开启rabbitmq_tracing插件
rabbitmq-plugins enable rabbitmq_tracing
#方法二
docker exec -it gaorabbitmq1 rabbitmq-plugins enable rabbitmq_tracing

#关闭日志跟踪
docker exec -it gaorabbitmq1 rabbitmq-plugins disable rabbitmq_tracing
```

#### 5.6镜像队列

在admin的policies里增加一个policy，设置路由Pattern为^全部内容，这样就会将内容自动同步到其他rabbitmq服务器

> web界面设置

![image-20210321142734152](images\image-20210321142734152.png)

> 程序设置

```shell
rabbitmqctl set_policy Name "^" {"ha-mode":"all"}
Name:测试略名
Pattern:正切匹配规则，如匹配所有队列就是^
definition:使用ha-mode模式中的all,也就是同步所有匹配的队列
```

结果

![image-20210321143013491](images\image-20210321143013491.png)