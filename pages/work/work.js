// pages/work/work.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navTab: ['task', 'userstory', 'issues', 'ecpi'],
        feed: [],
        currentNavtab: 0,
        epics: [],
        userstories: [],
        tasks: [],
        issues: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!app.globalData.isLogined) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }
        this.getEpic()
        this.getUserStory()
        this.getTask()
        this.getIssues()
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
    getEpic: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/epics',
            data: { 'assigned_to': app.globalData.loginData.related_id, 'status__is_closed': false },
            header: app.getHeader(),
            success: function (res) {
                if (res.statusCode > 300)
                    return
                that.setData({
                    epics: res.data
                })
            }
        })
    },
    getUserStory: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/userstories',
            data: { 'assigned_to': app.globalData.loginData.related_id, 'status__is_closed': false },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    userstories: res.data
                })
            }
        })
    },
    getTask: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/tasks',
            data: { 'assigned_to': app.globalData.loginData.related_id, 'status__is_closed': false },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    tasks: res.data,
                    feed: res.data
                })
            }
        })
    },
    getIssues: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/issues',
            data: { 'assigned_to': app.globalData.loginData.related_id, 'status__is_closed': false },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    issues: res.data
                })
            }
        })
    },
    /**
     * 切换页签
     */
    switchTab: function (e) {
        const idx = e.currentTarget.dataset.idx
        switch (idx) {
            case 1:
                this.setData({ feed: this.data.userstories });
                break;
            case 2:
                this.setData({ feed: this.data.issues });
                break;
            case 3:
                this.setData({ feed: this.data.epics });
                break;
            default:
                this.setData({ feed: this.data.tasks });
                break;
        }
        this.setData({
            currentNavtab: idx
        });
    },
})