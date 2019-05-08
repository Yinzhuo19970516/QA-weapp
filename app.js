//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.setEnableDebug({
      enableDebug: false
    })
    wx.setStorage({
      key: 'login_flag',
      data:false,
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {

        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    openid: null,
    accounts:null,
    person:null
  }
})