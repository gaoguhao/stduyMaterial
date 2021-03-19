# docker

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

docker run --privileged=true --restart=always -it --name 镜像的名字 （-p 指定端口）镜像名:tag(版本信息)

mysql启动：将本地的13306端口配置给镜像的3306

--privileged=true：	让容器内的root有真正的root权限，否则容器内的root只有外部普通用户权限

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

### 11、docker镜像参数查看

在docker hub	:	https://hub.docker.com/	软件里点击版本tag信息进入版本信息界面查看，如下图点击DIGEST:31985b230b43进入

![image-20210301211927755](images\tag版本信息查看.png)

### 12、docker配置mysql

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

### 13、docker配置tomcat

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

### 14、redis配置

##### 1、安装docker pull redis

##### 2、redis启动

redis如果不配置redis.conf文件启动时服务器里将不存在redis.conf文件。启动前先从docker hub	:	https://hub.docker.com/	内下载redis从中将redis.conf文件放置到/data/myredis/redis.conf

redis-server /etc/redis/redis.conf	redis 将以 /etc/redis/redis.conf 为配置文件启动

-v /data/myredis/data:/data	容器 /data 映射到宿主机/data/myredis/data

-v /data/myredis/redis.conf:/etc/redis/redis.conf	容器 /etc/redis/redis.conf 配置文件 映射宿主机 /data/myredis/redis.conf。 会将宿主机的配置文件复制到docker中。

--appendonly yes  开启redis 持久化

--privileged=true	让容器内的root有真正的root权限，否则容器内的root只有外部普通用户权限

在redis.conf内：

1）注释掉bind 127.0.0.1，行首添加#即为注释，

2）daemonize默认no，否则无法编译。

3）如果需要远程连接，则需要将protected-mode变成no（保护模式下非本地连接不能访问）

4）如果还需要设置密码加入属性 requirepass XXXX,xxx表示密码

```shell
docker run --restart=always --privileged=true -itd -v /data/myredis/data:/data -v /data/myredis/sysctl.conf:/etc/sysctl.conf -v /data/myredis/redis.conf:/etc/redis/redis.conf -p 16379:6379 --name myredis redis redis-server /etc/redis/redis.conf --appendonly yes
```

- 警告1：

WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.

意思：TCP backlog区大不能设置为511，因为/proc/sys/net/core/somaxconn要求设为小于128的值

```shell
方法1： echo "net.core.somaxconn=551" > /etc/sysctl.conf
方法2： sysctl net.core.somaxconn=551
```

- 警告2：

WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

意思： overcommit_memory的值设置为0！ 在低内存条件下，后台保存可能会失败。 要解决此问题，请将“vm.overcommit_memory = 1”添加到/etc/sysctl.conf，然后重新启动或运行命令“sysctl vm.overcommit_memory = 1”以使其生效。

```shell
方法1： echo 1 > /proc/sys/vm/overcommit_memory
方法2： echo "vm.overcommit_memory=1" >> /etc/sysctl.conf
方法3： sysctl vm.overcommit_memory=1
```

### 15、docker复制命令

##### 1)将文件从docker镜像内拷贝到系统文件夹内

docker cp  docker镜像名:想要修改的文件的路径 想要复制到的路径

```shell
docker cp myredis:/etc/redis/redis.conf /data/myredis/redis.conf
```

##### 2)将文件从系统文件夹内拷贝到docker镜像

docker cp  想要复制的文件 docker镜像名:想要修改的文件的路径

先停止docker镜像服务后修改，再重启镜像服务

```shell
docker cp /data/myredis/redis.conf myredis:/etc/redis/redis.conf
```

### 16、docker-compose

#### 16.1安装

Dockerfile 用来构建 Docker 镜像，那么 docker-compose 则是用来创建容器的。

> Docker 有三个主要的功能：Build、Ship 和 Run，使用 docker-compose 可以帮我们在 Run 的层面解决很多实际问题。docker-compose 通过一个 yaml 模板文件来统一管理多个容器的配置，如网络、数据卷、执行指令、环境变量、资源限制等等。有了 docker-compose 我们便可以一键重启、关闭、删除、监控所有的 docker 服务，只需要一次配置，则可以对容器进行统一管理，那么此时我们则不必为了每次要运行一堆容器时写大量的命令而头疼。

```shell
#//运行以下命令以下载Docker Compose的当前稳定版本
curl -L https://get.daocloud.io/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#//将可执行权限应用于二进制文件
chmod +x /usr/local/bin/docker-compose
```

> **注意**：如果`docker-compose`安装后命令失败，请检查路径。您还可以创建指向`/usr/bin`或路径中任何其他目录的符号链接。

```shell
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

> 可选安装支持shell版本compose

```shell
sudo curl \
    -L https://raw.githubusercontent.com/docker/compose/1.28.5/contrib/completion/bash/docker-compose \
    -o /etc/bash_completion.d/docker-compose
```

>安装后进行功能测试

```shell
docker-compose --version
```

#### 16.2更新

```shell
docker-compose migrate-to-labels
```

如果您担心保留它们，可以将其删除。

```shell
docker container rm -f -v myapp_web_1 myapp_db_1 ...
```

#### 16.3卸载

使用`curl`命令进行安装，卸载`Docker Compose` ：

```shell
sudo rm /usr/local/bin/docker-compose
```

使用`pip`命令进行安装，卸载`Docker Compose` ：

```shell
pip uninstall docker-compose
```

