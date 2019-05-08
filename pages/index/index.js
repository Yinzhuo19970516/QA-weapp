const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const db = wx.cloud.database()
var util = require('../../utils/util.js');
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
    question: "",
    //弹窗参数
    dialogvisible: false,
    options: {
      showclose: true,
      showfooter: true,
      closeonclickmodal: true,
      fullscreen: false
    },
    title: '恭喜您获得200积分',
    opacity: '0.7',
    content: '您被挑选为幸运用户，特赠送您200积分，积分可以用来发布问题时悬赏积分，也可以花费积分查看问题答案，点击确定去查看我的积分',
  },
  onLoad: function() {
    // wx.request({
    //   url: 'http://localhost:5000/ask_question',
    //   method:'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   data:{
    //     question: '毓泽奇的招生计划'
    //   },
    //   success:(res)=>{
    //     console.log(res.data)
    //   }

    // })
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
        app.globalData.openid = res.result.openid
        db.collection('person').where({
            _openid: res.result.openid
          })
          .get({
            success: res => {
              //console.log(res.data[0])
              if (res.data[0].is_new) {
                app.globalData.person = res.data[0];
                wx.setStorage({
                  key: 'person',
                  data: res.data[0],
                })
                this.setData({
                  dialogvisible: true
                })
              }else{
                wx.setStorage({
                  key: 'person',
                  data: res.data[0],
                })
              }

            }
          })
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
    if (e.scrollTop > 400) {
      this.setData({
        animals_flag: !this.data.animals_flag
      })
    }
  },
  //弹窗
  handleConfirm() {
    wx.navigateTo({
        url: '../message/message'
      }),
      this.handleClose();
  },
  handleClose() {
    this.setData({
      dialogvisible: false
    })
  },
  handleOpen() {

    db.collection('person').doc(app.globalData.person._id).update({
      data: {
        is_new: false,
      },
      success: res => {

      }

    })
  },
  // onHide:function(){
  //   db.collection('person').doc(app.globalData.person._id).get({
  //     success:res=>{
  //       console.log(res)
  //     }
  //   })
  // },
  // onUnload: function () {

  // }
});