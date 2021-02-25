# 一、git项目创建

1、本地创建一个git本地仓库也就是一个文件夹。例如：gitTest(名字自己随意)

2、进入文件夹后右击鼠标，选择Git Bash Here

![githere](E:\gitTest\images\githere.jpg)

3、设置git基础信息,全局变量

```git
git config --global user.name "你的名字或昵称"
git config --global user.email "你的邮箱"
git config --global user.password "你的密码"
```

4、初始化

1）如果用户在github创建线上仓库时如果没有初始化就需要使用以下命令初始化

```git
本地创建git初始化文件README.md，内容是# git仓库名
echo "# stduyMaterial" >> README.md
#将本地文件夹初始化成本地仓库
git init
#需要先用 git add 命令告诉 Git 开始对这些文件进行跟踪，然后git commit -m '初始化项目版本'提交本地仓库：
git add README.md
git commit -m "fist commit"
#重命名分支，如果newbranch名字分支已经存在，则需要使用-M强制重命名，否则，使用-m进行重命名。
git branch -M main
```

2）如果用户在github创建线上仓库时已经初始化

```git
git init
```

5、将本地仓库与远程仓库关联

```git
git remote add origin <你的项目地址> //注:项目地址形式为:https://gitee.com/xxx/xxx.git或者 git@gitee.com:xxx/xxx.git
```

6、将本地仓库信息更新到远程git(只有远程仓库没有初始化时需要创建时执行此步骤)

```git
#更新本地仓库到远程main仓库
git push -u origin main
```

# 二、更新git

1、在你clone下来的git项目里增加文件如test.txt

2、执行下列命令进行数据更新

```git
#对新增或修改文件进行跟踪
git add .
#提交本地仓库
git commit -m “安装教程测试”
#将本地仓库文件提交到master仓库
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