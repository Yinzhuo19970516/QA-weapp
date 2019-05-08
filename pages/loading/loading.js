//获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    // 将获取的用户信息赋值给全局 userInfo 变量，再跳回之前
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
        success: function () {      
          console.log('写入userInfo缓存成功')
        },
        fail: function () {        
          console.log('写入userInfo发生错误')
        }
      })
      wx.switchTab({
        url: '../index/index',
      })
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        db.collection('person').where({
          _openid:res.result.openid
        })
        .get({
          success:res=>{
            if(res.data.length===0){
              db.collection('person').add({
                data:{
                  is_new:true,
                  jifen_account: 200,
                  my_jifen: [{ title: "恭喜您获得200积分", content:"您被挑选为幸运用户，特赠送您200积分，积分可以用来发布问题时悬赏积分，也可以花费积分查看问题答案，点击确定去查看我的积分"}]
                },
                success:res=>{
                  console.log("插入数据成功")
                },
                fail:err=>{
                  console.log("插入数据失败")
                }
              })
            }
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }

  }
})