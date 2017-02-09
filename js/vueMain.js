Vue.component('server-tips', {
    template: '<p class="red">客服QQ/电话：4007555999</p>'
});
Vue.component('rule-tips', {
    template: '<p class="red">更多详情请见此页面底部的活动规则！</p>'
});
var vm = new Vue({
    el: "#vueMain",
    data: {
        //弹出框
        layout: {
            layoutbg: false,
            layoutbg1: false,
            account_bind: false,
            layoutbg2: false,
            behunter_success: false,
            join_hunter: false,
            quit_hunter: false,
            buy_success: false,
            behunter_fail: false,
            bind_fail: false,
            illegal: false,
            join_fail: false,
            quit_fail: false,
            receive_fail: false,
            layoutbg3: false,
            join_hunterId: false,
            ifjoin: false,
            ifcancel: false,
            signIn: false,
            layoutbg4: false,
            myteam: false,
            myrecord: false
        },
        //弹出框2
        layout2: {
            layoutbg: false,
            layoutbg2: false,
            layoutbg3: false,
            ifcancel: false,
            discharge: false,
            get_success: false,
            quit_fail: false
        },
        mytype: '',//赏金猎人菜单类型
        islogin: false,//之前是否绑定过
        ishunter: false,//是否是赏金猎人
        isSignIn: false,//是否签到过
        myreward: 0,//我的赏金        
        products: [],//商品
        records: [],//变更记录
        recordsPage: 1,//变更page
        todayNow: "",//签到页面上的时间
        myflag: "",//我的小队名称
        myteamId: "",//我的小队id
        myteamName: "",//我加入的小队名字
        joinTeamId: "",//我加入的小队的id
        myPname: "",//我购买的商品的名字
        myteam: [],//我的小队
        dischargeId: "",//解除关系的成员id
        dischargeName: '',//解除关系的成员名字
        dischargeIndex: "",//解除关系的成员index
        myaccountInfo: {//绑定信息
            versionId: 5002,
            areaId: "",
            roleId: ""
        },
        
    },
    mounted: function() {
        //初始化
        var self = this;
        this.$nextTick(function() {
            //请求询问是否绑定过账号
            this.$http.get('../isbind.json').then(function(response) {
                if (response.data.isbind) {
                    self.islogin = response.data.isbind ? response.data.isbind : false;
                    self.mytype = response.data.mytype ? response.data.mytype : "";
                    self.myteamName = response.data.myteamName ? response.data.myteamName : "";
                    self.myteamId = response.data.myteamId ? response.data.myteamId : "";
                    self.myflag = response.data.myflag ? response.data.myflag : false;
                    self.myreward = response.data.myreward ? response.data.myreward : 0;
                    //是否是赏金猎人，是否签到过
                    self.ishunter = response.data.ishunter ? response.data.ishunter : false;
                    self.isSignIn = response.data.isSignIn ? response.data.isSignIn : false;
                    if ((self.ishunter) && (!self.isSignIn)) {
                        self.showSignIn();
                    }
                }
            }, function(response) {});
            //商品列表
            this.$http.get('../product.json').then(function(response) {
                if (response.data.status) {
                    for (var i = 0; i < response.data.products.length; i++) {
                        self.products.push(response.data.products[i]);
                    }
                }
            }, function(response) {});
        })
    },
    methods: {
        SignInTime: function() {
            var isToday = new Date();
            var str = isToday.getFullYear() + "年" + (isToday.getMonth() + 1) + "月" + isToday.getDate() + "日";
            this.todayNow = str;
        },
        closeLayout: function() {
            for (var x in this.layout) {
                this.layout[x] = false;
            }
        },
        closeLayout2: function() {
            for (var x in this.layout2) {
                this.layout2[x] = false;
            }
        },
        showLayout: function() {
            this.closeLayout();
            this.layout.layoutbg = true;
        },
        showLayoutbg1: function() {
            this.showLayout();
            this.layout.layoutbg1 = true;
        },
        showLayoutbg2: function() {
            this.showLayout();
            this.layout.layoutbg2 = true;
        },
        showLayoutbg3: function() {
            this.showLayout();
            this.layout.layoutbg3 = true;
        },
        showLayoutbg4: function() {
            this.showLayout();
            this.layout.layoutbg4 = true;
        },
        showLayout2: function() {
            this.closeLayout2();
            this.layout2.layoutbg = true;
        },
        showLayout2bg2: function() {
            this.showLayout2();
            this.layout2.layoutbg2 = true;
        },
        showLayout2bg3: function() {
            this.showLayout2();
            this.layout2.layoutbg3 = true;
        },
        //签到页面
        showSignIn: function() {
            this.SignInTime();
            this.showLayoutbg3();
            this.layout.signIn = true;
        },
        //绑定账户页面
        showBindAccount: function() {
            this.showLayoutbg1();
            this.layout.account_bind = true;
        },
        //加入赏金猎人小队页面
        showJoinHunterId: function() {
            this.showLayoutbg3();
            this.layout.join_hunterId = true;
        },
        //加入赏金猎人小队成功的页面
        showJoinSuccess: function() {
            this.showLayoutbg2();
            this.layout.join_hunter = true;
        },
        //加入赏金猎人小队失败的页面
        showJoinFail: function() {
            this.showLayoutbg2();
            this.layout.join_fail = true;
        },
        //退出赏金猎人小队成功页面
        showQuitSuccess: function() {
            this.showLayoutbg2();
            this.layout.quit_hunter = true;
        },
        //退出赏金猎人小队失败页面
        showQuitFail: function() {
            this.showLayoutbg2();
            this.layout.quit_fail = true;
        },
        //是否加入赏金小队
        showIfJoin: function() {
            this.showLayoutbg3();
            this.layout.ifjoin = true;
        },
        //是否退出赏金小队
        showIfCancel: function() {
            this.showLayoutbg3();
            this.layout.ifcancel = true;
        },
        //非法操作提示页面
        showIllegal: function() {
            this.showLayoutbg2();
            this.layout.illegal = true;
        },
        //购买成功页面
        showBuySuccess: function() {
            this.showLayoutbg2();
            this.layout.buy_success = true;
        },
        //绑定失败页面
        showBindFail: function() {
            this.showLayoutbg2();
            this.layout.bind_fail = true;
        },
        //变更记录页面
        showMyRecord: function() {
            this.showLayoutbg4();
            this.layout.myrecord = true;            
        },
        //成功成为赏金猎人
        showBehunterSuccess: function() {
            this.showLayoutbg2();
            this.layout.behunter_success = true;
        },
        //成为赏金猎人失败
        showBehunterFail: function() {
            this.showLayoutbg2();
            this.layout.behunter_fail = true;
        },
        //我的小队
        showmyTeam: function() {
            this.showLayoutbg4();
            this.layout.myteam = true;
        },
        //领取失败
        showReceiveFail: function() {
            this.showLayoutbg2();
            this.layout.receive_fail = true;
        },
        //解除关系
        showDischargeSuccess: function() {
            this.showLayout2bg2();
            this.layout2.discharge = true;
        },
        //成功领到赏金
        showReceiveSuccess: function() {
            this.showLayout2bg2();
            this.layout2.get_success = true;
        },
        //查看变更记录
        checkMyRecord: function() {
            if (vm.islogin) { //如果绑定就可以查看变更记录
                this.$http.get('../records.json').then(function(response) {
                    if (response.data.status) {
                        for (var i = 0; i < response.data.records.length; i++) {
                            vm.records.push(response.data.records[i]);
                        }
                        vm.showMyRecord();
                    }
                }, function(response) {});
            } else {
                vm.showIllegal(); //未绑定就给出非法提示
            }
        },
        bindAccount: function() {
            var flag = 1;
            if (this.myaccountInfo.areaId == "") {
                flag = 0;
                alert("区服不能为空");
                return false;
            }
            if (this.myaccountInfo.roleId == "") {
                flag = 0;
                alert("角色ID不能为空");
                return false;
            }
            if (flag) {
                this.$http.post('../isbind.json', this.myaccountInfo).then(function(response) {
                    if (response.data.isbind) {
                        this.islogin = response.data.isbind;
                        this.mytype = response.data.mytype;
                        this.myflag = response.data.myflag;
                        this.myreward = response.data.myreward;
                        this.closeLayout();
                    } else {
                        this.showBindFail();
                    }
                }, function(response) {});
            }
        },
        buyProduct: function(pId, pName) {
            //判断是否绑定账户
            if (vm.islogin) { //如果绑定就可以购买产品
                this.$http.put('../buyp.json', { pId: pId }).then(function(response) {
                    if (response.data.status) { //购买成功
                        this.showBuySuccess();
                        this.myreward = response.data.myreward;
                        this.myPname = pName;
                    } else {
                        this.showIllegal();
                    }
                }, function(response) {});
            } else {
                vm.showIllegal(); //未绑定就给出非法提示
            }
        },
        getMore: function() {
            this.recordsPage++;
            this.$http.get('../records.json', { page: this.recordsPage }).then(function(response) {
                if (response.data.status) {
                    for (var i = 0; i < response.data.records.length; i++) {
                        vm.records.push(response.data.records[i]);
                    }
                }
            }, function(response) {});
        },
        signInNow: function() {
            //签到
            this.$http.get('../records.json').then(function(response) {
                if (response.data.status) {
                    alert("签到成功！");
                    this.myreward = response.data.myreward;
                    this.closeLayout();
                }
            }, function(response) {});
        },
        checkHunter: function() {
            //检查是否具备成为赏金猎人的资格
            this.$http.get('../ishunter.json').then(function(response) {
                if (response.data.status) {
                    this.myreward = response.data.myreward;
                    this.myteamId = response.data.myteamId;
                    vm.showBehunterSuccess();
                } else {
                    vm.showBehunterFail();
                }
            }, function(response) {});
        },
        //加入猎人小队
        checkHunterTeam: function() {
            //获取小队名称         
            this.$http.get('../ishunter.json', { TeamId: this.joinTeamId }).then(function(response) {
                if (response.data.status) {
                    this.myteamName = response.data.myteamName;
                    vm.showIfJoin();
                }
            }, function(response) {});
        },
        //确认加入猎人小队
        joinHunterTeam: function() {
            //检查是否具备加入赏金猎人小队的资格
            this.$http.get('../ishunter.json', { TeamId: this.joinTeamId }).then(function(response) {
                if (response.data.status) {
                    vm.showJoinSuccess();
                } else {
                    vm.showJoinFail();
                }
            }, function(response) {});
        },
        //确认是否退出猎人小队
        checkQuitHunterTeam: function() {
            vm.showIfCancel();
        },
        //退出猎人小队
        quitHunterTeam: function(id) {
            //个人退出小队
            this.$http.get('../ishunter.json', { myteamId: this.myteamId }).then(function(response) {
                if (response.data.status) {
                    vm.showQuitSuccess();
                } else {
                    vm.showQuitFail();
                }
            }, function(response) {});
        },
        //管理猎人小队
        manageHunterTeam: function() {
            this.myteam = [];
            this.$http.get('../myteam.json').then(function(response) {
                if (response.data.status) {
                    for (var i = 0; i < response.data.myteam.length; i++) {
                        this.myteam.push(response.data.myteam[i]);
                    }
                    vm.showmyTeam();
                }
            }, function(response) {});
        },
        //领取赏金
        receiveBounty: function() {
            this.myteam = [];
            this.$http.get('../myteam.json').then(function(response) {
                if (response.data.status) {
                    for (var i = 0; i < response.data.myteam.length; i++) {
                        this.myteam.push(response.data.myteam[i]);
                    }
                    vm.showReceiveSuccess();
                } else {
                    vm.showReceiveFail();
                }
            }, function(response) {});
        },
        //解除关系
        discharge: function(id, name, index) {
            this.dischargeId = id;
            this.dischargeName = name;
            this.dischargeIndex = index;
            this.showLayout2bg3();
            this.layout2.ifcancel = true;
        },
        //解除关系
        quitHunterTeam2: function(id) {
            this.$http.get('../ishunter.json', { Id: id }).then(function(response) {
                if (response.data.status) {
                    vm.showDischargeSuccess();
                    this.myteam.splice(this.dischargeIndex, 1);
                } else {
                    this.showLayout2bg2();
                    this.layout2.quit_fail = true;
                }
            }, function(response) {});
        }
    }
})
$(function() {
    util.share({ title: "", contents: "", link: "", icon: "" });
    //select
    $(".select-box").click(function() {
        $(this).find("ul").show();
    });

    function initArea(versionId) {
        $(".select-area").find("ul").empty();
        $.get('area.json', { versionId: versionId },
            function(data) {
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str += "<li data-gameId=" + data[i].server_Id + ">" + data[i].name + "</li>";
                }
                $(".select-area").find("ul").append(str);
            });
    }
    initArea(5002);
    $(".select-area").find("ul").on("click", "li", function(e) {
        clickLi($(this), e);
        vm.myaccountInfo.areaId = $(this).attr('data-gameId');
    });

    function clickLi(obj, e) {
        var select_text = obj.parent().parent().find(".select-text");
        select_text.html(obj.html());
        $(".select-box").find("ul").hide();
        e.stopPropagation();
    }
    $(".select-version").find("li").click(function(e) {
        clickLi($(this), e);
        var num = $(this).attr('data-gameId');
        $(".select-area").find("i").html("请选择区服");
        initArea(num);
        vm.myaccountInfo.versionId = num;
        vm.myaccountInfo.areaId = "";
    });

    // $("body").height($(window).height()).css({
    //     "overflow-y": "hidden"
    // });
})
