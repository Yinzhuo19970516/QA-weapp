const app = getApp()
const db = wx.cloud.database()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    // tabs: ["我的回答", "我的提问", "我的收藏"],
    tabs: ["我的回答", "我的提问"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    question: ""
  },
  onLoad: function(options) {
    console.log(app.globalData)
    wx.getStorage({
      key: 'person',
      success: function (res) {
        console.log(111, res.data)
      },
    })
    this.setData({
      activeIndex: options.flag
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.showLoading({
      title: '正在拼命加载中...',
    })
    this.getQuestion()
    this.getAnswer()
  },
  getQuestion: function() {
    db.collection('question').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        wx.hideLoading();
        this.setData({
          question: res.data
        })
      },
      fail: err => {
        console.log(err.data)
      }
    })
  },
  getAnswer: function() {
    db.collection('answer').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        wx.hideLoading();
        this.setData({
          answer: res.data
        })
      },
      fail: err => {
        console.log(err.data)
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  edit: function(e) {
    var index = e.target.dataset.bindex;
    wx.navigateTo({
      url: '../question/question?question_id=' + this.data.question[index]._id,
    })
  },
  remove: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您真的要删除吗？',
      confirmText: "确认删除",
      cancelText: "手滑了",
      success(res) {
        if (res.confirm) {
          var index = e.target.dataset.bindex
          that.remove_question(that.data.question[index]._id);
        } else if (res.cancel) {
          wx.showToast({
            title: '别乱点哦',
            duration: 500,
            icon: 'none'
          })
        }
      }
    })
  },
  remove_question:function(_id) {
    if (_id) {
      const db = wx.cloud.database()
      db.collection('question').doc(_id).remove({
        success: res => {
          wx.hideLoading();
          wx.showToast({
            title: '删除成功',
          })
          this.getQuestion();
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  }
});