

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

##### c、启动docker

```shell
sudo systemctl start docker 
```

##### d、window10安装docker

###### 1)Hyper-V安装及开启

Hyper-V 是微软开发的虚拟机，类似于 VMWare 或 VirtualBox，仅适用于 Windows 10。这是 Docker Desktop for Windows 所使用的虚拟机。

但是，这个虚拟机一旦启用，QEMU、VirtualBox 或 VMWare Workstation 15 及以下版本将无法使用！如果你必须在电脑上使用其他虚拟机（例如开发 Android 应用必须使用的模拟器），请不要使用 Hyper-V！

在添加程序里开启Hyper-V

也可以通过命令来启用 Hyper-V ，请右键开始菜单并以管理员身份运行 PowerShell，执行以下命令：

```shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

###### 2）安装 Docker Desktop for Windows

###### 3）安装WSL2

**安装WSL内核升级包 wsl_update_x64.msi:**

```shell
https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel
# 下载地址
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
```

**以管理员方式启动PowerShell：**

```shell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
#设置默认虚拟linux系统
wsl --set-version Ubuntu-20.04 2
#设置默认wsl开启版本
wsl --set-default-version 2
```

**验证:**

```shell
wsl -l -v
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
docker run --restart=always -itd --name mysql-spring -p 13306:3306 -e MYSQL_ROOT_PASSWORD=a mysql:5.7
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
docker run --restart=always -itd --name mysql-spring -p 13306:3306 -e MYSQL_ROOT_PASSWORD=a mysql:5.7
```

3、访问

```mysql
mysql -h ip:13306 -uroot -pa 
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

### 17、haProxy配置

#### 17.1配置pull方法配置haproxy（方法一）

> haproxy通过pull拉取

```shell
docker pull haproxy:1.8.29
```

> haproxy.cfg文件

```
#logging options
global
        log 127.0.0.1 local0 info
        maxconn 5120
        chroot /usr/local/etc/haproxy
        uid 99
        gid 99
        daemon
        quiet
        nbproc 20
        pidfile /var/run/haproxy.pid
defaults
        log global
        mode tcp
        option tcplog
        option dontlognull
        retries 3
        option redispatch
        maxconn 2000
        contimeout 5s
		clitimeout 60s
		srvtimeout 15s
#front-end IP for consumers and producters
#rabbitmq负责均衡
listen rabbitmq_tcp_cluster
		#访问的IP和端口(前面ip=0代表任何ip都可访问)
        bind 0.0.0.0:5674
		#网络协议
        mode tcp
        #balance url_param userid
        #balance url_param session_id check_post 64
        #balance hdr(User-Agent)
        #balance hdr(host)
        #balance hdr(Host) use_domain_only
        #balance rdp-cookie
        #balance leastconn
        #balance source //ip
        #负载均衡算法（轮询算法）
        #轮询算法：roundrobin
        #权重算法：static-rr
        #最少连接算法：leastconn
        #请求源IP算法：source
        balance roundrobin
        server node1 127.0.0.1:5672 check inter 5000 rise 2 fall 2
        server node2 127.0.0.1:5673 check inter 5000 rise 2 fall 2
#监控界面
listen stats
        #监控界面的访问的IP和端口
        bind 0.0.0.0:8100
        #访问协议
        mode http
        #日志格式
        option httplog
        stats enable
        #URI相对地址
        stats uri /gaoggrmq
        stats refresh 5s
```

#### 17.2Dockerfile方法配置haproxy（方法二）

```dockerfile
FROM haproxy:1.8.29
COPY conf/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN chmod -R 755 /usr/local/etc/haproxy/haproxy.cfg
```

> 启动

```shell
docker run --restart=always -itd --name gaohaproxy -p 8100:8100 -v /data/haProxy/conf/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg -v /data/haProxy/lib_haproxy:/var/lib/haproxy haproxy:1.8.29
```

### 18、ElasticSearch

#### 18.1ElasticSearch

> 安装

```shell
docker pull elasticsearch:5.6.8
```

> 启动

<span style="color:red;font-weight: 1000;">-e ES_JAVA_OPTS="-Xms256m -Xmx256m" 设置初始堆内存和最大内存 也可以调整虚拟机内存</span>

```shell
方法1：docker run --restart=always -itd --name elasticsearch1 -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -p 19200:9200 -p 19300:9300 elasticsearch:5.6.8
方法2：docker run --restart=always -itd --name elasticsearch1 -p 9200:9200 -p 9300:9300 elasticsearch:5.6.8
```

> 配置跨域

<span style="color:red;">`将跨域属性添加到elasticsearch.yml文件内`</span>

```yaml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

方法1、安装vim通过vim编辑修改./config/elasticsearch.yml配置文件

```shell
apt-get update
apt-get install vim
```

方法2、

将elasticsearch.yml从项目内cp出来修改后在通过docker cp copy回去

拷贝出：

```shell
docker cp elasticsearch1:/usr/share/elasticsearch/config/elasticsearch.yml /data/elasticsearch/config/elasticsearch.yml
```

拷贝回去：

```
docker cp /data/elasticsearch/config/elasticsearch.yml elasticsearch1:/usr/share/elasticsearch/config/elasticsearch.yml
```

> 重启容器配置完成

```shell
docker restart elasticsearch1
```

#### 18.2ElasticSearch-head

> 安装

```shell
docker pull mobz/elasticsearch-head:5
```

> 启动

```shell
docker run --restart=always -itd --name elasticsearch-head1 -p 19100:9100 mobz/elasticsearch-head:5
```

> 测试

打开：http://1.15.71.35:19100/地址在链接前输入http://1.15.71.35:19200/连接

![image-20210413134847698](.\images\image-20210413134847698.png)

#### 18.3ElasticSearch概念

elasticSearch是面向文档的，他可以存储整个对象或文档（document）,它不仅是存储，还会索引（index）每一个文档，使之可以被搜索。你可以对文档（非成行成列的数据）进行索引、搜索、排序、过滤。

ElasticSearch与关系型数据库mysql的对比：

|     名称      |      一级区块      |             二级区块             |       三级区块        |       四级区块       |
| :-----------: | :----------------: | :------------------------------: | :-------------------: | :------------------: |
|  mysqlserver  |     Databases      |              tables              |   Rows<br/>（记录）   | Columns<br/>（字段） |
| ElasticSearch | Indices<br/>(索引) | Types<br/>(类型，类似逻辑上的表) | Document<br/>（文档） | Fields<br/>（字段）  |

<strong>Index：</strong>索引的命名必须是小写英文字母+数字的方式构成；我们要对索引中的文档进行增删改查时均需要用到索引名。我们可以创建任意多的索引。

<strong>Type：</strong>一个索引可以有一个或多个类型，一个类型就相当于你索引的一个逻辑分区。

<strong>Mapping：</strong>映射mapping处理数据的方式和规则方面做一些限制，fied字段的属性，意义均是在mapping中进行映射定义。

<strong>Document：</strong>文档是可被索引的基础信息单元。文档是以json格式来表示。一个index/type里可以存储多个文档，<strong style="color:red;">注意：尽管一个文档，物理上是存在于一个index索引之中，文档必须被`索引/赋予`一个索引的type。</strong>

<strong>Field：</strong>字段/域 相当于数据表内的字段属性，对文档document数据根据不同属性进行分类标识。

<strong>接近实时NRT：</strong>ElasticSearch是一个接近实时的搜索平台，从索引一个文档到这个文档被搜索到有一个轻延迟（通常是1秒内）。

<strong>Cluser：</strong>集群，多个节点做成高并发处理。

<strong>Node：</strong>节点，一个节点代表一个集群中的Elasticsearch服务。

<strong>Shard&Replicas：</strong>shard切片将一个索引切分成多分，一分就是一个分片，每个分片本身就是一个功能完善并且独立的index索引，可以理解为分区表。Replicas复制就是将分表的数据备份，防止数因节点损坏而丢失。

#### 18.4ElasticSearch使用

##### 18.4.1索引的创建：

使用http(使用postman工具)的put方法创建索引，创建索引时可加入type，document,field等属性也可不加入直接创建空索引；

```json
{
    //mappings关键字，创建有数据索引时需加入
    "mappings": {
        //type名
        "article": {
            //document名
            "properties": {
                //field名
                "id": {
                    //类型
                    "type": "long",
                    //是否存储
                    "store": true,
                    //是否索引，not_analyzed不索引，默认为不索引，可以省略
                    "index": "not_analyzed"
                },
                "name": {
                    //类型
                    "type": "text",
                    //是否存储
                    "store": true,
                    //是否索引，analyzed索引
                    "index": "analyzed",
                    //分词器，标准分词器，与lucene一样标准分析器对汉字的索引是按字来索引的一个汉字一个索引。
                    "analyzer": "standard"
                },
                "title": {
                    "type": "text",
                    "store": true,
                    "index": "analyzed",
                    //中文分词器，做最粗颗粒的拆分
                    "analyzer": "ik_smart"
                },
                "contexts": {
                    "type": "text",
                    "store": true,
                    "index": "analyzed",
                    //中文分词器，做最细颗粒的拆分
                    "analyzer": "ik_max_word"
                },
                "sex": {
                    "type": "text",
                    "store": true,
                    "index": "analyzed",
                    //分词器，标准分词器，与lucene一样标准分析器对汉字的索引是按字来索引的一个汉字一个索引。
                    "analyzer": "standard"
                }
            }
        }
    }
}
```

**postman不带参数生成**

![image-20210413205957556](E:\gitTest\images\image-20210413205911448.png)

​		**postman带参数生成**

![image-20210413213840050](.\images\image-20210413213840050.png)

**给以有空白索引里插入type，使用post方式插入，需要在url里加上/索引名+/type名/+_mappings,type名与json串里的type一致**

![image-20210413223638863](.\images\image-20210413223638863.png)

**ElasticSearch-head不带参数生成**

![image-20210413214429587](.\images\image-20210413214429587.png)

**ElasticSearch-head带参数生成**

![image-20210413214820634](.\images\image-20210413214820634.png)

##### 18.4.2删除索引

使用http的delete方法删除索引ElasticSearch地址+索引名

**postman删除：**

![image-20210413214948023](.\images\image-20210413214948023.png)

**elasticsearch-head删除：**

![image-20210413215237681](.\images\image-20210413215237681.png)

##### 18.4.3给type添加文档document

使用post请求给索引里的type添加文档，url需求，url+/索引名+/type名/+id值比需要给第一个id加值这边就是1

图中的_id就对应url里需要填写的id。<strong style="color:red;">建议id与业务主键id（我们定义的field里设置的id属性）一致。</strong>

![image-20210414115835805](.\images\image-20210414115835805.png)

**文档插入时可以不指定id，ElasticSearch会根据算法自动生成id(类似uuid)**

##### 18.4.4删除文档

使用Delete方法进行删除 http://1.15.71.35:19200/urlcreateindex1/addtest/1

使用Delete方法进行删除		ElasticSearchurl	/		index			/type/document_id

##### 18.4.5修改文档值

使用Post方法修改，就是使用添加文档document数据。<strong style="color:red;">ElasticSearch的文档修改与lucene一样都是先删除原有数据再插入新的数据。</strong>

##### 18.4.6查询

###### 1、通过GET方式通过id查询，只能查出一条内容

```shell
GET http://1.15.71.35:19200/gaoindex1/news/1
GET elasticSearchUrl/indexName/TypeName/DocumentId
```

###### 2、条件查询

> 分词器测试两种方式：

`GET 方式直接打开http://1.15.71.35:19200/_analyze?analyzer=ik_max_word&text=程序员`

`post 方式打开http://1.15.71.35:19200/_analyze并在body里配置json串{"analyzer":"ik_smart","text":"程序员"}`

`GET 方式直接打开http://1.15.71.35:19200/_analyze?analyzer=standard&text=程序员`

> 单个查询term查询，post http://1.15.71.35:19200/news/appnews/_search

```json
{
    "query":{
        "term":{
            "title": "中国"
        }
    }
}
```

> 词组query_string查询，post http://1.15.71.35:19200/news/appnews/_search

>query_string需要设置默认查询字段default_field，在query后设置查询词组。

```json
{
    "query":{
        "query_string":{
            "default_field": "title",
            "query": "中国"
        }
    }
}
```

##### 18.4.7ElasticSearch ik中文分析器

1. ik分析器分为`ik_smart`//做最粗粒度的拆分与`ik_max_word`//做最细粒度的拆分;
2. `ik_smart`与`ik_max_word`区别是ik_max_word相对it_smart会分化力度更细致，比如：`ik_smart`会将`程序员`做为一个词组来识别而ik_max_word会将`程序员`拆分成`程序员`、`程序`、`员`3个颗粒；

```shell
1. docker exec -it elasticSearch1 bash
2. ./bin/elasticSearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.6.8/elasticsearch-analysis-ik-5.6.8.zip
或者
将本地下在的elasticsearch-analysis-ik-5.6.8.zip传到服务器，并unzip -o -d ik elasticsearch-analysis-ik-5.6.8.zip
docker cp ik elasticSearch1:/usr/share/elasticsearch/plugins/ik
3. docker restart elasticSearch1
```

##### 18.4.8ElasticSearch集群

集群yaml配置，使用方法与单机是一样

###### 1、单机多节点部署集群docker-compose.yml配置

```yaml
version: '3.8'
services:
  es01: #服务名称
    image: elasticsearch:5.6.8 # 使用的镜像
    container_name: es01 # 容器名称
    restart: always # 失败自动重启策略
    environment:
      - node.name=es01 # 节点名称，集群模式下每个节点名称唯一
      #- network.publish_host=192.168.81.130 # 用于集群内各机器间通信,对外使用，其他机器访问本机器的es服务，一般为本机宿主机IP
      - network.host=0.0.0.0 # 设置绑定的ip地址，可以是ipv4或ipv6的，默认为0.0.0.0，即本机
      #- discovery.seed_hosts=192.168.81.130,192.168.81.131,192.168.81.132
      #- discovery.seed_hosts=es02 # es7.0之后新增的写法，写入候选主节点的设备地址，在开启服务后，如果master挂了，哪些可以被投票
选为主节点
      #- cluster.initial_master_nodes=192.168.81.130,192.168.81.131,192.168.81.132
      #- cluster.initial_master_nodes=es01,es02 # es7.0之后新增的配置，初始化一个新的集群时需要此配置来选举master
      - cluster.name=elasticsearch-cluster # 集群名称，相同名称为一个集群， 三个es节点须一致
      #- http.cors.enabled=true # 是否支持跨域，是：true // 这里设置不起作用，但是可以将此文件映射到宿主机进行修改，然后重启，解
决跨域
      #- http.cors.allow-origin="*" # 表示支持所有域名      // 这里设置不起作用，但是可以将此文件映射到宿主机进行修改，然后重启，
解决跨域
      - bootstrap.memory_lock=true # 内存交换的选项，官网建议为true。锁定物理内存地址，防止es内存被交换出去，也就是避免es使用swap
交换分区，频繁的交换，会导致IOPS变高。
      #- discovery.zen.ping.unicast.hosts= 127.0.0.1:19301,127.0.0.1:19302
      - "ES_JAVA_OPTS=-Xms128m -Xmx128m" # 设置内存，如内存不足，可以尝试调低点
    ulimits: # 栈内存的上限
      memlock:
        soft: -1 # 不限制
        hard: -1 # 不限制
    volumes:
      - /data/elasticsearch/config/es01/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      #- esdata01:/usr/share/elasticsearch/data # 存放数据的文件， 注意：这里的esdata为 顶级volumes下的一项。
    ports:
      - 19201:9200 # http端口，可以直接浏览器访问
      - 19301:9300 # es集群之间相互访问的端口，jar之间就是通过此端口进行tcp协议通信，遵循tcp协议。
    networks:
      - esnet
  es02: # 服务名称
    image: elasticsearch:5.6.8 # 使用的镜像
    container_name: es02 # 容器名称
    restart: always # 失败自动重启策略
    environment:
      - node.name=es02 # 节点名称，集群模式下每个节点名称唯一
      #- network.publish_host=192.168.81.130 # 用于集群内各机器间通信,对外使用，其他机器访问本机器的es服务，一般为本机宿主机IP
      - network.host=0.0.0.0 # 设置绑定的ip地址，可以是ipv4或ipv6的，默认为0.0.0.0，即本机
      #- discovery.seed_hosts=192.168.81.130,192.168.81.131,192.168.81.132
      #- discovery.seed_hosts=es02 # es7.0之后新增的写法，写入候选主节点的设备地址，在开启服务后，如果master挂了，哪些可以被投票
选为主节点
      #- cluster.initial_master_nodes=192.168.81.130,192.168.81.131,192.168.81.132
      #- cluster.initial_master_nodes=es01,es02 # es7.0之后新增的配置，初始化一个新的集群时需要此配置来选举master
      - cluster.name=elasticsearch-cluster # 集群名称，相同名称为一个集群， 三个es节点须一致
      #- http.cors.enabled=true # 是否支持跨域，是：true // 这里设置不起作用，但是可以将此文件映射到宿主机进行修改，然后重启，解
决跨域
      #- http.cors.allow-origin="*" # 表示支持所有域名      // 这里设置不起作用，但是可以将此文件映射到宿主机进行修改，然后重启，
解决跨域
      - bootstrap.memory_lock=true # 内存交换的选项，官网建议为true。锁定物理内存地址，防止es内存被交换出去，也就是避免es使用swap
交换分区，频繁的交换，会导致IOPS变高。
      #- discovery.zen.ping.unicast.hosts= 127.0.0.1:19301,127.0.0.1:19302
      - "ES_JAVA_OPTS=-Xms128m -Xmx128m" # 设置内存，如内存不足，可以尝试调低点
    ulimits: # 栈内存的上限
      memlock:
        soft: -1 # 不限制
        hard: -1 # 不限制
    volumes:
      - /data/elasticsearch/config/es02/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      #- esdata02:/usr/share/elasticsearch/data # 存放数据的文件， 注意：这里的esdata为 顶级volumes下的一项。
    ports:
      - 19202:9200 # http端口，可以直接浏览器访问
      - 19302:9300 # es集群之间相互访问的端口，jar之间就是通过此端口进行tcp协议通信，遵循tcp协议。
    networks:
      - esnet
networks:
  esnet:
```

###### 2、es01-elasticsearch.yml

> 需将文件的权限设为777或755 `chmod 777 es01-elasticsearch.yml `

```yaml
#跨域设置
http.cors.enabled: true
http.cors.allow-origin: "*"
#集群
#集群名每个节点的名都要一样的
cluster.name: elasticsearch-cluster
#节点名，每个节点名都不一样
node.name: es01
#这个属性表示节点是否具有成为主节点的资格，注意：此属性的值为true，并不意味着这个节点就是主节点。因为真正的主节点，是由多个具有主节点资格的节点进行选举产生的。所以，这个属性只是代表这个节点是不是具有主节点选举资格。
node.master: true
#这个属性表示节点是否存储数据。
node.data: true
#内存交换的选项，官网建议为true。锁定物理内存地址，防止es内存被交换出去，也就是避免es使用swap交换分区，频繁的交换，会导致IOPS变高。
bootstrap.memory_lock: true
#必须为本机的ip地址
network.host: 0.0.0.0
#服务器端口
http.port: 9200
#集群间通信端口
transport.tcp.port: 9300
#设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["es01","es02"]
#一台服务器只能有2个节点
discovery.zen.minimum_master_nodes: 2
```

###### 3、es02-elasticsearch.yml

> 需将文件的权限设为777或755 `chmod 777 es01-elasticsearch.yml `

```yaml
#跨域设置
http.cors.enabled: true
http.cors.allow-origin: "*"
#集群
#集群名每个节点的名都要一样的
cluster.name: elasticsearch-cluster
#节点名，每个节点名都不一样
node.name: es02
#这个属性表示节点是否具有成为主节点的资格，注意：此属性的值为true，并不意味着这个节点就是主节点。因为真正的主节点，是由多个具有主节点资格的节点进行选举产生的。所以，这个属性只是代表这个节点是不是具有主节点选举资格。
node.master: true
#这个属性表示节点是否存储数据。
node.data: true
#内存交换的选项，官网建议为true。锁定物理内存地址，防止es内存被交换出去，也就是避免es使用swap交换分区，频繁的交换，会导致IOPS变高。
bootstrap.memory_lock: true
#必须为本机的ip地址
network.host: 0.0.0.0
#服务器端口
http.port: 9200
#集群间通信端口
transport.tcp.port: 9300
#设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["es01","es02"]
#一台服务器只能有2个节点
discovery.zen.minimum_master_nodes: 2
```

> 文件编辑好后执行docker-compose up -d 生成节点；
>
> 检查集群状态：`curl http://127.0.0.1:9200/_cat/health`

> 节点正常显示

``` html
1618980399 04:46:39 elasticsearch-cluster green 2 2 0 0 0 0 0 0 - 100.0%
```

###### 4、集群过成中报错解决

> 报错1:

``` java
bootstrap checks failed max virtual memory areas vm.max_map_count [65530] likely too low, increase to at least [262144]
```

> 解决方法：

``` shell
本机系统中：
vim /etc/sysctl.conf
在sysctl.conf中加入 vm.max_map_count=262144 
使其生效：sysctl -p
```

> 报错2:

``` java
bootstrap checks failed  max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
```

> 解决方法：

``` shell
本机系统中：
编辑 /etc/security/limits.conf，追加以下内容；
* soft nofile 65536
* hard nofile 65536
此文件修改后需要重新登录用户，才会生效
```

### 19.Nacos安装

#### 19.1镜像拉取

```shell
docker pull nacos/nacos-server:latest
```

#### 19.2远程mysql创建

在mysql中创建nacos数据库，并执行数据表创建脚本

![image-20210608231436078](.\images\image-20210608231436078.png)

下载地址：[https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Falibaba%2Fnacos%2Fblob%2Fmaster%2Fconfig%2Fsrc%2Fmain%2Fresources%2FMETA-INF%2Fnacos-db.sql)

#### 19.3nacos远程mysql配置

修改配置文件application.properties

```properties
# spring
server.servlet.contextPath=/nacos
server.contextPath=/nacos
server.port=8848
spring.datasource.platform=mysql
nacos.cmdb.dumpTaskInterval=3600
nacos.cmdb.eventTaskInterval=10
nacos.cmdb.labelTaskInterval=300
nacos.cmdb.loadDataAtStart=false
db.num=1
#db.url.0=jdbc:mysql://${MYSQL_SERVICE_HOST}:${MYSQL_SERVICE_PORT:3306}/${MYSQL_SERVICE_DB_NAME}?${MYS
QL_SERVICE_DB_PARAM:characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&u
seSSL=false}
#db.url.1=jdbc:mysql://${MYSQL_SERVICE_HOST}:${MYSQL_SERVICE_PORT:3306}/${MYSQL_SERVICE_DB_NAME}?${MYS
QL_SERVICE_DB_PARAM:characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&u
seSSL=false}

db.url.0=jdbc:mysql://1.15.71.35:13306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketT
imeout=3000&autoReconnect=true
db.user=XXXX
db.password=XXX
### The auth system to use, currently only 'nacos' is supported:
nacos.core.auth.system.type=nacos


### The token expiration in seconds:
nacos.core.auth.default.token.expire.seconds=${NACOS_AUTH_TOKEN_EXPIRE_SECONDS:18000}

### The default token:
nacos.core.auth.default.token.secret.key=${NACOS_AUTH_TOKEN:SecretKey012345678901234567890123456789012
345678901234567890123456789}

### Turn on/off caching of auth information. By turning on this switch, the update of auth information
 would have a 15 seconds delay.
nacos.core.auth.caching.enabled=${NACOS_AUTH_CACHE_ENABLE:false}
nacos.core.auth.enable.userAgentAuthWhite=${NACOS_AUTH_USER_AGENT_AUTH_WHITE_ENABLE:false}
nacos.core.auth.server.identity.key=${NACOS_AUTH_IDENTITY_KEY:serverIdentity}
nacos.core.auth.server.identity.value=${NACOS_AUTH_IDENTITY_VALUE:security}
server.tomcat.accesslog.enabled=${TOMCAT_ACCESSLOG_ENABLED:false}
server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b %D
# default current work dir
server.tomcat.basedir=
## spring security config
### turn off security
nacos.security.ignore.urls=${NACOS_SECURITY_IGNORE_URLS:/,/error,/**/*.css,/**/*.js,/**/*.html,/**/*.m
ap,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/v1/auth/**,/v1/console/health/**,/actuator/**,
/v1/console/server/**}
# metrics for elastic search
management.metrics.export.elastic.enabled=false
management.metrics.export.influx.enabled=false

nacos.naming.distro.taskDispatchThreadCount=10
nacos.naming.distro.taskDispatchPeriod=200
nacos.naming.distro.batchSyncKeyCount=1000
nacos.naming.distro.initDataRatio=0.9
nacos.naming.distro.syncRetryDelay=5000
nacos.naming.data.warmup=true
```

#### 19.4nacos启动

```shell
docker  run --name nacos -itd -p 8848:8848 --privileged=true --restart=always -e JVM_XMS=256m -e JVM_XMX=256m -e MODE=standalone -e PREFER_HOST_MODE=hostname -v /data/nacos/logs:/home/nacos/logs -v /data/nacos/config/application.properties:/home/nacos/conf/application.properties nacos/nacos-server
或：
docker run --name nacos -itd -p 18848:8848 --privileged=true --restart=always -e MODE=standalone -v /data/nacos/logs:/home/nacos/logs -v /data/nacos/config/application.properties:/home/nacos/conf/application.properties nacos/nacos-server
```

### 20.sentinel安装

```shell
docker pull bladex/sentinel-dashboard:latest
```

```shell
 docker run -itd -p 18858:8858 --restart=always --name sentinel bladex/sentinel-dashboard
```

### 21.Zipkin安装

```shell
docker pull openzipkin/zipkin:latest
```

```shell
 docker run -itd -p 19411:9411 --restart=always --name zipkin openzipkin/zipkin
```



