(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-distribution-integral-shop-order-buy-index"],{"2b75":function(e,t,i){var r=i("24fb");t=r(!1),t.push([e.i,"#mode .weui-cell:before{border:0}.block-sec{background:#fff;margin-bottom:12px;border-radius:10px}\r\n\r\n/* 选择地址 */#address .add-add{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}#address .add-icon{background:#3384fa;width:40px;height:40px;text-align:center;line-height:40px;color:#fff;font-size:18px;border-radius:6px}#address .add-txt{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden}\r\n\r\n/* 地址信息 */.add-info{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.add-info .info{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden}.add-info .info .name{line-height:24px}.add-info .info .add-detail{display:-webkit-box;display:-webkit-flex;display:flex}.add-info .info .add-detail .label{width:45px;line-height:20px}.add-info .info .add-detail .name{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;line-height:20px}.pay_line uni-image{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;height:2px}\r\n\r\n/* 商品信息 */.order_pro{padding:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex}.order_pro .pro_img{padding-right:%?20?%}.order_pro .pro_img .img{width:%?140?%;height:%?140?%;display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?6?%}.order_pro .pro_info{-webkit-box-flex:1;-webkit-flex:1;flex:1}.order_pro .name{font-size:%?30?%;line-height:%?40?%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\r\n\r\n/* 计算与优惠信息 */#calculation .list-group{padding:10px 15px;line-height:30px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}\r\n\r\n/* 结算脚部 */#it_footer{height:%?100?%;line-height:%?100?%;position:fixed;left:0;bottom:0;width:100%;background:#fff;z-index:1;border-top:%?1?% solid #f7f7f7;padding:%?10?% %?30?%}#it_footer .f_right .txt{font-size:%?30?%}#it_footer .f_right /deep/.nav{color:#fff;background:#ff4351;font-size:%?30?%;border-radius:%?40?%;line-height:%?80?%;width:100%}",""]),e.exports=t},"495d":function(e,t,i){"use strict";i.r(t);var r=i("f331"),a=i("8b75");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);var n,o=i("f0c5"),l=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],n);t["default"]=l.exports},"5e8c":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("65bf");var r={data:function(){return{formAction:"/shop/integral/detail",shippingData:[{label:"邮寄",value:1},{label:"自提",value:2},{label:"物流",value:3}],mpType:"page",data:this.formatData(this),getSiteName:this.getSiteName(),address:{},ruleform:{},vaildate:{}}},onReachBottom:function(){this.hasMore(this)},onPullDownRefresh:function(){this.data.nextPage=1,this.ajax()},onShareAppMessage:function(){this.shareSource(this,"商城")},onLoad:function(e){e.order_no&&(this.order_no=e.order_no,e.address_id?this.formAction+="&address_id="+e.address_id+"&order_no="+e.order_no:this.formAction+="?order_no="+e.order_no),this.ajax()},methods:{submit:function(e){this.ruleform;this.receipt("确认兑换吗")},radioChange:function(e){this.ruleform.shipping=e.mp.detail.value},addressLists:function(){if(this.ruleform.status>=3)return!1;uni.setStorageSync("order_no",this.ruleform.order_no),this.goto("/pages/user/address/lists/index?order_no="+this.ruleform.order_no)},ajax:function(){var e=this;this.getAjax(this).then((function(t){e.address=t.address,e.ruleform=t.detail}))},canReceipt:function(){this.receipt("确认收货吗")},receipt:function(e){var t=this;uni.showModal({title:"提示",content:e,success:function(e){e.confirm?t.postAjax("/shop/integral/change-integral-status",t.ruleform).then((function(e){2==e.data.status&&t.goto("/pages/user/distribution/integral/shop/order/lists/index?historyUrl=del&status="+e.data.detail.status)})):e.cancel&&console.log("用户点击取消")}})},createAddress:function(){var e=this;if(this.ruleform.status>=3)return!1;uni.setStorageSync("order_no",this.ruleform.order_no),this.$refs.page.createAddress((function(t){t?e.ajax():e.goto("/pages/user/address/create_edit/index",1)}))}}};t.default=r},"65bf":function(e,t,i){var r=i("2b75");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=i("4f06").default;a("d8df1b50",r,!0,{sourceMap:!1,shadowMode:!1})},"8b75":function(e,t,i){"use strict";i.r(t);var r=i("5e8c"),a=i.n(r);for(var s in r)"default"!==s&&function(e){i.d(t,e,(function(){return r[e]}))}(s);t["default"]=a.a},f331:function(e,t,i){"use strict";var r;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("page",{ref:"page",attrs:{parentData:e.data,formAction:e.formAction}}),i("v-uni-view",{staticClass:"mt12 pb50"},[i("v-uni-view",{staticClass:"order_pro block-sec"},[i("v-uni-view",{staticClass:"pro_img"},[i("v-uni-image",{staticClass:"img",attrs:{src:e.ruleform.products.firstCover,mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"pro_info"},[i("v-uni-view",{staticClass:"name"},[e._v(e._s(e.ruleform.products.name))])],1)],1),2==e.ruleform.shipping?i("v-uni-view",{staticClass:"block-sec no"},[i("weui-input",{attrs:{label:"功德主姓名",type:"text",name:"bless_name",datatype:"require",maxlength:6},model:{value:e.ruleform.bless_name,callback:function(t){e.$set(e.ruleform,"bless_name",t)},expression:"ruleform.bless_name"}}),i("weui-input",{attrs:{label:"功德主手机",type:"number",name:"phone",datatype:"require"},model:{value:e.ruleform.phone,callback:function(t){e.$set(e.ruleform,"phone",t)},expression:"ruleform.phone"}}),i("weui-input",{attrs:{label:"功德主地址",type:"text",name:"bless_address",datatype:"require"},model:{value:e.ruleform.bless_address,callback:function(t){e.$set(e.ruleform,"bless_address",t)},expression:"ruleform.bless_address"}}),i("weui-input",{attrs:{type:"textarea",name:"remark",placeholder:"请输入备注"},model:{value:e.ruleform.remark,callback:function(t){e.$set(e.ruleform,"remark",t)},expression:"ruleform.remark"}})],1):e._e(),i("v-uni-view",{staticClass:"block-sec",attrs:{id:"calculation"}},[i("v-uni-view",{staticClass:"list-group"},[i("v-uni-view",{staticClass:"txt fs-14"},[e._v("抵扣")]),i("v-uni-view",{staticClass:"flex-baseline"},[i("v-uni-view",{staticClass:"fs-16 price"},[e._v("- "+e._s(e.ruleform.integral))]),i("v-uni-view",{staticClass:"fs-12 fc-9 pl3"},[e._v("莲花")])],1)],1)],1),i("v-uni-view",{attrs:{id:"it_footer"}},[i("v-uni-view",{staticClass:"f_right",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goto("/pages/order/pay_center/main",1)}}},[i("myform",{attrs:{ruleform:e.ruleform,vaildate:e.vaildate,myclass:"nav",title:"提交订单"},on:{callBack:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}})],1)],1)],1)],1)},s=[]}}]);