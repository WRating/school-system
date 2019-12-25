Page({
  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    score: 0,
    view_list: [],
    vid: 0,
    qeustion: {},
    answer: '',
    correctid: '',
    wrongid: '',
    disable: '',
    pending: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let xuehao = wx.getStorageSync("xuehao")
    const self = this
    console.log("xuehao:" + xuehao)
    if (xuehao == null || xuehao == '') {
      wx.showModal({
        title: '提示',
        content: '您还未注册或登录，答题将不会保存记录',
        complete: function () {

        }
      })
    }
    wx.request({
      url: 'https://www.javacat.top/signalGetChoice',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json;charset=utf-8"
      },
      success: function (res) {
        console.log(res.data)
        self.setData({ view_list: self.generateList(res.data.length) })
        self.setData({ questions: res.data })
        self.setData({ question: res.data[self.data.vid] })
        self.setData({ answer: res.data[self.data.vid].answer })
      }
    })

  },
 
  getNextQuestion: function (step = 1) {
    this.data.vid += step
    this.data.vid = Math.min(this.data.vid, this.data.view_list.length - 1)
    let qid = this.data.view_list[this.data.vid]
    return this.data.questions[qid]
  },
  generateList: function (count) {
    var list = [];
    for (var i = 0; i < count; i++) {
      list.push(i);
    }
    return list
  },
  nextQuestion: function () {
   
    if (this.finishedYet()) {
      wx.request({
        url: 'https://www.javacat.top/update',
        data: {
          score: this.data.score,
          userId: wx.getStorageSync("xuehao")+wx.getStorageSync("user_image")
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      wx.request({
        url: 'https://www.javacat.top/addUserRecord',
        data: {
          time: new Date().toLocaleString(),
          score: this.data.score
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      wx.showModal({
        title: 'Congratulations!',
        content: '完成答题！您的分数为' + this.data.score + "分",
        complete: function () {
            wx.navigateTo({
              url: '../../index/index',
            })
        }
      })
    }
    let question = this.getNextQuestion()
    this.setNewQuestion(question)
  },
  setNewQuestion: function (question) {
    this.setData({
      question: question,
      answer: question.answer,
      correctid: '',
      wrongid: '',
      disable: '',
      pending: false
    })
  },
  selectAnswer: function (evt) {
    self = this
    let selected = evt.currentTarget.dataset.id
    let act = this.data.answer
    if (selected == act) {
      this.setData({
        correctid: selected,
        disable: 'disabled',
        pending: true
      })
      setTimeout(function () {
        self.nextQuestion()
      }, 1000)
      this.data.score += 2;
    }
    else {
      this.setData({
        wrongid: selected
      })
      setTimeout(function () {
        self.nextQuestion()
      }, 1000)
    }
  },
  finishedYet: function () {
    return this.data.vid >= this.data.view_list.length - 1
  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translate(10).step()
    animation.translate(-10).step()
    animation.translate(0).step()

    this.setData({
      animationData: animation.export()
    })
  }

})