// pages/message/message.js
Page({
  data: {
    message_list:[123,123,123],
    message_list_temp:[],
    jifen_list:[123,123,3333],
    jifen_list_temp: []
  },
  onLoad(){
    this.setData({
      message_list_temp: this.data.message_list.slice(0, 2),
      jifen_list_temp: this.data.jifen_list.slice(0, 2),
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