<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay" v-if="data.show">
			<view class="pay-price box-item">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">选择随喜金额</view>
				</view>
				<view class="flex flex-wrap p5 pb0">
					<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
						<view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform.amount  = v">{{ v }} </view>
					</view>
				</view>
				<view class="flex p5 pt0">
					<view :class="['item','other',ruleform.amount == 0 ? 'select' :'' ]" @click="ruleform.amount = 0" v-if="ruleform.show_other_price">
						<view :class="['pl8',,ruleform.amount == 0 ? 'fc-orange':'fc-9']">其他</view>
						<input class="w-b100 flex1 text-left plr15" type="number" maxlength="7" max="3000" v-model="ruleform.otheramount">
						<view :class="['pr8',,ruleform.amount == 0 ? 'fc-orange':'fc-9']">元</view>
					</view>
					<view class="anonymous flex-middle ml15 mr5">
						<view :class="['select', open ? 'yes' : '']" @click="open = !open"></view>
						<view class="name fc-9">匿名随喜</view>
					</view>
				</view>
			</view>
			<view class="box-item people-info">
				<weui-input v-model="ruleform.sendType" label="祈福牌位" name="sendType" changeField="value" type="select" dataKey="sendTypeArr"></weui-input>
				<weui-input v-model="ruleform.sendType" label="超度内容" name="sendType" changeField="value" type="select" dataKey="sendTypeArr"></weui-input>
				<weui-input v-model="ruleform.bless_name" label="某门" type="text" name="bless_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.bless_address" label="地址" type="text" name="bless_address"
				 :datatype="ruleform.address_require ? 'require' : ''"></weui-input>
			</view>
			<view class="box-item content">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">阳上人</view>
				</view>
				<view class="ptb8 input">
					<weui-input v-model="ruleform.bless_name" type="text" name="bless_name" datatype="require"  placeholder="请输入内容"></weui-input>
				</view>
			</view>
			<view class="box-item content">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">回向文</view>
				</view>
				<view class="plr15 ptb8">
					<textarea style="height: 100px;" @click="ruleform.evaluate = ''" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
					 placeholder="输入您的回向文，可先小回向(若有)，再大回向" cols="" rows="" v-model="ruleform.evaluate"></textarea>
				</view>
			</view>

			<view class="m20">
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100" @click="formSubmit">微信支付随喜</view>
			</view>
		</view>
	</div>
</template>

<script>
	import "../../public/css/buycss.css";
	export default {
		data() {
			return {
				formAction: '/project/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				amountArr: [],

				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					evaluate: ''
				},
				vaildate: {},
				open: false,
				getSiteName: this.getSiteName(),
				sendTypeArr:[
					{label:'需要',value:'需要'},
					{label:'不需要',value:'不需要'},   
				],
			}
		},
		computed: {
			amount() {
				let amount = 0;
				if (this.ruleform.amount) {
					amount += parseFloat(this.ruleform.amount);
				}
				if (this.ruleform.amount && this.ruleform.is_top) {
					amount += parseFloat(this.ruleform.top_price);
				}
				return amount.toFixed(2);
			}
		},


		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},

		methods: {
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				});
			},
			formSubmit() {


				if (!this.ruleform.bless_name) {
					this.getError("功德主不能为空");
					return false;
				}
				if (this.ruleform.amount == 0 && !this.ruleform.otheramount) {
					this.getError("金額不能為空");
					return false;
				}
				if (this.ruleform.amount == 0 && this.ruleform.otheramount == 0) {
					this.getError("金額不能為0");
					return false;
				}
				if (!this.open && !this.ruleform.name && !this.ruleform.phone) {
					this.getError("姓名和電話不能為空");
					return false;
				}
				if (this.ruleform.phone) {
					var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
					if (!phoneReg.test(this.ruleform.phone)) {
						this.getError("手机格式不正确");
						return false;
					}
				}
				if (this.ruleform.address_require && !this.ruleform.bless_address) {
					this.getError('地址不能为空');
					return false;
				}
				this.ruleform.project_id = this.data.detail.id;
				
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				console.log(this.ruleform.amount);

				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
					}
				});
			},
			ajax() {

				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.amountArr = msg.detail.amount_str.split(",");
					this.ruleform.amount = this.amountArr[0];
					this.ruleform.show_other_price = msg.detail.show_other_price;
					this.ruleform.evaluate = msg.detail.evaluate;
					this.ruleform.address_require = msg.detail.address_require;
					this.ruleform.can_post = msg.detail.can_post;
				});
			}
		}
	}
</script>
