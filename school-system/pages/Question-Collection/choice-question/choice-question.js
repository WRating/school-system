Page({
  data: {
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    source: '',
    index: null,
    imgList: [],
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
          url: 'https://www.javacat.top/getChoicePictureName',
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
            console.log("https://www.javacat.top:3002/image/"+res.data)
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

  formsubmit: function (e) {
    console.log(wx.getStorageSync("fileName"));
    var that = this
    var content = e.detail.value;
    if (content.choice_ques == "" || content.choice_right == "" || content.choice_wrong1 == "" || content.choice_wrong2 == "" || content.choice_wrong1 == "" || content.choice_ans == "") {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        success: function (res) {
        }
      })
      return;
    } else {
      wx.request({
        url: 'https://www.javacat.top/signalChoiceAdd',
        data: {
          choice_ques: e.detail.value.choice_ques,
          choice_right: e.detail.value.choice_right,
          choice_wrong1: e.detail.value.choice_wrong1,
          choice_wrong2: e.detail.value.choice_wrong2,
          choice_wrong3: e.detail.value.choice_wrong3,
          choice_ans: e.detail.value.choice_ans,
          filepath: 'https://www.javacat.top:3002/image/' + wx.getStorageSync("fileName")
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function (res) {
          console.log('https://www.javacat.top:3002/image/' + wx.getStorageSync("fileName"));
          console.log(res.data);
          if (res.data == "选择题题提交成功！") {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '提交失败！',
              icon: 'loading',
              duration: 1500
            })
          }
        }
      })
    }
  },
})