var app = getApp()
Page({
  data: {
    user_name: '',
    user_pass: '',
   
    userNameinput: function(e) {
      this.setData({
        user_name: e.detail.value.user_name
      })
    },
    userPasswordinput: function(e) {
      this.setData({
        user_pass: e.detail.value
      })
    },

    swiperList: [{
      id: 0,
      type: 'image',
      url: '/images/index-1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '/images/index-2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '/images/index-3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/images/index-4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/images/index-5.jpg'
    }],
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  goToback() {
    wx.navigateBack({
      url: '/pages/index/index',
    })
  },

  getUserInfo: function (e) {
    wx.setStorageSync("user_image", e.detail.userInfo.avatarUrl)
    console.log("nickname=" + e.detail.userInfo.avatarUrl);
  },

  formsubmit: function(e) {
    wx.request({
      url: 'https://www.javacat.top/login',
      data: {
        xuehao: e.detail.value.user_name,
        password: e.detail.value.user_pass
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        console.log(res)
        if (wx.getStorageSync("login_status") == "logning"){
            wx.showToast({
            title: '用户已登录，请勿重复登录！',//提示文字
            duration: 2000,//显示时长
            mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
          })
        }else{
          if (res.statusCode == 200) {
            //访问正常
            if (res.data == "登录成功！") {
              wx.showToast({
                title: res.data,
                icon: 'success',
                duration: 2000,
                success: function () {
                  wx.setStorageSync("xuehao", e.detail.value.user_name),
                    wx.setStorageSync("login_status", "logning")
                  wx.navigateBack({
                    url: '/pages/index/index',
                  })
                }
              })
            } else {
              wx.showToast({
                title: '登录失败，账户名或者密码错误！',//提示文字
                duration: 2000,//显示时长
                mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon: 'none', //图标，支持"success"、"loading"  
                success: function () { },//接口调用成功
                fail: function () { },  //接口调用失败的回调函数  
                complete: function () { } //接口调用结束的回调函数  
              })
            }
          }
        }
      }
    })
  }
})