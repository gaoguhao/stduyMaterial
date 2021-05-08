# 1、ElasticSearch搜索

## 1.1、java直接使用ElasticSearch

**java基本操作Elasticsearch需要elasticsearch与transport2个基础插件，根据Elasticsearch版本不同选择对应的插件版本。**

###  1.1.1创建通用client方法

```java
private TransportClient client;
public void init() throws Exception{
    //1、创建setting对象,配置集群信息
    Settings settings=Settings.builder()
        //配置ElasticSearch集群信息，elasticsearch-cluster为集群名
        .put("cluster.name","elasticsearch-cluster")
        .build();
    //2、创建elasticSearch客户端transportClient对象
    client=new PreBuiltTransportClient(settings)
        //配置ElasticSearch各节点数据信息
        .addTransportAddresses(
        new InetSocketTransportAddress(InetAddress.getByName("1.15.71.35"),19301),
        new InetSocketTransportAddress(InetAddress.getByName("1.15.71.35"),19302)
    );
}
```

### 1.1.2使用client创建索引及创建type与mapping

```java
public void createIndexs() {
    //3、使用客户端transportClient对象创建索引
    client.admin()
        .indices()
        .prepareCreate("gao-java")
        .get();
    //4、关闭客户端transportClient对象
    client.close();
}
```

**创建type与mappings，mappings内document数据的创建有2种方法一种是XContentBuilder结构，一种 是json格式字符串**

#### 1.1.2.1 使用XContentBuilder创建type

```java
public void createMapping() throws IOException {
    //设置mapping信息
    XContentBuilder xContentBuilder= XContentFactory.jsonBuilder()
            .startObject()
                //设置type名
                .startObject("newser")
                    //document名
                    .startObject("properties")
                        //field名
                        .startObject("id")
                            .field("type","long")
                            .field("store",true)
                        .endObject()
                        .startObject("name")
                            .field("type","text")
                            .field("store",true)
                            .field("index","analyzed")
                            .field("analyzer","ik_smart")
                        .endObject()
                        .startObject("tittle")
                            .field("type","text")
                            .field("store",true)
                            .field("index","analyzed")
                            .field("analyzer","ik_max_word")
                        .endObject()
                            .startObject("searchName")
                            .field("type","text")
                            .field("store",true)
                            .field("index","analyzed")
                            .field("analyzer","standard")
                        .endObject()
                    .endObject()
                .endObject()
            .endObject();
    //type mappings创建
    client.admin()
            .indices()
            .preparePutMapping("gao-java")
            .setType("newser")
            .setSource(xContentBuilder)
            .get();
    //关闭
    client.close();
}
```

#### 1.1.2.2给document添加数据

##### 1.1.2.2.1使用XContentBuilder给document添加数据

```java
public void insertDocument() throws IOException {
    XContentBuilder contentBuilder=XContentFactory.jsonBuilder()
        .startObject()
        .field("id",1l)
        .field("name","青春之清华 青春之中国")
        .field("tittle","参观美术学院校庆特别展、看望正在训练中的校篮球运动员、考察成像与智能技术实验室和重点教学科研成果展示、同师生代表亲切座谈，清华 “学长”习近平为母校110周年校庆送上祝福，也为我国高等教育发展勾画蓝图。")
        .field("searchName","qczqh")
        .endObject();
    //设置索引，type.id
    client.prepareIndex("gao-java","newser","1")
        //设置document内容
        .setSource(contentBuilder)
        //执行操作
        .get();
    client.close();
}
```

##### 1.1.2.2.2使用json给document添加数据，需要使用jackson框架

> 创建pojo,newser类

```java
//创建pojo,newser类
public class Newer {
    private long id;
    private String name;
    private String tittle;
    private String searchName;
    
    public long getId() {return id; }
    public void setId(long id) { this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getTittle() { return tittle;}
    public void setTittle(String tittle) {this.tittle = tittle;}
    public String getSearchName() {return searchName;}
    public void setSearchName(String searchName) {this.searchName = searchName;}
    @Override
    public String toString() {
        return "Newer{" + "id=" + id + ", name='" + name + '\'' + ", tittle='" + tittle + '\'' + ", searchName='" + searchName + '\'' + '}';
    }
}
```

> 导入jackson包

```yaml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.6</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.6</version>
</dependency>
```

> 编写json给document添加数据

```java
public void baseSearch(String index,String type,QueryBuilder queryBuilder){
    //通过查询条件queryBuilder查询index里的数据
    SearchResponse searchResponse = client.prepareSearch(index)
        .setTypes(type)
        .setQuery(queryBuilder)
        .get();
    //使用迭代器，获取查询结果
    Iterator<SearchHit> iterator = searchResponse.getHits().iterator();
    //循环处理数据结果
    while (iterator.hasNext()){
        //获取每一条数据结果，以map串格式
        Map<String, Object> source = iterator.next().getSource();
        System.out.println(source);
        //获取文档对象，以map串格式输出
        System.out.println("**************以map串格式输出**************");
        System.out.println(source.get("id"));
        System.out.println(source.get("name"));
        System.out.println(source.get("tittle"));
        System.out.println(source.get("searchName"));
    }
    /**
    //通过getHits获取查询结果列表，此数据是数组
    SearchHit[] searchHit = searchResponse.getHits().getHits();
    for (SearchHit searchHitFields : searchHit) {
        //获取文档对象，以json字符串格式显示
        String sourceAsString = searchHitFields.getSourceAsString();
        //打印文档对象，以json字符串格式输出
        System.out.println("**************以json字符串格式输出**************");
        System.out.println(sourceAsString);
    }
    */
}
```

### 1.1.3数据查询

查询需要通过QueryBuilder进行查询条件数据设置，查询结果可以通过迭代器iterator与getHits2种方式将数据显示出来；

#### 1.1.3.1查询及结果处理配置

```java
//1.基础baseSearch
public void baseSearch(String index,String type,QueryBuilder queryBuilder){
    //System.out.println("queryBuilder="+queryBuilder);
    //通过查询条件queryBuilder查询index里的数据
    SearchResponse searchResponse= client.prepareSearch(index)
            .setTypes(type)
            .setQuery(queryBuilder)
            //查询结果根据field为id进行正序排列
            .addSort("id", SortOrder.ASC)
            .get();
    //使用迭代器，获取查询结果
    Iterator<SearchHit> iterator = searchResponse.getHits().iterator();
    //循环处理数据结果
    while (iterator.hasNext()){
        //获取每一条数据结果，以map串格式
        Map<String, Object> source = iterator.next().getSource();
        //System.out.println(source);
        //获取文档对象，以map串格式输出
        System.out.println("**************以map串格式输出**************");
        System.out.println(source.get("id"));
        System.out.println(source.get("name"));
        System.out.println(source.get("tittle"));
        System.out.println(source.get("searchName"));
    }
}
//2.分页baseSearch
public void baseSearch(String index,String type,Integer pageNumber,Integer pageSize,QueryBuilder queryBuilder){
    //System.out.println("queryBuilder="+queryBuilder);
    //通过查询条件queryBuilder查询index里的数据
    SearchResponse searchResponse=null;
    if(pageNumber>0&&pageSize>0){
        searchResponse = client.prepareSearch(index)
            .setTypes(type)
            .setQuery(queryBuilder)
            //设置分页从第几个开始
            .setFrom((pageNumber-1)*pageSize)
            //设置每页显示多少个
            .setSize(pageSize)
            //查询结果根据field为id进行正序排列
            .addSort("id", SortOrder.ASC)
            .get();
        //使用迭代器，获取查询结果
        Iterator<SearchHit> iterator = searchResponse.getHits().iterator();
        //循环处理数据结果
        while (iterator.hasNext()){
            //获取每一条数据结果，以map串格式
            Map<String, Object> source = iterator.next().getSource();
            //System.out.println(source);
            //获取文档对象，以map串格式输出
            System.out.println("**************以map串格式输出**************");
            System.out.println(source.get("id"));
            System.out.println(source.get("name"));
            System.out.println(source.get("tittle"));
            System.out.println(source.get("searchName"));
        }
        /*
             //通过getHits获取查询结果列表，此数据是数组
             SearchHit[] searchHit = searchResponse.getHits().getHits();
            //System.out.println(searchResponse);
             for (SearchHit searchHitFields : searchHit) {
             //获取文档对象，以json字符串格式显示
             String sourceAsString = searchHitFields.getSourceAsString();
             //打印文档对象，以json字符串格式输出
             System.out.println("**************以json字符串格式输出**************");
             System.out.println(sourceAsString);
             }
             */
    }else {
        baseSearch(index,type,queryBuilder);
    }
}
//3.高亮baseSearch
public void baseSearch(String index,String type,Integer pageNumber,Integer pageSize,String[] highlightFields,QueryBuilder queryBuilder){
    if(highlightFields.length<=0){
        baseSearch(index,type,pageNumber,pageSize,queryBuilder);
    }else{
        //System.out.println("queryBuilder="+queryBuilder);
        //通过查询条件queryBuilder查询index里的数据
        SearchResponse searchResponse=null;
        //设置高亮显示highlightBuilder

        HighlightBuilder highlightBuilder=new HighlightBuilder();
        for (String highlightField:highlightFields){
            //
            highlightBuilder.field(highlightField);
            highlightBuilder.preTags("<em>");
            highlightBuilder.postTags("</em>");
        }
        if(pageNumber>0&&pageSize>0){
            searchResponse = client.prepareSearch(index)
                .setTypes(type)
                .setQuery(queryBuilder)
                //设置分页从第几个开始
                .setFrom((pageNumber-1)*pageSize)
                //设置每页显示多少个
                .setSize(pageSize)
                //设置高亮显示
                .highlighter(highlightBuilder)
                //查询结果根据field为id进行正序排列
                .addSort("id", SortOrder.ASC)
                .get();
        }else {
            searchResponse = client.prepareSearch(index)
                .setTypes(type)
                .setQuery(queryBuilder)
                //设置高亮显示
                .highlighter(highlightBuilder)
                //查询结果根据field为id进行正序排列
                .addSort("id", SortOrder.ASC)
                .get();
        }
        //通过getHits获取查询结果列表，此数据是数组
        SearchHit[] searchHits = searchResponse.getHits().getHits();
        //System.out.println(searchResponse);
        for (SearchHit searchHit : searchHits) {
            //获取文档对象，以map串格式显示
            Map<String, Object> source = searchHit.getSource();
            //获取文档对象，以map串格式输出
            System.out.println("**************以map串格式输出**************");
            System.out.println(source.get("id"));
            System.out.println(source.get("name"));
            System.out.println(source.get("tittle"));
            System.out.println(source.get("searchName"));
            Map<String, HighlightField> highlightFields1 = searchHit.getHighlightFields();
            //System.out.println(highlightFields1.get());
            for (String highlightField:highlightFields){
                System.out.println("**************高亮输出**************"+highlightField);
                System.out.println(highlightFields1.get(highlightField));
            }
        }
    }
}
```

#### 1.1.3.2根据id查询,addIds可以设置一个或多个id

```java
public void queryESById(){
    //创建一个查询对象
    QueryBuilder queryBuilder= QueryBuilders.idsQuery()
        //addIds可以设置一个或多个id，
        .addIds("1");
    baseSearch("gao-java","newser",0,0,queryBuilder);
}
```

#### 1.1.3.3根据term查询(关键词)

```java
public void queryESByTerm(){
    QueryBuilder queryBuilder=QueryBuilders.termQuery("tittle","全国");
    baseSearch("gao-java","newser",0,0,queryBuilder);
}
```

#### 1.1.3.4根据queryString查询

```java
public void queryESByQueryString(){
    QueryBuilder queryBuilder=QueryBuilders.queryStringQuery("全国医务人员接受过高学历教育")
        //设置默认查询field为tittle，如果不设置就是所有的field都搜索
        .defaultField("tittle");
    baseSearch("gao-java","newser",0,0,queryBuilder);
}
```

#### 1.1.3.5分页查询

需要在查询prepareSearch里设置显示开始id`setFrom((pageNumber-1)*pageSize)`及一页显示的条数`setSize(pageSize)`，如果需要排序则需要设置排序方法,通过field为id字段的正序`addSort("id", SortOrder.ASC)`;

```java
public void queryESByQueryStringMorePages(){
    QueryBuilder queryBuilder=QueryBuilders.queryStringQuery("全国医务人员接受过高学历教育")
        //设置默认查询field为tittle，如果不设置就是所有的field都搜索
        .defaultField("tittle");
    baseSearch("gao-java","newser",2,8,queryBuilder);
}
```

#### 1.1.3.6查询结果高亮处理

**注：**

<strong style="color:red">1.高亮显示与要与查询域一致才会有效果；</strong>

<strong style="color:red">2.QueryBuilders设置多个Field就直接在后面连续添加，`QueryBuilders.queryStringQuery("全国").field("tittle").field("name")`；</strong>

<strong style="color:red">3.高亮设置需要在执行方法`prepareSearch`里进行设置，效果显示须在查询结果里输出，`HighlightBuilder设置可查看代码“1.1.3.1查询及结果处理配置---高亮baseSearch`”；</strong>

```java
public void queryESReturnDateChangeWide(){
        String[] queryField={"tittle","name"};
        //设置默认查询field为tittle，如果不设置就是所有的field都搜索
        QueryBuilder queryBuilder=QueryBuilders.queryStringQuery("全国").field("tittle").field("name");
        baseSearch("gao-java","newser",2,8,queryField,queryBuilder);
    }
```

### 1.1.4关闭client

```java
client.close();
```

