(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-project-order-buy-index"],{1402:function(e,t,r){var i=r("24fb");t=i(!1),t.push([e.i,'.pay .weui-label{width:95px}.pay .box-item{margin-bottom:12px;background:#fff}.pay .weui-cell{padding:8px 15px;color:#333}\r\n/* 金额 */.pay-price .item{min-width:calc(25% - 10px);margin:5px;border:1px #e1e1e1 solid;border-radius:4px;text-align:center;line-height:36px;height:38px;padding:0 10px}.pay-price .item .price{color:#aaa;text-align:center;font-size:18px;color:#ff721f}.pay-price .item.select{background:#ff721f;border-color:#ff721f}.pay-price .item.select .price{color:#fff!important}.pay-price .other{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.pay-price .other.select{background:#fff}.anonymous .select{width:14px;height:14px;border:1px #ccc solid;border-radius:3px;margin-right:3px}.anonymous .yes:before{content:"";display:block;width:8px;height:4px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border-width:0 0 1px 1px;border-style:solid;border-color:red;margin-top:2px;margin-left:2px}.order-price .weui-cell{padding:0 15px}.content .weui-cell{border-bottom:0}\r\n/* .content .weui-input{line-height: 20px;color: #999;width: 100%;border: 1px #e1e1e1 solid;padding: 10px;border-radius: 6px;} */.pay .top{border-top:1px solid #dad7d0;border-bottom:1px solid #d2d2d2;line-height:40px}.pay .top .tip{color:#56504d}.pay .top .close{width:40px;height:40px;text-align:center}.pay .box{margin:20px}.pay .box .tb{width:100%;font-size:16px;color:#b0a7a2}.pay .box .tb .ed{border:2px solid #f37b30;background:url(http://wx.ciensi.net/m/picture/yqj_selected.png) no-repeat 100% 0}.pay .box .tb .sel{font-size:14px;line-height:26px;border:1px solid #c5c0b8;border-radius:5px;word-break:break-all;word-wrap:break-word;background:#fff;padding:4px 5px;text-align:center;width:100%;outline:none;height:38px;color:#000}.pay .box .Info .sel{display:-webkit-box;display:-webkit-flex;display:flex;text-align:left}.pay .box .Info .sel .name{color:red}.pay .box .Info .sel .input{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;width:100%;text-align:left}\r\n/* .pay .anonymous .anonymouscheck {width: 12px;height: 12px;vertical-align: -1px;}\r\n.pay .anonymous {font-size: 14px;color: #b0a7a2;margin-top: 10px;text-align: center;} */.other{width:14px;height:14px;float:right;margin-right:-5px;margin-top:-5px;display:block}.pay .box .tb .sel uni-input{border:0;width:90px;height:25px;font-size:16px;color:#fc7d37;text-align:center;-webkit-appearance:none}.pay .box .btn_{margin-top:18px;width:100%;height:37px;line-height:35px;font-size:16px;color:#fff;display:inline-block;border-radius:5px;text-align:center;background:#ff6c0a}.remark{font-size:14px;line-height:26px;border:1px solid #c5c0b8;border-radius:5px;word-break:break-all;word-wrap:break-word;background:#fff;padding:4px 5px;text-align:left;width:100%;outline:none}',""]),e.exports=t},"48b7":function(e,t,r){"use strict";var i;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("page",{ref:"page",attrs:{parentData:e.data,formAction:e.formAction}}),e.data.show?r("v-uni-view",{staticClass:"pay detail"},[r("v-uni-view",{staticClass:"pay-price box-item fs-15"},[r("v-uni-view",{staticClass:"Btitle plr15 pt10"},[r("v-uni-view",{staticClass:"name fs-16 lh-30"},[e._v("选择随喜金额")])],1),r("v-uni-view",{staticClass:"flex flex-wrap p5 pb0"},e._l(e.amountArr,(function(t){return t?r("v-uni-view",{class:["item",e.ruleform.amount==t?"select":""]},[r("v-uni-view",{class:["price",e.ruleform.amount==t?"fc-white":""],on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.ruleform.amount=t}}},[e._v(e._s(t))])],1):e._e()})),1),r("v-uni-view",{staticClass:"flex p5 pt0"},[e.ruleform.show_other_price?r("v-uni-view",{class:["item","other",0==e.ruleform.amount?"select":""],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ruleform.amount=0}}},[r("v-uni-view",{class:["pl8",,0==e.ruleform.amount?"fc-orange":"fc-9"]},[e._v("其他")]),r("v-uni-input",{staticClass:"w-b100 flex1 text-left plr15",attrs:{type:"number",maxlength:"7",max:"3000"},model:{value:e.ruleform.otheramount,callback:function(t){e.$set(e.ruleform,"otheramount",t)},expression:"ruleform.otheramount"}}),r("v-uni-view",{class:["pr8",,0==e.ruleform.amount?"fc-orange":"fc-9"]},[e._v("元")])],1):e._e()],1)],1),r("v-uni-view",{staticClass:"box-item people-info"},[r("v-uni-view",{staticClass:"Btitle plr15 pt10"},[r("v-uni-view",{staticClass:"name fs-16 lh-30"},[e._v("功德主资料")])],1),r("weui-input",{attrs:{label:"功德主姓名",type:"text",name:"bless_name",datatype:"require",maxlength:6},model:{value:e.ruleform.bless_name,callback:function(t){e.$set(e.ruleform,"bless_name",t)},expression:"ruleform.bless_name"}}),r("weui-input",{attrs:{label:"功德主手机",type:"number",name:"phone",datatype:e.ruleform.phone_require&&!e.open?"require":""},model:{value:e.ruleform.phone,callback:function(t){e.$set(e.ruleform,"phone",t)},expression:"ruleform.phone"}}),r("weui-input",{attrs:{label:"功德主地址",type:"text",name:"bless_address",datatype:e.ruleform.address_require?"require":""},model:{value:e.ruleform.bless_address,callback:function(t){e.$set(e.ruleform,"bless_address",t)},expression:"ruleform.bless_address"}}),r("weui-input",{attrs:{type:"textarea",name:"remark",placeholder:"请输入备注"},model:{value:e.ruleform.remark,callback:function(t){e.$set(e.ruleform,"remark",t)},expression:"ruleform.remark"}}),e.ruleform.can_post?r("weui-input",{attrs:{label:"邮寄",name:"is_post",changeField:"value",type:"radio",dataKey:"sendTypeArr",radioType:!1},model:{value:e.ruleform.is_post,callback:function(t){e.$set(e.ruleform,"is_post",t)},expression:"ruleform.is_post"}}):e._e(),e.ruleform.can_post&&1==e.ruleform.is_post?r("weui-input",{attrs:{type:"text",name:"post_address",label:"邮寄地址",datatype:"require"},model:{value:e.ruleform.post_address,callback:function(t){e.$set(e.ruleform,"post_address",t)},expression:"ruleform.post_address"}}):e._e()],1),r("v-uni-view",{staticClass:"box-item content"},[r("v-uni-view",{staticClass:"Btitle plr15 pt10"},[r("v-uni-view",{staticClass:"name fs-16 lh-30"},[e._v("回向文")])],1),r("v-uni-view",{staticClass:"plr15 ptb8"},[r("v-uni-textarea",{staticClass:"remark",staticStyle:{height:"100px"},attrs:{name:"remarks",id:"remarks",title:"请输入您的回向文",placeholder:"输入您的回向文，可先小回向(若有)，再大回向",cols:"",rows:""},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ruleform.evaluate=""}},model:{value:e.ruleform.evaluate,callback:function(t){e.$set(e.ruleform,"evaluate",t)},expression:"ruleform.evaluate"}})],1)],1),r("v-uni-view",{staticClass:"m20"},[r("v-uni-view",{staticClass:"dx-btn dx-btn-lg dx-btn-orange w-b100",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[e._v("微信支付随喜")])],1)],1):e._e()],1)},a=[]},"48c4":function(e,t,r){"use strict";var i=r("4ea4");r("b680"),r("acd8"),r("ac1f"),r("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("fea7"),r("ab72");var o=i(r("7a58")),a={components:{uParse:o.default},data:function(){return{formAction:"/project/show",mpType:"page",data:this.formatData(this),amountArr:[],showType:0,ruleform:{name:"",phone:"",amount:20,otheramount:"",is_post:3,type:1,evaluate:""},vaildate:{},open:!1,getSiteName:this.getSiteName(),sendTypeArr:[{label:"需要",value:1},{label:"不需要",value:2}]}},computed:{amount:function(){var e=0;return this.ruleform.amount&&(e+=parseFloat(this.ruleform.amount)),this.ruleform.amount&&this.ruleform.is_top&&(e+=parseFloat(this.ruleform.top_price)),e.toFixed(2)}},onShareAppMessage:function(){return this.shareSource(this,"商城1")},onLoad:function(e){this.ajax()},methods:{formSubmitForH5:function(e,t){var r=this;this.updateUrl(["/pages/index/index"]),this.payUniapp(e,(function(e){return r.goto("/pages/project/order/payed/index?order_no="+t)}),(function(e){return r.goto("/pages/project/order/payed/index?order_no="+t)}))},formSubmit:function(){var e=this;if(console.log(this.ruleform),this.ruleform.can_post&&3==this.ruleform.is_post)return this.getError("请选择是否需要邮寄"),!1;if(!this.ruleform.bless_name)return this.getError("功德主不能为空"),!1;if(0==this.ruleform.amount&&!this.ruleform.otheramount)return this.getError("金額不能為空"),!1;if(0==this.ruleform.amount&&0==this.ruleform.otheramount)return this.getError("金額不能為0"),!1;if(!this.open&&!this.ruleform.phone&&this.ruleform.phone_require)return this.getError("電話不能為空"),!1;if(this.ruleform.phone){var t=/(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;if(!t.test(this.ruleform.phone))return this.getError("手机格式不正确"),!1}if(this.ruleform.address_require&&!this.ruleform.bless_address)return this.getError("地址不能为空"),!1;this.ruleform.project_id=this.data.detail.id,this.ruleform.amount=parseFloat(this.ruleform.amount),console.log(this.ruleform.amount),this.postAjax(this.formAction,this.ruleform).then((function(t){2==t.data.status&&e.formSubmitForH5(t.data.config,t.data.detail.order_no)}))},ajax:function(){var e=this;this.getAjax(this).then((function(t){e.setTitle(t.detail.name),e.amountArr=t.detail.amount_str.split(","),e.ruleform.type=t.detail.type,t.projectOrder?(e.ruleform=t.projectOrder,e.ruleform.amount=e.amountArr[0],e.ruleform.show_other_price=t.detail.show_other_price,e.ruleform.evaluate=t.detail.evaluate,e.ruleform.address_require=t.detail.address_require,e.ruleform.phone_require=t.detail.phone_require,e.ruleform.can_post=t.detail.can_post,e.ruleform.otheramount="",delete e.ruleform.id,delete e.ruleform.status,delete e.ruleform.online):(e.ruleform.amount=e.amountArr[0],e.ruleform.show_other_price=t.detail.show_other_price,e.ruleform.evaluate=t.detail.evaluate,e.ruleform.address_require=t.detail.address_require,e.ruleform.phone_require=t.detail.phone_require,e.ruleform.can_post=t.detail.can_post)}))}}};t.default=a},ab72:function(e,t,r){var i=r("dc9e");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=r("4f06").default;o("f2392402",i,!0,{sourceMap:!1,shadowMode:!1})},b22f:function(e,t,r){"use strict";r.r(t);var i=r("48b7"),o=r("b490");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);var n,l=r("f0c5"),p=Object(l["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],n);t["default"]=p.exports},b490:function(e,t,r){"use strict";r.r(t);var i=r("48c4"),o=r.n(i);for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},dc9e:function(e,t,r){var i=r("24fb");t=i(!1),t.push([e.i,'.detail{font-size:16px}.B_title{display:-webkit-box;display:-webkit-flex;display:flex}.B_title .name{position:relative;line-height:1}.B_title .name::after{content:"";display:block;background-color:#ff6811;height:4px;width:100%;position:absolute;bottom:-9px;left:0}.book_num .slot_amount{width:%?280?%}\r\n\r\n/* 頂部 */.Dtop .title{padding-left:13px;font-size:20px;font-weight:700;letter-spacing:2px;height:35px;color:#333;padding-top:10px;background:#fff}.Dtop .amount{padding:12px 15px 10px}.Dtop .pro .sel-box{background:#e6e2e0;border-radius:6px;margin:10px 0;position:relative}.Dtop .pro .sel{background:#ffa470;border-radius:6px;height:6px}.Dtop .pro .prov{font-size:12px;color:#ff6811;line-height:26px;margin-left:5px}.Dtop .count .p{color:#333;font-size:15px}.Dtop .count .p span{color:#ff6811;margin:0 3px;font-size:18px}.Dtop .tip{border-top:#ccc 1px solid;background:#fff;padding:15px;color:#333;font-size:14px;border-bottom:#ccc 1px solid}\r\n\r\n/* 感謝愛心人士 */.desca{border-bottom:#ccc 1px solid;border-top:#ccc 1px solid;background:#fff;padding:15px;margin:15px 0}.desca .tt span{color:#ff6811;margin:0 3px}.ctx .imgs{width:90%;margin-top:10px;position:relative}.ctx .imgs .ed{background:url(http://wx.ciensi.net/m/picture/ff.png) no-repeat bottom}.ctx .imgs .li{padding-bottom:20px;margin-right:10px;width:50px}.ctx .imgs .li .head{border-radius:50%;box-sizing:border-box;width:50px;height:50px;border:2px solid #fff}.ctx .imgs .ed .head{border:2px solid #ff9558;box-sizing:border-box}.ctx .arr .iconfont{display:-webkit-box;display:-webkit-flex;display:flex;font-size:28px;color:#999;width:20px;height:50px;line-height:50px;margin-top:10px}.ms{background:#eeefe9;border-radius:5px;padding:15px}.ms .ms1 span{color:#ff6811;margin:0 3px}.ms .ms2{color:#92928a;font-size:14px}\r\n\r\n/* 详情 */.detail .content{color:#5a5451}.detail .content .box .desc{padding:10px 0 20px}.detail .content .box .desc .tt{border-bottom:#ccc 1px solid;padding:0 20px 0 15px;font-weight:700;margin-bottom:10px}.detail .content .box .desc .tt span{display:block;width:80px;text-align:center;line-height:30px;margin-right:20px;font-size:15px}.detail .content .box .desc .hover{display:block;border-bottom:#f60 2px solid;width:80px;text-align:center;line-height:30px;float:left;margin-right:20px}.con-detail{font-size:16px;line-height:1.75em}.con-detail .p{text-align:justify}.con-detail .strong,.con-detail .em,.con-detail .span{display:inline}.con-detail .img,.con-detail img{max-width:100%}\r\n\r\n/* 提交 */.detail .btn img{width:20px;height:20px;margin-right:5px;vertical-align:-4px}.detail .btn{position:fixed;bottom:0;width:100%;width:100%;height:35px;line-height:35px;font-size:16px;color:#fff;display:inline-block;border-radius:5px;border:1px #fe7225 solid;text-align:center;background:#ff6811}\r\n\r\n/* 留言 */.detail .list{background:#fff;border-top:1px solid #e8e7e6}.detail .list .li{margin:0;border-bottom:1px solid #e8e7e6;padding:10px 0}.detail .list .li:last-child{border-bottom:0}.detail .list .li .tou{float:left}.detail .list .li img{width:60px;height:60px;border-radius:30px;float:left}.detail .list .wenzi{margin-left:75px;color:#6a6562}.detail .list .gaiup{padding-bottom:10px}.detail .list .gai1{color:#b6aeab;min-width:50px}.detail .list .gai2 span{color:#f25a4c;font-weight:700;padding:0 3px}.detail .list .gaitime{padding:10px 0;line-height:22px;color:#b1a8a3}#footer-btn .icon{width:20px;height:20px;margin-right:5px;vertical-align:-4px}#footer-btn .Bitem{width:60px}.buy-index2 ::v-deep .dx-label,\r\n.buy-index2 ::v-deep uni-input,\r\n.buy-index2 ::v-deep uni-input,\r\n.buy-index2 ::v-deep .dx-cell,\r\n.buy-index2 ::v-deep uni-textarea{font-size:%?38?%!important}.buy-index2 ::v-deep .uni-input-placeholder,\r\n.buy-index2 ::v-deep .uni-input-placeholder{font-size:%?38?%!important}.buy-index2 ::v-deep .dx-select .picker{text-align:left!important}.buy-index2 ::v-deep .dx-label{width:%?260?%!important}',""]),e.exports=t},fea7:function(e,t,r){var i=r("1402");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=r("4f06").default;o("b2e5020c",i,!0,{sourceMap:!1,shadowMode:!1})}}]);