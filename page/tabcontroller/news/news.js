Page({
    data: {
        count: 0,
        urlparam: 'T1348647853363',
        inputValue: "",

        navitems: [{
            title: '头条',
            urlparam: 'T1348647853363'
        }, {
            title: 'NBA',
            urlparam: 'T1348649145984'
        }, {
            title: '手机',
            urlparam: 'T1348649654285'
        },
            {
                title: '移动互联',
                urlparam: 'T1351233117091'
            },
            {
                title: '娱乐',
                urlparam: 'T1348648517839'
            },
            {
                title: '时尚',
                urlparam: 'T1348650593803'
            },
            {
                title: '电影',
                urlparam: 'T1348648650048'
            }
        ],

    //    分类
        showflag:true,
        // 加载按钮
        disabled: false,
        plain: true,
        loading: false,
        hidden:false,
        items: [],

        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 3000,
        duration: 1000

        // text:"这是一个页面"
    },


    onLoad: function () {
        this.fetchData()
    },

    onReady: function () {
        // 页面渲染完成
    this.iconAnimation = wx.createAnimation({
        duration:400,
    })
    this.opictyAnimation = wx.createAnimation({
        duration:400,
    })
     this.categroyAnimation = wx.createAnimation({
        duration:900,
       
    })
    },
    onShow: function () {
     
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },

    fetchData: function (data) {
        var that = this
        let url = 'http://c.m.163.com/nc/article/list/' + that.data.urlparam + '/'+that.data.count+'-10.html'
     
        console.log(url)
        wx.request({
            url: url,
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function (res) {
                //获取到了数据
                var newData = res.data;
              
          
                    that.setData({
                        items: that.data.items.concat(newData[that.data.urlparam]),
                        loading: false,
                       
                    })
               
                    setTimeout(function () {
                    that.setData({
                    hidden: true
                     });
                   }, 300);
            }
            
        });

    },
// 加载更多新闻
    lower: function () {
        var that = this
      
        let offset = that.data.count + 10
        that.setData({
            count: offset,
            loading: true,
            hidden: true,
        })
        that.fetchData();
    },

//加载板块新闻
    getnews: function (event) {
        var that =this
        let urlparam = event.currentTarget.dataset.hi
        that.setData({
            urlparam: urlparam,
            count: 0,
            ad:false,
            hidden: false,
            items:[]
        })
        //网络请求
        that.fetchData();
        if( that.data.showflag == false){
          that.hiddencategory()
        }
     
    },
    getcategory:function(){
        var that =this 
     
        that.data.showflag?that.showcategory():that.hiddencategory()
      
     
  
    },
    showcategory:function(){
        console.log('show');
        this.iconAnimation.rotate(45).step()
    this.opictyAnimation.opacity(0).step()
    this.categroyAnimation.translateY(830).step()
    this.setData({ 
          iconAnimation: this.iconAnimation.export(),
            opictyAnimation: this.opictyAnimation.export(),
          categroyAnimation:this.categroyAnimation.export(),
          showflag:false
          })
    },
      hiddencategory:function(){
           console.log('hidden');
    this.iconAnimation.rotate(90).step()
      this.opictyAnimation.opacity(1).step()
    this.categroyAnimation.translateY(-830).step()
    this.setData({ 
          iconAnimation: this.iconAnimation.export(),
           opictyAnimation: this.opictyAnimation.export(),
          categroyAnimation:this.categroyAnimation.export(),
           showflag:true
          })
    }
   

})

