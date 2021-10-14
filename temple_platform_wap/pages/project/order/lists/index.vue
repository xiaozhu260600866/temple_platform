<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="order-class bd-b bg-f">
				<view class="nav-tab" @click="status = 0"><view :class="['name',status == 0 ? 'selected' :'']">按项目归类</view></view>
				<view class="nav-tab" @click="status = 1"><view :class="['name',status == 1 ? 'selected' :'']">按时间排列</view></view>
			</view>
			<view class="Oitem-list bg-f" v-if="status == 0">
				<view class="item bd-be"><!-- v-for -->
					<view class="pro-info flex p15">
						<view class="limg mr15"><img class="img flex" src="http://wx.ciensi.net/updownFiles/2016/12/201612032333098015.jpg"></view>
						<view class="rt flex1">
							<view class="tt fs-18 nowrap fc-7">“日行一善”供佛、斋僧 </view>
							<view class="td fs-12 lh-20">已捐款金额：<span class="fs-12">0.10</span>元</view>
							<view class="td fs-12 lh-20">已捐款次数：<span class="fs-12">1</span>次</view>
						</view>
					</view>
					<view class="btn-group flex plr15 pb10">
						<view class="nav">查看动态</view>
						<view class="nav" @click="message = !message">查看记录<span class="iconfont icon-bottom"></span></view>
					</view>
					<view class="msg-record plr15 pb10" v-if="message"><!-- 读最新的 -->
						<view class="list fs-12 fc-9">愿以此功德，庄严佛净土，上报四重恩，下济三途苦。若有见闻者，悉发菩提心，尽此一报身，同生极乐国。</view>
					</view>
				</view>
			</view>
			<view class="Otiem-list bg-f" v-if="status == 1">
				<view class="item flex p12 fc-9 bd-be"><!-- v-for -->
					<view class="linfo flex1 w-b100">
						<view class="tt fs-18 fw-bold">“日行一善”供佛、斋僧</view>
						<view class="td fs-12 mt5">序号：202002111544374293</view>
						<view class="td fs-12 mt5">2020-02-11 15:44:37</view>
					</view>
					<view class="rprice fs-18 fw-bold"><span class="price fs-18">0.10</span>元</view>
				</view>
				<view class="item flex p12 fc-9 bd-be"><!-- v-for -->
					<view class="linfo flex1 w-b100">
						<view class="tt fs-18 fw-bold">“日行一善”供佛、斋僧</view>
						<view class="td fs-12 mt5">序号：202002111544374293</view>
						<view class="td fs-12 mt5">2020-02-11 15:44:37</view>
					</view>
					<view class="rprice fs-18 fw-bold"><span class="price fs-18">0.10</span>元</view>
				</view>
			</view>
			<div class="song-order pb0 bg-f" v-for="(parent,key) in data.lists.data">
				<div class="order-item">
					<div class="order-state flex-between flex-middle pb10 bd-be">
						<p class="lh-18">
							<span class="fc-6">日期：</span>
							<span class="Arial">{{parent.created_at}}</span>
						</p>
						<div class="state flex-middle">
							<div v-if="data.query.status == 10" class="text-y">
								{{parent.status_message}}
							</div>
							<!-- <p class="fc-orange fs-15 lh-20">{{parent.status_message}}</p> -->
							<!-- <div class="ml8">
								<p class="del-icon bg-f3 iconfont icon-cart-del fs-14" @click="delOrder(parent)"></p>
							</div> -->
						</div>
					</div>
					<div class="song-item flex-middle">
						<div class="song-info" v-if="parent.projects">
							<p class="song-name">{{parent.projects.name}}</p>
						</div>
						<div class="order_count fs-13">
							金额：￥<span class="Arial fs-16"> {{ parent.amount }}</span>
						</div>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="order" message="暂无数据"></hasMore>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/project/order/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				item:{},
				diag:false,
				getSiteName: this.getSiteName(),
				status: 0,
				message: false
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
		onShow(){
		
		    if(this.$store && this.$store.state && this.$store.state.mutations.historyUrl){
		        this.$store.state.mutations.historyUrl="";
		        this.ajax(); 
		    }
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			returnOrder(order){
				this.getConfirm("是否确认申请退款",()=>{
					this.postAjax("/user/order-return",order).then(msg=>{
						if(msg.data.status == 2){
							this.$refs.diag.thisDiag = false;
							this.ajax();
						}
					});
				});
			},
			toOrder(item){
			     this.goto("/pages/song/info/index?order_no="+item.order_no,1);
			},
			formSubmitForH5(config,order_no){
				console.log(config);
				this.payUniapp(config,msg=>{
					this.$refs.diag.thisDiag = false;
					this.ajax();
				},msg=>{
					return this.getError("支付失败");
				});
			},
			top_(item){
				this.postAjax("/song/checkTopPrice",{id:item.id}).then(msg=>{
					if(msg.data.status == 2){
						this.data.top_price = msg.data.top_price;
						this.item = item;
						this.$refs.diag.thisDiag = true;
					}
				});
				
			},
			top(item){
				this.getConfirm("您确认要置顶吗？",msg=>{
					this.postAjax("/song/top",{id:item.id}).then(msg=>{
						if(msg.data.status == 2){
							this.formSubmitForH5(msg.data.config,msg.data.detail.order_no);	
						}
					});
				});
			},
			delOrder(item){
			   this.getConfirm("您确认要取消订单吗？", () => {
				   this.postAjax("/ajax/mydel", {
						id: item.id,
						tablename: "orders"
					}).then(msg => {
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
			   });
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/user/change-order-status", {
						id: item.id,
						status: 0
					}).then(msg => {
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			changeStatus(status) {
				this.data.query.status = status;
				this.data.nextPage = 1;
				this.diag = false;
				this.ajax();
			},
			ajax() {
				
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
