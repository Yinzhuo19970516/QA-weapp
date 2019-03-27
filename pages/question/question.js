// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["微信号", "QQ", "Email"],
    accountIndex: -1,
    jifen_account:'',
    people_acount:'',
    question_content:''
  },
  bindAccountChange: function (e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  jifen_account:function(e){
    if (/^\+?[1-9][0-9]*$/.test(e.detail.value)) {
      if (e.detail.value<100){
          return;
      }else{
        wx.showModal({
          content: '请输入整数积分',
          showCancel: false,
          success: function (res) {
            // if (res.confirm) {
            //   console.log('用户点击确定')
            // }
          }
        });
      }
    }else{
      wx.showModal({
        content: '请输入整数积分',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }
  },
  bindFormSubmit:function(e){
    var people_account = e.detail.value.people_account;
    var jifen_account = e.detail.value.jifen_account;
    var question_content = e.detail.value.textarea;
    if (people_account == "" || jifen_account == "" || question_content ==""|| this.data.accountIndex == -1){
      wx.showModal({
        content: '请填写完整信息',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (!(/^\+?[1-9][0-9]*$/.test(jifen_account))){
      wx.showModal({
        content: '请输入整数积分',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (!(/^\+?[1-9][0-9]*$/.test(people_account))){
      wx.showModal({
        content: '请输入整数人数',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }else if(jifen_account>100){
      wx.showModal({
        content: '您没有那么多积分嗷~',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }else if(people_account>10){
      wx.showModal({
        content: '悬赏人数不能超过10人嗷~',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }
    wx.showModal({
      title: '发布成功',
      content: '您的问题已经发布成，现在可以去我的回答页面查看，邀请好友一起瓜分悬赏',
      confirmText: "立即查看",
      cancelText: "返回首页",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/myqa/myqa',
          })
        } else {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})