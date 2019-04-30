const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const db = wx.cloud.database()
Page({
  data: {
    question_id: '',
    //搜索
    inputShowed: false,
    inputVal: "",
    //轮播图
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    banner_list: [],
    //排行榜
    tabs: ["积分榜", "悬赏榜", "达人榜"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    animals_flag: false,
    question: ""
  },
  onLoad: function() {

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        app.globalData.userInfo = res.data
      },
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    this.getBanner();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getQuestion();

    db.collection('sort_question').get({
      success: res => {
        app.globalData.accounts = res.data[0].sort_name
      },
      fail: err => {
        conosle.log(err);
      }
    })
  },
  //获取banner图
  getBanner() {
    db.collection('banner').get({
      success: res => {
        this.setData({
          banner_list: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  getQuestion: function() {

    db.collection('question')
      .skip(0)
      .limit(5)
      .get()
      .then(res => {
        this.setData({
          question: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  //搜索
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //轮播图
  animationChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // swiperChange: function (e) {
  //   this.setData({
  //     swiperCurrent: e.detail.current
  //   })
  // },
  //点击指示点切换
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  JumptoQa: function() {
    wx.switchTab({
      url: '/pages/qa/qa',
    })
  },
  //排行榜
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //动物
  exchange_animals: function() {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  },
  jumpToQusetion: function() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },
  onPageScroll(e) {
    let timeout = null;
    if(timeout != null) clearTimeout();
    timeout = setTimeout(()=>{
      console.log(e)
    },500 );
  },
  debounce:function(func) {
    let timeout;
    return function(event) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.call(this, event)
      }, 500);
    };
  }
});