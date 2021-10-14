<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view v-for="(v,key) in data.lists.data">
				<view class="duan">
					<view class="title">{{v.name}}</view>
				</view>
				<view v-if="key == 1">
					<view class="gongdang" style="display: flex;padding: 15px;background: #fff;border-bottom: 1px solid #ebebeb;">
						<view class="limg" style="margin-right: 15px;">
							<img class="img" src="https://temple.doxinsoft.com/images/wap/gongdang.jpg" style="width: 120px;height: 92px;border-radius: 6px;display: flex;">
						</view>
						<view class="rtxt" style="flex: 1;display: flex;min-height: 92px;align-content: space-between;flex-wrap: wrap;">
							<view class="tt" style="color: #333;font-size: 17px;line-height: 20px;width: 100%;">供文殊菩萨灯</view>
							<view class="rtb" style="width: 100%;line-height: 1;color: #666;font-size: 14px;display: flex;">
								<img class="img" src="https://temple.doxinsoft.com/images/wap/heart.png" style="width: 14px;height: 14px;display: flex;margin-right: 3px;">共<span class="num" style="color: #fd6512;margin: 0 3px;font-size: 15px;">8968</span>份随喜
							</view>
						</view>
					</view>
					<wx-open-launch-weapp id="launch-btn" username="gh_9c4cbc85d5c3" path="pages/index/index" @error="handleErrorFn" @launch="handleLaunchFn" style="display: block;">
						<script type="text/wxtag-template">
							<view class="gongdang" style="display: flex;padding: 15px;background: #fff;border-bottom: 1px solid #ebebeb;">
								<view class="limg" style="margin-right: 15px;">
									<img class="img" src="https://temple.doxinsoft.com/images/wap/gongdang.jpg" style="width: 120px;height: 92px;border-radius: 6px;display: flex;">
								</view>
								<view class="rtxt" style="flex: 1;display: flex;min-height: 92px;align-content: space-between;flex-wrap: wrap;">
									<view class="tt" style="color: #333;font-size: 17px;line-height: 20px;width: 100%;">供文殊菩萨灯</view>
									<view class="rtb" style="width: 100%;line-height: 1;color: #666;font-size: 14px;display: flex;">
										<img class="img" src="https://temple.doxinsoft.com/images/wap/heart.png" style="width: 14px;height: 14px;display: flex;margin-right: 3px;">共<span class="num" style="color: #fd6512;margin: 0 3px;font-size: 15px;">8968</span>份随喜
									</view>
								</view>
							</view>
						</script>
					</wx-open-launch-weapp>
				</view>
				<projectLists :lists="v.projects"></projectLists>
			</view>
			
		</view>
		
					<wx-open-launch-weapp id="launch-btn" username="gh_9c4cbc85d5c3" path="pages/index/index" @error="handleErrorFn" @launch="handleLaunchFn" class="item ptb10" style="display: block;">
						<script type="text/wxtag-template">
							<view class="Nav_img" style="height: 50px;display: flex;justify-content: center;border-radius: 18px;overflow: hidden;">
								<image class="img" src="https://temple.doxinsoft.com/images/wap/user-icon08.jpg" style="width: 50px;height: 50px;border-radius: 18px;overflow: hidden;"></image>
							</view>
							<view class="txt" style="font-size: 15px;color: #333;line-height: 20px;margin-top: 8px;display: flex;justify-content: center;">祈福供灯</view>
						</script>
					</wx-open-launch-weapp>
	</view>
</template>

<script>
	import "./index.css";
	import projectLists from "@/components/project_lists.vue";
	import tabletLists from "@/components/tablet_lists.vue";
	import activityLists from "@/components/activity_lists.vue";
	import shopProductLists from "@/components/shop_product_lists.vue";
	import dxNavClass from "doxinui/components/nav-class/nav-class";
	export default {
		components:{
			projectLists,
			tabletLists,
			activityLists,
			shopProductLists,
			dxNavClass
		},
		data() {
			return {
				formAction: '/project/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dateYear:'',
				wxOpenTags:'',
				projectListsNew:[],
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
			this.ajax();
			this.year();
			this.postAjax("/projectLists.html",{show_index:1}).then(msg=>{
					this.projectListsNew = msg.data.lists;
			})
			
		},
		
		onShow() {
			
			if(this.data.siteConfig){
				this.$nextTick(()=>{
					console.log(this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo);
					this.$refs.page.share(this.data.siteConfig.share_title,this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo,this.data.siteConfig.share_descript);
				})
			}
			this.onShow(this);
		},
		methods: {
			handleErrorFn(e){
			        console.log('fail', e.detail);
			    },
			
			    handleLaunchFn(e){
			        console.log('success');
			    },
			checkAuth(v){
				return this.goto(v.url,1);
			},
			year() {
				let nowDate = new Date();
				let yy = nowDate.getFullYear();
				this.dateYear = yy;
				console.log(5555,yy);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(this.data.siteConfig.web_name);
					this.$nextTick(()=>{
						console.log(this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo);
						this.$refs.page.share(this.data.siteConfig.share_title,this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo,this.data.siteConfig.share_descript);
					})
					
				});
			}
		}
	}
</script>
