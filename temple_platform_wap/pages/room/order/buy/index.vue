<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="room-buy pb60" v-if="data.show">
			<view class="block-sec plr15">
				<view class="room-info ptb12 bd-be">
					<view class="name fs-17">{{data.detail.name}}</view>
					<view class="tips fs-14 fc-7 mt12">{{data.detail.remark}}</view>
				</view>
				<view class=" pt15 fs-18">请选择入住时间</view>
				<view class="room-time pt12 pb15 flex-between flex-middle" @click="$refs.calendar.thisCalendar=true">
					<view class="item flex1 flex-middle">
						<view class="time fs-18">{{ruleform.start_date}}<text class="week fs-13 pl3">入住</text></view>
						<view class="item plr8">-</view>
						<view class="time fs-18">{{ruleform.end_date}}<text class="week fs-13 pl3">离店</text></view>
					</view>
					<view class="count fs-15">共<text class="Arial plr3">{{ruleform.day_count}}</text>晚</view>
				</view>
			</view>
			<view class="block-sec room-num flex-between flex-middle p15 fs-17">
				<view class="txt">房间数</view>
				<view class="flex-middle">
					<tui-numberbox :value="ruleform.num" :disabled="ruleform.id?true:false" @change="chageNum"></tui-numberbox>
					<!-- <view class="pl5">间</view> -->
				</view>
			</view>
			<view class="block-sec buy-info fs-17">
				<view class="plr15 ptb12 bd-be">联系人信息</view>
				<weui-input v-model="ruleform.name" label="联系人" placeholder="请输入姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="联系方式" placeholder="请输入联系电话" type="text" name="phone" datatype="require"></weui-input>
			</view>
			<!-- <view class="block-sec buy-notice">
				<weui-input v-model="ruleform.notice" label="预定须知" type="txt" name="notice">
					<view slot="right" class="flex-middle lh-20">
						<view class="fc-blue fs-15 mr8 pt3">查看</view>
						<view class="dxi-icon dxi-icon-right2 fs-13 fc-9 fw-bold"></view>
					</view>
				</weui-input>
			</view> -->
			
			<!-- 购买后点击订单列表<查看详情>进入后显示 -->
			<view class="block-sec no" v-if="ruleform.id">
				<weui-input label="订单编号" v-model="ruleform.order_no" type="txt" name="name"></weui-input>
				<weui-input label="订单日期" v-model="ruleform.created_at" type="txt" name="name"></weui-input>
				<image class="img w-b100 flex" :src="getSiteName + '/upload/images/room/'+ruleform.order_no+'.svg'" mode="widthFix"></image>
				<view class="text-center fs-16 fc-9 pb20">核销二维码</view>
			</view>
			
			<view id="buy_footer" v-if="!ruleform.id">
				<view class="f_left price fs-18 plr10">￥
					<span class="fs-24">{{amount}}</span>
				</view>
				<view class="f_right">
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="submit" myclass="nav" title="提交订单"></myform>
				</view>
			</view>
			<calendar :is-show="false" :start-date="ruleform.start_date" :end-date="ruleform.end_date" mode="3" theme-color="#ff721f" :init-month="2" @callback="getDate" ref="calendar">
				<template v-slot:footer>
					<dxftButton type="primary" size="lg" btnBg="#ff721f" btnBd="#ff721f" @click="$refs.calendar.thisCalendar=false">确认</dxftButton>
				</template>
			</calendar>
		</view>
	</view>
</template>

<script>
	import Calendar from '@/components/Calendar/Calendar.vue'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{tuiNumberbox,Calendar,dxftButton},
		data() {
			return {
				formAction: '/roomAppointment/room/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				start_date:'',
				end_date:'',
				vaildate:{},
				ruleform:{
					order_no:'',
					created_at:'',
					start_date:this.dateToString(new Date()),
					end_date:'',
					day_count:1,
					num:1
				},
			}
		},
		computed:{
			amount(){
				if(this.data.show){
					return (this.data.detail.price * this.ruleform.num * this.ruleform.day_count).toFixed(2);
				}else{
					return 0;
				}
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
			var date = new Date();
			let  oneDay = 1000*60*60*24;//一天的毫秒数
			 var after = date.getTime() + oneDay;//计算前一天的毫秒数
			date.setTime(after);
			this.ruleform.end_date = this.dateToString(new Date(date));
			this.ajax();
		},
		onShow(){
			console.log(123)
			this.onShow(this);
		},
		methods: {
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					console.log("a")
					return this.goto("/pages/room/order/payed/index?order_no=" + order_no);
				}, msg => {
					console.log("b")
					return this.goto("/pages/room/order/payed/index?order_no=" + order_no);
				});
			},
			chageNum(e){
				this.ruleform.num  = e.value;
				//console.log(e);
			},
			submit(){
				this.ruleform.amount = this.amount;
				this.ruleform.room_id = this.data.detail.id;
				this.postAjax(this.formAction,this.ruleform).then(msg=>{
					if (msg.data.status == 2) {
						this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
					}
				})
			},
			getDate(date){
				this.ruleform.start_date = date.startStr.dateStr;
				this.ruleform.end_date = date.endStr.dateStr;
				this.ruleform.day_count = date.dayCount;
				console.log(date)
			},
			ajax() {
				this.getAjax(this).then(msg => {
					 if(msg.order){
						 this.ruleform = msg.order;
					 }
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>