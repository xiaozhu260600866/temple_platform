<template>
	<div class="pb60">
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay" v-if="data.show">
			<view class="pay-price box-item">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">选择随喜金额</view>
				</view>
				<view class="flex flex-wrap p5 pb0">
					<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
						<view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform={};ruleform.otheramount=0;ruleform.amount  = v;ruleform.evaluate=data.detail.evaluate">{{ v }} </view>
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
			
			<view class="box-item" v-if="data.query.tablet_id == 53">
				<view class="Btitle plr15 ptb10">
					<view class="name fs-17 lh-30">祈福类型（早课）</view>
				</view>
				<view class="matin-type">
					<view class="mt-nav" :class="item.label==ruleform.morningClass?'cur':''" v-for="(item,key) in matinTypeArr"
						@click="ruleform.morningClass = item.label">{{ item.label }}</view>
				</view>
				<view class="matin-time">
					<weui-input v-model="ruleform.morningDate" label="普佛时间" type="date" name="morningDate"></weui-input>
				</view>
			</view>
			<!-- <view class="box-item content">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">阳上人</view>
				</view>
				<view class="ptb8 input">
					<weui-input v-model="ruleform.ys_people" type="text" name="ys_people" datatype="require"  placeholder="请输入阳上人"></weui-input>
				</view>
			</view> -->
			<view class="box-item people-info">
			<!-- 	<weui-input v-model="ruleform.name" label="牌位名称" name="name"  type="text" disabled="true" ></weui-input> -->
				<!-- <weui-input v-model="ruleform.cd_content" datatype="require" label="超度内容" name="cd_content" changeField="value" type="select" dataKey="cd_content_arr"></weui-input> -->
				
				
				<div v-for="(v,key) in ruleform.amount /  forNum">
					
					<div v-if="data.query.tablet_id == 53">
						<weui-input v-model="ruleform['yname_'+key]" label="祈福者" placeholder="请输入名字/公司" type="text" :name="'yname_'+key" datatype="require|chinese" maxlength="4"></weui-input>
					</div>
					<div v-else>
						<weui-input v-model="ruleform['yname_'+key]" label="祈福者姓名" placeholder="请输入祈福者姓名（限2-4个字）" type="text" :name="'yname_'+key" datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
						<weui-input v-model="ruleform['yname2_'+key]" label="祈福者姓名" placeholder="请输入祈福者姓名（限2-4个字）" type="text" :name="'yname2_'+key" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
						<weui-input v-model="ruleform['yname3_'+key]" label="祈福者姓名" placeholder="请输入祈福者姓名（限2-4个字）" type="text" :name="'yname3_'+key" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
						<weui-input v-model="ruleform['yname4_'+key]" label="祈福者姓名" placeholder="请输入祈福者姓名（限2-4个字）" type="text" :name="'yname4_'+key" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
						<weui-input v-model="ruleform['address_'+key]" label="地址" type="text" :name="'address_'+key" datatype="require"></weui-input>
					</div>
					<div class="flex-center mt10 bg-f pt10" v-if="ruleform.amount /  forNum >=key+2">
						<dxButon type="warning" size="medium">牌位{{key +2}}</dxButon>
					</div>
				</div>
				<weui-input v-model="ruleform.address" label="地址" type="text" name="address" :datatype="ruleform.address_require?'require':''" v-if="data.query.tablet_id == 53"></weui-input>
				<weui-input v-model="ruleform.cert_name" label="收据功德姓名" placeholder="请输入收据功德姓名（2~6个字）" type="text" :name="'cert_name'" datatype="require|chinese|max:6|min:2" maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require|phone"></weui-input>
				
				
				
			</view>
		
			<view class="box-item content" v-if="data.query.tablet_id !=53">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">祈愿内容</view>
				</view>
				<view class="plr15 ptb8">
					<textarea style="height: 100px;" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
					 placeholder="" cols="" rows="" v-model="ruleform.evaluate" ></textarea>
				</view>
			</view>

			<dxftButton type="warning" size="lg" @click="formSubmit">微信支付随喜</dxftButton>
			<!-- <view class="m20">
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100" @click="formSubmit">微信支付随喜</view>
			</view> -->
		</view>
	</div>
</template>
<style>
	@import "../../../show/index.css";
</style>
<script>
	import "@/public/css/buycss.css";
	
	import dxButon from "doxinui/components/button/button"
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxButon,dxftButton
		},
		data() {
			return {
				formAction: '/tablet/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				amountArr: [],
				cd_content_arr:[],
				forNum:100,
				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					evaluate: '',
					morningClass:'',
					morningDate:''
				},
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
				],
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
					return this.goto("/pages/tablet/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/tablet/order/payed/index?order_no=" + order_no);
				});
			},
			formSubmit() {
				if(this.data.query.tablet_id == 53 && !this.ruleform.morningClass){
						return this.getError("请选择祈福类型");
				}
				if(this.data.query.tablet_id == 53 && !this.ruleform.morningDate){
						return this.getError("请选择普佛时间");
				}
				
				this.vaildForm(this, res => {
					if(res){
						if (this.ruleform.amount == 0 && !this.ruleform.otheramount) {
							this.getError("金额不能為空");
							return false;
						}
						if (this.ruleform.amount == 0 && this.ruleform.otheramount == 0) {
							this.getError("金额不能為0");
							return false;
						}
						
						
						this.ruleform.tablet_id = this.data.detail.id;
						this.ruleform.tablet_type =this.data.detail.type;
						this.ruleform.type = 100;
						this.ruleform.forNum = this.forNum;
						this.ruleform.amount = parseFloat(this.ruleform.amount);
						console.log(this.ruleform.amount);
						
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
							}
						});
					}
					
					
				})
				
			},
			ajax() {

				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.amountArr = msg.detail.amount_str.split(",");
					this.cd_content_arr = msg.cd_content_arr;
					this.ruleform.amount = this.amountArr[0];
					//this.ruleform.name = msg.detail.name;
					this.ruleform.show_other_price = msg.detail.show_other_price;
					this.matinTypeArr = msg.morningClass;
					this.ruleform.address_require = msg.detail.address_require;
					this.ruleform.can_post = msg.detail.can_post;
					this.ruleform.evaluate =  msg.detail.evaluate;
					if(this.amountArr[0] < this.amountArr[this.amountArr.length -1]){
						this.forNum = this.amountArr[this.amountArr.length -1] / this.amountArr.length;
					}else{
						this.forNum = this.amountArr[0] / this.amountArr.length;
					}
					this.$set(this.ruleform,"morningClass","")
	
				});
			}
		}
	}
</script>
