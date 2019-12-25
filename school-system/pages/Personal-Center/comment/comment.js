// pages/Personal-Center/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: "", //反馈内容
    email: "", //联系方式
    wordnumber: 0, //内容框字数的个数
    time: "",//反馈时间
    stars: 5,//实星星
    nostars: 0,//空星星
    checkboxvalue: ['', ''],//反馈问题的类型
    checkboxvalue1: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toast: function (title, icon, duration) {
    //自己封装的Toast函数
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  }
  ,
  log: function (res) {
    //自己封装的log函数
    console.log("reply:  " + res)
  },
  checkchange: function (e) {
    var that = this;
    if (e.detail.value == "")
      that.data.checkboxvalue[0] = "";
    else
      that.data.checkboxvalue[0] = true;
    //  console.log(that.checkboxvalue);

  },
  checkchange1: function (e) {
    var that = this;
    if (e.detail.value == "")
      that.data.checkboxvalue[1] = "";
    else
      that.data.checkboxvalue[1] = false;
    // console.log(that.checkboxvalue);
  }
  ,
  getTime: function () {
    var timestamp = Date.parse(new Date());
    var dates = new Date(timestamp);
    var that = this;
    //获取年份  
    var Y = dates.getFullYear();
    //获取月份  
    var M = (dates.getMonth() + 1 < 10 ? '0' +
      (dates.getMonth() + 1) : dates.getMonth() + 1);
    //获取当日日期 
    var D = dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate();
    console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    that.data.time = Y + "-" + M + "-" + D;
    // var time = new Date();
    // var that = this;
    // var year = time.getFullYear();
    // var month = time.getMonth();
    // var day  = time.getDate();

  }
  ,

  request: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8080/alumnisystem/reply/saveAdvice",
      method: 'POST',
      data: {
        "content": that.data.suggest,//反馈内容
        "contact": that.data.email,//联系方式
        "checkBoxValue": that.data.checkboxvalue1,//反馈内容的类型，一个字符串
        "stars": that.data.stars,//评价的星数
        "stunum": wx.getStorageSync('xuehao')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      complete: function (res) {
        if (res.statusCode != 200) {
          that.log("网络传输有错误！");
          that.toast("网络连接失败！", "", 1500)
        } else if (res.data == "") {
          that.toast("服务器出错！", "", 700)
        } else {
          that.toast("提交成功", "", 2000)
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateBack({
              url: '/pages/index/index'
            })
          }, 2000) //延迟时间 这里是1秒 
        }

      }
    })
  },
  inputs: function (e) {
    // 获取输入框的字数个数
    var that = this;
    that.setData({ wordnumber: e.detail.cursor })
  },

  formclick: function (e) {
    var that = this;
    var suggest = e.detail.value.suggest;
    var email = e.detail.value.eamil;
    this.setData({ suggest: suggest })
    this.setData({ email: email })
    that.data.suggest = suggest;
    that.data.email = email;
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    var phoneVar = reg.test(email);     // 得到的值为布尔型
    var reg1 = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg1.test(email);     // 得到的值为布尔型
    console.log(e);
    that.getTime();

    // if (suggest == "" && email == "") {
    //   that.toast("还没输入联系方式哦(●'◡'●)", "none", 2000)
    //   return
    // } else if (suggest == "" && email != "") {
    //   that.toast("还没输入反馈内容哦(●'◡'●)", "none", 2000)
    //   return
    // } else if (suggest != "" && email == "") {
    //   that.toast("还没输入联系方式哦(●'◡'●)", "none", 2000)
    //   return
    // } else if (email == "" && suggest != "") {
    //   that.toast("还没输入联系方式哦(●'◡'●)", "none", 2000)
    //   return
    if (suggest == "") {
      that.toast("还没输入反馈内容哦(●'◡'●)", "none", 2000)
      return
    } else {
      if (email !== "") {//验证邮箱与电话
        if (!phoneVar && !emailVar) {
          that.toast("您输入的电话号码或邮箱格式不正确，请重新输入！", "none", 2000);
          return
        }
        else {
          that.data.checkboxvalue1 = that.data.checkboxvalue[0] + "," + that.data.checkboxvalue[1];
          that.setData({ checkboxvalue1: that.data.checkboxvalue[0] + "," + that.data.checkboxvalue[1] })
          console.log(that.data.checkboxvalue1);
          console.log(that.data.suggest);
          console.log(that.data.email);
          that.request();

        }
      }
      else {
        that.data.checkboxvalue1 = that.checkboxvalue[0] + "," + that.checkboxvalue[1];
        console.log(that.checkboxvalue1);
        console.log(that.data.suggest);
        console.log(that.data.email);
        that.request();

      }
      // console.log(that.data.stars);
    }

  },
  bindclick: function (e) {
    var that = this;
    var bindclick = e.currentTarget.dataset.in;
    var stars;
    if (bindclick == 'nostar') {
      stars = Number(e.currentTarget.id) + that.data.stars;
    } else {
      stars = Number(e.currentTarget.id) - 1;
    }
    that.setData({ stars: stars })
    that.setData({ nostars: 5 - stars })
    // console.log(e)
    // console.log(that.stars)
  }
})