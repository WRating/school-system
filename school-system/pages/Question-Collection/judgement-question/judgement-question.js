Page({
  data: {
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    source: '',
    judge_ques:'',
    judge_right:'',
    judge_ans:'',
    imgList: [],
  },
  textareaAInput(e) {
    this.setData({
      judge_ques: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      judge_right: e.detail.value
    })
  },
  textareaCInput(e) {
    this.setData({
      judge_ans: e.detail.value
    })
  },
  uploadimg: function () {
    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024;
    let maxLength = 3;
    let flag = true;
    wx.chooseImage({ //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.javacat.top/getJudgePictureName',
          filePath: tempFilePaths[0],
          name: 'file',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          success: function (res) {
            wx.setStorageSync("fileName", res.data);
            console.log("图片上传成功！");
            console.log('图片名称已存入缓存！');
            console.log("https://www.javacat.top:3002/image/" + res.data)
            wx.showToast({
              title: '图片上传成功！',
              icon: 'success',
              mask: true,
              duration: 500
            })
          }
        })
      }
    })
  },
  formsubmit: function () {
    wx.request({
      url: 'https://www.javacat.top:/judgeAdd',
      data: {
        judge_ques: this.data.judge_ques,
        judge_right: this.data.judge_right,
        judge_ans: this.data.judge_ans,
        filepath: 'https://www.javacat.top:3002/image/' + wx.getStorageSync("fileName")
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == "判断题提交成功！") {
          wx.showToast({
            title: '提交成功！！！',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '提交失败！！！',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        wx.setStorageSync("tempFilePaths", res.tempFilePaths);
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除',
      content: '确定删除照片？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
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

  },

})