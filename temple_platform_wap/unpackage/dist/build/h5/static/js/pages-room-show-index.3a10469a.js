(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-room-show-index"],{"1ba7":function(t,i,e){"use strict";e.r(i);var o=e("9938"),a=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,(function(){return o[t]}))}(n);i["default"]=a.a},"1ed0":function(t,i,e){var o=e("24fb");i=o(!1),i.push([t.i,".detail{font-size:16px}\r\n\r\n\r\n/* 頂部 */.Dtop .title{padding-left:13px;font-size:17px;font-weight:700;color:#333;padding-top:10px;background:#fff;line-height:1.6}.Dtop .amount{padding:12px 15px 10px}.Dtop .pro .sel-box{background:#e6e2e0;border-radius:6px;margin:10px 0;position:relative}.Dtop .pro .sel{background:#ffa470;border-radius:6px;height:6px}.Dtop .pro .prov{font-size:12px;color:#ff6811;line-height:26px;margin-left:5px}.Dtop .count .p{color:#333;font-size:15px}.Dtop .count .p span{color:#ff6811;margin:0 3px;font-size:18px}.Dtop .tip{border-top:#ccc 1px solid;background:#fff;padding:15px;color:#333;font-size:14px;border-bottom:#ccc 1px solid}\r\n\r\n\r\n/* 感謝愛心人士 */.desca{border-bottom:#ccc 1px solid;border-top:#ccc 1px solid;background:#fff;padding:15px;margin:15px 0}.desca .tt span{color:#ff6811;margin:0 3px}.ctx .imgs{width:90%;margin-top:10px;position:relative}.ctx .imgs .ed{background:url(http://wx.ciensi.net/m/picture/ff.png) no-repeat bottom}.ctx .imgs .li{padding-bottom:20px;margin-right:10px;width:50px}.ctx .imgs .li .head{border-radius:50%;box-sizing:border-box;width:50px;height:50px;border:2px solid #fff}.ctx .imgs .ed .head{border:2px solid #ff9558;box-sizing:border-box}.ctx .arr .iconfont{display:-webkit-box;display:-webkit-flex;display:flex;font-size:28px;color:#999;width:20px;height:50px;line-height:50px;margin-top:10px}.ms{background:#eeefe9;border-radius:5px;padding:15px}.ms .ms1 span{color:#ff6811;margin:0 3px}.ms .ms2{color:#92928a;font-size:14px}\r\n\r\n\r\n/* 详情 */.detail .content{color:#5a5451}.detail .content .box .desc{padding:10px 0 20px}.detail .content .box .desc .tt{border-bottom:#ccc 1px solid;padding:0 20px 0 15px;font-weight:700;margin-bottom:10px}.detail .content .box .desc .tt span{display:block;width:80px;text-align:center;line-height:30px;margin-right:20px;font-size:15px}.detail .content .box .desc .hover{display:block;border-bottom:#f60 2px solid;width:80px;text-align:center;line-height:30px;float:left;margin-right:20px}.con-detail{font-size:16px;line-height:1.75em}.con-detail .p{text-align:justify}.con-detail .strong,.con-detail .em,.con-detail .span{display:inline}.con-detail .img,.con-detail img{max-width:100%}\r\n\r\n\r\n/* 提交 */.detail .btn img{width:20px;height:20px;margin-right:5px;vertical-align:-4px}.detail .btn{position:fixed;bottom:0;width:100%;width:100%;height:35px;line-height:35px;font-size:16px;color:#fff;display:inline-block;border-radius:5px;border:1px #fe7225 solid;text-align:center;background:#ff6811}\r\n\r\n\r\n/* 留言 */.detail .list{background:#fff;border-top:1px solid #e8e7e6}.detail .list .li{margin:0;border-bottom:1px solid #e8e7e6;padding:10px 0}.detail .list .li:last-child{border-bottom:0}.detail .list .li .tou{float:left}.detail .list .li img{width:60px;height:60px;border-radius:30px;float:left}.detail .list .wenzi{margin-left:75px;color:#6a6562}.detail .list .gaiup{padding-bottom:10px}.detail .list .gai1{color:#b6aeab;min-width:50px}.detail .list .gai2 span{color:#f25a4c;font-weight:700;padding:0 3px}.detail .list .gaitime{padding:10px 0;line-height:22px;color:#b1a8a3}#footer-btn .icon{width:20px;height:20px;margin-right:5px;vertical-align:-4px}#footer-btn .Bitem{width:60px}",""]),t.exports=i},"57cc":function(t,i,e){var o=e("1ed0");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=e("4f06").default;a("3ff2833e",o,!0,{sourceMap:!1,shadowMode:!1})},6787:function(t,i,e){"use strict";var o;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return o}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("page",{ref:"page",attrs:{parentData:t.data,formAction:t.formAction}}),t.data.show?e("v-uni-view",{staticClass:"detail"},[e("v-uni-view",{staticClass:"banner"},[e("myswiper",{attrs:{lists:t.data.covers,purl:"room"}})],1),e("v-uni-view",{staticClass:"Dtop bg-f"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.data.detail.name))]),e("v-uni-view",{staticClass:"price plr15 fs-24 pb10"},[e("v-uni-text",{staticClass:"fs-14"},[t._v("￥")]),t._v(t._s(t.data.detail.price))],1)],1),e("v-uni-view",{staticClass:"content pb50 bg-f mt10"},[e("v-uni-view",{staticClass:"box"},[e("v-uni-view",{staticClass:"desc"},[e("v-uni-view",{staticClass:"tt flex"},[e("span",{staticClass:"hover",attrs:{id:"two1"}},[t._v("详情介绍")])]),0==t.showType?e("v-uni-view",{staticClass:"p10 con-detail"},[e("u-parse",{attrs:{content:t.data.detail.content}})],1):t._e()],1)],1)],1),e("v-uni-view",{staticClass:"p0 bd-te",attrs:{id:"footer-btn"}},[e("v-uni-view",{staticClass:"Bitem text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goto("/pages/index/index",2)}}},[e("v-uni-view",{staticClass:"lh-28 h-28"},[e("i",{staticClass:"iconfont icon-home fs-20"})]),e("v-uni-view",{staticClass:"fs-12 lh-18"},[t._v("首页")])],1),e("v-uni-view",{staticClass:"Bitem text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.phone("0750-3663581")}}},[e("v-uni-view",{staticClass:"lh-28 h-28"},[e("i",{staticClass:"iconfont icon-service fs-20"})]),e("v-uni-view",{staticClass:"fs-12 lh-18"},[t._v("客堂电话")])],1),e("v-uni-view",{staticClass:"flex1 pr10 ptb5 ml10"},[e("v-uni-view",{staticClass:"f-dx-btn dx-btn-orange text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goto("/pages/room/order/buy/index?id="+t.data.detail.id,1)}}},[e("v-uni-text",{staticClass:"iconfont icon-like-circle fc-white fs-18 pr5"}),t._v("我要订房")],1)],1)],1),e("v-uni-view",{staticClass:"btn"})],1):t._e()],1)},n=[]},9938:function(t,i,e){"use strict";var o=e("4ea4");e("b680"),e("acd8"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("57cc");var a=o(e("7a58")),n={components:{uParse:a.default},data:function(){return{formAction:"/roomAppointment/room/show",mpType:"page",data:this.formatData(this),showType:0,selectKey:0,ruleform:{},vaildate:{},getSiteName:this.getSiteName()}},computed:{amount:function(){var t=0;return this.ruleform.amount&&(t+=parseFloat(this.ruleform.amount)),this.ruleform.amount&&this.ruleform.is_top&&(t+=parseFloat(this.ruleform.top_price)),t.toFixed(2)}},onReachBottom:function(){this.hasMore(this)},onPullDownRefresh:function(){this.data.nextPage=1,this.ajax()},onShareAppMessage:function(){return this.shareSource(this,"商城")},onLoad:function(t){var i=this,e={};uni.getSystemInfo({success:function(t){i.width=e.left||t.windowWidth,i.height_=e.top?e.top+e.height+8:t.statusBarHeight+44,i.top=e.top?e.top+(e.height-32)/2:t.statusBarHeight+6,i.scrollH=t.windowWidth,i.width_=t.windowWidth,i.height=t.windowHeight}}),this.ajax()},methods:{ajax:function(){var t=this;this.getAjax(this).then((function(i){t.setTitle(i.detail.name),t.$refs.page.share(i.detail.name,i.detail.firstCover,t.data.siteConfig.share_descript)}))}}};i.default=n},cd12:function(t,i,e){"use strict";e.r(i);var o=e("6787"),a=e("1ba7");for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);var s,r=e("f0c5"),d=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);i["default"]=d.exports}}]);