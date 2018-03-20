// pages/projects/projects.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        projectUrl: '/api/v1/projects',
        projects: [],
        listType: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var listType = options.listType
        var title = '我的项目'
        if (listType === undefined) {
            listType = ''
        }
        this.setData({
            listType: listType
        })
        switch (listType) {
            case 'like':
                title = '我的收藏';
                this.getLikeProjects();
                break;
            case 'watched':
                title = '我的关注';
                this.getWatchedData();
                break;
            case 'timeline':
                title = '我的时间线';
                this.getTimeline();
                break;
            case 'vote':
                title = '我的投票';
                this.getVote();
                break;
            case 'contact':
                title = '我的联系人';
                this.getContact();
                break;
            default:
                this.getProjectData();
                break;
        }
        wx.setNavigationBarTitle({
            title: title,
        })
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
     * 获取收藏的项目
     */
    getLikeProjects: function (page) {
        const that = this
        if (page === undefined) {
            page = 1
        }
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/users/' + app.globalData.loginData.related_id + '/liked',
            data: { only_relevant: true, page: page },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 获取我的项目
     */
    getProjectData: function () {
        const that = this
        wx.request({
            url: app.globalData.taigaIndex + this.data.projectUrl,
            data: { member: app.globalData.loginData.related_id, order_by: 'memberships__user_order' },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 获取关注的项目
     */
    getWatchedData: function (page) {
        const that = this
        if (page === undefined) {
            page = 1
        }
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/users/' + app.globalData.loginData.related_id + '/watched',
            data: { page: page },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 获取时间线
     */
    getTimeline: function (page) {
        const that = this
        if (page === undefined) {
            page = 1
        }
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/timeline/profile/' + app.globalData.loginData.related_id,
            data: { page: page },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 获取投票
     */
    getVote: function (page) {
        const that = this
        if (page === undefined) {
            page = 1
        }
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/users/' + app.globalData.loginData.related_id + '/voted',
            data: { page: page },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 获取联系人
     */
    getContact: function (page) {
        const that = this
        if (page === undefined) {
            page = 1
        }
        wx.request({
            url: app.globalData.taigaIndex + '/api/v1/users/' + app.globalData.loginData.related_id + '/contacts',
            data: { page: page },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    projects: res.data
                })
            }
        })
    },
    /**
     * 跳到项目详情
     */
    toProject: function (e) {
        console.log(e.currentTarget.id.split(' '))
        const id = e.currentTarget.id.split(' ')[0]
        const slug = e.currentTarget.id.split(' ')[1]
        wx.navigateTo({
            url: '/pages/project/project?id=' + id + '&slug=' + slug,
        })
    }
})