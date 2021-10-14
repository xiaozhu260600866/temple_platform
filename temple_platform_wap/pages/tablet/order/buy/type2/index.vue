<template>
	<div class="pb60 tablet-buy">
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div class="pay" v-if="data.show">
			<view class="pay-price box-item">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">选择随喜金额</view>
				</view>
				<view class="flex flex-wrap p5 pb0">
					<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
						<view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform={};ruleform.otheramount=0;ruleform.amount_type = data.detail.amount_type;ruleform.amount  = v">{{ v }} </view>
					</view>
				</view>
				<view class="flex p5 pt0">
					<view :class="['item','other',ruleform.amount == 0 ? 'select' :'' ]" @click="ruleform.amount = 0" v-if="ruleform.show_other_price">
						<view :class="['pl8',,ruleform.amount == 0 ? 'fc-orange':'fc-9']">其他</view>
						<input class="w-b100 flex1 text-left plr15" type="number" maxlength="7" max="3000" v-model="ruleform.otheramount">
						<view :class="['pr8',,ruleform.amount == 0 ? 'fc-orange':'fc-9']">元</view>
					</view>
					<!-- <view class="anonymous flex-middle ml15 mr5">
						<view :class="['select', open ? 'yes' : '']" @click="open = !open"></view>
						<view class="name fc-9">匿名随喜</view>
					</view> -->
				</view>
			</view>
		</div>
		<!-- <div v-for="(v,key) in ruleform.amount / 100"> -->
		
	    <div v-for="(v,key) in 1 " v-if="ruleform.amount_type ==0">
			<div class="bg-f">
				<type1 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 1" :mykey="key+1"></type1>
				<type2 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 2" :mykey="key+1"></type2>
				<type3 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 3" :mykey="key+1"></type3>
				<type4 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 4" :mykey="key+1"></type4>
				<type5 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 5" :mykey="key+1"></type5>
				<type6 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 6" :mykey="key+1"></type6>
				<type7 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 7" :mykey="key+1"></type7>
				<type8 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 8" :mykey="key+1"></type8>
				<type9 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 9" :mykey="key+1"></type9>
				<type10 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 10" :mykey="key+1"></type10>
				<type11 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 11" :mykey="key+1"></type11>
				<type12 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 12" :mykey="key+1"></type12>
			</div>
			<!-- <div class="flex-center mt10 bg-f pt10" v-if="ruleform.amount / 100 >=key+2">
				<dxButon type="warning" size="medium">牌位{{key +2}}</dxButon>
			</div> -->
		</div>
		<div v-if="ruleform.amount_type ==1">
			<div v-for="(v,key) in  ruleform.amount / forNum " >
				<div class="bg-f">
					<type1 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 1" :mykey="key+1"></type1>
					<type2 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 2" :mykey="key+1"></type2>
					<type3 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 3" :mykey="key+1"></type3>
					<type4 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 4" :mykey="key+1"></type4>
					<type5 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 5" :mykey="key+1"></type5>
					<type6 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 6" :mykey="key+1"></type6>
					<type7 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 7" :mykey="key+1"></type7>
					<type8 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 8" :mykey="key+1"></type8>
					<type9 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 9" :mykey="key+1"></type9>
					<type10 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 10" :mykey="key+1"></type10>
					<type11 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 11" :mykey="key+1"></type11>
					<type12 :ruleform="ruleform" :vaildate="vaildate" v-if="type == 12" :mykey="key+1"></type12>
				</div>
				<div class="flex-center mt10 bg-f pt10" v-if="ruleform.amount / forNum >=key+2">
					<dxButon type="warning" size="medium">牌位{{key +2}}</dxButon>
				</div>
			</div>
		</div>

		<div class="bg-f mtb10">
			<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require|phone"></weui-input>
			<weui-input v-model="ruleform.cert_name" label="收据功德姓名" placeholder="请输入收据功德姓名（2~6个字）" type="text" :name="'cert_name'" datatype="require|chinese|max:6|min:2" maxlength="6"></weui-input>
		</div>
		<dxftButton type="warning" size="lg" @click="submit">提交</dxftButton>
	</div>
</template>

<script>
	import "@/public/css/buycss.css";
	import dxButon from "doxinui/components/button/button"
	import dxftButton from "doxinui/components/button/footer-button"
	import type1 from "./layouts/type1.vue";
	import type2 from "./layouts/type2.vue";
	import type3 from "./layouts/type3.vue";
	import type4 from "./layouts/type4.vue";
	import type5 from "./layouts/type5.vue";
	import type6 from "./layouts/type6.vue";
	import type7 from "./layouts/type7.vue";
	import type8 from "./layouts/type8.vue";
	import type9 from "./layouts/type9.vue";
	import type10 from "./layouts/type10.vue";
	import type11 from "./layouts/type11.vue";
	import type12 from "./layouts/type12.vue";
	export default {
		components: {
			dxButon,
			type1,
			type2,
			type3,
			type4,
			type5,
			type6,
			type7,
			type8,
			type9,
			type10,
			type11,
			type12,
			dxftButton
		},
		methods: {
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/tablet/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/tablet/order/payed/index?order_no=" + order_no);
				});
			},
			ajax() {

				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.amountArr = msg.detail.amount_str.split(",");
					this.cd_content_arr = msg.cd_content_arr;
					this.ruleform.amount = this.amountArr[0];
					this.ruleform.name = msg.detail.name;
					this.ruleform.show_other_price = msg.detail.show_other_price;
					this.ruleform.evaluate = msg.detail.evaluate;
					this.ruleform.address_require = msg.detail.address_require;
					this.ruleform.can_post = msg.detail.can_post;
					this.ruleform.amount_type =msg.detail.amount_type;
					if(this.amountArr[0] < this.amountArr[this.amountArr.length -1]){
						this.forNum = this.amountArr[this.amountArr.length -1] / this.amountArr.length;
					}else{
						this.forNum = this.amountArr[0] / this.amountArr.length;
					}
					
					
				});
			},
			submit() {
				console.log(this.ruleform);
				console.log(this.vaildate);
				setTimeout(()=>{
					this.vaildForm(this, res => {
						if (res) {
							this.ruleform.tablet_id = this.data.detail.id;
							this.ruleform.tablet_type = this.data.detail.type;
							this.ruleform.type = this.data.query.type;
							this.ruleform.forNum = this.forNum;
							this.postAjax(this.formAction, this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
								}
							});
						}
					})
				},100);
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.ajax();
		},
		data() {
			return {
				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					evaluate: ''
				},
				forNum:100,
				typeArr: [{
						label: '堕胎婴灵',
						value: '堕胎婴灵'
					},
					{
						label: '流产婴灵',
						value: '流产婴灵'
					},
					{
						label: '夭折婴灵',
						value: '夭折婴灵'
					}
				],
				vaildate: {},
				amountArr: [],
				type: 0,

				formAction: '/tablet/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),

			}
		}
	}
</script>
<style>
</style>