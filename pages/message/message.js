// pages/message/message.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    message_list:[123,123,123],
    message_list_temp:[],
    jifen_list:[],
    jifen_list_temp: [],
    person:null,
  },
  onLoad(){
    
    
    wx.getStorage({
      key: 'person',
      success: res=>{
        app.globalData.person = res.data
        this.setData({
          person:res.data
        })
       // console.log(res.data)
        db.collection('person').doc(res.data._id).get({
          success:res=>{
            this.setData({
              jifen_list:res.data.my_jifen.reverse(),
              jifen_list_temp: res.data.my_jifen.reverse().slice(0, 2)
            })
          }
        })
      },
    })
    this.setData({
      message_list_temp: this.data.message_list.slice(0, 2),
      
    })
  },
  openMessageList:function(){
    this.setData({
      message_list_temp:this.data.message_list
    })
  },
  openJifenList:function(){
    this.setData({
      jifen_list_temp:this.data.jifen_list
    })
  },
  closeMessageList: function () {
    this.setData({
      message_list_temp: this.data.message_list.slice(0, 2)
    })
  },
  closeJifenList: function () {
    this.setData({
      jifen_list_temp: this.data.jifen_list.slice(0, 2)
    })
  }
})