// pages/story/story.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storyUrl: '/api/v1/userstories/by_ref',
        commentUrl: '/api/v1/history/userstory/',
        projectId: '',
        ref: '',
        story: {},
        comments: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            projectId: options.id,
            ref: options.ref
        })
        this.getStoryData()
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
    /**
     * 获取story详细信息
     */
    getStoryData: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.data.storyUrl,
            data: { milestone: null, order_by: 'backlog_order', project: this.data.projectId, ref: this.data.ref },
            header: app.getHeader(),
            success: function (res) {
                console.log(res.data)
                that.setData({ story: res.data })
                that.getComments()
            }
        })
    },
    getComments: function () {
        const that = this
        if (this.data.story.id === undefined){
            setTimeout(2);
        }
        wx.request({
            url: app.globalData.taigaIndex + this.data.commentUrl + this.data.story.id,
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    comments: res.data
                })
            }
        })
    }
})