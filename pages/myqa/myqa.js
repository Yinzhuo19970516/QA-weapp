const app = getApp()
const db = wx.cloud.database()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["我的回答", "我的提问", "我的收藏"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    question:""
  },
  onLoad: function (options) {
    this.setData({
      activeIndex:options.flag
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getQuestion()
    this.getAnswer()
  },
  getQuestion:function(){
    console.log(app.globalData)
    db.collection('question').where({
      _openid: app.globalData.openid
    }).get({
      success:res=>{
        this.setData({
          question:res.data
        })
        console.log(res.data)
      },
      fail:err=>{
        console.log(err.data)
      }
    })
  },
  getAnswer:function(){
    db.collection('answer').where({
      _openid: app.globalData.openid
    }).get({
      success:res=>{
        this.setData({
          answer: res.data
        })
        console.log("answer:",res.data)
      },
      fail: err => {
        console.log(err.data)
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});