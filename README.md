# news-toutiao

### 黑马头条后台管理系统练习

写到一半发现老师并没有使用vuex，一开始CLI也没注意直接就把全家桶装上了，自己就又抽离了几个独立组件把数据存到store当中。封装组件之后自然就牵扯到各种父子之间的通信、子与子之间的通信等等。因为老师的视频里并没有进行封装，就当是独立复习vue2的通信知识了。

总之起因都是因为自己封装组件的问题，可能也是之前看why老师的视频比较多，牢记封装思想，但封装的组件复用性没有那么强，还是技术不到位吧......

不过封装组件的过程还是十分快乐的，虽然一直有一大堆数据传递的bug，但看到把主页面的代码不断抽离压缩，真的好爽。

### 最大的问题

关于element-tiptap插件问题：运行时出现了Duplicate use of selection JSON ID cell报错导致项目卡死，虽然能通过改node_modules文件名来解决，但确实带来了不少麻烦，目前github里虽然有提到但是并没有完全解决，头疼。

### 遇到比较坑的问题

1. layout导航布局问题：侧边导航栏用element-ui自带的伸缩功能会有卡顿，大概是在展开时不流畅，因此选择了关闭element-ui的动效自己手撸了一个简单的transition。

2. 侧边导航栏有1px多余边框问题：布局后进行展开伸缩发现边框那里多了1px，十分不美观，之后选择手动添加样式

   ```less
   .el-menu {
     border-right-width: 0 !important;
   }
   ```

3. vue-particles使用背景所处的位置不对：需要通过调整样式定位来让背景与登录界面重合

   ```less
   .bg-position {
       position:absolute;
       width: 100vw;
       height: 100vh;
       top: 0;
       left: 0;
   }
   ```

   

4. 关于axios的post方法，个人使用的是通过axios.get、axios.post等方法进行封装，在**发布文章**时发现了参数问题

```javascript

axios({
    method:"POST",
    url,
    data:{},
    params:{}
})
//通过post请求时data被独立出来放到了第二个参数，config用来存放params
axios.post(url,data,config)
```

> 当时这个bug找了好久，一直以为axios.get(url,{data,params})这样使用，请求一直返回400参数错误，后来查找官方文档又看了看参数列表才找到问题。



5. 独立封装queryCard和tableCard传值问题：由于将内容管理页面里大模块抽离成组件，主要问题在于在queryCard当中查询条件过后如何更新tableCard中的数据。


解决方案：在queryCard当中筛选的数据存入vuex中，在tableCard使用mapState将数据映射到组件里，之后使用watch监听器来监听articles的变化，赋新值给tableCard里。



6. my-radio组件之前封装残留的问题：关于radio的选中选项之前保存到vuex里的根模块当中，而在不同组件当中使用radio会导致选项混乱从而影响查询文章内容。

解决方案：将选中的选项分模块存放到vuex中，保证不同组件使用时其选项互不干扰。



7. 关于发布文章功能post请求一直返回状态码507问题：因为自己独立封装了channel组件，把默认的"全部"选项放了进去，导致发布文章一直不成功。

解决方案：对channel的第一个选项"全部"添加v-if判断，通过外界来决定是否显示。



8. 富文本编辑器tiptap使用报错：Duplicate use of selection JSON ID cell

解决方案：在项目目录下找打 node_modules/tiptap-extensions/node-modules，把最后的 node-modules 目录名字修改为 node-modules–



9. 关于头像上传步骤：

> 1. 使用input组件，将type设置为file，即可实现文件上传
>
> 2. 将input隐藏hidden，绑定ref，方便点击头像组件调用
> 3. 头像点击@click="$refs.file.click()"来触发input选择文件
> 4. input绑定change事件

```javascript
onFileChange() {
    //用于生成文件url，绑定到img元素上
    const file = this.$refs.file;
    const blobData = window.URL.createObjectURL(file.files[0]);
    this.previewImage = blobData;
    this.dialogVisible = true;
    //解决选择相同文件不触发该函数问题
    this.$refs.file.value = "";
},
```



10. 关于素材管理和发布文章时选择封面图片冲突问题：这个问题是我偶然发现的，在完成选择封面图片功能后再看素材管理的页面发现样式错乱了，先过了一遍素材管理页面的代码，自己也没有动过，果断F12看样式问题，才发现是因为选择封面时因为有了相同的类名都包裹着el-row，应该是出现了样式传递这样的错误。

    解决方案：给style标签添加scoped

    ```css
    <style lang="less" scoped> 
    .imageBox {
      width: 100px;
      height: 100px;
      margin-top: 20px;
      cursor: pointer;
      overflow: hidden;
    
      .cover {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .coverActive {
        transform: translateY(-105px);
      }
    }
    </style>
    ```

    
