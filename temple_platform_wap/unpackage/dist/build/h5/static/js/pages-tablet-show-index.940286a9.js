(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tablet-show-index"],{2597:function(t,i,e){var a=e("e75b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("5ec52376",a,!0,{sourceMap:!1,shadowMode:!1})},"45c6":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("page",{ref:"page",attrs:{parentData:t.data,formAction:t.formAction}}),t.data.show?e("v-uni-view",{staticClass:"detail pb50"},[e("v-uni-view",{staticClass:"banner"},[e("myswiper",{attrs:{lists:t.data.covers,purl:"project"}})],1),e("v-uni-view",{staticClass:"Dtop"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.data.detail.name))]),e("v-uni-view",{staticClass:"amount bg-f"},[e("v-uni-view",{staticClass:"count flex-between"},[e("v-uni-view",{staticClass:"p"},[t._v("已捐"),e("span",{staticClass:"fc-red plr3"},[t._v(t._s(t.getAmount(t.data.detail.orderSum)))]),t._v("份")]),e("v-uni-view",{staticClass:"p"},[t._v("随喜次数"),e("span",[t._v(t._s(t.data.detail.orderNum))]),t._v("人")])],1)],1)],1),e("v-uni-view",{staticClass:"content mt10 bg-f"},[e("v-uni-view",{staticClass:"tt"},[e("v-uni-view",{staticClass:"name",class:[0==t.showType?"hover":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.showType=0}}},[t._v("详情")]),e("v-uni-view",{staticClass:"name",class:[1==t.showType?"hover":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.showType=1}}},[t._v("留言("),e("v-uni-text",{staticClass:"Arial fc-red"},[t._v(t._s(t.data.orderCount))]),t._v(")")],1)],1),0==t.showType?e("v-uni-view",{staticClass:"p20 con-detail"},[e("u-parse",{attrs:{content:t.data.detail.content}})],1):t._e(),1==t.showType?e("v-uni-view",[e("v-uni-view",{staticClass:"fs-16 ml15 mr20 lh-30"},[t._v("参与善士")]),e("v-uni-view",{staticClass:"list ml15 mr20"},[e("v-uni-view",{staticClass:"items"},t._l(t.data.lists.data,(function(i){return e("v-uni-view",{staticClass:"li"},[e("v-uni-view",{staticClass:"wenzi ml0"},[e("v-uni-view",{staticClass:"gaiup flex"},[e("v-uni-view",{staticClass:"gai1 fs-16"},[t._v(t._s(t.formatName(i.bless_name?i.bless_name:i.nickname)))]),e("v-uni-view",{staticClass:"gai2 fs-16"},[t._v("行善"),e("span",{staticClass:"fs-16"},[t._v(t._s(t.getAmount(i.amount)))]),t._v("份")])],1),i.evaluate?e("v-uni-view",{staticClass:"gaidown fs-16"},[t._v(t._s(i.evaluate))]):t._e(),e("v-uni-view",{staticClass:"gaitime fs-16"},[t._v(t._s(i.payed_at))])],1)],1)})),1),e("hasMore",{attrs:{parentData:t.data}})],1)],1):t._e()],1),e("v-uni-view",{staticClass:"p0 bd-te",attrs:{id:"footer-btn"}},[e("v-uni-view",{staticClass:"Bitem text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goto("/pages/index/index",2)}}},[e("v-uni-view",{staticClass:"lh-28 h-28"},[e("i",{staticClass:"iconfont icon-home fs-20"})]),e("v-uni-view",{staticClass:"fs-12 lh-18"},[t._v("首页")])],1),e("v-uni-view",{staticClass:"Bitem text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.phone("0750-3663581")}}},[e("v-uni-view",{staticClass:"lh-28 h-28"},[e("i",{staticClass:"iconfont icon-service fs-20"})]),e("v-uni-view",{staticClass:"fs-12 lh-18"},[t._v("客堂电话")])],1),e("v-uni-view",{staticClass:"flex1 pr10 ptb5 ml10"},[e("v-uni-view",{staticClass:"f-dx-btn dx-btn-orange text-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toBuy.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"iconfont icon-like-circle fc-white fs-18 pr5"}),t._v("我要随喜")],1)],1)],1),e("v-uni-view",{staticClass:"btn"})],1):t._e()],1)},o=[]},4835:function(t,i,e){"use strict";e.r(i);var a=e("45c6"),n=e("7991");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);var s,r=e("f0c5"),l=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);i["default"]=l.exports},7991:function(t,i,e){"use strict";e.r(i);var a=e("acde"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},acde:function(t,i,e){"use strict";var a=e("4ea4");e("b680"),e("acd8"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("2597");var n=a(e("7a58")),o={components:{uParse:n.default},data:function(){return{formAction:"/tablet/show",mpType:"page",data:this.formatData(this),showType:0,selectKey:0,ruleform:{},vaildate:{},getSiteName:this.getSiteName()}},computed:{amount:function(){var t=0;return this.ruleform.amount&&(t+=parseFloat(this.ruleform.amount)),this.ruleform.amount&&this.ruleform.is_top&&(t+=parseFloat(this.ruleform.top_price)),t.toFixed(2)}},onReachBottom:function(){this.hasMore(this)},onPullDownRefresh:function(){this.data.nextPage=1,this.ajax()},onShareAppMessage:function(){return this.shareSource(this,"商城")},onLoad:function(t){var i=this,e={};uni.getSystemInfo({success:function(t){i.width=e.left||t.windowWidth,i.height_=e.top?e.top+e.height+8:t.statusBarHeight+44,i.top=e.top?e.top+(e.height-32)/2:t.statusBarHeight+6,i.scrollH=t.windowWidth,i.width_=t.windowWidth,i.height=t.windowHeight}}),this.ajax()},methods:{toBuy:function(){return 1==this.data.detail.type?this.goto("/pages/tablet/order/buy/type"+this.data.detail.type+"/index?tablet_id="+this.data.detail.id,1):2==this.data.detail.type?this.goto("/pages/tablet/order/buy/type2/video/index?tablet_id="+this.data.detail.id,1):this.goto("/pages/tablet/order/buy/type"+this.data.detail.type+"/index?tablet_id="+this.data.detail.id,1)},ajax:function(){var t=this;this.getAjax(this).then((function(i){t.setTitle(i.detail.name),t.$refs.page.share(i.detail.name,i.detail.firstCover,t.data.siteConfig.share_descript)}))}}};i.default=o},e75b:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".detail{font-size:16px}.nostar .star{display:none}.topFloat{width:56px!important;height:56px!important}.topFloat .one-name{padding:0 10px;width:54px!important;height:54px!important;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}\r\n/* 頂部 */.Dtop .title{padding-left:13px;font-size:17px;font-weight:700;color:#333;padding-top:10px;background:#fff;line-height:1.6}.Dtop .amount{padding:12px 15px 10px}.Dtop .pro .sel-box{background:#e6e2e0;border-radius:6px;margin:10px 0;position:relative}.Dtop .pro .sel{background:#ffa470;border-radius:6px;height:6px}.Dtop .pro .prov{font-size:12px;color:#ff6811;line-height:26px;margin-left:5px}.Dtop .count .p{color:#333;font-size:15px}.Dtop .count .p span{color:#ff6811;margin:0 3px;font-size:18px}.Dtop .tip{border-top:#ccc 1px solid;background:#fff;padding:15px;color:#333;font-size:14px;border-bottom:#ccc 1px solid}\r\n/* 感謝愛心人士 */.desca{border-bottom:#ccc 1px solid;border-top:#ccc 1px solid;background:#fff;padding:15px;margin:15px 0}.desca .tt span{color:#ff6811;margin:0 3px}.ctx .imgs{width:90%;margin-top:10px;position:relative}.ctx .imgs .ed{background:url(http://wx.ciensi.net/m/picture/ff.png) no-repeat bottom}.ctx .imgs .li{padding-bottom:20px;margin-right:10px;width:50px}.ctx .imgs .li .head{border-radius:50%;box-sizing:border-box;width:50px;height:50px;border:2px solid #fff}.ctx .imgs .ed .head{border:2px solid #ff9558;box-sizing:border-box}.ctx .arr .iconfont{display:-webkit-box;display:-webkit-flex;display:flex;font-size:28px;color:#999;width:20px;height:50px;line-height:50px;margin-top:10px}.ms{background:#eeefe9;border-radius:5px;padding:15px}.ms .ms1 span{color:#ff6811;margin:0 3px}.ms .ms2{color:#92928a;font-size:14px}\r\n/* 详情 */.detail{color:#5a5451}.detail .tt{border-bottom:#eee %?2?% solid;padding:0 %?30?%;margin-bottom:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex}.detail .tt .name{text-align:center;line-height:%?60?%;margin:0 %?30?%;font-size:%?36?%;padding:%?10?% 0}.detail .tt .hover{display:block;border-bottom:#f60 %?8?% solid;text-align:center;line-height:%?60?%}.con-detail{font-size:16px;line-height:1.75em}.con-detail .p{text-align:justify}.con-detail .strong,.con-detail .em,.con-detail .span{display:inline}.con-detail .img,.con-detail img{max-width:100%}\r\n/* 提交 */.detail .btn img{width:20px;height:20px;margin-right:5px;vertical-align:-4px}.detail .btn{position:fixed;bottom:0;width:100%;width:100%;height:35px;line-height:35px;font-size:16px;color:#fff;display:inline-block;border-radius:5px;border:1px #fe7225 solid;text-align:center;background:#ff6811}\r\n/* 留言 */.detail .list{background:#fff}.detail .list .li{margin:0;border-bottom:1px solid #e8e7e6;padding:10px 0}.detail .list .li:last-child{border-bottom:0}.detail .list .li .tou{float:left}.detail .list .li img{width:60px;height:60px;border-radius:30px;float:left}.detail .list .wenzi{margin-left:75px;color:#6a6562}.detail .list .gaiup{padding-bottom:10px}.detail .list .gai1{color:#b6aeab;min-width:50px}.detail .list .gai2 span{color:#f25a4c;font-weight:700;padding:0 3px}.detail .list .gaitime{padding:10px 0;line-height:22px;color:#b1a8a3}\r\n/* 活动牌位提交 */.show-tablet .dx-input,\r\n.show-tablet .dx-cell{font-size:17px!important}.show-tablet .dx-cell{border:1px #ddd solid;margin-top:%?24?%;border-radius:%?12?%}.show-tablet .dx-label{width:80px!important}.show-tablet .tip{font-size:%?28?%;color:#666;margin-top:%?8?%;text-align:justify;line-height:1.4}.show_textarea .dx-cell{border:1px #ddd solid;border-radius:6px;margin-top:10px;padding:%?24?% %?30?%}.show_textarea .uni-textarea-textarea{line-height:1.8}#footer-btn .icon{width:20px;height:20px;margin-right:5px;vertical-align:-4px}#footer-btn .Bitem{width:60px}\r\n/* #footer-btn .BtnG /deep/.form:first-child{width: 40%;}\r\n#footer-btn .BtnG /deep/.form:last-child{width: 60%;} */#footer-btn .BtnG /deep/.form .dxi-btn{padding-left:%?10?%;padding-right:%?10?%;text-align:center}\r\n/* 滚动文字 */.v1-qf-list-item .name{color:#666;font-size:14px}.v1-qf-list-item .name:hover{color:#000}\r\n/* 通知弹出层 */.noticeDiag .dxi-diag-box{background-image:url(/static/noticeBg.jpg);background-repeat:no-repeat;background-size:100% 100%}.noticeBg{background-image:url(/static/noticeBg.jpg);background-repeat:no-repeat;background-size:100% 100%}\r\n/* 选择时段 */.select-group{padding:0 %?30?%}.select-group .sg-title{font-size:%?34?%;padding:%?30?% 0;color:#000}.select-group .sg-group{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.select-group .sg-nav{line-height:%?74?%;width:48%;margin:0 2% %?30?% 0;text-align:center;font-size:%?30?%;color:#343434;border:%?1?% #eee solid;border-radius:%?36?%}.select-group .sg-nav:nth-child(4n){margin-right:0}.select-group .cur{background-color:#a98853;border-color:#a98853;color:#fff}\r\n/* 早课类型 */.matin-type{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?30?%}.matin-type .mt-nav{line-height:%?74?%;width:32%;margin:0 2% %?30?% 0;text-align:center;font-size:%?30?%;color:#343434;border:%?1?% #eee solid;border-radius:%?36?%}.matin-type .mt-nav:nth-child(3n){margin-right:0}.matin-type .cur{background-color:#ff721f;border-color:#ff721f;color:#fff}.matin-time{padding:0 %?30?% %?30?%}.matin-time ::v-deep .dx-cell{border:%?1?% #eee solid;border-radius:%?12?%}.matin-time ::v-deep .dx-cell:after{display:none}.matin-time ::v-deep .dx-cell .picker{text-align:left}",""]),t.exports=i}}]);