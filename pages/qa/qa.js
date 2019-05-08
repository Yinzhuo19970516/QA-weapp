const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    sort:[],
    box_flag:false,
    animals_flag: false,
    curNav: 1,
    curIndex: 0,
    question:""
  },
  onLoad:function(){
    // wx.getStorageInfo({
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
    db.collection('sort').get({
      success:res=>{
        this.setData({
          sort:res.data
        })
        this.getQuestion()
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  getQuestion(){
    var index = this.data.curIndex;
    db.collection('question').where({
      question_sort:this.data.sort[index].sort_name
    }).get({
      success:res=>{
        this.setData({
          question:res.data
        })
      },fail:err=>{
        console.log(err)
      }
    })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    wx.showLoading({
      title: '加载中',
      icon:"loading"
    })
    this.getQuestion();
    wx.hideLoading()
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
  }
})