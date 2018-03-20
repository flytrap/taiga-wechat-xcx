// pages/logoin/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        error: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.loginTaiga()  
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

    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        this.loginTaiga(e)
    },
    /**
     * 调用登录接口
     */
    loginTaiga: function (e) {
        this.setData({ error: '登录中...' })
        var data = e.detail.value
        var that = this
        //调用登录接口
        wx.login({
            success: function (res) {
                var code = res.code
                console.log(code)
                that.setData({ error: code })
                if (code) {
                    data.code = code
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                            data.userInfo = res.userInfo
                            that.setData({ 'error': '登录中...' })
                            wx.request({
                                url: app.globalData.loginUrl,
                                method: 'POST',
                                data: data,
                                success: function (res) {
                                    that.setData({ 'error': '登录成功' })
                                    if (res.data.bearer === null || res.data.bearer === '') {
                                        that.setData({ error: '用户名或密码错误' })
                                        return
                                    }
                                    console.log(res.data)
                                    app.globalData.loginData = res.data
                                    app.globalData.isLogined = true
                                    wx.navigateBack({
                                    })
                                },
                                fail: function (res) {
                                    console.log(res)
                                    that.setData({ error: res.errMsg })
                                }
                            })
                        },
                        fail: function (res) {
                            that.setData({ error: res.errMsg })
                            wx.openSetting({})
                        }
                    })
                }
            },
            fail: function (res) {
                that.setData({ error: res.errMsg })
                wx.openSetting({})
            }
        })
    },
})