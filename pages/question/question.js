// pages/question/question.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    accountIndex: -1,
    jifen_account: null,
    people_account: '',
    question_content: '',
    accounts: [],
    question: '',
    sort_name:''
  },
  bindAccountChange: function(e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindFormSubmit: function(e) {
   
    var people_account = e.detail.value.people_account;
    var jifen_account = e.detail.value.jifen_account;
    var question_content = e.detail.value.textarea;
    if (people_account == "" || jifen_account == "" || question_content == "" || this.data.accountIndex == -1) {
      wx.showModal({
        content: '请填写完整信息',
        showCancel: false,
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (!(/^\+?[1-9][0-9]*$/.test(jifen_account))) {
      wx.showModal({
        content: '请输入整数积分',
        showCancel: false,
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (!(/^\+?[1-9][0-9]*$/.test(people_account))) {
      wx.showModal({
        content: '请输入整数人数',
        showCancel: false,
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (jifen_account > 100) {
      wx.showModal({
        content: '您没有那么多积分嗷~',
        showCancel: false,
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (people_account > 10) {
      wx.showModal({
        content: '悬赏人数不能超过10人嗷~',
        showCancel: false,
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    } else if (this.data.question._id) {
      wx.showLoading({
        title: '正在快速提交中...',
      })
      db.collection('question').doc(this.data.question._id).update({
        data:{
          question_integral: jifen_account,
          question_join_account: people_account,
          question_sort: this.data.accounts[this.data.accountIndex],
          question_time: "2019/4/1",
          question_title: question_content
        },
        success:res=>{
          wx.hideLoading();
          wx.showModal({
            title: '修改成功',
            content: '您的问题已经修改成功，现在可以去我的回答页面查看，邀请好友一起瓜分悬赏',
            confirmText: "立即查看",
            cancelText: "返回首页",
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/myqa/myqa?flag=1',
                })
              } else {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            },
            fail: err => {
              console.log(err)
              wx.showToast({
                title: '提交失败，请重试',
              })
            }
          })  
        }
      })
    } else {
      db.collection('question').add({
        data: {
          question_nickname: app.globalData.userInfo.nickName,
          question_avatar: app.globalData.userInfo.avatarUrl,
          question_integral: jifen_account,
          question_join_account: people_account,
          question_sort: this.data.accounts[this.data.accountIndex],
          question_time: "2019/4/1",
          question_title: question_content
        },
        success: res => {
          wx.showModal({
            title: '发布成功',
            content: '您的问题已经发布成，现在可以去我的回答页面查看，邀请好友一起瓜分悬赏',
            confirmText: "立即查看",
            cancelText: "返回首页",
            success: function(res) {
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
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '提交失败，请重试',
          })
        }

      })

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      accounts: app.globalData.accounts
    });
    if (options.question_id) {
      wx.showLoading({
        title: '正在拼命加载中...',
      })
      db.collection('question').where({
        _id: options.question_id
      }).get({
        success: res => {
          this.setData({
            question: res.data[0],
            jifen_account: res.data[0].question_integral,
            people_account: res.data[0].question_join_account,
            question_content: res.data[0].question_title,
            sort_name: res.data[0].question_sort
          })
          this.setData({
            accountIndex:this.data.accounts.indexOf(this.data.sort_name)
          })
          wx.hideLoading();
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})