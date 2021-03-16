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
            <property name="javax.persistence.jdbc.password" value="Ab00859567c!"/>
            <property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver"/>
            <property name="javax.persistence.jdbc.url"
                      value="jdbc:mysql://152.136.116.40:3506/mssstudy"/>
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

### 6.1.1spring boot集成rabbitMQ

#### 6.1.1.1、生产者项目

##### 6.1.1.1.1、pox.xml内配置依赖脚手架

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

##### 6.1.1.1.2、application.yml RabbitMQ信息配置

```yaml
spring:
  rabbitmq:
    host: ip
    port: 5672
    password: 密码
    username: 账号
    virtual-host: 虚拟机名
```

##### 6.1.1.1.3、创建rabbitmq配置方法类

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

##### 6.1.1.1.4、编写测试方法

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

#### 6.1.1.2、消费者项目

##### 6.1.1.2.1、pox.xml内配置依赖脚手架

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

##### 6.1.1.2.2、application.yml RabbitMQ信息配置

```yaml
spring:
  rabbitmq:
    host: ip
    port: 5672
    password: 密码
    username: 账号
    virtual-host: 虚拟机名
```

##### 6.1.1.2.3、创建rabbitmq消费者方法

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

###### 