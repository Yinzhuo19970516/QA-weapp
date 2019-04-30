// pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    myanswer_flag: true,
    question_id: '',
    question_title:'',
    question: {},
    answer: {},
    answer_temp: {},
    button_name: true,
    id: '',
    button_flag:[],
    isShowLoading:false
  },
  bindFormSubmit(e) {
    this.setData({
      textarea:""
    })
    if (e.detail.value.textarea==''){
      wx.showModal({
        content: '请填写完整信息',
        showCancel: false,
        success: function (res) {
        }
      });
    }else {
    db.collection('answer').where({
      question_id: this.data.question_id,
      _openid: app.globalData.openid
    })
      .get({
        success: res => {
          if(res.data.length == 0){
            var that =this;
            db.collection('answer').add({
              data: {
                answer_avatar: app.globalData.userInfo.avatarUrl,
                answer_content: e.detail.value.textarea,
                answer_nickname: app.globalData.userInfo.nickName,
                question_id: this.data.question_id,
                answer_time: "2019/3/31",
                question_title:this.data.question_title
              },
              success: res => {
                wx.showToast({
                  title: '提交成功',
                })
                that.getAnswer();
              },
              fail: err => {
                wx.showToast({
                  title: '提交失败',
                })
              }
            })  
          }else{
            wx.showToast({
              icon:"none",
              title: '您已经回答过这个问题了嗷'
            })
          }
        },
        fail(err) {

        }
      })
    }  
  },
  jumpToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question'
    })
  },
  view_less(e) {
    var index = e.target.dataset.bindex;
    this.data.button_flag[index] = false;
    this.setData({
      button_flag: this.data.button_flag
    })
  },
  view_more(e) {
    var index = e.target.dataset.bindex;
    this.data.button_flag[index] = true;
    this.setData({
      button_flag:this.data.button_flag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      question_id: options.question_id,
      question_title:options.question_title
    })
    this.getQuestion()
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            isShowLoading: true
          })
          
        } else {
         
        }
      }
    })

  },
  getQuestion() {
    db.collection('question').where({
      _id: this.data.question_id
    }).get({
      success: res => {
        if(res.data.length==0){
          wx.showModal({
            title: '查看失败',
            content: '您回答的问题已经被提问者删除，无法查看，点击确定返回我的回答',
            confirmText: "确定",
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/myqa/myqa?flag=0',
                })
              } 
            },
          })
        } else {
          this.setData({
            question: res.data[0]
          })
          db.collection("answer").where({
            question_id: this.data.question_id
          }).get({
            success: res => {
              this.setData({
                answer: res.data
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
            }
          })}
       
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  getAnswer(){
    db.collection("answer").where({
      question_id: this.data.question_id
    }).get({
      success: res => {
        this.setData({
          answer: res.data
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getAnswer()
  },

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
    db.collection("answer").where({
      question_id: this.data.question_id
    }).get({
      success: res => {
        this.setData({
          answer: res.data
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

  /**
   * 用户点击右上角分享
   */
  jumpToIndex(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  onShareAppMessage:(res)=> {
    var path = 'pages/detail/detail?question_id=' + this.data.question_id;
    return {
      title: '问答-你问大家答',
      path: path,
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  },
  exchange_animals: function () {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  },
  jumpToQusetion: function () {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },
  getUserInfo: function (e) {
    // 将获取的用户信息赋值给全局 userInfo 变量，再跳回之前
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        isShowLoading:false
      })
    }
    // 调用云函数
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
  },
  
})