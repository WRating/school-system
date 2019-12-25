// pages/register/register.js
const date = new Date();
const years = [];
const months = [];
const days = [];
//获取年
for (let i = 1980; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
// 获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
    time: '',
    multiArray: [years, months, days],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    var that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    this.setData({
      time: year + '-' + month + '-' + day
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
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
  formsubmit: function (e) {
    if (e.detail.value.xingming.length == 0) {
      wx.showToast({
        title: '姓名为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (e.detail.value.xuehao.length == 0 || e.detail.value.xuehao.length >= 12) {
      wx.showToast({
        title: '学号空或过长',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

      // } else if (e.detail.value.xuehao.type!number) {
      //   wx.showToast({
      //     title: '学号请填数字',
      //     icon: 'loading',
      //     duration: 1000
      //   })
      //   setTimeout(function () {
      //     wx.hideToast()
      //   }, 2000)

    } else if (e.detail.value.password.length == 0 || e.detail.value.password.length > 10) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (e.detail.value.password != e.detail.value.repassword) {
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (e.detail.value.college.length == 0 || e.detail.value.college.length >= 16) {
      wx.showToast({
        title: '毕业学院空或过长',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (e.detail.value.classroom.length == 0 || e.detail.value.classroom.length >= 10) {
      wx.showToast({
        title: '毕业班级空或过长',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (e.detail.value.time.length == 0 || e.detail.value.time.length >= 12) {
      wx.showToast({
        title: '时间空或过长',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else {
      wx.request({
        url: 'https://www.javacat.top/register',
        data: {
          'xingming': e.detail.value.xingming,
          'xuehao': e.detail.value.xuehao,
          'password': e.detail.value.password,
          'repassword': e.detail.value.repassword,
          'college': e.detail.value.college,
          'classroom': e.detail.value.classroom,
          'time': e.detail.value.time
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function (res) {
          console.log(res.data);
          if (res.statusCode != 200) {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1500
            })
          } else {
            if (res.data == "该账号已被注册！") {
              wx.showToast({
                title: '该账号已被注册！',
                icon: 'fail',
                duration: 1000
              })

            }
            else if (res.data == "注册成功！") {
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 1000
              })
              wx.setStorageSync('xuehao', e.detail.value.xuehao); //将学号存入本地缓存
          
            }
          }

        }
      })
    }
  }
})