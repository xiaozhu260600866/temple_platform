<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view v-if="!tempFilePath">
				<view class="pay-top" v-if="data.detail.status == 3">
					<view class="iconfont icon-pay-yes"></view>
					<view class="p">牌位登记成功，感恩您的发心！</view>
					<view class="p">您已成功随喜 {{data.detail.amount}} 元</view>
				</view>
				<view class="pay-top" v-else>
					<view class="iconfont icon-pay-no"></view>
					<view class="p">支付失败</view>
				</view>
				<view class="m20 mt0" v-if="tabletStatus == '我的牌位'">
					<view class="dx-btn dx-btn-lg dx-btn-orange w-b100" @click="toIndex">返回首页</view>
					<view class="mtb10 flex"> <!-- @click="printf(data.detail)" -->
						<view class="dx-btn dx-btn-lg dx-btn-green w-b100 mr10" @click="$refs.cert.ajax(data.detail,true)">电子收据</view>
						<view :class="['dx-btn dx-btn-lg  w-b100 ml10',tabletStatus == '打印结束' ? ' dx-btn-orange' :'dx-btn-green']" @click="tabletStatus == '我的牌位' ?  printf(data.detail) :''">{{tabletStatus}} </view>
					</view>
					<view class="dx-btn dx-btn-lg dx-btn-orange w-b100" @click="goto('/pages/tablet/activity/index?id=6')">返回祖先牌位登记</view>
				</view>
				<view class="m20"><view class="dx-btn dx-btn-big dx-btn-green w-b100 fs-22" v-if="tabletStatus != '我的牌位'">{{tabletStatus}}</view></view>
				<view class="flex flex-center" v-if="tabletStatus == '牌位正在打印中'">
					<view style="border-radius: 50%;width:150px;height: 150px;" class="dx-btn-orange flex-center flex-middle">
						<view> <span  class="fs-30 fw-bold">请稍后</span>
							<dot >......</dot>
						</view>
					</view>
				</view>
				<tablet-blessing ref="type0"></tablet-blessing>
				<cert ref="cert"></cert>
				<tabletType999 ref="type999" :notOpenPic="true" @callBack="resTablet"></tabletType999>
			</view>
			<view v-else @click="tempFilePath = null"  style="position: relative;">
				<view class="flex-center">
					<image :src="tempFilePath" mode="widthFix" style="width:62.5%"></image>
				</view>
				<view class="flex-center">
					<view class="dx-btn dx-btn-lg dx-btn-green mr10 mt5" style="width:80%">返回</view>
				</view>
			</view>
		</div> 
	</view>
</template>
<script>
	
	import "./index.css";
	import tabletBlessing from "@/components/tablet/blessing.vue";
	import cert from "@/components/tablet/cert.vue";
	import tabletType999 from "@/components/tablet/type999.vue";
	export default {
		components:{
			tabletBlessing,cert,tabletType999
		},
		data() {
			return {
				formAction: '/activity/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabletStatus:'牌位正在打印中',
				tempFilePath:'',
			}
		},
		
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onLoad() {
			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			resTablet(jpgFilePath){
				this.tempFilePath = jpgFilePath;
				 console.log(jpgFilePath)
			},
			printf(item){
				console.log(item.type);
				let name1 = item.yname;
				let name2 = item.yname2;
				let name3 = item.yname3;
				let name4 = item.yname4;
				let peopleNum = 0;
				if(name1 && !name2 && !name3  && !name4){
					peopleNum = 1;
				}else if(name1 && name2 && !name3  && !name4){
					peopleNum = 2;
				}else if (name1 && name2 && name3  && !name4){
					peopleNum = 3;
				}else if (name1 && name2 && name3  && name4){
					peopleNum = 4;
				}
				uni.showLoading({
					title: '加载中',
				})
				this.$refs['type999'].init(name1,name2,name3,name4,peopleNum,item)
				
			},
			toIndex(){
				window.location.href="https://temple.doxinsoft.com/h5";
			},
			ajax() {
				this.getAjax(this).then(msg => {
					setTimeout(()=>{
						this.tabletStatus = "打印结束"
						setTimeout(()=>{
							this.tabletStatus = "我的牌位"
							this.printf(msg.detail);
						},2000);
						
					},3000);
					//this.$refs.receipt.ajax(this.data.detail,false);
					//this.$refs.cert.ajax(this.data.detail,false);
				});
			}
		}
	}
</script>
