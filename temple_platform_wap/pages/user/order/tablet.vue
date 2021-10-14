<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="show">
			<view>
				<view class="Otime-list bg-f">
					<view class="item flex p12 fc-6 bd-be" v-for="v in data.lists.data" >
						<view class="linfo flex1 w-b100">
							<view class="tt fs-17 fc-3 pr15 lh-24">{{v.tablet_name}} {{v.getType}}</view>
							<div class="tablet_order">
								<view class="list">牌位编号：{{v.no}}</view>
								<view class="list">{{v.payed_at}}</view>
								<view class="list">收据功德姓名：{{v.cert_name}}</view>
							</div>
							<type1 :ruleform="v" text="1" v-if="v.type ==1"></type1>
							<type2 :ruleform="v" text="1" v-if="v.type ==2"></type2>
							<type3 :ruleform="v" text="1" v-if="v.type ==3"></type3>
							<type4 :ruleform="v" text="1" v-if="v.type ==4"></type4>
							<type5 :ruleform="v" text="1" v-if="v.type ==5"></type5>
							<type6 :ruleform="v" text="1" v-if="v.type ==6"></type6>
							<type7 :ruleform="v" text="1" v-if="v.type ==7"></type7>
							<type8 :ruleform="v" text="1" v-if="v.type ==8"></type8>
							<type9 :ruleform="v" text="1" v-if="v.type ==9"></type9>
							<type10 :ruleform="v" text="1" v-if="v.type ==10"></type10>
							<type11 :ruleform="v" text="1" v-if="v.type ==11"></type11>
							<type12 :ruleform="v" text="1" v-if="v.type ==12"></type12>
							<div class="tablet_order" v-if="v.type == 0 || v.type == 100">
								<div class="list" v-if="v.yname">祈福者姓名:{{v.yname}}</div>
								<div class="list" v-if="v.yname2">祈福者姓名:{{v.yname2}}</div>
								<div class="list" v-if="v.yname3">祈福者姓名:{{v.yname3}}</div>
								<div class="list" v-if="v.yname4">祈福者姓名:{{v.yname4}}</div>
								<div class="list" v-if="v.phone">电话:{{v.phone}}</div>
								<div class="list" v-if="v.address">地址:{{v.address}}</div>
							</div>
							<div class="tablet_order" v-if="v.type == 999">
								<div class="list" v-if="v.surname">姓氏:{{v.surname}}</div>
								<div class="list" v-if="v.yname">阳上人姓名:{{v.yname}}</div>
								<!-- <div class="list" v-if="v.yname2">阳上人姓名:{{v.yname2}}</div>
								<div class="list" v-if="v.yname3">阳上人姓名:{{v.yname3}}</div>
								<div class="list" v-if="v.yname4">阳上人姓名:{{v.yname4}}</div> -->
								<div class="list" v-if="v.phone">电话:{{v.phone}}</div>
								<div class="list" v-if="v.address">地址:{{v.address}}</div>
							</div>
						</view>
						<view class="rinfo">
							<view class="rprice fs-16 text-right"><span class="price fs-18">{{v.amount}}</span></view>
							<view class="nav mt5" @click="openDiag= true;printf(v)">电子牌位</view>
							<view class="nav mt5" @click="openDiag= true;$refs.cert.ajax(v,true)">电子收据</view>
						</view>
					</view>
					
				</view>
			</view> 
			<tablet-blessing ref="type0"></tablet-blessing>
			<tabletType1 ref="type1"></tabletType1>
			<tabletType2 ref="type2"></tabletType2>
			<tabletType3 ref="type3"></tabletType3>
			<tabletType4 ref="type4"></tabletType4>
			<tabletType5 ref="type5"></tabletType5>
			<tabletType7 ref="type7"></tabletType7>
			<tabletType8 ref="type8"></tabletType8>
			<tabletType9 ref="type9"></tabletType9>
			<tabletType12 ref="type12"></tabletType12>
			<tabletType999 ref="type999"></tabletType999>
			<tabletType998 ref="type998"></tabletType998>
			<cert ref="cert"></cert>
			<view class="p50 text-center fc-9 fs-14" v-if="data.lists.data.length == 0">暂无数据</view>
		</view>
		
	</view>
</template>

<script>
	import "./index.css";

	
	import tabletBlessing from "@/components/tablet/blessing.vue";
	import tabletType1 from "@/components/tablet/type1.vue";
	import tabletType2 from "@/components/tablet/type2.vue";
	import tabletType3 from "@/components/tablet/type3.vue";
	import tabletType4 from "@/components/tablet/type4.vue";
	import tabletType5 from "@/components/tablet/type5.vue";
	import tabletType7 from "@/components/tablet/type7.vue";
	import tabletType8 from "@/components/tablet/type8.vue";
	import tabletType9 from "@/components/tablet/type9.vue";
	import tabletType12 from "@/components/tablet/type12.vue";
	import tabletType999 from "@/components/tablet/type999.vue";
	import tabletType998 from "@/components/tablet/type998.vue";
	import type1 from "@/pages/tablet/order/buy/type2/layouts/type1.vue";
	import type2 from "@/pages/tablet/order/buy/type2/layouts/type2.vue";
	import type3 from "@/pages/tablet/order/buy/type2/layouts/type3.vue";
	import type4 from "@/pages/tablet/order/buy/type2/layouts/type4.vue";
	import type5 from "@/pages/tablet/order/buy/type2/layouts/type5.vue";
	import type6 from "@/pages/tablet/order/buy/type2/layouts/type6.vue";
	import type7 from "@/pages/tablet/order/buy/type2/layouts/type7.vue";
	import type8 from "@/pages/tablet/order/buy/type2/layouts/type8.vue";
	import type9 from "@/pages/tablet/order/buy/type2/layouts/type9.vue";
	import type10 from "@/pages/tablet/order/buy/type2/layouts/type10.vue";
	import type11 from "@/pages/tablet/order/buy/type2/layouts/type11.vue";
	import type12 from "@/pages/tablet/order/buy/type2/layouts/type12.vue";
	import cert from "@/components/tablet/cert.vue";
	export default {
		components:{
			type1,type2,type3,type4,type5,type6,type7,type8,type9,type10,type11,type12,tabletType998,
			tabletBlessing,tabletType1,tabletType2,tabletType3,tabletType4,tabletType5,tabletType7,tabletType8,tabletType9,tabletType12,tabletType999,cert
		},
		data() {
			return {
				formAction: '/tablet/order/orderInfo',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 1,
				message: false,
				openDiag:false,
				show:false,
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
			this.$preview.on('close',()=>{//close只是众多事件名的其中一个，更多请查看文档
			    window.location.reload();
			})
			this.ajax();
		},
		onShow(){
			//console.log();
			if(this.openDiag){
				window.location.reload();
			}
			this.onShow(this,1);
		},
		
		methods: {
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
				if(item.morningClass){
					this.$refs['type998'].init(name1,name2,name3,name4,peopleNum,item)
					return false;
				}
				if(item.type == 100){
					this.$refs['type0'].init(name1,name2,name3,name4,peopleNum,item);
				}else{
					this.$refs['type'+item.type].init(name1,name2,name3,name4,peopleNum,item)
				}
				
			},
			ajax() {
				// this.$nextTick(()=>{
				// 	this.$refs.page.share('观音开库','https://temple.doxinsoft.com/images/3033.jpg','日行一善');
				// })
				this.getAjax(this).then(msg => {
					console.log(this.data);
					 for (var i = 0; i < this.data.lists.data.length; i++) {
						 for (var j = i+1; j <  this.data.lists.data.length; j++) {
						 	  if(parseInt(  new Date(this.data.lists.data[i].payed_at).getTime()) < parseInt( new Date(this.data.lists.data[j].payed_at).getTime())){
								  let temp = this.data.lists.data[i];
								
								  this.data.lists.data[i] = this.data.lists.data[j];
								  this.data.lists.data[j] = temp;
						 	  }
						 }
					 }
					 this.show = true;
					 console.log("lists",this.data.lists)
				});
			},
			
		}
	}
</script>
