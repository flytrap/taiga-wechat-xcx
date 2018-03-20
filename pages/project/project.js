// pages/project/project.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navTab: ["项目", "时间线", "待办任务"],
        projectUrl: '/api/v1/timeline/project/',
        slugUrl: '/api/v1/projects/by_slug',
        storyUrl: '/api/v1/userstories',
        project: {},
        timelines: [],
        storyData: [],
        projectPage: 1,
        storyPage: 1,
        currentNavtab: 0,
        projectId: '',
        slug: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            projectId: options.id,
            slug: options.slug
        })
        this.getProject()
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
     * 获取项目信息
     */
    getProject: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.data.slugUrl,
            data: { slug: this.data.slug },
            header: app.getHeader(),
            success: function (res) {
                that.setData({ project: res.data })
            }
        })
    },
    /** 
     * 获取项目story
     */
    getStory: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.data.storyUrl,
            data: { milestone: null, page: this.data.storyPage, project: this.data.projectId },
            header: app.getHeader(),
            success: function (res) {
                that.setData({ storyData: res.data })
            }
        })
    },
    /**
     * 获取时间线数据
     */
    getTimeline: function () {
        const that = this
        if (this.data.projectId === '') {
            return
        }
        console.log('get project ', this.data.projectId, 'timeline')
        wx.request({
            url: app.globalData.taigaIndex + this.data.projectUrl + this.data.projectId,
            header: app.getHeader(),
            data: { only_relevant: true, page: this.data.projectPage },
            success: function (res) {
                that.setData({ timelines: res.data })
            }
        })
    },

    /**
     * 下一页
     */
    nextPage: function () {
        this.data.projectPage += 1
        this.getTimeline(this.data.projectPage)
    },
    /**
     * 切换页签
     */
    switchTab: function (e) {
        const idx = e.currentTarget.dataset.idx
        console.log(e)
        switch (idx) {
            case 0:
                this.getProject();
                break;
            case 1:
                this.getTimeline();
                break;
            case 2:
                this.getStory();
                break;
            default:
                break;

        }
        this.setData({
            currentNavtab: idx
        });
    },
    gotoStory: function (e) {
        const ref = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/story/story?id=' + this.data.projectId + '&ref=' + ref,
        })
    }
})