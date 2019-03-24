Page({
  data: {
    animals_flag:false,
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  //动物
  exchange_animals: function () {
    var animals_flag = this.data.animals_flag;
    this.setData({
      animals_flag: !animals_flag
    })
  }
})