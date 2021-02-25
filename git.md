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
#需要先用 git add 命令告诉 Git 将文件添加进暂存区开始对这些文件进行跟踪，然后git commit -m '初始化项目版本'提交本地仓库：
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

```git
#对新增或修改文件进行跟踪，将一个文件添加进暂存区
git add .
#提交本地仓库
git commit -m “安装教程测试”
#将本地仓库文件提交到master仓库
git push origin master  
```

注意：提交命令有两个，git push origin master（正常提交）和git push origin master -f（强制提交，强制提交可能会把之前的commit注释信息更新，不会改变修改的代码，慎用），都是提交到master分支

# 三、常用命令

#### 1、克隆

```git
git clone <repo> | <directory>
repo:Git 仓库,directory:本地目录(directory可省略)
```

#### 2、显示当前的 git 配置信息

```git
git config --list
```

#### 3、编辑git配置文件

```git
git config -e  # 针对当前仓库 
git config -e --global   # 针对系统上所有仓库
```

#### 4、文件比较

##### 1）尚未缓存的改动（显示暂存区和工作区的差异）

```git
git diff [file]
```

##### 2)查看已缓存的改动（显示暂存区和上一次提交(commit)的差异）

```git
 git diff --cached [file]
 或
 $ git diff --staged [file]
```

##### 3)查看已缓存的与未缓存的所有改动

```git
git diff HEAD
```

##### 4)显示摘要而非整个 diff

```git
git diff --stat
```

##### 5）显示两次提交之间的差异

```git
git diff [first-branch]...[second-branch]
```

#### 5、分支

##### 1）切换到某一分支

```git
git checkout 分支名称
```

##### 2）只创建分支没有主动切换

需要手动的使用git checkout 分支名来切换

```git
git branch 分支名
```

##### 3）创建新分支并立即切换到该分支

```git
git checkout -b (branchname) 
```

##### 4）查看所有分支

```git
git branch -a
或
git branch
```

##### 5）根据指定版本号创建分支

```test
git checkout -b branchName commitId(hashcode)
```

##### 6）分支模糊查找

```git
git branch | grep 'branchName'
```

##### 7）合并分支

```git
git merge 原分支  目标分支
```

##### 8）合并冲突

```
#目标分支
git merge
#手动修改冲突文件
vim runoob.php 
#查看状态
git status -s
#将文件添加到缓存区
git add .
#提交
git commit
```

#### 6、删除

##### 1)删除分支

```git
git branch -d (branchname)
```

##### 2）将文件从暂存区和工作区中删除

```git
git rm 文件名
```

##### 3）如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f

```git
git rm -f 文件名
```

![rm-f](E:\gitTest\images\rm-f.jpg)

##### 4)如果想把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 --cached 选项即可

```git
git rm --cached 文件名
```

![rm--cached](E:\gitTest\images\rm--cached.jpg)

##### 5)递归删除

即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件

```git
git rm –r * 
```

#### 7、查看当前git状态

```git
git status
```

#### 8、将文件添加到缓存区

```git
git add 文件名
```

##### git add可以分两条底层命令实现：

```git
git hash-object <文件名>
	Git将会根据新生成的文件产生一个长度为40的SHA-1哈希字符串，并在.git/objects目录下生成一个以该SHA-1的前两个字符命名的子目录，然后在该子目录下，存储刚刚生成的一个新文件，新文件名称是SHA-1的剩下的38个字符。
git update-index <文件名>
	将会更新.git/index索引，使它指向新生成的objects目录下的文件
```

缓存区的理解可参考：https://www.cnblogs.com/cposture/p/4178003.html

#### 9、查看日志(可以查询到commitid既hashcode)

```git
# 查看历史提交记录。(可以查询到commitid既hashcode)
git log --stat
# 以列表形式查看指定文件的历史修改记录。
git blame <file> 
```

##### 10、查看某个文件在某次提交中的修改

```git
git show <hashcode> <filename>

git show 41f90bd685e81870baf641c5d2d82481c3677cb9 /E/gitTest/git.md
```

![gitinfo](E:\gitTest\images\gitinfo.jpg)

##### 11、查看某个文件的包含提交人员，日期、版本号等记录信息，不包括修改详情

```git
git whatchanged <filename>
git whatchanged /E/gitTest/git.md
```

##### 12、在review时查看某次提交修改详情

```git
git show <hashcode>
或
git log -p <hashcode>
```

##### 13、获取当前版本的commit id

###### 获取当前版本的完整commit id（如：bb4f92a7d4cbafb67d259edea5a1fa2dd6b4cc7a）

```git
git rev-parse HEAD
```

###### 获取short commit id（如：bb4f92a）

```git
git rev-parse --short HEAD
```

##### 14、清理本地无效分支(远程已删除本地没删除的分支)

```git
git fetch -p
```

##### 15、git tag 标签简介

如果你达到一个重要的阶段，并希望永远记住那个特别的提交快照，你可以使用 git tag 给它打上标签。

比如说，我们想为我们的 runoob 项目发布一个"1.0"版本。 我们可以用 git tag -a v1.0 命令给最新一次提交打上（HEAD）"v1.0"的标签。

-a 选项意为"创建一个带注解的标签"。 不用 -a 选项也可以执行的，但它不会记录这标签是啥时候打的，谁打的，也不会让你添加个标签的注解。 我推荐一直创建带注解的标签。

```git
1、git tag --list 列出所有的标签
2、git tag <your_tag_name> 创建一个标签
3、git tag -a <your_tag_name> -m ‘your_tag_description’ 创建一个带有注释的标签
4、git show <your_tag_name> 查看标签信息
5、git ls-remote --tags origin 查看所有的远程标签及commit ID
6、git tag -d <your_tag_name> 删除一个标签
7、git push --delete origin <your_tag_name> 删除远程仓库的标签
8、git push origin <your_tag_name> 推送一个标签到远程
9、git push origin --tags 推送多个本地标签到远程
```

###### 2)删除远程标签时遇到的问题

```html
	起因：由于每次上线都会打一个标签，因此标签库存在多个标签。想要删除全部的无效标签。 结果执行完毕删除远程标签和删除本地标签后。 发现其他同事再次推送的时候， 删除的那些标签又莫名其妙的回来了。
	原因: 这是因为其他同事的本地标签没有清理，这时候就必须要其他同事全部都要清理本地的标签。 (很显然这行不通，很难。)
解决办法：
	使用 git tag -l | xargs -n 1 git push --delete origin 命令一条一条的删除远程仓库.
	然后再用 git tag -l | xargs git tag -d 清理本地仓库。 (此方法楼主已经测试并且可用) 。
```

#### 16、关联

##### 1）添加关联

```git
git remote add 远程库起的名称(默认是origin) 远程库
```

##### 2）删除关联

```git
git remote rm 远程库起的名称(默认是origin)
```

##### 3)多仓库关联

```
git remote add 远程库起的名称(不能使用默认名origin) 远程库
git remote add 远程库起的名称(不能使用默认名origin) 远程库
```

##### 4）查看远程库信息

```
git remote -v 
```

#### 17、其他命令

###### 可参考码云v1.2手册： http://git.mydoc.io/?t=180676