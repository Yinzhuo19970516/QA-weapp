var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
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
    banner_list: [
      {
        imgurl: 'http://129.204.118.251:1234/bishe/banner01.jpg',
        question: 'ICU主要收治哪些病人?'
      },
      {
        imgurl: 'http://129.204.118.251:1234/bishe/banner02.jpg',
        question: '2019五一放假几天?'
      },
      {
        imgurl: 'http://129.204.118.251:1234/bishe/banner03.jpg',
        question: '局麻和全麻有好坏之分？'
      },
      {
        imgurl: 'http://129.204.118.251:1234/bishe/banner04.jpg',
        question: '慢性疼痛真的是种病吗？'
      },
      {
        imgurl: 'http://129.204.118.251:1234/bishe/banner05.jpg',
        question: '如何有效预防近视？'
      }
    ],
    //排行榜
    tabs: ["积分榜", "悬赏榜", "达人榜"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    animals_flag: false,
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //轮播图
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  JumptoQa: function () {
    wx.switchTab({
      url: '/pages/qa/qa',
    })
  },
  //排行榜
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //动物
  exchange_animals: function () {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  }
});