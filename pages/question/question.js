// pages/question/question.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    
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
    }else if (!(/^\+?[1-9][0-9]*$/.test(jifen_account))){
      wx.showModal({
        content: '请输入整数积分',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }else if (!(/^\+?[1-9][0-9]*$/.test(people_account))){
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
    }else{
      db.collection('question').add({
        data:{
          question_nickname: app.globalData.userInfo.nickname,
          question_avatar: app.globalData.userInfo.avatarUrl,
          question_integral: jifen_account,
          question_join_account: people_account,
          question_sort: this.data.accounts[this.data.accountIndex],
          question_time:"2019/4/1",
          question_title: question_content
        },
        success:res=>{
          console.log(res)
          wx.showModal({
            title: '发布成功',
            content: '您的问题已经发布成，现在可以去我的回答页面查看，邀请好友一起瓜分悬赏',
            confirmText: "立即查看",
            cancelText: "返回首页",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/myqa/myqa?flag=1',
                })
              } else {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          });
        },
        fail:err=>{
          console.log(err)
        }

      })
    
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('sort_question').get({
      success:res=>{
        console.log(res)
        this.setData({
          accounts: res.data[0].sort_name
        })
      }
    })
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