Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    value: '',
    examrecordlist: [],
    count: 0
  },

  //点赞
  clickHandler: function () {
    this.setData({
      count: this.data.count + 1
    });
  },

  onLoad: function (option) {
    var that = this
    var xuehao = wx.getStorageSync('xuehao');
    wx.request({
      url: 'https://www.javacat.top/topn',
      method: 'POST',
      data: {
        "n": 10
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        that.setData({ examrecordlist: res.data })
      }
    })

    wx.request({
      url: 'https://www.javacat.top/topn',
      method: 'POST',
      data: {
        "n": 10
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        that.setData({ examrecordlist: res.data })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
