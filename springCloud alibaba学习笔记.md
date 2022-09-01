# spring cloud alibaba 

## 1、父工程创建 springcloud-study

### 1.1、父pom.xml创建

> 父项目只做项目版本控制不做其它，所以父工程只配置pom.xml不需要其它所以需要删除src文件夹

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <!--父工程-->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.12.RELEASE</version>
  </parent>

  <groupId>com.gaogg</groupId>
  <artifactId>springcloud-study</artifactId>
  <version>1.0-SNAPSHOT</version>
  <!--父工程指定打包格式原来pom-->
  <packaging>pom</packaging>
<!--依赖版本锁定-->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <cloud.version>Hoxton.SR12</cloud.version>
    <alibaba.version>2.2.7.RELEASE</alibaba.version>
    <springboot.version>2.3.12.RELEASE</springboot.version>
  </properties>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>2.2.2.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
  <dependencies>
    <!--给所有项目增加sleuth依赖，通过sleuth来追踪cloud访问信息-->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-sleuth</artifactId>
    </dependency>
    <!--zipkin依赖，sleuth追踪数据注入到zipkin内-->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-zipkin</artifactId>
    </dependency>
  </dependencies>
</project>
```

## 2、创建通用配置子工程shop-comm

### 2.1配置shop-comm的pom.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <!-- 导入父工程，进行版本控制-->
    <parent>
        <artifactId>springcloud-study</artifactId>
        <groupId>com.gaogg</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.gaogg</groupId>
    <artifactId>shop-comm</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <name>shop-comm</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.17</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.12.RELEASE</version>
                <configuration>
                    <mainClass>com.gaogg.shopcomm.ShopCommApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2.2编写相关类，例如domain,统一返回类

> Order.class类

```java
package com.gaogg.shopcomm.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("shop_order")
@Data
public class Order {
    //订单相关的
    @TableId(value = "oid",type = IdType.AUTO)
    private Integer id;
    private Integer number;
    //产品
    private Integer pid;
    private String pname;
    private String pprice;
    //用户
    private Integer uid;
    private String username;
}
```

> Product.class类

```java
package com.gaogg.shopcomm.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("shop_product")
@Data
public class Product {
    @TableId(value = "pid",type = IdType.AUTO)
    private Integer id;
    private String pname;
    private String pprice;
    private Integer stock;
}
```

> User.class

```java
package com.gaogg.shopcomm.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("shop_product")
@Data
public class Product {
    @TableId(value = "pid",type = IdType.AUTO)
    private Integer id;
    private String pname;
    private String pprice;
    private Integer stock;
}
```

> Result.class	//统一返回类 

```java
package com.gaogg.shopcomm.result;

import lombok.Data;
import java.util.HashMap;
import java.util.Map;

@Data
public class Result {
    private Integer code;
    private String resultMsg;
    private Map<String,Object> data=new HashMap<>();
    //成功
    public static Result succeeded(){
        Result result=new Result();
        result.setCode(1);
        result.setResultMsg("访问成功");
        return result;
    }
    //失败
    public static Result failed(){
        Result result=new Result();
        result.setCode(1);
        result.setResultMsg("访问成功");
        return result;
    }

    public Result data(String key,Object value){
        this.data.put(key, value);
        return this;
    }
}
```

## 3、创建子工程shop-user

### 3.1配置shop-user的pom.xml

**rocketmq消息消费实现，需要在pox里添加rokcetmq相关依赖，同时需要在application配置里将rokcetmq服务器信息配置上，需要实现一个消息消费方法的创建并且继承RocketMQListener这个接口类传的参数类型就是你消息里回传的消息类型，例如我们在订单服务器里消息发送的是order类型的，这边接受时也需是order类型。**

**消息消费时需要使用RocketMQMessageListener注解方法实现消费端rocketmq注册，consumerGroup消费组名，topic 主题名与生产者主题名一致**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <!--配置父项目，锁定版本-->
    <parent>
        <artifactId>springcloud-study</artifactId>
        <groupId>com.gaogg</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>shop-user</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <name>shop-user</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
      <!--导入通用包-->
        <dependency>
            <groupId>com.gaogg</groupId>
            <artifactId>shop-comm</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.17</version>
        </dependency>
		<!--导入nacos包-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
<!--        配置openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
      
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.12.RELEASE</version>
                <configuration>
                    <mainClass>com.gaogg.shopuser.ShopUserApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

### 3.2配置application.yaml

```yam
server:
  port: 8081

spring:
  application:
    name: shop-user
#设置日期格式
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://1.15.71.35:13306/shop?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&useSSL=true
    username: root
    password: XXXXX
#配置nacos服务器信息
  cloud:
    nacos:
      discovery:
        server-addr: 106.55.197.195:18848
        group: shop-study
  #cloud项目追踪，后期会集成到网关统一管理
  #zipkin配置
  zipkin:
    #配置远程服务器
    base-url: http://106.55.197.195:19411/
    #让nacos将上面的地址http://106.55.197.195:19411/当成一个url而不是一个服务来执行
    discovery-client-enabled: false
  #  sleuth配置
  sleuth:
    sampler:
      probability: 1.0  #sleuth采样配置取值0~1之间，向服务器推送服务名，traceId,spanId等追踪信息，1.0标识100%全部记录
```

### 3.3启动类开启nacos与openFeign

```java
package com.gaogg.shopuser;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
//mybatis-plus扫描mapper
@MapperScan("com.gaogg.shopuser.dao")
//开始nacos
@EnableDiscoveryClient
//开启openFeign
@EnableFeignClients
public class ShopUserApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopUserApplication.class, args);
    }
}
```

### 3.4方法类实现

#### service类与dao类实现mybatis-plus接口方法，减少代码的编写

#### 1)dao类

```java
package com.gaogg.shopuser.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gaogg.shopcomm.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends BaseMapper<User> {
}
```

#### 2)service接口类

```java
package com.gaogg.shopuser.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gaogg.shopcomm.domain.User;
import org.springframework.stereotype.Service;

public interface UserService extends IService<User> {
}

```

#### 3)service接口实现类impl

> 既实现了mybatis-plus的通用圂同时继承service类

```java
package com.gaogg.shopuser.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gaogg.shopcomm.domain.User;
import com.gaogg.shopuser.dao.UserDao;
import com.gaogg.shopuser.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {
}
```

#### 4)controller接口实现

```java
package com.gaogg.shopuser.controller;

import com.gaogg.shopcomm.domain.User;
import com.gaogg.shopcomm.result.Result;
import com.gaogg.shopuser.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.*;

@RestController
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/selectAll")
    public Result selectAllUser(@RequestParam(name = "id",defaultValue = "0")Integer id){
        List<User> list=null;
        if(id==0){
            list = userService.list();
        }else{
            List<Integer> integers=new ArrayList<>();
            integers.add(id);
            list = userService.listByIds(integers);
        }
        log.info("logs:"+list.toString());
        //Result data=new Result();
        Result data;
        if(list.size()>0){
            data = Result.succeeded().data("lists", list).data("updateTime", new Date());

        }else{
            data =  Result.failed().data("updateTime",new Date());
        }
        //log.debug(data.toString());
        return data;
    }
}
```

#### 5)配置rocketmq消息接受类

```java
package com.gaogg.shopuser.service;

import com.gaogg.shopcomm.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
//RocketMQMessageListener实现消费端rocketmq注册，consumerGroup消费组名，topic 主题名与生产者主题名一致
@RocketMQMessageListener(consumerGroup = "shop_user",topic = "orderTopic")
public class SmsService implements RocketMQListener<Order> {
    @Override
    public void onMessage(Order order) {
        log.info("接收到一个订单信息 {},接下来可以发短信通知了 "+order);
    }
}
```

## 4、创建子工程shop-order

#### 4.1配置shop-order项目的pom.xml

**order作为消息生产者在消息推送时需要实现消息生产者的功能，需要在pox文件里集成rocketmq依赖同时需要在application里配置rocketmq的服务地址及生产组，还需要要在方法内实现消息推送的功能这边使用的是springboot集成的RocketMQTemplate类的convertAndSend方法来实现消息下发**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <!--配置父工程-->
    <parent>
        <artifactId>springcloud-study</artifactId>
        <groupId>com.gaogg</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.gaogg</groupId>
    <artifactId>shop-order</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>
    <name>shop-order</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.gaogg</groupId>
            <artifactId>shop-comm</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
<!--    配置nacos    -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
<!--        配置openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.17</version>
        </dependency>

        <!--rocketmq依赖-->
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-spring-boot-starter</artifactId>
            <version>2.2.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-client</artifactId>
            <version>4.8.0</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.12.RELEASE</version>
                <configuration>
                    <mainClass>com.gaogg.shoporder.ShopOrderApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

### 4.2配置application.yaml

```yam
server:
  port: 8085

spring:
  application:
    name: shop-order
  #设置日期格式
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://1.15.71.35:13306/shop?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&useSSL=true
    username: root
    password: XXX
  cloud:
    nacos:
      discovery:
        server-addr: 106.55.197.195:18848
        group: shop-study
    sentinel:
      transport:
        #设置本地业务与sentinel数据互通本地端口
        port: 9999
        dashboard: localhost:18858
      #设置链路限流。alibaba2.1.1RELEASE版本后在application里将sentinel.web-context-unify=false即可关闭收敛。
      #关闭收敛后我们可以配置一个@SentinelResource(value="XXX")定义一个链路方法接受链路指向
      web-context-unify: false
      #设置链路限流还可以使用filter.enabled=false来设置过滤器关闭sentinel的commonFilter实例化
      #自己构建一个过滤器来自己编写sentinel的commonFilter实例化
      #在过滤类里设置参数commonFilter.web-context-unify为false
      #filter:
      #  enabled: false
  #cloud项目追踪，后期会集成到网关统一管理
  #zipkin配置
  zipkin:
    #配置远程服务器
    base-url: http://106.55.197.195:19411/
    #让nacos将上面的地址http://106.55.197.195:19411/当成一个url而不是一个服务来执行
    discovery-client-enabled: false
  #  sleuth配置
  sleuth:
    sampler:
      probability: 1.0  #sleuth采样配置取值0~1之间，向服务器推送服务名，traceId,spanId等追踪信息，1.0标识100%全部记录
#使用ribbon自己去写服务器调用时可以设置
#调用的提供者的名称
#shop-product:
#  ribbon:
#    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #设置ribbon的轮训策略，默认是轮询
#ribbon的设置
#ribbon:
#  ReadTimeout: 5000
#  ConnectTimeout: 5000

#开启feign对sentinel的支持
feign:
  sentinel:
    enabled: true
#rocketmq配置    
rocketmq:
  #设置rocketMQ地址
  name-server: 106.55.197.195:19876
  producer:
    group: shop-order #生产组名
```

### 4.3启动类开启nacos与openFeign

```java
package com.gaogg.shoporder;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@MapperScan("com.gaogg.shoporder.dao")
//开始nacos
@EnableDiscoveryClient
//开启openFeign
@EnableFeignClients
public class ShopOrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopOrderApplication.class, args);
    }
}
```

### 4.4方法类的实现

#### 4.4.1通过接口的方式实现openFeign功能，openFeign通过rabbon来实现接口的调用

##### a、单独Feign更能

> 通过FeignClient注解方法绑定服务名

> 通过RequestMapping方法指定接口

```java
package com.gaogg.shoporder.service;

import com.gaogg.shopcomm.domain.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("shop-product") //设置feign，值为提供服务者名,服务者spring.application.name
public interface ProductOpenFeignService {
    //指定调用提供者的调用的方法
    @RequestMapping("/productById")
    String findProductById(@RequestParam(name = "id",defaultValue = "0")Integer id);

    @RequestMapping("/updateById")
    String updateIdAndStock(@RequestParam(name = "id")Integer id,@RequestParam(name = "stock")Integer stock);
}
```

##### b、Feign开启对sentinel的支持

```java
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

//通用报错回调处理方法，这种方法虽然能给报错进行处理但是没办法获取到错误信息
//fallback与fallbackFactory不可同时使用
//fallback = ProductFeignSentinelFallBackServiceImpl.class
//通用报错回调处理方法，这种方法然能给报错进行处理同时可以获取到错误信息
//fallbackFactory = ProductFeignSentinelFallbackFactoryGetErrorServiceImpl.class
@FeignClient(
        value = "shop-product",
        fallbackFactory = ProductFeignSentinelFallbackFactoryGetErrorServiceImpl.class
        )
public interface ProductFeignSentinelService {
    //指定调用提供者的调用的方法
    @RequestMapping("/productById")
    String findProductById(@RequestParam(name = "id",defaultValue = "0")Integer id);

    @RequestMapping("/updateById")
    String updateIdAndStock(@RequestParam(name = "id")Integer id,@RequestParam(name = "stock")Integer stock);
}
```

###### 1）fallback接口只能实现返回信息获取不到报错信息

> 实现了自定义的Feign集成sentinel接口

```java
package com.gaogg.shoporder.service.impl;

import cn.hutool.json.JSONUtil;
import com.gaogg.shopcomm.result.Result;
import com.gaogg.shoporder.service.ProductFeignSentinelService;

import org.springframework.stereotype.Service;

import java.util.Date;

//容错类必须实现容错接口，并为每个方法实现容错方案
@Service
public class ProductFeignSentinelFallBackServiceImpl implements ProductFeignSentinelService {
    //查询信息报错
    @Override
    public String findProductById(Integer id) {
        Result result = new Result();
        result.setCode(-100);
        result.setResultMsg("-根据实际情况对报错内容进行回滚");
        result.data("updateTime",new Date());
        System.out.printf(JSONUtil.toJsonStr(result));
        return JSONUtil.toJsonStr(result);
    }
    //更新报错
    @Override
    public String updateIdAndStock(Integer id, Integer stock) {
        Result result = new Result();
        result.setResultMsg("-根据实际情况对更新数据进行回滚");
        result.setCode(-100);
        result.data("updateTime",new Date());
        System.out.printf(result.toString());
        return result.toString();
    }
}
```

###### 2)即实现返回信息又能获取报错信息。实现fallbackFactory接口

```java
package com.gaogg.shoporder.service.impl;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.gaogg.shopcomm.result.Result;
import com.gaogg.shoporder.service.ProductFeignSentinelService;
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.Date;

//容错类必须实现容错接口，并为每个方法实现容错方案
//如果想要获取到爆粗信息容错类必须要实现FallbackFactory接口来进行编写，传入容错类型接口
@Service
public class ProductFeignSentinelFallbackFactoryGetErrorServiceImpl implements FallbackFactory<ProductFeignSentinelService> {
    @Override
    public ProductFeignSentinelService create(Throwable throwable) {
        return new ProductFeignSentinelService() {
            @Override
            public String findProductById(Integer id) {
                Result result = new Result();
                result.setCode(-100);
                result.setResultMsg("-根据实际情况对报错内容进行回滚");
                result.data("updateTime",new Date());
                System.out.printf(JSONUtil.toJsonStr(result));
                return JSONUtil.toJsonStr(result);
            }

            @Override
            public String updateIdAndStock(Integer id, Integer stock) {
                Result result = new Result();
                result.setResultMsg("-根据实际情况对更新数据进行回滚");
                result.setCode(-100);
                result.data("updateTime",new Date());
                System.out.printf(result.toString());
                return result.toString();
            }
        };
    }
}
```

#### 4.4.2 service与dao接口类调用mybatis-plus通用方法来

#### 1）service接口类

```java
package com.gaogg.shoporder.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gaogg.shopcomm.domain.Order;

public interface OrderService extends IService<Order> {
}
```

#### 2）service接口实现类impl

```java
package com.gaogg.shoporder.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gaogg.shopcomm.domain.Order;
import com.gaogg.shoporder.dao.OrderDao;
import com.gaogg.shoporder.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderDao, Order> implements OrderService {
}
```

#### 3)dao类

```java
package com.gaogg.shoporder.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gaogg.shopcomm.domain.Order;
import org.springframework.stereotype.Repository;

public interface OrderDao extends BaseMapper<Order> {
}
```

#### 4)controller接口实现

```java
package com.gaogg.shoporder.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.gaogg.shopcomm.domain.Order;
import com.gaogg.shopcomm.domain.Product;
import com.gaogg.shopcomm.result.Result;
import com.gaogg.shoporder.service.OrderService;
import com.gaogg.shoporder.service.ProductOpenFeignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired	//调用openfeign接口类实现接口调用
    ProductOpenFeignService productOpenFeignService;
    @Autowired
//            使用rocketMQTemplate来进行mq数据管理
    RocketMQTemplate rocketMQTemplate;

    @RequestMapping("/createOrder")
    public Result userCreateOrder(@RequestParam(name = "pid",defaultValue = "0")Integer pid,@RequestParam(name = "username",defaultValue = "gaogg")String username,@RequestParam(name = "uid",defaultValue = "1")Integer uid,@RequestParam(name = "numbers",defaultValue = "1")Integer numbers){
        //String s = HttpUtil.get("http://localhost:8083/productById?id=" + pid);
        final String s = productOpenFeignService.findProductById(pid);

        Result result = JSONUtil.toBean(s, Result.class);
        List<Product> datas = new ArrayList<>();
        //System.out.println(result.getData().get("datas"));
//        datas = (List<Product>) result.getData().get("datas");

        JSONArray arrays= (JSONArray) result.getData().get("datas");
        System.out.println(arrays);
        for (Object array : arrays) {
            Product product = JSONUtil.toBean((JSONObject) array, Product.class);
            System.out.println(product.getId());
            datas.add(product);
        }

        Integer stock=datas.get(0).getStock()-numbers;
        Result data;
        if(stock>0){
            //        插入数据到order表
            Order order = new Order();
            order.setNumber(numbers);
            order.setPid(datas.get(0).getId());
            order.setPname(datas.get(0).getPname());
            order.setPprice(datas.get(0).getPprice());
            order.setUid(uid);
            order.setUsername(username);
            final boolean save = orderService.save(order);

            if(save){
                //String s1 = HttpUtil.get("http://localhost:8083/updateById?id=" + pid+"&stock="+stock);
                final String s1 = productOpenFeignService.updateIdAndStock(pid, stock);
                final Result result1 = JSONUtil.toBean(s1, Result.class);
                log.info("操作更新product返回：",result1);
                if(result1.getCode()==1){
                    data=Result.succeeded().data("updateTime",new Date());
//                    下单成功后给rocketmq发送成功消息
                    rocketMQTemplate.convertAndSend("orderTopic",order);
                }else{
                    data=Result.failed().data("updateTime",new Date());
                }
            }else{
                data=Result.failed().data("updateTime",new Date());
            }
        }else{
            data=Result.failed().data("updateTime",new Date());
        }
        return data;
    }
}
```

## 5、创建子工程shop-product

### 5.1配置shop-product的pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud-study</artifactId>
        <groupId>com.gaogg</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.gaogg</groupId>
    <artifactId>shop-product</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>
    <name>shop-product</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.gaogg</groupId>
            <artifactId>shop-comm</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.17</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.12.RELEASE</version>
                <configuration>
                    <mainClass>com.gaogg.shopproduct.ShopProductApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>

```

### 5.2配置application.yaml

```yam
server:
  port: 8083
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://1.15.71.35:13306/shop?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&useSSL=true
    username: root
    password: XXX
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  application:
    name: shop-product
  cloud:
    nacos:
      discovery:
        group: shop-study
        server-addr: 106.55.197.195:18848
    #cloud项目追踪，后期会集成到网关统一管理
  #zipkin配置
  zipkin:
    #配置远程服务器
    base-url: http://106.55.197.195:19411/
    #让nacos将上面的地址http://106.55.197.195:19411/当成一个url而不是一个服务来执行
    discovery-client-enabled: false
  #  sleuth配置
  sleuth:
    sampler:
      probability: 1.0  #sleuth采样配置取值0~1之间，向服务器推送服务名，traceId,spanId等追踪信息，1.0标识100%全部记录      
```

### 5.3启动类开启nacos与openFeign

```java
package com.gaogg.shopuser;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
//mybatis-plus扫描mapper
@MapperScan("com.gaogg.shopuser.dao")
//开始nacos
@EnableDiscoveryClient
//开启openFeign
@EnableFeignClients
public class ShopUserApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopUserApplication.class, args);
    }
}
```

### 5.4方法类实现

#### service类与dao类实现mybatis-plus接口方法，减少代码的编写

#### 1)dao类

```java
package com.gaogg.shopproduct.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gaogg.shopcomm.domain.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends BaseMapper<Product> {
}

```

#### 2)service接口类

```java
package com.gaogg.shopproduct.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gaogg.shopcomm.domain.Product;
import org.springframework.stereotype.Service;

public interface ProductService extends IService<Product> {
}
```

#### 3)service接口实现类impl

> 既实现了mybatis-plus的通用圂同时继承service类

```java
package com.gaogg.shopproduct.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gaogg.shopcomm.domain.Product;
import com.gaogg.shopproduct.dao.ProductDao;
import com.gaogg.shopproduct.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductDao, Product> implements ProductService {
}
```

#### 4)controller接口实现

```java
package com.gaogg.shopproduct.controller;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.gaogg.shopcomm.domain.Product;
import com.gaogg.shopcomm.result.Result;
import com.gaogg.shopproduct.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @RequestMapping("/productById")
    public Result findProductById(@RequestParam(name = "id",defaultValue = "0")Integer id){
        List<Product> list;
        if(id==0){
            list = productService.list();
        }else{
            List<Integer> integers=new ArrayList<>();
            integers.add(id);
            list=productService.listByIds(integers);
        }
        Result data;
        if(list.size()>0){
            data=Result.succeeded().data("datas",list).data("updataTime",new Date());
        }else {
            data=Result.failed().data("updataTime",new Date());
        }
        return data;
    }

    @RequestMapping("/updateById")
    public Result upadteProductById(@RequestParam(name = "stock",defaultValue = "0")Integer stock,@RequestParam(name = "id",defaultValue = "0")Integer id){
        final UpdateWrapper<Product> productUpdateWrapper = new UpdateWrapper<>();
        productUpdateWrapper.set("stock",stock);
        productUpdateWrapper.eq("pid",id);
        final boolean update = productService.update(productUpdateWrapper);
        Result datas;
        if(update){
            datas=Result.succeeded().data("updataTime",new Date());
        }else{
            datas=Result.succeeded().data("updataTime",new Date());
        }
        return datas;
    }
}

```

## 6、创建网关Gateway项目shop-gateway

### 6.1配置shop-gateway的pom.xml

**cloud gateway不能启用spring-boot-start-web,他的功能是集成到了spring-cloud-starter-gateway，如果引入了start-web会冲突**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <artifactId>springcloud-study</artifactId>
        <groupId>com.gaogg</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <groupId>com.gaogg</groupId>
    <artifactId>shop-gateway</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <!--引入nacos让gateway注册到nacos由nacos统一管理-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 6.2配置application.ymal

自定义断言与拦截器都是在application.yaml内配置修改

```xml
server:
  port: 8700
spring:
  application:
    name: shop-gateway
  cloud:
    #开启nacos
    nacos:
      discovery:
        server-addr: 106.55.197.195:18848
        group: shop-study
    gateway:
      #让gateway在nacos中被发现
      discovery:
        locator:
          enabled: true
      #默认的路由实现不在gateway的配置文件里配置信息，通过nacos里的服务器名自动去跳转。将下面的routes信息注销了就是默认的实现
      #默认路由实现的访问链接是http://localhost:8700/product/productById?id=4会根据nacos的服务注册名shop-product来进行路由跳转
      #不建议使用默认的路由实现，建议使用增强方式，这样路由配置可以自己配置
      routes: #路由,路由一就安访问规则进行数据指向
        - id: product_route #此路由的id唯一标识，正常是使用uuid，我们这边使用的是自定义的值
          uri: lb://shop-product  #目标访问地址,转发地址单独url为 http://localhost:8083，如果通过feign获取url可以配置负载均衡策略。lb://shop-product
          order: 1 #路由优先级别。数字越小级别越高
          predicates: #断言
            - Path= /product/** #断言，网关通过判断path里的内容来进行内容跳转，满足断 言条件才会跳转
            #自定义断言 仅让age在18~60之间的人访问
            #- Ages= 16,60
          filters:  #过滤器（过滤器，进行条件判断返回值是boolean,转发请求要满足的条件）
            - StripPrefix=1 #请求转发之前去掉一层路径 
                            #请求地址http://localhost:8700/product/productById?id=4转发到http://localhost:8083/productById?id=4
            #- Logs=true,false #自定义过滤器
  #zipkin配置
  zipkin:
    #配置远程服务器
    base-url: http://106.55.197.195:19411/
    #让nacos将上面的地址http://106.55.197.195:19411/当成一个url而不是一个服务来执行
    discovery-client-enabled: false
  #  sleuth配置
  sleuth:
    sampler:
      probability: 1.0  #sleuth采样配置取值0~1之间，向服务器推送服务名，traceId,spanId等追踪信息，1.0标识100%全部记录
```

### 6.3自定义断言

**断言自定义时必须是使用断言名+RoutePredicateFactory同时必须继承AbstractRoutePredicateFactory接口**

```java
package com.gaogg.shopgateway.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.handler.predicate.AbstractRoutePredicateFactory;
import org.springframework.cloud.gateway.handler.predicate.GatewayPredicate;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

//自定义断言必须是断言名+RoutePredicateFactory来构成
//断言类必须要实现AbstractRoutePredicateFactory通用方法
@Component
public class AgesRoutePredicateFactory
        extends AbstractRoutePredicateFactory<AgesRoutePredicateFactory.Config> {
    //构造函数
    public AgesRoutePredicateFactory() {
        super(Config.class);
    }
    //读取配置文件中的参数值赋值到配置类中的属性上
    @Override
    public List<String> shortcutFieldOrder() {
        //这个位置中的顺序必须跟配置文件中的变量名及顺序一致
        return Arrays.asList("minAge","maxAge");
    }

    @Override
    public Predicate<ServerWebExchange> apply(Config config) {
        return new GatewayPredicate() {
            @Override
            public boolean test(ServerWebExchange serverWebExchange) {
                //通过webserver获取http参数
                String age = serverWebExchange.getRequest().getQueryParams().getFirst("age");
                //判断是否为空
                if(StringUtils.isNotEmpty(age)) {
                    int anInt = Integer.parseInt(age);
                    if (anInt > config.getMinAge() && anInt < config.getMaxAge()) {
                        return true;
                    }else {
                        return false;
                    }
                }
                return false;
            }
        };
    }

    @Data
    @NoArgsConstructor
    public static class Config {
        private int minAge;
        private int maxAge;
    }

}
```

### 6.4自定义拦截器

#### 6.4.1局部拦截器

**局部拦截器与断言一样需要拦截器名+GatewayFilterFactory同时继承AbstractGatewayFilterFactory接口。同时需要在application.ymal内router配置里配置才能生效**

```java
package com.gaogg.shopgateway.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.filter.factory.StripPrefixGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

//局部过滤器是使用过滤器名+GatewayFilterFactory来命名
//类必须实现AbstractGatewayFilterFactory类
@Component
@Slf4j
public class LogsGatewayFilterFactory extends AbstractGatewayFilterFactory<LogsGatewayFilterFactory.Config> {
    public LogsGatewayFilterFactory() {
        super(Config.class);
    }
    //处理逻辑
    @Override
    public GatewayFilter apply(Config config) {
        return new GatewayFilter() {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
                if(config.getErrorLogs()){
                   log.info("errorLogs 打开");
                }
                if(config.getInfoLogs()){
                    log.info("infoLogs 打开");
                }
                return chain.filter(exchange);
            }
        };
    }
    //将配置数据封装到配置类里
    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("errorLogs","infoLogs");
    }
    //配置类
    @Data
    @NoArgsConstructor
    public static class Config {
        private Boolean errorLogs;
        private Boolean infoLogs;
    }
}
```

#### 6.4.2全局拦截器

```java
package com.gaogg.shopgateway.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

//定义全局过滤器，全局过滤器必须实现GlobalFilter, Ordered两个接口，同时显现两接口里的方法
@Component
@Slf4j
public class AuthGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String userName = exchange.getRequest().getQueryParams().getFirst("userName");
        if(!StringUtils.equals("gao",userName)){
            log.info("认证失败");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    //配置当前过滤器的优先级，越小优先级越大
    @Override
    public int getOrder() {
        return 0;
    }
}
```

## 7.rocket消息推送及短信服务

### 7.1、rocket消息分类

**消息发送程序正常会集成到订单服务里的service内**

#### 7.1.1普通消息

> 普通消息分为3类：可靠同步消息，可靠异步消息，可靠单向消息

> 普通消息都是多进程无序下发消息

```java
//普通消息
    @Test
    void syncSendSMS(){
        /*
        * 同步消息 ,特点是实时的获取到消息返回
        * 参数1：destination 标识topic
        * 参数2: payload 消息体
        * 参数3： timeout 超时时间
        *
        * */
        SendResult sendResult = rocketMQTemplate.syncSend("syncSend:syncTap", "这是一条同步消息",1000 );

        System.out.println(sendResult);
    }

    @Test
    void asynSendSMS() throws InterruptedException {
        /*
        * 异步消息：消息发送后需要等待才会有结果，与同步消息一样他们都是多线程工作的，一个broker里有多个m queue
        * 参数1：destination 标识topic
        * 参数2: payload 消息体
        * 参数3： 回调函数，onSuccess 成功回调，onException失败回调
        * */
        rocketMQTemplate.asyncSend("asyncSend", "这是一条异步消息", new SendCallback() {
            //成功响应回调
            @Override
            public void onSuccess(SendResult sendResult) {
                System.out.println("成功响应的日志是："+sendResult);
            }
            //失败回调
            @Override
            public void onException(Throwable throwable) {
                System.out.println("失败返回的报错是:"+throwable);
            }
        });
        System.out.println("=======================");
//        为了等待结果我们在这边必须要等待下
        Thread.sleep(300000 );
    }
//单向发送
//    类似udp只发送不关心返回，所以没有回调函数，适用场景日志收集
    @Test
    void oneSendSMS(){
        rocketMQTemplate.sendOneWay("sendOneTopic","单向发送一条消息");
    }
```

#### 7.1.2顺序消息

> 普通消息的3种类型都对应有顺序消息类型，只需要对应的方法后面加上Orderly方法，在方法里加上hashKey

```java
@Test
void SendSMSOrder(){
        /*
         * 参数1：destination 标识topic
         * 参数2: payload 消息体
         * 参数3： hashKey 确定我们需要适用哪个通道进行消息发送，通过hash算法确定通道值，值没有特殊限制
        * */
        for (int i = 0; i < 10; i++) {
            rocketMQTemplate.sendOneWayOrderly("sendOneTopic","单向发送一条消息","gao");
        }

    }
```

#### 7.1.3事务消息

> 事务消息需要先注册一个半事务消息，用户触发发送

```java
package com.gaogg.shoporder.service;

import com.gaogg.shopcomm.domain.Order;
import com.gaogg.shopcomm.domain.TxLog;
import com.gaogg.shoporder.dao.OrderDao;
import com.gaogg.shoporder.dao.TxLogDao;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

//事务消息
@Service
public class OrderLocalTransactionService {
    @Resource
    private RocketMQTemplate rocketMQTemplate;
    @Resource
    TxLogDao txLogDao;
    @Resource
    OrderDao orderDao;

    //创建半事务发送消息
    public void sendMessage(Order order){
        Integer txId = txLogDao.selectCount(null)+1;
        //rocketMQTemplate.sendMessageInTransaction("trans_topic",MessageBuilder.withPayload(order).setHeader("txId",txId).build(),order);
        rocketMQTemplate.sendMessageInTransaction(
                "send_trans_group",
                "trans_topic",
                MessageBuilder.withPayload(order).setHeader("txId",txId).build(),
                order
        );
    }
    
    //本地事务处理方法,在本地事务拦截器里会调用到
    @Transactional
    public void createTrans(Order order,Integer txId){
        orderDao.insert(order);
        TxLog txLog = new TxLog();
        txLog.setTxId(txId);
        Date nowDate=new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        txLog.setDate(simpleDateFormat.format(nowDate));
        txLogDao.insert(txLog);
    }
}
```

> 本地事务拦截器

```java
package com.gaogg.shoporder.service;

import com.gaogg.shopcomm.domain.Order;
import com.gaogg.shopcomm.domain.TxLog;
import com.gaogg.shoporder.dao.TxLogDao;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.RocketMQTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionState;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

//本地事务拦截器，RocketMQTransactionListener，rocket注解2.0.3之前需要带上txProducerGroup消息下发组与事务消息下发配置的是一样的名字
//2.0.3版本后不能指定txProducerGroup
@Service
//@RocketMQTransactionListener
@RocketMQTransactionListener(txProducerGroup = "send_trans_group")
@Slf4j
public class OrderLocalTransactionServiceListener implements RocketMQLocalTransactionListener {
    @Resource
    OrderLocalTransactionService orderLocalTransactionService;
    @Resource
    TxLogDao txLogDao;

    //消息拦截处理，执行本地事务
    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        try{
            Order order = (Order) arg;
            String txId = (String) msg.getHeaders().get("txId");
            orderLocalTransactionService.createTrans(order,Integer.parseInt(txId));
            return RocketMQLocalTransactionState.COMMIT;
        }catch (Exception e){
            return RocketMQLocalTransactionState.ROLLBACK;
        }
    }
    //消息回查，当消息发送后没有处理时会调用此方法
    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message msg) {
        Integer txId = (Integer) msg.getHeaders().get("txId");
        TxLog txLog = txLogDao.selectById(txId);
        if(txLog!=null){
            return RocketMQLocalTransactionState.COMMIT;
        }else {
            return RocketMQLocalTransactionState.ROLLBACK;
        }
    }
}
```

### 7.2rocket消息消费

**消息消费正常会集成到用户服务内实现**

> 在需要消费消费的项目里加上消息消费服务适用RocketMQMessageListener实现

```java
package com.gaogg.shopuser.service;

import com.gaogg.shopcomm.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.ConsumeMode;
import org.apache.rocketmq.spring.annotation.MessageModel;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
//RocketMQMessageListener实现消费端rocketmq注册，consumerGroup消费组名，topic 主题名与生产者主题名一致
@RocketMQMessageListener(
        consumerGroup = "shop_user",
        topic = "orderTopic",
        consumeMode = ConsumeMode.CONCURRENTLY,  //消费模式，指定是否为顺序消费，CONCURRENTLY（默认，同步消费就是无顺序消费），ORSERLY(顺序消费)
        messageModel = MessageModel.CLUSTERING //消息模式，BROADCASTING(广播模式，每个消息可以为每个消费者消费)，CLUSTERING(集群模式，一个消息只能为一个消费者消费)
)
public class SmsService implements RocketMQListener<Order> {
    @Override
    public void onMessage(Order order) {
        log.info("接收到一个订单信息 {},接下来可以发短信通知了 "+order);
    }
}
```

## 8.nacos config统一配置

**使用nacos远程配置属性不能直接在application.yml里配置需要新建一个bootstrap.yaml文件来读取配置**

> 配置文件应用启动加载优先级(从高到低)
>
> bootstrap.properties->bootstrap.yaml->application.properties->application.yaml

### 8.1、nacos config配置文件的引入

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

### 8.2、config远程文件引入

**引入文件分为共享与单个独享**

**nacos config远程配置名，单独子项目独享配置文件命名要求:服务名-环境类型，例如：shop-product-dev.yaml**

**子项目独享配置文件命名:服务名，例如：shop-product.yaml**

<strong style="color:red">跨项目共享配置文件命名：名字随便取没有特殊需求</strong>

```java
spring:
  cloud:
    nacos:
      config:
        group: SHOP_GROUP #组名
        server-addr: 106.55.197.195:18848 #nacosConfig配置服务器地址
        file-extension: yaml  #文件格式
        shared-configs: #添加共享配置信息,数组结构可以添加多个数据。可以读取项目共享配置文件
          - data-id: shopall.yaml #配置文件名 data id
            refresh: true #是否动态刷新，默认是false
            group: SHOP_GROUP #组名，默认是DEFAULT_GROUP
#          - data-id: shopall.yaml #配置文件名 data id
#              refresh: true #是否动态刷新，默认是false
#              group: SHOP_GROUP #组名，默认是DEFAULT_GROUP
  application:
    name: shop-product
#调用哪个配置文件，实现不通环境自动切换
  profiles:
    active: dev #环境标识
```

### 8.3、nacos配置

![image-20220126215540841](.\images\image-20220126215540841.png)

### 8.4、动态刷新远程配置信息

> 有两种方式获取：
>
> ​	1、通过ConfigurableApplicationContext读取配置文件里的参数
>
> ​	2、通过Value注解获取

```java
package com.gaogg.shopproduct.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RefreshScope   //nacos动态刷新
public class NacosConfigController {
    @Autowired
    private ConfigurableApplicationContext applicationContext;
    //通过value标签获取配置文件属性
    @Value("${config.name}")
    private String appName;

    /**
     * 通过ConfigurableApplicationContext读取配置文件里的参数
     * @return
     */
    @RequestMapping("/testConfig1")
    public String testConfig1(){
        //获取配置文件里的config.name的参数值
        return applicationContext.getEnvironment().getProperty("config.name");
    }

    /**
     * 通过Value注解获取配置文件里的参数
     * @return
     */
    @RequestMapping("/testConfig2")
    public String testConfig2(){
        //获取配置文件里的config.name的参数值
        return appName;
    }
}
```

