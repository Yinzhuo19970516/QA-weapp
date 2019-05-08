const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    animals_flag: false,
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    person: {}
  },
  //动物
  exchange_animals: function() {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  },
  onLoad: function() {
    //console.log(app.globalData.openid)
    db.collection('person').where({
      _openid:app.globalData.openid
    }).get({
      success:res=>{
        this.setData({
          person: res.data[0]
        })
        
        wx.setStorage({
          key: 'person',
          data:res.data[0]
        })
      }
    })
    
  }
})