# MAVEN

## 1、全局配置代理仓库

添加阿里云的镜像到maven的setting.xml配置中，这样就不需要每次在pom中，添加镜像仓库的配置，在mirrors节点下面添加子节点：

```xml
  <mirrors>
	<mirror>
		<id>aliyunmaven</id>
		<mirrorOf>*</mirrorOf>
		<name>aliyun maven</name>
		<url>https://maven.aliyun.com/repository/public</url>
	</mirror>
	<mirror>
		<id>repo2</id>
		<mirrorOf>central</mirrorOf>
		<name>Human Readable Name for this Mirror.</name>
		<url>http://repo2.maven.org/maven2/</url>
	</mirror>
	<mirror>
		<id>ui</id>
		<mirrorOf>central</mirrorOf>
		<name>Human Readable Name for this Mirror.</name>
		<url>http://uk.maven.org/maven2/</url>
	</mirror>
  </mirrors>
```

## 2、单项目配置

单项目配置时，需要修改pom.xml文件。pom.xml文件中，没有mirror元素。在pom.xml文件中，通过覆盖默认的中央仓库的配置，实现中央仓库地址的变更。

```yaml
  <repositories>
        <repository>
            <id>central</id>
            <name>aliyun maven</name>
            <url>https://maven.aliyun.com/repository/public/</url>
            <layout>default</layout>
            <!-- 是否开启发布版构件下载 -->
            <releases>
                <enabled>true</enabled>
            </releases>
            <!-- 是否开启快照版构件下载 -->
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
```

## 3、更改仓库路径

setting.xml中修改localRepository属性

```xml
<localRepository>D:\workProgram\paths\meavnRepository</localRepository>
```

