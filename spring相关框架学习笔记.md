# 框架学习笔记

## 1、spring学习笔记

##### 1)在web项目里需要在web.xml内配置读取spring配置文件及spring监听器

```
<!--spring配置文件加载-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:application*.xml</param-value>
  </context-param>
  <!--spring监听器-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
```

##### 2)spring事务控制配置

###### a、配置事务控制,TransactionManager

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
```

###### b、配置事务增强

xml方式：

```xml
<tx:advice id="txAdvice">
  <tx:attributes>
        <tx:method name="*"/>
   </tx:attributes>
</tx:advice>
```

注解方式配置，需要在xml内配置：

```xml
<!--
    -开启事务控制注解方法增强
    -proxy-target-class设为true代表事务控制方法使用cglib不使用jdk
-->
<tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>

```

###### c、事务的aop植入

XML方式注入：

```xml
<aop:config>
    <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.gaogg.service.Impl.*.*(..))"></aop:advisor>
    </aop:config>
```

注解方式配置：

在需要增强的方法类上面加上

```java
@Transactional注解
```

## 2、springmvc学习笔记

##### 1)在web项目里需要在web.xml内配置springmvc前端控制器

```xml
 <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springMVCConfig.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
```

##### 2）配置乱码拦截器

```xml
 <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

##### 3)springmvc配置

```
<!--MVC扫描组件，主要扫描controller-->
    <context:component-scan base-package="com.gaogg.controller"/>
    <!--mvc注解驱动-->
    <mvc:annotation-driven></mvc:annotation-driven>
    <!--内部资源视图解析器-->
    <bean id="resourceViewResolver"
          class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/page/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    <!--开放静态资源访问权限-->
    <mvc:default-servlet-handler/>
```

## 3、mybatis配置

##### 1）单独mybatis主xml配置

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--数据库配置文件properties文件加载-->
    <properties resource="jdbc.properties"/>
    <typeAliases>
        <!--包别名配置，配置后可以在mapper文件里直接使用别名-->
        <typeAlias type="com.gaogg.domain.User" alias="user"/>
        <typeAlias type="com.gaogg.domain.Role" alias="role"/>
    </typeAliases>
    <!--通过类型拦截器将日期型数据转换成长整形数据保存到数据库-->
    <typeHandlers>
        <typeHandler handler="com.gaogg.util.DateChangeToLong"/>
    </typeHandlers>
    <!--引入三方工具，分页查询工作pagehelper-->
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageHelper">
            <property name="dialect" value="mysql"></property>
        </plugin>
    </plugins>
    <!--environments配置数据库-->
    <!--default="gaoggMybatisTest" 默认获取environment的id-->
    <environments default="gaoggMybatisTest">
        <environment id="gaoggMybatisTest">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/gaogg/mybatis/BlogMapper.xml"/>
        <mapper resource="com/gaogg/mybatis/UserInterfaceGetMapper.xml"/>
        <mapper resource="com/gaogg/mybatis/UsedMapperTypeHandlerMapper.xml"/>
        <mapper resource="com/gaogg/mybatis/OneToOneTablesMapper.xml"/>
<!--        <mapper resource="com/gaogg/mybatis/TranditionMybatisMapper.xml"/>-->
    </mappers>
</configuration>
```

##### 2）ssm整个mybatis主文件配置

配置包别名

```
<typeAliases>
        <!--包别名配置，配置后可以在mapper文件里直接使用别名-->
        <typeAlias type="com.gaogg.domain.User" alias="user"/>
        <typeAlias type="com.gaogg.domain.Role" alias="role"/>
</typeAliases>
```

##### 3）ssm整合spring主文件配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/tx
http://www.springframework.org/schema/tx/spring-tx.xsd
http://www.springframework.org/schema/aop
http://www.springframework.org/schema/aop/spring-aop.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd">

    <!--spring组件扫描，注解开发,排除controller包里的其他组件-->
    <context:component-scan base-package="com.gaogg">
        <!--排除controller的扫描-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
    <!--加载数据库配置文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <!--配置数据库-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!--配置mybatis需要使用麻烦改下的sqlSessionFactory-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <!--加载mybatis配置文件-->
        <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
    </bean>
    <!--扫描mapper所在的包，为mapper创建实现类-->
    <!--从mybatis配置文件中更改为spring托管-->
    <!--
    将mapper配置文件的mappers改为spring托管
    -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.gaogg.dao"/>
    </bean>
    <!--配置实务增强-->
    <!--配置spring平台事务控制-->
    <bean id="transactionManager"
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--配置事务增强-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>
    <!--事务的aop植入-->
    <aop:config>
        <aop:advisor advice-ref="txAdvice"
                     pointcut="execution(* com.gaogg.service.Impl.*.*(..))"></aop:advisor>
    </aop:config>
</beans>
```

##### 4)配置mapper相关xml文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.gaogg.dao.AccountMapper">
    <select id="findAll" resultType="account">
        select * from account;
    </select>
    <insert id="save" parameterType="account">
        insert into account values(#{id},#{name},#{money});
    </insert>
</mapper>
```

## 4、dubbo框架开发与spring整合

##### 1）springxml文件配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/mvc
         http://www.springframework.org/schema/mvc/spring-mvc.xsd
         http://code.alibabatech.com/schema/dubbo
         http://code.alibabatech.com/schema/dubbo/dubbo.xsd
         http://www.springframework.org/schema/context
         http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
    <!--引用properties数据库文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--配置dubbo项目名,名称唯一不可重复，会通过registry同步到中心去服务-->
    <dubbo:application name="dubbodemo_provider"/>
    <!--配置zookeeper服务注册中心-->
    <dubbo:registry address="zookeeper://152.136.116.40:2181"/>
    <!--配置dubbo启动的协议与端口，只有server项目需要配置-->
    <dubbo:protocol name="dubbo" port="20881"/>
    <!--扫描指定的包加入，@service注解会自动发布成服务-->
    <dubbo:annotation package="com.gaogg.service.Impl"/>
    <!--引用durid数据库控制插件控制数据库-->
    <!--
    -事务控制，方法增强
    -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--
    -开启事务控制注解方法增强
    -proxy-target-class设为true代表事务控制方法使用cglib不使用jdk
    -->
    <tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>
</beans>
```

##### 2)事务控制注意事项

​	a、如果需要事务控制时只能使用cglib事务控制，不能使用jdk事务控制，同时需要在被增强方法的地方指定方法的返回类型通过dubbo的service的interfaceClass = HelloService.class来指定；

​	b、loadbalance 属性是设置负载均衡的方法；

## 5、spring data jpa

### 1）JPA测试

###### a、测试项目配置文件persistence.xml

在META-INF目录下面创建persistence.xml文件

JPA测试实现使用的是hirbernate所以要调用

<provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence" version="2.0">
    <persistence-unit name="jpaContext" transaction-type="RESOURCE_LOCAL">
        <!--jpa的实现方式--> <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
        <!--
        数据库实现
        用户名：javax.persistence.jdbc.user
        密码：javax.persistence.jdbc.password
        驱动：javax.persistence.jdbc.driver
        数据库地址:javax.persistence.jdbc.url
        -->
        <properties>
            <property name="javax.persistence.jdbc.user" value="root"/>
            <property name="javax.persistence.jdbc.password" value="a"/>
            <property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver"/>
            <property name="javax.persistence.jdbc.url"
                      value="jdbc:mysql://152.136.116.140:3506/mssstudy"/>
            <!--
            可选配置：配置jpa实现的配置信息
            是否显示sql: hibernate.show_sql, false|true
            自动创建数据库表： hibernate.hbm2ddl.auto
                            create  :   程序运行时创建数据表，如果有表先删除表再创建
                            update  :   程序运行时创建数据表，如果有表不会创建
                            none    :   不会创建表
            -->
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.hbm2ddl.auto" value="update"/>
        </properties>
        
    </persistence-unit>
</persistence>
```

###### b、实体类与数据库表关联关系

```java
package com.gaogg.domain;

import javax.persistence.*;

/**
 * 客户的实体类
 *  配置映射关系
 *      1、实体类与表的映射关系
 *      2、实体类变量与表字段的映射关系
 *    @Entity : 声明实体类
 *    @Table    ：实体类与表的映射关系 ，name = "cst_customer" ，cst_customer表名
 */
@Entity
@Table(name = "cst_customer")
public class Customer {
    /*
    * @Id创建主键
    * @GeneratedValue 主键值生成策略， 自增GenerationType.AUTO
    * @Column 实体类变量与表字段的映射关系，name = "cust_id" cust_id表字段
    * */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cust_id")
    private Long custId;
    @Column(name="cust_name")
    private String custName;
    @Column(name="cust_source")
    private String custSource;
    @Column(name="cust_industry")
    private String custIndustry;
    @Column(name="cust_level")
    private String custLevel;
    @Column(name="cust_address")
    private String custAddress;
    @Column(name="cust_phone")
    private String custPhone;

    public Long getCustId() {
        return custId;
    }
    public void setCustId(Long custId) {
        this.custId = custId;
    }
    public String getCustName() {
        return custName;
    }
    public void setCustName(String custName) {
        this.custName = custName;
    }
    public String getCustSource() {
        return custSource;
    }
    public void setCustSource(String custSource) {
        this.custSource = custSource;
    }
    public String getCustIndustry() {
        return custIndustry;
    }
    public void setCustIndustry(String custIndustry) {
        this.custIndustry = custIndustry;
    }
    public String getCustLevel() {
        return custLevel;
    }
    public void setCustLevel(String custLevel) {
        this.custLevel = custLevel;
    }
    public String getCustAddress() {
        return custAddress;
    }
    public void setCustAddress(String custAddress) {
        this.custAddress = custAddress;
    }
    public String getCustPhone() {
        return custPhone;
    }
    public void setCustPhone(String custPhone) {
        this.custPhone = custPhone;
    }
}
```

###### c、测试类的编写

```
package com.gaogg.test;

import com.gaogg.domain.Customer;
import org.junit.Test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class JpaTest {
    @Test
    public void saveTest(){
        //1、通过persistence.xml文件里配置的persistence-unit name来获取初始化实例工厂对象
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("jpaContext");
        //通过实例化工厂对象创建工厂管理器
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        //获取事务对象，开启事务
        EntityTransaction entityTransaction = entityManager.getTransaction();
        entityTransaction.begin();
        Customer customer=new Customer();
        customer.setCustName("gaogg");
        customer.setCustAddress("nanjing");
        customer.setCustIndustry("news");
        customer.setCustSource("internet");
        customer.setCustPhone("110");
        //保存
        entityManager.persist(customer);
        //提交事务
        entityTransaction.commit();
        //释放资源
        entityManager.close();
        entityManagerFactory.close();
    }
}
```

###### d、jpa数据库操作方法：

```
//保存insert
entityManager.persist(customer);
//查询分及时查询与异步查询
//实时查询
entityManager.find(Customer.class, 1l)；
//异步查询
entityManager.find(Customer.class, 1l);
//merge修改前需先查询再修改
entityManager.merge(customer);
//remove先查询再删除
entityManager.remove(customer);
```

### 2）jpql语句查询

jpql语句查询全部，倒序排序，查询总量，分页查询及条件查询。

```
EntityManager entityManager = PersistenceUtil.getEntityManager();
EntityTransaction entityTransaction = entityManager.getTransaction();
entityTransaction.begin();
/*
*   jpql 语句类似sql语句，只是查询的是类相关
*
*   getResultList查询结果集，结果是个list返回
*
*   getSingleResult查询唯一结果集
* */
String jpql="from com.gaogg.domain.Customer order by custId desc ";
Query query = entityManager.createQuery(jpql);
List resultList = query.getResultList();
for (Object o : resultList) {
System.out.println(o);
}
/*
*   getSingleResult查询唯一结果集
* */
jpql="select count(custId) from Customer";
Query query1 = entityManager.createQuery(jpql);
Object singleResult = query1.getSingleResult();
System.out.println(singleResult);
/*
*   setFirstResult设置分页开始条数
*   setMaxResults设置每页显示条数
* */
jpql="from Customer";
Query query2 = entityManager.createQuery(jpql);
query2.setFirstResult(0);
query2.setMaxResults(1);
List resultList1 = query2.getResultList();

for (Object o : resultList1) {
System.out.println(o);
}
/*
*   setParameter 设置jpql里占位符数据。第一个参数，表示占位符索引（从1开始），第二个参数表示占位符取值
* */
jpql="from Customer where custId=?";
Query query3 = entityManager.createQuery(jpql);
query3.setParameter(1,3l);
List resultList2 = query3.getResultList();
for (Object o : resultList2) {
System.out.println(o);
}

entityTransaction.commit();
entityManager.close();
```

### 3）spring data jpa jpql&sql查询单表查询

###### a、xml配置

（1）spring xml配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:jdbc="http://www.springframework.org/schema/jdbc" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:jpa="http://www.springframework.org/schema/data/jpa" xmlns:task="http://www.springframework.org/schema/task"
       xsi:schemaLocation="
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
		http://www.springframework.org/schema/data/jpa
		http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">
    <!--获取数据库配置文件jdbc.properties-->
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <!--配置数据库信息-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--配置jpa-->
    <bean id="entityManagerFactoryBean"
          class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
        <!--配置数据库-->
        <property name="dataSource" ref="dataSource"/>
        <!--扫描jpa相关实体类所在路径-->
        <property name="packagesToScan" value="com.gaogg.domain"/>
        <!--
        -配置jpa实现厂家
        -//类似META-INF/persistence.xml里的<provider>org.hibernate.jpa
        .HibernatePersistenceProvider</provider>
        -->
        <property name="persistenceProvider">
            <bean class="org.hibernate.jpa.HibernatePersistenceProvider"></bean>
        </property>

        <!--JPA的供应商适配器-->
        <property name="jpaVendorAdapter">
            <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
                <!--配置是否自动创建数据库-->
                <property name="generateDdl" value="false"/>
                <!--配置数据库类型-->
                <property name="database" value="MYSQL"/>
                <!--数据库方言：支持的特有语法-->
                <property name="databasePlatform" value="org.hibernate.dialect.MySQLDialect"/>
                <!--配置sql是否显示-->
                <property name="showSql" value="true"/>
            </bean>
        </property>
        <!--配置jpa方言-->
        <property name="jpaDialect">
            <bean class="org.springframework.orm.jpa.vendor.HibernateJpaDialect"/>
        </property>
        <!--
            注入jpa的配置信息
                加载jpa的基本配置信息和jpa实现方式的配置信息
                hibernate.hbm2ddl.auto:自动创建数据库表
                    create  :   删除表重新创建
                    update  :   有表就不重新创建
                    none    :   不重新创建表
        -->
        <property name="jpaProperties">
            <props>
                <prop key="hibernate.hbm2ddl.auto">update</prop>
            </props>
        </property>
    </bean>
    <!--整合spring data jpa-->
    <jpa:repositories base-package="com.gaogg.dao" transaction-manager-ref="transantionManager"
                       entity-manager-factory-ref="entityManagerFactoryBean">
    </jpa:repositories>
    <!--配置jpa拦截器-->
    <bean id="transantionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="entityManagerFactory" ref="entityManagerFactoryBean"/>
    </bean>
    <!--spring包扫描-->
    <context:component-scan base-package="com.gaogg"/>
</beans>
```

(2)pom xml配置

```xml
  <properties>
    <spring.version>4.2.4.RELEASE</spring.version>
    <hibernate.version>5.0.7.Final</hibernate.version>
    <slf4j.version>1.6.6</slf4j.version>
    <log4j.version>1.2.12</log4j.version>
    <c3p0.version>0.9.1.2</c3p0.version>
    <mysql.version>5.1.6</mysql.version>
  </properties>

  <dependencies>
    <!-- junit单元测试 -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.9</version>
      <scope>test</scope>
    </dependency>

    <!-- spring beg -->
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjweaver</artifactId>
      <version>1.6.8</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context-support</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-orm</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!-- spring end -->

    <!-- hibernate beg -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>${hibernate.version}</version>
    </dependency>
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-entitymanager</artifactId>
      <version>${hibernate.version}</version>
    </dependency>
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>5.2.1.Final</version>
    </dependency>
    <!-- hibernate end -->

    <!-- c3p0 beg -->
    <dependency>
      <groupId>c3p0</groupId>
      <artifactId>c3p0</artifactId>
      <version>${c3p0.version}</version>
    </dependency>
    <!-- c3p0 end -->

    <!-- log end -->
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>${log4j.version}</version>
    </dependency>

    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>${slf4j.version}</version>
    </dependency>

    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
      <version>${slf4j.version}</version>
    </dependency>
    <!-- log end -->


    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.version}</version>
    </dependency>

    <!-- el beg 使用spring data jpa 必须引入 -->
    <dependency>
      <groupId>org.springframework.data</groupId>
      <artifactId>spring-data-jpa</artifactId>
      <version>1.9.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>javax.el</groupId>
      <artifactId>javax.el-api</artifactId>
      <version>2.2.4</version>
    </dependency>

    <dependency>
      <groupId>org.glassfish.web</groupId>
      <artifactId>javax.el</artifactId>
      <version>2.2.4</version>
    </dependency>
    <!-- el end -->
  </dependencies>
```



###### b、dao文件编写(CustomerSQLDao.class)

```spring data jpa
public interface CustomerSQLDao extends JpaRepository<Customer,Long>,JpaSpecificationExecutor<Customer> {
    /*
        Query表示查询
            nativeQuery ：   true为Sql语句 / false表示jpaql语句


     */
    @Modifying
    @Query(nativeQuery = true,value = "select * from cst_customer where cust_id=?")
    public List<Customer> findCustomer(long custId);

    /**
     *
     * @Rollback 是否自动回滚
     * @Query 查询语句
     * @Modifying 更新语句时query必须配合Modifying使用
     */
    @Modifying
    @Query(nativeQuery = true,value = "update cst_customer set cust_address=?,cust_source=?  " +
            "where cust_id=?")
    @Transactional
    @Rollback(value = false)
    public void updateCustomer(String custaddress,String custsource,Long id);

    @Query(nativeQuery = false,value = "from Customer where custId=? ")
    public Customer findById(Long id);
}
```

###### c、daomain文件编写(Customer.class)

```java
/**
 * @Entitys 申明实体类
 *
 */
@Entity
@Table(name="cst_customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_id")
    private Long custId;//客户编号(主键)
    @Column(name="cust_name")
    private String custName;//客户名称(公司名称)
    @Column(name="cust_source")
    private String custSource;//客户信息来源
    @Column(name = "cust_industry")
    private String custIndustry;//客户所属行业
    @Column(name = "cust_level")
    private String custLevel;//客户级别
    @Column(name = "cust_address")
    private String custAddress;//客户联系地址
    @Column(name="cust_phone")
    private String custPhone;//客户联系电话
    
    public Long getCustId() { return custId; }
    public void setCustId(Long custId) { this.custId = custId; }
    public String getCustName() { return custName; }
    public void setCustName(String custName) { this.custName = custName; }
    public String getCustSource() { return custSource; }
    public void setCustSource(String custSource) { this.custSource = custSource; }
    public String getCustIndustry() { return custIndustry; }
    public void setCustIndustry(String custIndustry) { this.custIndustry = custIndustry; }
    public String getCustLevel() { return custLevel; }
    public void setCustLevel(String custLevel) { this.custLevel = custLevel; }
    public String getCustAddress() { return custAddress; }
    public void setCustAddress(String custAddress) { this.custAddress = custAddress; }
    public String getCustPhone() { return custPhone; }
    public void setCustPhone(String custPhone) { this.custPhone = custPhone; }
    @Override
    public String toString() { return "Customer{" + "custId=" + custId + ", custName='" + custName + '\'' + ", custSource='" + custSource + '\'' + ", custIndustry='" + custIndustry + '\'' + ", custLevel='" + custLevel + '\'' + ", custAddress='" + custAddress + '\'' + ", custPhone='" + custPhone + '\'' + '}'; }
}
```

###### d、spring data jpa执行过程分析

（1）通过JDKDynamicAopProxy创建动态代理对象-->动态代理对象simpleJpaRepository-->执行方法findall之类的再通过entityManager完成查询；

（2）simpleJpaRepository是dao层方法实现JpaRepository，JpaspecificationExecutor接口，接口里对基础操作都进行也封装。通过jpa规范去获取数据。

（3）entityManager是在spring配置文件里配置，对base-package内容包进行了动态代理方法增强。

```
<jpa:repositories base-package="com.gaogg.dao" transaction-manager-ref="transantionManager"
                       entity-manager-factory-ref="entityManagerFactoryBean">
    </jpa:repositories>
```

###### e、JpaSpecificationExecutor动态查询

基础配置与jpql与sql的配置是一样的，在最后查询方法时实现Specification方法

```java
public void customerTest(){
    /**
    * 自定义查询条件
    *  1、实现Specification接口（提供泛型：查询的对象类型）
    *  2、实现toPredicate方法（构建查询条件）
    *  3、需要借助方法参数中的两个参数（
    *      root：获取需要查询的对象属性
    *      criteriaBuilder：构造查询条件的，内容封装了很多的查询条件（模糊匹配，精准匹配）
    *  ）
    */
    Specification<Customer> specification=new Specification<Customer>() {
    public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
    Path<Object> custId1 = root.get("custName");
    Predicate equal = criteriaBuilder.equal(custId1,"gao");
    return equal;
    }
    };
    //单个查询
    Customer one = customerJpaSpecificationExecutorDao.findOne(specification);
    //对id排序查询 Sort设置排序信息
    Sort sort=new Sort(Sort.Direction.DESC,"custId");
        List<Customer> all = customerJpaSpecificationExecutorDao.findAll(specification, sort);
    //分页查询 Pageable设置分页信息
    Pageable pageable=new PageRequest(0,2);
        Page<Customer> all = customerJpaSpecificationExecutorDao.findAll(specification, pageable);
    System.out.println(one);
}
```



### 4）多表查询

###### 1、一对多

a、需要使用oneToMany绑定关系，主表不放弃外键的维护就需要使用targetEntity属性配置对方字节码；

b、因为有外键的存在表的删除必须使用级联在oneToMany配置cascade属性；

c、外键属性的配置JoinColumn ：name配置数据表外键名，referencedColumnName：参照的主表的主键字段名；

d、如果不想出现数据插入后外键的更新有update操作就将外键的维护权放在多表中，在多表中使用set方法将1表内的数据插入到多表后进行更新。

Customer.class

```java
@Entity
@Table(name = "cst_customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_id")
    private Long custId;
    @Column(name = "cust_name")
    private String custName;
    @Column(name = "cust_source")
    private String custSource;
    @Column(name = "cust_industry")
    private String custIndeustry;
    @Column(name = "cust_level")
    private String custLevel;
    @Column(name = "cust_address")
    private String custAddress;
    @Column(name = "cust_phone")
    private String custPhone;
    //配置客户与联系人之间的关系（一对多关系）
    /**
     * 1、声明关系
     * OneToMany:一对多关系
     *  targetEntity：对方对象的字节码对象
     *  cascade:级联操作
     *  2、配置外键
     *  JoinColumn：配置外键
     *     name：数据表外键字段名
     *     referencedColumnName：参照的主表的主键字段名
     *
     *  在客户实体类上（-对一方）添加外键配置，所以对客户而言也具备维护外键的作用，
     *
     *  如果不想有个update数据库的2次操作将一对多的外键维护放置在多的一方
     *  多对多表外键的维护权是在主动的那一方，被动一方放弃维护权
     *
     *  放弃外键维护后必须将一表的OneToMany--targetEntity改为OneToMany--mappedBy
     *
     *  mappedBy取值为多表的对应字节码方法里配置的属性名
     *
     */
   /* @OneToMany(targetEntity = CustLinkMan.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "lkm_cust_id",referencedColumnName = "cust_id")*/
    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    private Set<CustLinkMan> custLinkMans=new HashSet<CustLinkMan>();

    public Long getCustId() {
        return custId;
    }

    public void setCustId(Long custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustSource() {
        return custSource;
    }

    public void setCustSource(String custSource) {
        this.custSource = custSource;
    }

    public String getCustIndeustry() {
        return custIndeustry;
    }

    public void setCustIndeustry(String custIndeustry) {
        this.custIndeustry = custIndeustry;
    }

    public String getCustLevel() {
        return custLevel;
    }

    public void setCustLevel(String custLevel) {
        this.custLevel = custLevel;
    }

    public String getCustAddress() {
        return custAddress;
    }

    public void setCustAddress(String custAddress) {
        this.custAddress = custAddress;
    }

    public String getCustPhone() {
        return custPhone;
    }

    public void setCustPhone(String custPhone) {
        this.custPhone = custPhone;
    }

    @Override
    public String toString() {
        return "Customer{" + "custId=" + custId + ", custName='" + custName + '\'' + ", custSource='" + custSource + '\'' + ", custIndeustry='" + custIndeustry + '\'' + ", custLevel='" + custLevel + '\'' + ", custAddress='" + custAddress + '\'' + ", custPhone='" + custPhone + '\'' + '}';
    }
}
```

CusLinkMan.class

```java
@Entity
@Table(name = "cst_linkman")
public class CustLinkMan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="lkm_id")
    private Long lkmId;
    @Column(name ="lkm_name")
    private String lkmName;
    @Column(name ="lkm_gender")
    private String lkmGender;
    @Column(name ="lkm_phone")
    private String lkmPhone;
    @Column(name ="lkm_mobile")
    private String lkmMobile;
    @Column(name ="lkm_position")
    private String lkmPosition;
    @Column(name ="lkm_email")
    private String lkmEmail;
    @Column(name ="lkm_memo")
    private String lkmMemo;
    @ManyToOne(targetEntity = Customer.class)
    @JoinColumn(name = "lkm_cust_id",referencedColumnName = "cust_id")
    private Customer customer;

    public Long getLkmId() {
        return lkmId;
    }

    public void setLkmId(Long lkmId) {
        this.lkmId = lkmId;
    }

    public String getLkmName() {
        return lkmName;
    }

    public void setLkmName(String lkmName) {
        this.lkmName = lkmName;
    }

    public String getLkmGender() {
        return lkmGender;
    }

    public void setLkmGender(String lkmGender) {
        this.lkmGender = lkmGender;
    }

    public String getLkmPhone() {
        return lkmPhone;
    }

    public void setLkmPhone(String lkmPhone) {
        this.lkmPhone = lkmPhone;
    }

    public String getLkmMobile() {
        return lkmMobile;
    }

    public void setLkmMobile(String lkmMobile) {
        this.lkmMobile = lkmMobile;
    }

    public String getLkmPosition() {
        return lkmPosition;
    }

    public void setLkmPosition(String lkmPosition) {
        this.lkmPosition = lkmPosition;
    }

    public String getLkmEmail() {
        return lkmEmail;
    }

    public void setLkmEmail(String lkmEmail) {
        this.lkmEmail = lkmEmail;
    }

    public String getLkmMemo() {
        return lkmMemo;
    }

    public void setLkmMemo(String lkmMemo) {
        this.lkmMemo = lkmMemo;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "CustLinkMan{" + "lkmId=" + lkmId + ", lkmName='" + lkmName + '\'' + ", lkmGender='" + lkmGender + '\'' + ", lkmPhone='" + lkmPhone + '\'' + ", lkmMobile='" + lkmMobile + '\'' + ", lkmPosition='" + lkmPosition + '\'' + ", lkmEmail='" + lkmEmail + '\'' + ", lkmMemo='" + lkmMemo + '\'' + ", customer=" + customer + '}';
    }
```

测试代码

```java
    @Test
    @Transactional
    @Rollback(value = false)
    public void oneToManyTest(){
        Customer customer = new Customer();
        CustLinkMan custLinkMan = new CustLinkMan();
        //保存
        customer.setCustName("gaogg");
        custLinkMan.setLkmName("lisi");
        custLinkMan.setCustomer(customer);
        customerDao.save(customer);
        cusLinkManDao.save(custLinkMan);
        //删除
        Customer one = customerDao.findOne(3l);
        customerDao.delete(one);
    }
```

###### 2、多对多

与一对多基本配置一样，只有在关系配置时有所区别。多对多配置是被查表放弃外键维护及级联。

从表配置

```
@ManyToMany(targetEntity = CustLinkMan.class,cascade = CascadeType.ALL)
    @JoinTable(
            //多对多关系数据库表名
            name = "sys_user_role",
            //joinColumns,当前表与多对多中间表中的外键
            joinColumns = {@JoinColumn(name="sys_user_id",referencedColumnName = "cust_id")},
            //inverseJoinColumns，对方表与多对多中间表中的外键
            inverseJoinColumns = {@JoinColumn(name="sys_role_id",referencedColumnName = "role_id")}
    )
```

主表配置

```
@ManyToMany(mappedBy = "roles",cascade = CascadeType.ALL)
    @JoinTable(
            //多对多关系数据库表名
            name = "sys_user_role",
            //joinColumns,当前表与多对多中间表中的外键
            joinColumns = {@JoinColumn(name="sys_role_id",referencedColumnName = "role_id")},
            //inverseJoinColumns，对方表与多对多中间表中的外键
            inverseJoinColumns = {@JoinColumn(name="sys_user_id",referencedColumnName = "cust_id")}
    )
```

### 5）对象导航查询

导航查询通过查询对象的内部get方法获取出关联对象的数据；

```
@OneToMany(mappedBy = "customer",fetch = FetchType.EAGER)
```

FetchType.LAZY	:	一对多时默认是延迟加载；

FetchType.EAGER	:	多对多时默认是立即加载；

```java
 public void oneToManyTest(){
     Customer customer = new Customer();
     Customer one = customerDao.findOne(4l);
     System.out.println(one);
     Set<CustLinkMan> custLinkMans = one.getCustLinkMans();
     for (CustLinkMan linkMan : custLinkMans) {
     System.out.println(linkMan);
}
```

## 6、spring boot

![image-20210222144547222](images\image-20210222144547222.png)

### 6.1SpringBoot项目

#### 6.1.1创建项目引导类

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;
/**
 * 继承SpringBootConfiguration，EnableAutoConfiguration，ComponentScan
 * SpringBootConfiguration继承了spring的configuration注解，声明注解的此类为配置类，spring容器会在这里寻找bean配置初始化的参数
 * EnableAutoConfiguration自动配置，猜测你要用做什么开发，如你在pom里面导入spring-boot-starter-web包，他对自动给你导入相应的web工程必备包，减去了自己导入包的麻烦
 * ComponentScan可以配置注解扫描的包
 */
@SpringBootApplication
//扫描mapper包，这边使用的是通用mybatis包
@MapperScan(value = "com.gaogg.mapper")
public class UserServiceDemo {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceDemo.class, args);
    }
}
```

#### 6.1.2application.yml配置

```yaml
server:
  port: 9091
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springcloud
    username: root
    password: root
mybatis:
  type-aliases-package: com.gaogg.pojo
```

#### 6.1.3mapper类及用户类配置

> pojo类：

```java
import lombok.Data;
import tk.mybatis.mapper.annotation.KeySql;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
@Data
@Table(name = "tb_user")
public class User{
    // id
    @Id
    //开启主键自动回填
    @KeySql(useGeneratedKeys = true)
    private Long id;
    // 用户名
    private String userName;
    // 密码
    private String password;
    // 姓名
    private String name;
    // 年龄
    private Integer age;
    // 性别，1男性，2女性
    private Integer sex;
    // 出生日期
    private Date birthday;
    // 创建时间
    private Date created;
    // 更新时间
    private Date updated;
    // 备注
    private String note;
}
```

> mapper文件

```java
public interface UserMapper extends Mapper<User> {}
```

> service方法

```java
import com.gaogg.mapper.UserMapper;
import com.gaogg.pojo.User;
import com.gaogg.service.SelectById;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SelectByIdImpl implements SelectById {
    @Autowired
    UserMapper userMapper;
    @Override
    /**
     * 根据主键查询用户
     * @param id 用户名
     * @return  用户数据
     */
    public User selectUserById(long id) {
        return userMapper.selectByPrimaryKey(id);
    }
}
```

> collocet方法

```java
@RestController
@RequestMapping(method = RequestMethod.GET,value = "/user")
public class UserColloter {
    @Autowired
    private SelectByIdImpl selectById;
    @RequestMapping(value = "/selectId")
   // @RequestMapping(value = "/selectId/{id}")
    //使用PathVariable获取路径变量id
    //public User selectUserById(@PathVariable Long id)
    public User selectUserById(@RequestParam("userId") Long id) {
        User user = selectById.selectUserById(id);
        System.out.println(user);
        return user;
    }
}
```

### 6.2.1spring boot集成rabbitMQ

#### 6.2.1.1、生产者项目

##### 6.2.1.1.1、pox.xml内配置依赖脚手架

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

##### 6.2.1.1.2、application.yml RabbitMQ信息配置

```yaml
spring:
  rabbitmq:
    host: ip
    port: 5672
    password: 密码
    username: 账号
    virtual-host: 虚拟机名
```

##### 6.2.1.1.3、创建rabbitmq配置方法类

```java
@Configuration
public class RabbitMQConfig {
    //交换机名
    public static final String GAO_TOPIC_EXCHANGE="gao_topic_exchage";
    //队列名
    public static final String GAO_TOPIC_QUEUE="gao_topic_queue";
    //声名交换机
    @Bean(value = "topicExchange")
    public Exchange topicExchange(){
        //durable设置持久标记
        return ExchangeBuilder.topicExchange(GAO_TOPIC_EXCHANGE).durable(true).build();
    }
    //声明队列
    @Bean(value = "topicQueue")
    public Queue topicQueue(){
        return QueueBuilder.durable(GAO_TOPIC_QUEUE).build();
    }
    //将队列绑定到交换机
    @Bean
    public Binding queueBindingExchange(@Qualifier("topicExchange")Exchange exchange,
                                        @Qualifier("topicQueue")Queue queue){
        //绑定队列与交换机并且申明路由key为以gao开头的所有路由gao#,noargs不指定其他参数
        return BindingBuilder.bind(queue).to(exchange).with("gao.#").noargs();
    }
    @Bean
    public Binding queueBindingExchange2(@Qualifier("topicExchange")Exchange exchange,
                                        @Qualifier("topicQueue")Queue queue){
        //绑定队列与交换机并且申明路由key为以gao开头的所有路由gao#,noargs不指定其他参数
        return BindingBuilder.bind(queue).to(exchange).with("a.#").noargs();
    }
}
```

##### 6.2.1.1.4、编写测试方法

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class DemoApplicationTests {
    @Autowired
    public RabbitTemplate rabbitTemplate;
    @Test
    public void contextLoads() {
	rabbitTemplate.convertSendAndReceive(RabbitMQConfig.GAO_TOPIC_EXCHANGE,"gao.insert",
                "商品新增，路由key为gao.insert");
	rabbitTemplate.convertSendAndReceive(RabbitMQConfig.GAO_TOPIC_EXCHANGE,"gao.update",
                "商品更新，路由key为gao.update");
	rabbitTemplate.convertSendAndReceive(RabbitMQConfig.GAO_TOPIC_EXCHANGE,"gao.delete",
                "商品删除，路由key为gao.update");
        	rabbitTemplate.convertSendAndReceive(RabbitMQConfig.GAO_TOPIC_EXCHANGE,"a.gao.delete",
                "a商品删除，路由key为a.gao.update");
    }
}
```

#### 6.2.1.2、消费者项目

##### 6.2.1.2.1、pox.xml内配置依赖脚手架

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

##### 6.2.1.2.2、application.yml RabbitMQ信息配置

```yaml
spring:
  rabbitmq:
    host: ip
    port: 5672
    password: 密码
    username: 账号
    virtual-host: 虚拟机名
```

##### 6.2.1.2.3、创建rabbitmq消费者方法

```java
@Component
public class MyListener {
    /**
     * 接受队列消息
     * @param messages 接受到的消息
     * @RabbitListener 获取消费者消息注解，queues配置一个或多个路由queues={“a","b"},如果是单个拦截器主浊queues=“a”;
     */
    @RabbitListener(queues = "gao_topic_queue")
    public void myListener1(String messages){
        System.out.println("消费者接受到的消息是:"+messages);
    }
}
```

## 7.spring Cloud

### 7.1注册中心Eureka

#### 7.1.1Eureka server创建

##### 1、导入依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

##### 2、写配置

###### 单机

``` yaml
server:
  #port: 10086从系统中获取变量名为port的值如果没有默认值10086
  port: ${port:10086}
spring:
  application:
    name: eureka-demo
eureka:
  client:
    service-url:
      #eureka服务地址,如果集群此处填写其他集群服务器的地址同时配置上/eureka
      #defaultZone变量名可自己配置
      #defaultZone: ${defaultZone:http://127.0.0.1:10086/eureka}
      defaultZone: http://127.0.0.1:10086/eureka
    #集群状态时需要在eureka后台将本机注册让其他集群服务器看到，并且拉取到
#    #不拉取服务
    fetch-registry: false
#    #eureka将自己注册到eureka注册中心显示出来；
#    #默认是需要true，集群时就需要显示让其他eureka服务器看到；
#    #单机时需要改成false不需要。
    register-with-eureka: false
  server:
    #失效剔除时间时间间隔，默认是60秒，此属性单位是毫秒
    eviction-interval-timer-in-ms:  60000
    #关闭自我保护模式（默认是打开的）
    enable-self-preservation: false
```

###### 多机高可用负载

> application.yaml

``` yaml
server:
  #port: 10086从系统中获取变量名为port的值如果没有默认值10086
  port: ${port:10086}
spring:
  application:
    name: eureka-demo
eureka:
  client:
    service-url:
      #eureka服务地址,如果集群此处填写其他集群服务器的地址同时配置上/eureka
      #defaultZone变量名可自己配置
      defaultZone: ${defaultZone:http://127.0.0.1:10086/eureka}
```

> idea启动器配置
>
> 配置多个eureka启动器，分别指定端口与地址例如
>
> -Dport=10087 -DdefaultZone=http://127.0.0.1:10086/eureka
>
> -Dport=10086 -DdefaultZone=http://127.0.0.1:10087/eureka

![image-20210330220332947](.\images\image-20210330220332947.png)

##### 3、写启动引导类并添加Eureka注解

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
#Eureka服务注册
@EnableEurekaServer
@SpringBootApplication
public class EurekaDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaDemoApplication.class, args);
    }
}
```

##### 4、失效剔除及自我保护

此属性为通用属性，单机及多机均可配置

>   server:
>     #失效剔除时间时间间隔，默认是60秒，此属性单位是毫秒
>     eviction-interval-timer-in-ms:  60000
>     #关闭自我保护模式（默认是打开的）
>     enable-self-preservation: false

> 自我保护解决下图问题

![image-20210330225947924](.\images\image-20210330225947924.png)

##### 5、启动测试

``` shell
http://127.0.0.1:10086/
```

#### 7.1.2Eureka client创建

##### 7.1.2.1 Eureka client server

###### 1、导入依赖

```xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

###### 2、写配置

>默认注册时使用的是主机名或者localhost,如果想用ip进行注册可以在user-service里添加如下配置:
>    #开启ip地址显示，更倾向ip，不是localhost
>   eureka:
>
>instance:
>
>​	prefer-ip-address: true
>​    #ip地址
>​    eureka:
>
>instance:
>
>​	ip-address:  127.0.0.1

> 服务续约:
>
> ```
> eureka:
>   instance:
>     #服务失效时间，默认时间为90s，如果再次注册后还没有使用到了设定失效时间后会从eureka内清出，此属性还需配合注册服务器端服务失效剔除时间（eviction-interval-timer-in-ms）配合使用
>     #要不拒即使服务失效时间到了也不会在注册中心清理
>     lease-expiration-duration-in-seconds: 10
>     #服务续约(renew)的间隔时间，默认为30s,如果30s内无人使用会再次注册
>     lease-renewal-interval-in-seconds: 10
> ```
>

> 单机

``` yaml
server:
  port: 9091
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://1.15.71.35:13306/springcloud
    username: root
    password: Ab00859567c!
  #定义项目名
  application:
    name: user-service-demo
mybatis:
  type-aliases-package: com.gaogg.pojo
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    #开启ip地址显示，更倾向ip，不是localhost
    prefer-ip-address: true
    #ip地址
    ip-address: 127.0.0.1
    #服务失效时间，默认时间为90s，如果再次注册后还没有使用到了设定失效时间后会从eureka内清出，此属性还需配合注册服务器端服务失效剔除时间（eviction-interval-timer-in-ms）配合使用
    #要不拒即使服务失效时间到了也不会在注册中心清理
    lease-expiration-duration-in-seconds: 10
    #服务续约(renew)的间隔时间，默认为30s,如果30s内无人使用会再次注册
    lease-renewal-interval-in-seconds: 10
```

###### 3、写启动引导类并添加Eureka注解

> 必须使用@EnableDiscoveryClient注解在启动类上开启eureka客户端发现功能

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * 继承SpringBootConfiguration，EnableAutoConfiguration，ComponentScan
 * SpringBootConfiguration继承了spring的configuration注解，声明注解的此类为配置类，spring容器会在这里寻找bean配置初始化的参数
 * EnableAutoConfiguration自动配置，猜测你要用做什么开发，如你在pom里面导入spring-boot-starter-web包，他对自动给你导入相应的web工程必备包，减去了自己导入包的麻烦
 * ComponentScan可以配置注解扫描的包
 */
@SpringBootApplication
//扫描mapper包，这边使用的是通用mybatis包
@MapperScan(value = "com.gaogg.mapper")
//开启eureka客户发现功能
@EnableDiscoveryClient
public class UserServiceDemo {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceDemo.class, args);
    }
}
```

##### 7.1.2.2 Eureka client Comsumer

###### 1、导入依赖

```xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

###### 2、写配置

> 配置获取服务列表时间
>
> #服务列表获取时间，默认是30s,fetch-registry: true会从eureka服务的列表拉取只读备份，然后缓存到本地，并且按设定的时间去重新拉取并更新数据
>
> registry-fetch-interval-seconds: 10

``` yaml
spring:
  application:
    name: consumer-demo

eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
      #服务列表获取时间，默认是30s,拉取服务,默认为true，fetch-registry: true会从eureka服务的列表拉取只读备份，然后缓存到本地，并且按设定的时间去重新拉取并更新数据
    registry-fetch-interval-seconds: 10
```

###### 3、写启动引导类并添加Eureka注解

> 必须使用@EnableDiscoveryClient注解在启动类上开启eureka客户端发现功能

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * 继承SpringBootConfiguration，EnableAutoConfiguration，ComponentScan
 * SpringBootConfiguration继承了spring的configuration注解，声明注解的此类为配置类，spring容器会在这里寻找bean配置初始化的参数
 * EnableAutoConfiguration自动配置，猜测你要用做什么开发，如你在pom里面导入spring-boot-starter-web包，他对自动给你导入相应的web工程必备包，减去了自己导入包的麻烦
 * ComponentScan可以配置注解扫描的包
 */
@SpringBootApplication
//开启eureka客户发现功能
@EnableDiscoveryClient
public class ConsumerDemo {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerDemo.class, args);
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

###### 4、编写controller方法类

```java
@RestController
@RequestMapping(value = "/consumer")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @RequestMapping(value = "/findone")
    public User selectById(@RequestParam(name="id") Long id){
        String url="";
        //通过服务id获取eureke实例
        List<ServiceInstance> instancesById = discoveryClient.getInstances("user-service-demo");
        ServiceInstance serviceInstance = instancesById.get(0);
        url="http://"+serviceInstance.getHost()+":"+serviceInstance.getPort()+"/user/selectId" +
                "?userId="+id;
        User forObject = restTemplate.getForObject(url, User.class);
        return forObject;
    }
}
```

### 7.2 Ribbon负载均衡

#### Eureka client server配置多台服务器

> ribbon具有轮询与随机二种负载均衡策略
>
> 默认是轮询策略，可以在客户端springboot配置文件里通过：
>
> {服务名}.ribbon.NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
>
> 将轮询修改为随机策略

##### 1、Eureka 服务提供服务器配置多机器负载均衡

> 配置yaml文件

``` yaml
server:
  port: ${port:9091}
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://XXXXX/springcloud
    username: root
    password: root
  #定义项目名
  application:
    name: user-service-demo
mybatis:
  type-aliases-package: com.gaogg.pojo
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    #开启ip地址显示，更倾向ip，不是localhost
    prefer-ip-address: true
    #ip地址
    ip-address: 127.0.0.1
    #服务失效时间，默认时间为90s，如果再次注册后还没有使用到了设定失效时间后会从eureka内清出，此属性还需配合注册服务器端服务失效剔除时间（eviction-interval-timer-in-ms）配合使用
    #要不拒即使服务失效时间到了也不会在注册中心清理
    lease-expiration-duration-in-seconds: 10
    #服务续约(renew)的间隔时间，默认为30s,如果30s内无人使用会再次注册
    lease-renewal-interval-in-seconds: 10
```

> 配置多个启动任务并将端口进行配置
>
> 在VM options：-Dport=9091 配置

![image-20210331211133524](.\images\image-20210331211133524.png)

2、Eureka客户端实现ribbon器负载均衡获取业务接口

> 客户端springboot配置yaml,如果需要将轮询修改为随机就需要在次配置
>
> {服务名}.ribbon.NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule

```yaml
spring:
  application:
    name: consumer-demo

eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
      #服务列表获取时间，默认是30s,fetch-registry: true会从eureka服务的列表拉取只读备份，然后缓存到本地，并且按设定的时间去重新拉取并更新数据
    registry-fetch-interval-seconds: 10
    #拉取服务,默认为true
    fetch-registry: true
#将ribbon默认的轮询策略修改为随机策略
#{服务名}.ribbon.NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
#user-service-demo:
#  ribbon:
#    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
```

> 客户端springboot启动类里restTemplate方法上配置@LoadBalanced注解

``` java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableLoadTimeWeaving;
import org.springframework.web.client.RestTemplate;
@SpringBootApplication
@EnableDiscoveryClient  //开启eureka客户端发现
public class ConsumerDemo {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerDemo.class, args);
    }
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

> 客户端实现方法里单机服务接口地址获取方法更改为服务名方法获取

``` java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.List;
@RestController
@RequestMapping(value = "/consumer")
public class ConsumerController {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @RequestMapping(value = "/findone")
    public User selectById(@RequestParam(name="id") Long id){
        String url="";
        //使用ribbon 负栽均衡后的地址
        url="http://user-service-demo//user/selectId?userId="+id;
        User forObject = restTemplate.getForObject(url, User.class);
        return forObject;
    }
}
```

### 7.3 Hystrix熔断器

防止因一个服务出现异常时导致整个服务长时间等待从而出现雪崩效应；

#### 1、引入hystrix脚手架

``` xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

#### 2、配置熔断策略

``` yaml
spring:
  application:
    name: consumer-demo

eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
      #服务列表获取时间，默认是30s,fetch-registry: true会从eureka服务的列表拉取只读备份，然后缓存到本地，并且按设定的时间去重新拉取并更新数据
    registry-fetch-interval-seconds: 10
    #拉取服务,默认为true
    fetch-registry: true
#将ribbon默认的轮询策略修改为随机策略
#{服务名}.ribbon.NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
#user-service-demo:
#  ribbon:
#    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
#熔断策略配置
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            #熔断超时设置，默认为1s
            timeoutInMilliseconds: 2000
      circuitBreaker:
        #触发熔断器错误比例罚值，默认值为50%
        errorThresholdPercentage: 50
        #熔断后休眠时长，默认值是5s
        sleepWindowInMilliseconds: 100000
        #熔断触发最小请求次数，默认值是20
        requestVolumeThreshold: 30
```

#### 3、服务降级

> 熔断方法返回类型与实际方法返回类型需一样

客户端springboot启动器里配置@EnableCircuitBreaker开启熔断

>@SpringBootApplication,@EnableDiscoveryClient,@EnableCircuitBreaker等于@SpringCloudApplication配置脚本

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableLoadTimeWeaving;
import org.springframework.web.client.RestTemplate;
//@SpringBootApplication
//@EnableDiscoveryClient  //开启eureka客户端发现
//@EnableCircuitBreaker   //开启熔断
@SpringCloudApplication
public class ConsumerDemo {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerDemo.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

> 服务降级实现

1、单独指定特定的方法，在需要熔断的方法上添加@HystrixCommand(fallbackMethod = "queryByIdFallback")配置指定方法名为"queryByIdFallback"

```java
@RestController
@RequestMapping(value = "/consumer")
@Slf4j
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @RequestMapping(value = "/findone")
    @HystrixCommand(fallbackMethod = "queryByIdFallback")
    public String selectById(@RequestParam(name="id") Long id){
        String url="";
        //使用ribbon 负栽均衡后的地址
        url="http://user-service-demo//user/selectId?userId="+id;
        String forObject = restTemplate.getForObject(url, String.class);
        log.error("查询id:{}结果为{}",id,forObject);
        return forObject;
    }
    public String queryByIdFallback(@RequestParam(name="id") Long id){
        log.error("查询失败，查询id:{}",id);
        return "查询失败，查询id:"+id;
    }
}
```

2、针对整个实现类指定默认的熔断方法，在实现类上配置@DefaultProperties(defaultFallback = "errorFallback")配置指定方法名为"errorFallback",需要熔断的方法上配置@HystrixCommand注解

```java
@RestController
@RequestMapping(value = "/consumer")
@Slf4j
@DefaultProperties(defaultFallback = "errorFallback")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @RequestMapping(value = "/findone")
    @HystrixCommand
    public String selectById(@RequestParam(name="id") Long id){
        String url="";
        //使用ribbon 负栽均衡后的地址
        url="http://user-service-demo//user/selectId?userId="+id;
        String forObject = restTemplate.getForObject(url, String.class);
        log.error("查询id:{}结果为{}",id,forObject);
        return forObject;
    }
    public String errorFallback(){
        log.error("默认：查询失败");
        return "网络异常";
    }
}
```

#### 4、线程隔离

***熔断器有3种状态：***

1. closed：关闭状态（熔路器关闭），所有请求正常访问；
2. open：打开状态，所有请求都会降级，hystrix会对请求进行统计，**一定时间内失败请求百分比达到阀值，会触发熔断。默认失败阀值比例是50%,请求次数最少不低于20次。**

3. half open:半开状态。不是永久的，断路器打开后会进入休眠时间（默认是5s）。随后断路器会自动进入半开状态。此时会释放部分请求通过，若请求是健康的，则会关闭熔断器，反之继续保持打开，再次进入休眠倒计时。

> 模拟实现熔断，线程隔离时所有访问均会到默认线程间隔报错处

``` java
@RestController
@RequestMapping(value = "/consumer")
@Slf4j
@DefaultProperties(defaultFallback = "errorFallback")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private DiscoveryClient discoveryClient;
    @RequestMapping(value = "/findone")
    @HystrixCommand
    public String selectById(@RequestParam(name="id") Long id){
        String url="";
        //使用ribbon 负栽均衡后的地址
        url="http://user-service-demo//user/selectId?userId="+id;
        //熔路器功能模拟实现
        if(id==1){
            throw new RuntimeException("太忙了");
        }
        String forObject = restTemplate.getForObject(url, String.class);
        log.error("查询id:{}结果为{}",id,forObject);
        return forObject;
    }
    public String errorFallback(){
        log.error("默认：查询失败");
        return "网络异常";
    }
}
```

### 7.4 Feign

#### 1、脚手架引入

``` xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### 2、启动引导类配置开启Feign客户端发现

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableLoadTimeWeaving;
import org.springframework.web.client.RestTemplate;
//@SpringBootApplication
//@EnableDiscoveryClient  //开启eureka客户端发现
//@EnableCircuitBreaker   //开启熔断
@SpringCloudApplication
@EnableFeignClients //开启feign客户端发现
public class ConsumerDemo {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerDemo.class, args);
    }
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

#### 3、编写Feign接口类，注解成Feign类后框架会自动实现

```java
import com.gaogg.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
//注册成Feign
@FeignClient(value="user-service-demo")
public interface UserClientWithFeign {
    @GetMapping("user/selectId")
    User queryByIdWithFeign(@RequestParam(value = "userId") Long id);
}
```

#### 4、编写controller

```java
import com.gaogg.domain.User;
import com.gaogg.feignclent.UserClientWithFeign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping(value = "/cf")
public class ConsumerFeignController {
    @Autowired
    private UserClientWithFeign userClientWithFeign;
    @GetMapping("/selectId")
    public String queryByIdWithFeign(@RequestParam(value = "userId") Long id){
        String queryBack="";
        try{
            User user = userClientWithFeign.queryByIdWithFeign(id);
            queryBack=user.toString(); 
        }catch (Exception e){
            e.printStackTrace();
        }
        return queryBack;
    }
}
```

#### 5、优化

##### 5.1Feign开启ribbon负载均衡

application.yml里配置

``` yaml
ribbon:
  ConnectTimeout: 1000 #链接超时时长
  ReadTimeout: 5000 #数据通信超时时长
  MaxAutoRetries: 0 #当前服务器的重试次数
  MaxAutoRetriesNextServer: 0 #重试多少次服务
  OkToRetryOnAllOperations: false #是否对所有的请求方式都重试
```

##### 5.2Feign开启熔断

```yaml
feign:
  hystrix:  #开启熔断
    enabled: true #开启feign的熔断功能
```

> 设置降级方法类并实现feign方法接口

```java
import com.gaogg.domain.User;
import com.gaogg.feignclent.UserClientWithFeign;
import org.springframework.stereotype.Component;
@Component
public class UserClientWithFeignImpl implements UserClientWithFeign {
    @Override
    public User queryByIdWithFeign(Long id) {
        User user=new User();
        user.setId(id);
        user.setName("用户异常");
        return user;
    }
}
```

> feign方法接口内设置fallback属性

```java
import com.gaogg.config.FeignConfig;
import com.gaogg.domain.User;
import com.gaogg.feignclent.Impl.UserClientWithFeignImpl;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
//注册成Feign
@FeignClient(value = "user-service-demo",fallback = UserClientWithFeignImpl.class)
public interface UserClientWithFeign {
    @GetMapping("user/selectId")
    User queryByIdWithFeign(@RequestParam(value = "userId") Long id);
}
```

##### 5.3Feign开启压缩

``` yaml
feign:
	compression:  #开启压缩
    request:
      enabled: true #开启请求压缩
      mime-types: text/html,application/xml;application/json  #设置压缩的数据类型
      min-request-size: 2048  #设置触发压缩的大小下限
    response:
      enabled: true #开启回值压缩
```

##### 5.4Feign开启日志

```yaml
#日志设置
logging:
  level:
 #   com.gaogg.controller: info  #设置各日志级别
    com.gaogg: debug
```

> 设置日志方法类

```java
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLonggerLevel(){
        //记录所有请求和响应的明细日志信息
        return Logger.Level.FULL;
    }
}
```

> feign方法接口内设置configuration属性

```java
import com.gaogg.config.FeignConfig;
import com.gaogg.domain.User;
import com.gaogg.feignclent.Impl.UserClientWithFeignImpl;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
//注册成Feign
@FeignClient(value = "user-service-demo",fallback = UserClientWithFeignImpl.class,configuration =
        FeignConfig.class)
public interface UserClientWithFeign {
    @GetMapping("user/selectId")
    User queryByIdWithFeign(@RequestParam(value = "userId") Long id);
}
```

### 7.5SpringCloudGateway

#### 1、入门及面向服务的路由

> 面向服务器的路由主要处理就是在yaml配置文件里将写死的路由代理地址改成`lb://+注册中心注册的服务名`

##### 1.1.脚手架导入

```yaml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

##### 1.2.配置SpringCloudGateway项目的application.yml文件

```yaml
server:
  port: 10010
spring:
  application:
    name: gateway-demo
  cloud:
    gateway:
      enabled: true
      routes:
        #routes表示数组，通过- 开头设置
        #路由id可任意
        - id: gaogg-gateway-route1
          #代理服务器直接写死
          #uri: http://127.0.0.1:8080/consumer-demo
          #代理服务器通过eureka注册中心获取
          uri: lb://consumer-demo
          #路由断言，可匹配映射路径
          predicates:
            #将包含/cf的路径路由到lb://consumer-demo
            - Path=/cf/**

#配置eureka注册中心
eureka:
  client:
    service-url:
      #指定eureka注册中心地址
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    #显示ip
    prefer-ip-address: true
```

##### 1.3.启动引导类

```java
package com.gaogg.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
@SpringBootApplication
//开启eureka客户端发现
@EnableDiscoveryClient
public class GatewayDemo {
    public static void main(String[] args) {
        SpringApplication.run(GatewayDemo.class, args);
    }
}
```

#### 2、路由前缀处理

##### 2.1添加前缀

在访问链接的port后面增加前缀/cf，例如：http://127.0.0.1:10010/selectId?userId=4   》》》http://127.0.0.1:10010/cf/selectId?userId=4

```yaml
spring:
  cloud:
    gateway:
      routes:
          predicates:
            - Path=/**
          filters:
            #添加请求路径的前缀
            - PrefixPath=/cf
```

##### 2.2去除前缀

在访问链接的port后面去除前缀/cf，例如：

1. StripPrefix=1 http://127.0.0.1:10010/info/cf/selectId?userId=4   》》》http://127.0.0.1:10010/cf/selectId?userId=4
2. StripPrefix=2 http://127.0.0.1:10010/info//test/cf/selectId?userId=4   》》》http://127.0.0.1:10010/cf/selectId?userId=4

```yaml
spring:
  cloud:
    gateway:
      routes:
          predicates:
            - Path=/info/**
          filters:
            #1表示过滤1个路径，2表示过滤2个路径以此类推
            - StripPrefix=1
```

#### 3.过滤器

##### 3.1gateway自带过滤器有几十个，常用的过滤器

| 过滤器名称           | 说明                         |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 对匹配上的请求加上Header     |
| AddRequestParameters | 对匹配上的请求路由添加参数   |
| AddResponseHeader    | 对从网关返回的响应添加Header |
| StirpPerfix          | 对匹配上的请求路径去除前缀   |
| PrefixPath           | 对匹配上的请求路径添加前缀   |

通过ctrl+H调出GatewayFilterFactory这个接口类的实现子类，过滤器实现类都是以GatewayFilterFactory结尾的，其前面字段就是application配置文件里使用的名称。

例如：PrefixPathGatewayFilterFactory在配置里使用名就是PrefixPath

![image-20210408103912524](.\images\image-20210408103912524.png)

##### 3.2过滤器使用，路由内过滤器(局部过滤器)及默认过滤器（全局过滤器）

###### 3.2.1路由内过滤器(局部过滤器)

> 此拦截器只在路由内使用

```yaml
spring:
  cloud:
    gateway:
      routes:
          filters:
            #添加请求路径的前缀
            - PrefixPath=/cf
```

> 效果

> 参考路由前缀处理

> 自定义局部过滤器

```yaml
spring:
  cloud:
    gateway:
      routes:
          filters:
            #自定义局部过滤器来动态打印变量名为userId的值
            - GaoggParam=userToken
```

> 创建GaoggParamGatewayFilterFactory方法类,添加@Component注解解决空过滤器报错,或者在启动引导类里注册@Bean,GaoggParamGatewayFilterFactory

```
    @Bean
    public GaoggParamGatewayFilterFactory gaoggParamGatewayFilterFactory(){
        return new GaoggParamGatewayFilterFactory();
    }
```

> <span style="color:red;background:yellow">Caused by: java.lang.IllegalArgumentException: Unable to find GatewayFilterFactory with name GaoggParam</span>

```java
import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import java.util.Arrays;
import java.util.List;
@Component
public class GaoggParamGatewayFilterFactory extends AbstractGatewayFilterFactory<GaoggParamGatewayFilterFactory.Config> {
    //此常量的值要与下面Config配置类中的变脸名一致
    public static final String PARAM_NAME="param";
    public GaoggParamGatewayFilterFactory() {
        super(GaoggParamGatewayFilterFactory.Config.class);
    }
    public List<String> shortcutFieldOrder() {
        //我们只有一个名称没有值所以在这边只要将常量PARAM_NAME传下来就行
        return Arrays.asList(PARAM_NAME);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return (ServerWebExchange exchange, GatewayFilterChain chain)->{
            //获取请求参数中param对应的参数名的参数值
            ServerHttpRequest request = exchange.getRequest();
//            List<String> strings = request.getQueryParams().get(config.param);
//            //判断过滤参数(userToken)是否存在，如果存在则返回ture.
//            boolean b = request.getQueryParams().containsKey(config.param);
            String first = request.getQueryParams().getFirst(config.param);
            if(StringUtils.isBlank(first)){
//                strings.forEach(first->System.out.printf("-------局部过滤器------参数名：%s= ，参数值%s-------",
//                        config.param,first));
                //设置响应状态码为未授权
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
            return chain.filter(exchange);
        };
    }
    public static class Config{
        private String param;
        public String getParam() {return param;}
        public void setParam(String param) {this.param = param;}
    }
}
```

###### 3.2.2默认过滤器（全局过滤器）

> 默认拦截器对整个项目使用

```yaml
spring:
  cloud:
    gateway:
      default-filters:
        #添加响应返回头部过滤器，X-Response-Heade参数名，gaoggGateway参数值
        - AddResponseHeader=X-Response-Header, gaoggGateway
```

> 效果

![image-20210408111254178](.\images\image-20210408111254178.png)

> 自定义全局过滤器

全局过滤器不需要配置yaml文件，只需要创建一个过滤类，继承GlobalFilter接口,如果需要增加排序则需要继承 Ordered接口，Ordered的getOrder方法时的回值越小越先执行。

```java
package com.gaogg.gateway.filter;

import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class GaoggGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("-----------全球过滤器----------");
        String userToken = exchange.getRequest().getQueryParams().getFirst("userTokens");
        if(StringUtils.isBlank(userToken)){
            System.out.println("userToken"+", value="+userToken);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }
    @Override
    public int getOrder() {
        //值越小越先执行
        return 1;
    }
}
```

#### 4.其他配置

##### 4.1高可用

起多个gateway服务通过ngnix做负载均衡，提供对外统一访问地址；

##### 4.2负载均衡及熔断参数配置

```yaml
#熔断器响应时间，超过设置时间没有数据返回时熔断器就给出线程隔离或服务降级处理
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            #熔断超时设置，默认为1s
            timeoutInMilliseconds: 2000
      circuitBreaker:
        #触发熔断器错误比例罚值，默认值为50%
        errorThresholdPercentage: 50
        #熔断后休眠时长，默认值是5s
        sleepWindowInMilliseconds: 100000
        #熔断触发最小请求次数，默认值是20
        requestVolumeThreshold: 30
#负载均衡        
ribbon:
  ConnectTimeout: 1000 #链接超时时长
  ReadTimeout: 5000 #数据通信超时时长
  MaxAutoRetries: 0 #当前服务器的重试次数
  MaxAutoRetriesNextServer: 0 #重试多少次服务
  OkToRetryOnAllOperations: false #是否对所有的请求方式都重试
```

##### 4.3gateway跨域开启

```yaml
spring:
  application:
    name: gateway-demo
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          #/**表示所有访问到网关的请求
          '[/**]':
            #表示所有的来访链接均开启跨域请求
            allowedOrigins: '*'
            #只能http://doc.spring.io地址来的链接开启跨域请求
#            allowedOrigins:
#              - 'http://doc.spring.io'
            #可跨域的访问方式GET与POST,
            allowedMethods:
              - GET
              - POST
```

##### 4.4Gateway与Feign区别

> Gateway网关一般对外部提供服务，让外部终端进行请求使用；

> Feign一般是微服务内部请求调用；

### 7.6SpringCloud配置中心

远程服务器设置https://github.com/gaoguhao/GaoggSpringCloudStudy.git

配置文件命名规则是：#{application}-#{profile}.yml,其对应到yaml应用服务器里springcloud的配置字段name,profile。`userserver-dev.yml,userserver为application，dev为profile，中间用-隔离开。`

#### 1.config-server搭建配置中心

> 脚手架导入

```yaml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
</dependency>
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

> application配置

```yml
#服务端口
server:
  port: ${port:12000}
#git地址配置
spring:
  application:
    name: config-server-demo
  cloud:
    config:
      server:
    #bootstrap: true
        #设置git服务器地址
        git:
          uri: https://gitee.com/gaoguhao/gaogg-spring-cloud-study.git
          username: user
          password: passwd
#eureka注册中心设置
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

> 启动引导内配置@EnableConfigServer开启配置服务

#### 2.user-server-demo配置

> user-server-demo删除本起application.yml配置bootstrap.yml

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://1.15.71.35:13306/springcloud
    username: root
    password: root
  cloud:
    config:
      # 要与仓库中的配置文件的application保持一致
      name: userservice
      # 要与仓库中的配置文件的profile保持一致
      profile: dev
      # 要与仓库中的配置文件所属的版本（分支）一样
      label: master
      discovery:
        # 使用配置中心
        enabled: true
        # 配置中心服务名,就是config服务注册名
        service-id: config-server-demo
#配置eureka注册中心
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

### 7.7 SpringCloud Bus

不重启服务器的情况下实时的获取到远程git服务器内yml文件的更新.

#### 7.7.1、config-server配置

1、依赖包导入

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-bus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-rabbit</artifactId>
</dependency>
```

2、application.yml文件配置，配置rabbitmq及总线线程暴露

```yml
spring:
  rabbitmq:
    host: 1.15.71.35
    port: 15672
    username: admin
    password: admin
management:
  endpoints:
    web:
      exposure:
        #暴露触发消息总线的地址
        include: bus-refresh
```

#### 7.7.2usersevice服务器配置

1、脚手架导入，依赖包配置

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-bus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-rabbit</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2、application.yaml配置

```yaml
  rabbitmq:
    host: 1.15.71.35
    port: 15672
    username: admin
    password: admin
```

3、对外提供服务的类上添加@RefreshScope注解刷新配置，rabbitmq总线刷新后service服务也进行刷新。

#### 7.7.3git更新后手动的刷新总线

post请求，application/json方式请求http://127.0.0.1:12000/actuator/bus-refresh地址进行刷新。

`/actuator固定地址`，`bus-refresh`为config服务器内配置的暴露总线线程名。

## 8.ElasticSearch

### 8.1 SpringData-ElasticSearch

#### 8.1.1SpringData-ElasticSearch创建

#### 1、配置文件

> pox.xml

```xml
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <elasticsearch.version>5.6.8</elasticsearch.version>
        <log4j.version>2.9.1</log4j.version>
        <slf4j.version>1.7.24</slf4j.version>
        <junit.version>4.12</junit.version>
        <jackson.version>2.9.6</jackson.version>
        <springdata.es.version>3.0.5.RELEASE</springdata.es.version>
        <spingtest.version>5.0.4.RELEASE</spingtest.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>${elasticsearch.version}</version>
        </dependency>
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>transport</artifactId>
            <version>${elasticsearch.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-to-slf4j</artifactId>
            <version>${log4j.version}</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.12</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-elasticsearch</artifactId>
            <version>${springdata.es.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>org.elasticsearch.plugin</groupId>
                    <artifactId>transport-netty4-client</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spingtest.version}</version>
        </dependency>
    </dependencies>
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:elasticsearch="http://www.springframework.org/schema/data/elasticsearch"
       xsi:schemaLocation="
		http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		http://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/data/elasticsearch
		http://www.springframework.org/schema/data/elasticsearch/spring-elasticsearch-1.0.xsd
		">
    <!--elastic客户对象的配置,client-transport-sniff使客户端去嗅探整个集群的状态,默认开启状态-->
    <elasticsearch:transport-client id="esClient" cluster-name="elasticsearch-cluster" cluster-nodes="1.15.71.35:19301,1.15.71.35:19302" client-transport-sniff="false"/>
    <!--配置包扫描器,扫描dao的接口-->
    <elasticsearch:repositories base-package="com.gaogg.es.repositories"/>
    <!--配置Elasticsearch模板对象-->
    <bean id="elasticsearchTemplate" class="org.springframework.data.elasticsearch.core.ElasticsearchTemplate">
        <constructor-arg name="client" ref="esClient"/>
    </bean>
</beans>
```

#### 2、方法类的创建

> pojo类(domain)创建

```java
package com.gaogg.es.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "index-spring",type = "newer")
public class Newer {
    @Id
    @Field(type = FieldType.Long,store = true,analyzer = "standard")
    private long id;

    @Field(type = FieldType.text,store = true,analyzer = "ik_smart")
    private String name;
    @Field(type = FieldType.text,store = true,analyzer = "ik_max_word")
    private String tittle;
    @Field(type = FieldType.Long,fielddata = true,store = true,analyzer = "standard")
    private long searchName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public long getSearchName() {
        return searchName;
    }

    public void setSearchName(long searchName) {
        this.searchName = searchName;
    }

    @Override
    public String toString() {
        return "Newer{" +
                "ids='" + id + '\'' +
                ", name='" + name + '\'' +
                ", tittle='" + tittle + '\'' +
                ", searchName='" + searchName + '\'' +
                '}';
    }
}
```

> repositories接口类（dao）创建

```java
package com.gaogg.es.repositories;

import com.gaogg.es.pojo.Newer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
/*
* 创建一个Repositories接口继承ElasticsearchRepository类，<数据返回类型,主键类型>
* */
public interface NewerRepositories extends ElasticsearchRepository<Newer,Long> {
}

```

> 测试类创建

<strong style="color:red">自定义查询方法里分词数据之间的关系是and,跟原始的querysrting里的or关系不一样。自定义查询方法命名规范请看`补充`</strong>。

> SortBuilders.fieldSort("id").order(SortOrder.ASC)	排序
>
> 如果需要对字符串进行排序需要在pojo里设置下fielddata = true，设置字符串不分割。

```java
package com.gaogg.es.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gaogg.es.pojo.Newer;
import com.gaogg.es.repositories.NewerRepositories;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class ElasticSearchSpring {
    @Autowired
    private NewerRepositories newerRepositories;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Test
    //创建索引index,及创建type的mappings
    public void CreateESIndex(){
        elasticsearchTemplate.createIndex(Newer.class);
    }
    //添加文档及修改文档，因为lucense的修改是先删除再插入的，所以修改与插入都是使用save方法来实现的
    @Test
    public void insertDocumentDatas(){
        for (int i=0;i<200;i++){
            Newer newer=new Newer();
            newer.setId(i);
            newer.setName("国家卫健委:全国医务人员新冠疫苗接种率已超80%"+i);
            newer.setTittle("国家卫生健康委医政医管局副局长李大川介绍，医务工作者处于常态化疫情防控一线，是新冠疫苗接种的重点人群之一。截至目前，全国医务人员新冠肺炎疫苗接种率已超过80%"+i);
            newer.setSearchName(i);
            //save保存文档
            newerRepositories.save(newer);
        }
    }
    //删除，删除分全部删除deleteAll()及按id删除deleteById(id)
    @Test
    public void deleteEsData(){
        newerRepositories.deleteById(199l);
        //全部删除
        //newerRepositories.deleteAll();
    }

    //简单查询使用Repositories接口封装好的方法查询，全部查询及通过id查询
    @Test
    public void queryById(){
        //全部查询
        // newerRepositories.findAll().forEach(newer -> System.out.println(newer));
        //通过id查询
        Newer newer = newerRepositories.findById(1l).get();
        System.out.println(newer);
    }
    //自定义查询，需要在newerRepositories接口里自定义查询接口方法，命名规则是get或find+By+FieldName,如果有多个FieldName在中间用Or、And、Between、not、LessThan等介词隔离开来
    @Test
    public void customQuery(){
        //通过tittle查找
        /*List<Newer> byTittles = newerRepositories.findByTittle("全国医务人员");
        byTittles.forEach(byTittle ->{
            System.out.println(byTittle);
        });*/
        //通过tittle或name查找
        //newerRepositories.findByTittleOrName("全国医务人员","190").forEach(byTittle -> System.out.println(byTittle));
        //通过tittle或name实现分页排序查询
        Sort sort=Sort.by(Sort.Direction.ASC,"id");
        Pageable pageable= PageRequest.of(0,5,sort);
        newerRepositories.findByTittleOrName("全国医务人员","190",pageable).forEach(byTittle -> System.out.println(byTittle));
    }
    //NativeSearchQuery查询，基于原生的查询
    @Test
    public void springDataESNativeSearchQuery(){
        QueryBuilder queryBuilders=QueryBuilders.queryStringQuery("全国医务人员").field("tittle");
        Pageable pageable= PageRequest.of(0,5);
        //排序固定写法
        //SortBuilder sortBuilder=new FieldSortBuilder("id.keyword").order(SortOrder.ASC);
        NativeSearchQuery nativeSearchQuery=new NativeSearchQueryBuilder()
                .withQuery(queryBuilders)
                .withSort(SortBuilders.fieldSort("id").order(SortOrder.ASC))
                .withPageable(pageable)
                .build();
        elasticsearchTemplate.queryForList(nativeSearchQuery,Newer.class).forEach(newer-> System.out.println(newer));
    }
}
```

> 补充

![image-20210425131706605](.\images\image-20210425131706605.png)

#### 3、报错问题及解决

> None of the configured nodes are available: [{#transport#-1}{l9VCRfjQQyWGHpkCDKonYA}{1.15.71.35}{1.15.71.35:19301}, {#transport#-2}{538oB-4ySZyOJGKxsChaYQ}{1.15.71.35}{1.15.71.35:19302}] 

<strong style="color:red">在applicationContext.xml中elasticsearch:transport-client内设置`client-transport-sniff="false"`，不使用客户端去嗅探整个集群的状态；</strong>

>org.elasticsearch.index.query.QueryShardException: No mapping found for [updateTime] in order to sort on

<strong style="color:red">数据不存在的时候或者索引无法正确识别的时候会出现该问题。 一般排序字段为text字段时会出现，需要在创建字段时将次字段设为 fielddata = true，或者使用数字型数据字段排序。</strong>

