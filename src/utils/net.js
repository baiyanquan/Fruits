
const host = 'http://139.199.183.133:8765'
//const host = 'http://localhost:8765'

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  if(method == 'GET') {
    return new Promise((resolve, reject) => {
      wx.request({
        url: host + url, // 仅为示例，并非真实的接口地址
        method: method,
        data: data,
        headers: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          wx.hideLoading()
          resolve(res.data)
        },
        fail: function(res) {
          wx.hideLoading()
          // reject(false)
        },
        complete: function() {
          wx.hideLoading()
        }
      })
    })
  }
  else {
    return new Promise((resolve, reject) => {
      console.log(data);
      wx.request({
        url: host + url, // 仅为示例，并非真实的接口地址
        method: method,
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res);
          wx.hideLoading()
          resolve(res.data)
        },
        fail: function(res) {
          wx.hideLoading()
          // reject(false)
        },
        complete: function() {
          wx.hideLoading()
        }
      })
    })
  }
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post,
  host
}
