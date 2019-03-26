Page({
  data: {
    animals_flag: false,
    cateItems: [{
      cate_id: 1,
      cate_name: "电脑网络",
      ishaveChild: true,
      children: [{
        child_id: 1,
        title: "机械硬盘数据被删大约一年还能恢复吗",
        time: '20180325',
        answer_acount: '5',
        jifen_acount: "10",
        join_acount: '10',
      },
        {
          child_id: 1,
          title: "机械硬盘数据被删大约一年还能恢复吗",
          time: '20180325',
          answer_acount: '5',
          jifen_acount: "10",
          join_acount: '10',
        }]
      },
    {
      cate_id: 2,
      cate_name: "体育运动",
      ishaveChild: false
    },
    {
      cate_id: 3,
      cate_name: "生活健康",
      ishaveChild: false
    },
    {
      cate_id: 4,
      cate_name: "手机数码",
      ishaveChild: false,
      children: []
    }
    ],
    curNav: 1,
    curIndex: 0
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
  },
  exchange_animals: function () {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  }
})