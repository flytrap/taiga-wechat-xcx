//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        navTab: ['最受欢迎的', '最活跃的', '最有特色的', '搜索结果'],
        currentNavtab: 0,
        userInfo: {},
        hasUserInfo: false,
        berear: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        projectUrl: app.globalData.taigaIndex + '/api/v1/projects',
        // params
        totalFuns: { discover_mode: true, order_by: 'total_fans_last_week' },
        totalActivity: { discover_mode: true, order_by: 'total_activity_last_week' },
        featured: { discover_mode: true, is_featured: true },

        funsData: [],
        activityData: [],
        featureData: [],
        searchData: [],
        feed: []
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            console.log(app.globalData.userInfo)
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res.userInfo)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getDiscover()
    },
    onShow: function () {
        console.log('onShow')
        if (!app.globalData.isLogined) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }
        if (!this.data.funsData.length && !this.data.activityData.length && !this.data.featureData.length) {
            this.getDiscover()
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getDiscover: function () {
        var that = this
        if (app.globalData.isLogined) {
            delete this.data.totalFuns.discover_mode
            delete this.data.totalActivity.discover_mode
            delete this.data.featured.discover_mode
        }
        // funs
        wx.request({
            url: this.data.projectUrl,
            data: this.data.totalFuns,
            header: app.getHeader(),
            success: function (res) {
                that.setData({ funsData: res.data })
            }
        })

        // activity
        wx.request({
            url: this.data.projectUrl,
            data: this.data.totalActivity,
            header: app.getHeader(),
            success: function (res) {
                that.setData({ activityData: res.data })
                that.setData({ feed: res.data })
            }
        })

        // featured
        wx.request({
            url: this.data.projectUrl,
            data: this.data.featured,
            header: app.getHeader(),
            success: function (res) {
                that.setData({ featureData: res.data })
            }
        })
    },
    getDashBoard: function () {
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
    },
    /**
     * 切换页签
     */
    switchTab: function (e) {
        const idx = e.currentTarget.dataset.idx
        switch (idx) {
            case 0:
                this.setData({ feed: this.data.funsData });
                break;
            case 1:
                this.setData({ feed: this.data.activityData });
                break;
            case 2:
                this.setData({ feed: this.data.featureData });
                break;
            default:
                this.setData({ feed: this.data.searchData });
                break;
        }
        this.setData({
            currentNavtab: idx
        });
    },
    /**
     * 搜索项目
     */
    searchProject: function (e) {
        const that = this
        console.log(e.detail.value)
        this.setData({ currentNavtab: 3 })
        wx.request({
            url: this.data.projectUrl,
            data: { discover_mode: !app.globalData.isLogined, page: 1, q: e.detail.value },
            header: app.getHeader(),
            success: function (res) {
                that.setData({
                    searchData: res.data,
                    feed: res.data
                })
            }
        })
    }
})
