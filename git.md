# 一、克隆git项目

1、本地栏目里新建个文件夹例如gitPro

2、进入gitPro后打开git bash,在栏目里右击快捷选项git bash here

3、设置git基础信息,全局变量

```git
git config --global user.name "你的名字或昵称"
git config --global user.email "你的邮箱"
git config --global user.password "你的密码"
```

4、在gitPro文件夹中执行下面命令，完成初始化

```git
git init
git remote add origin <你的项目地址> //注:项目地址形式为:https://gitee.com/xxx/xxx.git或者 git@gitee.com:xxx/xxx.git
```

5、将项目克隆到本地

```git
git clone <项目地址>
```

6、进入你已经初始化好的或者克隆项目的目录,然后执行：

```git
git pull origin master
```

# 二、更新git

1、在你clone下来的git项目里增加文件如test.txt

2、执行下列命令进行数据更新

```git
git add .

git commit -m “安装教程测试”

git push origin master  
```

注意：提交命令有两个，git push origin master（正常提交）和git push origin master -f（强制提交，强制提交可能会把之前的commit注释信息更新，不会改变修改的代码，慎用），都是提交到master分支

# 三、常用命令

```git
查看所有分支  ：git branch -a

切换到某一分支：git checkout  分支名称

合并分支：git merge 原分支  目标分支
```

其他命令可参考码云v1.2手册： http://git.mydoc.io/?t=180676