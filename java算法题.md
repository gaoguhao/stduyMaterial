# 算法

## 1、递归方式解决二叉树坡度

###  1.1定义方法TreeNode

```java
public class TreeNode {
    public TreeNode left;
    public TreeNode right;
    public int val;
    public TreeNode(){}
    public TreeNode (int val){this.val=val;}
    public TreeNode(int val,TreeNode left,TreeNode right){
        this.val=val;
        this.left=left;
        this.right=right;
    }
}
```

### 1.2将数组转换成二叉树

```java
/**
     * 将数组转换成二叉树存放
     * @param aa 传入数组
     * @return  转换后的二叉树信息
     */
private TreeNode changeTreeNode(int[] aa) {
    List lists=new ArrayList();
    int aLen= aa.length;
    System.out.println("aLen="+aLen);
    if(aLen>0){
        for (int i = 0; i < aLen; i++) {
            TreeNode treeNode=new TreeNode(aa[i],null,null);
            lists.add(treeNode);
        }
        for (int i = 0; i < aLen/2-1; i++) {
            TreeNode o = (TreeNode)lists.get(i);
            if(lists.get(i*2+1)!=null){
                o.left=(TreeNode)lists.get(i*2+1);
            }
            if(lists.get(i*2+2)!=null){
                o.right=(TreeNode)lists.get(i*2+2);
            }
        }
        int lastIndex=aLen/2-1;
        TreeNode tns = (TreeNode) lists.get(lastIndex);
        tns.left=(TreeNode)lists.get(lastIndex*2+1);
        if(aLen%2==1){
            tns.right=(TreeNode)lists.get(lastIndex*2+2);
        }
    }
    return (TreeNode)lists.get(0);
}
```

### 1.3使用递归计算二叉树坡度

```java
public int findTilt(TreeNode root) {
    dsum(root);
    return ress;
}
private int ress=0;
public int dsum(TreeNode root){
    if(root==null){
        return 0;
    }
    int left=dsum(root.left);
    int right=dsum(root.right);
    int val=root.val;
    ress =ress+ Math.abs(left - right);
    return left+right+val;
}
```

### 1.4汇总计算

```java
public void getfindTilt(){
        int[] aa={21,7,14,3,4,6};
        TreeNode lists = changeTreeNode(aa);
        System.out.println(findTilt(lists));
    }
```

## 2、两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

通过逆算及map.containskey来进行快速数据匹配

**使用list方式来存储数据，动态的定义出数组的长度，再通过二次遍历的方式将数据转换成int数组**

```java
public void twoSums(){
    int[] users={2,7,11,15,1,8};
    int targe=9;
    Map<Integer,Integer> map=new HashMap<>();
    List lists=new ArrayList();
    for (int i = 0; i < users.length; i++) {
        int nums=targe-users[i];
        if(map.containsKey(nums)){
            lists.add(i);
            lists.add(map.get(nums));
        }
        map.put(users[i],i);
    }
    int[] ints=new int[lists.size()];
    for (int i = 0; i < lists.size(); i++) {
        ints[i]= (int) lists.get(i);
    }
}
```

## 3.通过map计算最长子串的长度

```java
public int fengData(String s) {
    String s = "abbwetfb";
    char[] chars = s.toCharArray();
    int res = 0;
    int start = 0; // 记录不一样子串的开始位置
    for(int i = 0; i < chars.length; i++) {
        start = Math.max(start,map.getOrDefault(chars[i],-1)+1);
        System.out.println("chars[i]="+chars[i]+",start="+start+",i="+i);
        res   = Math.max(res, i - start + 1);//记录不一样的个数
        System.out.println("res="+res);
        map.put(chars[i],i);
    }
    System.out.println(res);
    //return res;
}
```

## 4.可怜的猪，猪喝毒药通过1头猪喝一排或一列氺来确定快速定位

```java
public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
    int pigs = 0;
	//	Math.pow() 方法用于返回第一个参数的第二个参数次方。
    //minutesToTest / minutesToDie+ 1,吃了n次后我们能确定n+1次的数量，根据猪的不数量不同来进行n次方确定循环次数
    //当n次方后数据大于水桶数就是最小的猪的数量
    while(Math.pow(minutesToTest / minutesToDie + 1, pigs) < buckets)
        pigs++;

    return pigs;
}
```

