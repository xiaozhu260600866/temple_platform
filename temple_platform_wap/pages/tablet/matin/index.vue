<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pay">
			<view class="pay-price box-item">
				<view class="Btitle plr15 pt10">
					<view class="name fs-17 lh-30">选择随喜金额</view>
				</view>
				<view class="flex flex-wrap p5">
					<view :class="['item',amount == v ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
						<view :class="['price',amount == v ? 'fc-white': '']" @click="ruleform.amount  = v">{{ v }} </view>
					</view>
				</view>
			</view>
			<view class="box-item">
				<view class="Btitle plr15 ptb10">
					<view class="name fs-17 lh-30">祈福类型（早课）</view>
				</view>
				<view class="matin-type">
					<view class="mt-nav" :class="matinType==item.value?'cur':''" v-for="(item,key) in matinTypeArr"
						@click="matinType=item.value">{{ item.name }}</view>
				</view>
				<view class="matin-time">
					<weui-input v-model="ruleform.date" label="普佛时间" type="date" name="date"></weui-input>
				</view>
			</view>
			<view class="box-item people-info">
				<view class="Btitle plr15 ptb10">
					<view class="name fs-17 lh-30">牌位内容</view>
				</view>
				<weui-input v-model="ruleform.name" label="祈福者" placeholder="请输入名字/公司" type="text" :name="'name'" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cert_name" label="收据功德姓名" placeholder="请输入收据功德姓名（2~4个字）" type="text" :name="'cert_name'"
				 datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
				<weui-input v-model="ruleform.address" label="地址" type="text" name="address" :datatype="ruleform.address_require?'require':''"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require|phone"></weui-input>
			</view>
			<dxftButton type="warning" size="lg" @click="goto('/pages/tablet/matin/payed/index',1)">微信支付随喜</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				amount:300,
				amountArr:[300,200,100],
				matinType:'类型一',
				matinTypeArr: [
					{name: '类型一',value: '类型一'},
					{name: '类型二',value: '类型二'},
					{name: '类型三',value: '类型三'},
					{name: '类型四',value: '类型四'},
					{name: '类型五',value: '类型五'},
					{name: '类型六',value: '类型六'},
					{name: '类型七',value: '类型七'},
					{name: '类型八',value: '类型八'},
					{name: '类型九',value: '类型九'},
				]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		onShow(){
			console.log(123)
			this.onShow(this);
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "../show/index.css";
@import "/public/css/buycss.css";
</style>