// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richText: '<h1>Hello world!</h1>',
    options: '',
    question: {
      child_id: 1,
      title: "机械硬盘数据被删大约一年还能恢复吗",
      time: '20180325',
      answer_acount: '5',
      jifen_acount: "10",
      join_acount: '10',
      nickname: '虎妞先生',
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSEM2Z8wJOIEcTvVCpNvEk6GwJXdHlv8Sx4qkUUMt8lYruCOC1r54FnvgOiaa62iaPhJWNULB30WBA/132",
      belong: '电脑硬件',
      des: '上一年差不多5月份去外地，去之前侄子把我电脑里存的照片和电影删了，当时忙着准备东西也没时间跟他计较，怕他还在电脑上瞎弄就把电脑全拆了装包装里放舅舅家了。现在回家了觉得训侄子一顿也没意思了，还是赶紧恢复数据要紧，想请教各位大神，差不多隔了一年的被删数据还能恢复吗？那时被删之后就放包装里了也没读写过',
      ishaveanswer: true,
      answer: [
      {
        answer_id: 1,
        answer_nickname: "虎妞大大",
        answer_avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSEM2Z8wJOIEcTvVCpNvEk6GwJXdHlv8Sx4qkUUMt8lYruCOC1r54FnvgOiaa62iaPhJWNULB30WBA/132",
        content: "应该是可以的只要没重新覆盖就没问题应该",
        time: "20180908"
      }, 
      {
        answer_id: 2,
        answer_nickname: "虎妞大大",
        answer_avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSEM2Z8wJOIEcTvVCpNvEk6GwJXdHlv8Sx4qkUUMt8lYruCOC1r54FnvgOiaa62iaPhJWNULB30WBA/132",
        content: "应该是可以的只要没重新覆盖就没问题应该",
        time: "20180908"
      }]
    }
  },
  bindFormSubmit(e) {
    console.log(e.detail.value.textarea)
  },
  jumpToQuestion(){
    wx.navigateTo({
      url: '/pages/question/question'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    })
    console.log(options)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})