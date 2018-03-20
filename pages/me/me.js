// pages/me/me.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userUrl: '/api/v1/users/',
        userInfo: {},
        statData: {},
        username: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        if (!app.globalData.isLogined) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }
        this.setData({ username: app.globalData.loginData.username })
        this.getUserStat()
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
        if (!app.globalData.isLogined) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }
        this.setData({ username: app.globalData.loginData.username })
        this.getUserStat()
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
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { },
    /**
     * 获取用户状态
     */
    getUserStat: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.userUrl + '5/stats',
            header: app.getHeader(),
            success: function (res) {
                this.setData({ statData: res.data })
            }
        })
    },
    /**
     * 获取用户状态
     */
    getUserStat: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.data.userUrl + app.globalData.loginData.related_id + '/stats',
            header: app.getHeader(),
            success: function (res) {
                that.setData({ statData: res.data })
            }
        })
    },
    /**
     * 时间表
     */
    gotoTimeline: function () {
        wx.navigateTo({
            url: '',
        })
    },
    /**
     * 项目列表(like, watch)
     */
    gotoProjects: function (e) {
        if (app.globalData.loginData.bearer === undefined) {
            return
        }
        console.log('/pages/projects/projects?listType=' + e.currentTarget.id)
        wx.navigateTo({
            url: '/pages/projects/projects?listType=' + e.currentTarget.id,
        })
    },
    logout: function (e) {
        app.logout()
        wx.navigateTo({
            url: '/pages/login/login',
        })
    }
})