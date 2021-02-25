# 1、docker

### 1、docker安装

##### a、自动安装

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
也可以使用国内daocloud的一键安装命令：curl -sSL https://get.daocloud.io/docker | sh
```

##### b、手动安装

###### 卸载旧版本

```shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

###### 安装 Docker Engine-Community使用 Docker 仓库进行安装

###### 设置仓库

```shell
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

###### 设置数据源

```shell
使用官方源地址（比较慢）
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
阿里
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

###### 安装 Docker Engine-Community

```shell
sudo yum install docker-ce docker-ce-cli containerd.io
```

**yum list** docker-ce --showduplicates **|** **sort** -r可以查询本系统可以安装的所有的Docker Engine-Community版本

```shell
$ yum list docker-ce --showduplicates | sort -r

docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
```

通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。

```shell
安装指定版本的Docker Engine-Community
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

###### c、启动docker

```shell
sudo systemctl start docker 
```

### 2、访问docker镜像（所有软件均可此方法访问）

```shell
docker exec -it mysql-spring bash
```

docker exec 是docker镜像的连接命令，类似于ssh一样的命令，mysql-spring是镜像的名字，镜像每次启动都必须有一个名字，该名字可以手动指定也可以自己生成。

镜像名可通过docker ps -a 查看

```shell
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS                                NAMES
a54d29aa76de   mysql:5.7   "docker-entrypoint.s…"   17 seconds ago   Up 15 seconds   33060/tcp, 0.0.0.0:13306->3306/tcp   mysql-spring
```

### 3、docker启动 

###### 1）启动docker

```shell
sudo systemctl start docker 
```

###### docker随系统自动重启

```shell
systemctl enable docker.service
```

###### 2）docker容器启动设置

docker run --restart=always -it --name 镜像的名字 （-p 指定端口）镜像名:tag(版本信息)

mysql启动：将本地的13306端口配置给镜像的3306

```shell
docker run --restart=always -itd --name mysql-spring -p 13306:3306 -e MYSQL_ROOT_PASSWORD=Ab00859567c! mysql:5.7
```

在运行docker容器时可以加如下参数来保证每次docker服务重启后容器也自动重启：

```shell
docker run --restart=always
```

如果已经启动了则可以使用如下命令：

```shell
docker update --restart=always 镜像id
```

### 4、查看镜像

​	docker images

### 5、删除镜像

​	docker rmi -f 镜像ID

### 6、查看容器

​	docker ps -a

### 7、删除容器

​	docker rm 容器id

### 8、重启容器

​	docker restart 容器id

### 9、查看可用镜像版本

docker search mysql 

### 10、日志查看

  1) docker ps
  查看正在运行的docker容器有哪些。
  2)docker ps -a
  查看所有docker容器，包括不在running状态的。
  3)docker logs 参数 容器id
  查看具体某一个容器的日志。
  其中参数可选择的有：
  -f follow 表示实时显示日志
  -t timestamp 表示显示时间戳
  --tail=n  表示显示末尾n行
  例如：docker logs -f --tail=200 xxxx，表示实时加载日志信息，并且仅显示最后200行。
  4)docker logs 参数 容器id | grep str
  查找日志文件中含有特定字符串的行
  5)docker logs 参数 容器id | grep str >> out.txt
  查找日志文件中含有特定字符串的行，并且输出到指定文件out.txt中。

### 11、docker配置mysql

1、安装

```shell
#此系统可以安装的最新版本:
docker pull mysql
#指定版本安装：
docker pull mysql:5.7
```

2、启动

docker run --restart=always -it --name 镜像的名字 （-p 指定端口）镜像名:tag(版本信息)

```shell
docker run --restart=always -itd --name mysql-spring -p 13306:3306 -e MYSQL_ROOT_PASSWORD=Ab00859567c! mysql:5.7
```

3、访问

```mysql
mysql -h ip:13306 -uroot -pAb00859567c! 
```

-h 填写ip

-u 用户名

-p 密码

### 12、docker配置tomcat

#### 1、tomcat安装

##### a、自动安装tomcat8基于jdk8

```shell
docker pull tomcat:8.5.63-jdk8-corretto
```

##### b、dockerfile编写配置tomcat

###### 1）准备centos镜像:

docker pull centos 获取centos;

###### 2）下载tomcat,jdk

tomcat,jdk将tar文件解压放到如/opt/tomcat目录下:

```html
jdk1.8下载：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html ;
tomcat8下载：https://tomcat.apache.org/download-80.cgi ;
```

###### 3）/opt/tomcat目录下编写Dockerfile:

vi Dockerfile

#注意服务器的位数是64还是32位，根据位数不同选择jdk版本，如果jdk版本错位会出现获取不到java的报错；-bash: /usr/local/java/bin/java: No such file or directory

```dockerfile
#使用的基础镜像
FROM centos
#创建目录
RUN mkdir -p /opt
#把当前目录下的jdk文件夹添加到镜像
ADD tomcat8 /opt/tomcat8
ADD jdk1.8.0_241 /opt/jdk
RUN chmod -R 755 /opt
ENV JAVA_HOME /opt/jdk
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH .:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV CATALINA_HOME /opt/tomcat8
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/bin
RUN java -version
#暴露8080端口，可以/opt/tomcat8/conf/server.xml里修改
EXPOSE 8088
#启动时运行tomcat
CMD ["/opt/tomcat8/bin/catalina.sh","run"]
```

###### 4）构建docker镜像：

```shell
docker build -t gaogg/tomcat .
```

##### 2、启动tomcat

```shell
docker run --restart=always -itd -p 8888:8080 -v /data/tomcat/:/usr/local/tomcat/webapps/ --name tomcat8.5 tomcat:8.5.63-jdk15-openjdk-oraclelinux7
```

-d 在后台运行容器，并且打印容器id。–detach

-t 分配一个伪tty，一般与 -i 连用。–tty

-i 即使没有连接，也要保持标准输入保持打开状态，一般与 -t 连用。–interactive

-p 指定访问主机的`8888`端口映射到`8080`端口。

-v 指定我们容器的`/usr/local/tomcat/webapps/`目录为`/root/tomcat/`主机目录，后续我们要对tomcat进行操作直接在主机这个目录操作即可。

