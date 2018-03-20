//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // wx.setEnableDebug({
        //     enableDebug: true
        // })

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var data = {}
                var that = this
                var code = res.code
                if (code) {
                    data.code = code
                    wx.getUserInfo({
                        success: function (res) {
                            data.userInfo = res.userInfo
                            wx.request({
                                url: that.globalData.loginUrl,
                                method: 'POST',
                                data: data,
                                success: function (res) {
                                    if (res.data.bearer === null || res.data.bearer === '') {
                                        return
                                    }
                                    console.log(res.data)
                                    that.globalData.loginData = res.data
                                    that.globalData.isLogined = true
                                    wx.switchTab({
                                        url: '/pages/me/me',
                                    })
                                },
                                fail: function (res) {
                                    console.log(res.errMsg)
                                }
                            })
                            return
                        }
                    })
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    logout: function () {
        // wx.request({
        //     url: this.globalData.logoutUrl,
        //     method: 'put',
        //     data: {}
        // })
        this.globalData.loginData = {}
        this.globalData.isLogined = false
    },
    getUserInfo: function (cb) {
        var that = this
        //调用登录接口
        wx.login({
            success: function (res) {
                console.log(res)
                wx.getUserInfo({
                    success: function (res) {
                        that.globalData.userInfo = res.userInfo
                        typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                })
            }
        })
    },
    getHeader: function () {
        var data = { 'content-type': 'application/json' }
        if (this.globalData.loginData.bearer) {
            data['Authorization'] = 'Bearer ' + this.globalData.loginData.bearer
        }
        return data
    },
    globalData: {
        loginUrl: 'https://itaiga.pinbot.me/taiga/user',
        logoutUrl: 'https://itaiga.pinbot.me/taiga/logout',
        taigaIndex: 'https://taiga.pinbot.me',
        userInfo: null,
        loginData: {},
        isLogined: false
    }
})