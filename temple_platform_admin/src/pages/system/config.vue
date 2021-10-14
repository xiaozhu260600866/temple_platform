<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pt20" style="margin: 0;width:100%;min-width:600px;">
		<el-tabs v-model="activeName2" type="card">
			<!-- 网站配置开始 -->
			<el-tab-pane label="网站配置" name="first">
				<div class="pt20">
					<!-- <el-form-item label="联系人" prop="contacts" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.contacts" class="CinputWidth"></el-input>
					</el-form-item> -->
					<el-form-item label="联系电话" prop="phone" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.phone" class="CinputWidth"></el-input>
					</el-form-item>
					<el-form-item label="客堂手机/微信" prop="phone2" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.phone2" class="CinputWidth"></el-input>
					</el-form-item>
                   	<el-form-item label="上传分享图" prop="share_logo">
                    	<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.share_logo" :sizearr="300"></my-upload>
                   </el-form-item>
					<el-form-item label="平台名称" prop="web_name" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.web_name" class="CinputWidth"></el-input>
					</el-form-item>
                <!--    <el-form-item label="小程序名称" prop="app_name" :rules="[{ required: true, message: '内容不能为空'},]">
                    	<el-input v-model="ruleForm.app_name" class="CinputWidth"></el-input>
                    </el-form-item>
                    <el-form-item label="首页头部" prop="index_title" :rules="[{ required: true, message: '内容不能为空'},]">
                    	<el-input v-model="ruleForm.index_title" class="CinputWidth"></el-input>
                    </el-form-item> -->
                    <el-form-item label="分享标题" prop="share_title" :rules="[{ required: true, message: '内容不能为空'},]">
                    	<el-input v-model="ruleForm.share_title" class="CinputWidth"></el-input>
                    </el-form-item>
                   <el-form-item label="分享描述" prop="share_descript" :rules="[{ required: true, message: '内容不能为空'},]">
                    	<el-input v-model="ruleForm.share_descript" class="CinputWidth"></el-input>
                    </el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
						<el-button @click.prevent="chooseLocation()">重新定位</el-button>
					</el-form-item>
					<el-form-item label="功德证书" prop="cert_logo">
					 	<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.cert_logo" :sizearr="300"></my-upload>
					</el-form-item>
					<el-form-item label="电子收据" prop="receipt_logo">
					 	<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.receipt_logo" :sizearr="300"></my-upload>
					</el-form-item>
				<!-- 	<div class="el-form-item">
						<label class="el-form-item__label" style="width: 150px">LOGO</label>
						<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.web_logo" :sizearr="300"></my-upload>
					</div> -->

					<!-- <el-form-item label="技术合作" prop="technical" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.technical" class="CinputWidth"></el-input>
					</el-form-item>
					<el-form-item label="技术联系电话" prop="web_phone" :rules="[{ required: true, message: '内容不能为空'},]">
						<el-input v-model="ruleForm.web_phone" class="CinputWidth"></el-input>
					</el-form-item> -->
				</div>
				<!-- <el-form-item label="网站标题" prop="web_title" :rules="[{ required: true, message: '网站标题不能为空'},]">
					<el-input v-model="ruleForm.web_title"></el-input>
				</el-form-item>
				<el-form-item label="网吧关键字" prop="web_keywords" :rules="[{ required: true, message: '网吧关键字不能为空'},]">
					<el-input v-model="ruleForm.web_keywords"></el-input>
				</el-form-item>
				<el-form-item label="QQ客服(多个按，号分隔)" prop="qq">
					<el-input v-model="ruleForm.qq"></el-input>
				</el-form-item>
				<el-form-item label="地址x" prop="address">
					<el-input v-model="ruleForm.addressx"></el-input>
				</el-form-item>
				<el-form-item label="地址y" prop="address">
					<el-input v-model="ruleForm.addressy"></el-input>
				</el-form-item>
				<el-form-item label="充值赠送积分(1元等于多少积分)" prop="recharge_integral">
					<el-input v-model="ruleForm.recharge_integral"></el-input>
				</el-form-item>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:100px">上传微信二维码</label>
					<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.wechat_logo" :sizearr="300"></my-upload>
				</div>
				<div class="el-form-item" style="padding-left: 100px">
					<label class="el-form-item__label" style="width:100px;margin-left: -100px;">公司简介</label>
					<div class="el-form-item__content" style="">
						<myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
					</div>
				</div> -->
			</el-tab-pane>
			<!-- <el-tab-pane label="设置" name="sixth">
			    <category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="0" :canupload="false" :hasSon="false"></category>
			</el-tab-pane>
			<el-tab-pane label="早课" name="sixth12">
			    <category2 :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="500" :canupload="false" :hasSon="false"></category2>
			</el-tab-pane> -->
			<!-- 网站配置结束 -->
			<!-- 订单相关开始 -->
		<!-- 	<el-tab-pane label="订单相关" name="second">
				<div class="pt20">
					<el-form-item label="未付款订单有效期" prop="web_name" :rules="[{ required: true, message: '未付款订单有效期不能为空'},]">
						<el-input v-model="ruleForm.order_deadline" size="small" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
					<el-form-item label="自动交易成功时限" prop="order_autook" :rules="[{ required: true, message: '自动交易成功时限不能为空'},]">
						<el-input v-model="ruleForm.order_autook" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
					<el-form-item label="自提地址有效期" prop="order_address" :rules="[{ required: true, message: '自提地址有效期不能为空'},]">
						<el-input v-model="ruleForm.order_address" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
				</div>
			</el-tab-pane>
			 <el-tab-pane label="售后类型" name="sixth">
                <my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="0" :canupload="false" :hasSon="false"></my-category>
            </el-tab-pane>
             <el-tab-pane label="签到相关" name="five">
                <el-form-item  label="每天签到" prop="sigin_today" :rules="[{ required: true, message: '每天获得多少积分不能为空'}]">
                    <el-input v-model="ruleForm.sigin_today" size="small" v-class="'width120'"><template slot="append">积分</template></el-input>
                </el-form-item>
                <el-form-item label="签到满多少">
                    <el-input v-model="ruleForm.sigin_day" v-class="'width120'"><template slot="append">天</template></el-input>
                    赠送
                    <el-input v-model="ruleForm.sigin" v-class="'width120'"><template slot="append">分</template></el-input>
                </el-form-item>
            </el-tab-pane>
             <el-tab-pane label="会员权益" name="night">
                <div class="el-form-item" style="padding-left: 100px">
					<label class="el-form-item__label" style="width:100px;margin-left: -100px;">会员权益</label>
					<div class="el-form-item__content" style="">
						<myeditor :content="ruleForm.member_content ? ruleForm.member_content : ''" ref="editor"></myeditor>
					</div>
				</div>
            </el-tab-pane>
             <el-tab-pane label="城市" name="seventh">
                <my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="1" :canupload="false" :hasSon="true"></my-category>
            </el-tab-pane> -->
		</el-tabs>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</el-form>
</template>
<style type="text/css">

.CinputWidth{width: 500px;}
.CinputWidth .el-input__inner{border-color: #dcdfe6!important;}

.OinputWidth{width: 100px;}
.OinputWidth .el-input__inner{border-color: #dcdfe6!important;}
</style>
<script>
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
import myeditor from "@/components/editor.vue";
import category from "@/components/category.vue"
import category2 from "xiaozhu/vue/components/admin/category.vue"
export default {
	mounted: function() {
		this.ajax();
	},
	data() {
		return {
			ruleForm: { order_deadline: 0, order_autook: 0, is_make_menu: false, is_siginin: false },
			formAction: '/admin/system/config',
			activeName2: 'first',
			dialogVisible: false,
			getSiteName: this.getSiteName(),
			data: this.formatData(this)
		};
	},
	methods: {
		chooseLocation() {
			this.$refs.chooseLocation.ajax();
		},
		locationCallBack(res) {
			if (res.latlng) {
				this.$refs.chooseLocation.handleClose();
				this.ruleForm.address = res.poiaddress;
				this.ruleForm.location_x = res.latlng.lng;
				this.ruleForm.location_y = res.latlng.lat;

			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//this.ruleForm.member_content = this.$refs.editor.getContent();
					JSON.parse(JSON.stringify(this.ruleForm))  
					console.log(this.ruleForm)
					this.postAjax(this.formAction, {
						phone:this.ruleForm.phone,
						share_logo:this.ruleForm.share_logo,
						web_name:this.ruleForm.web_name,
						share_title:this.ruleForm.share_title,
						address:this.ruleForm.address,
						location_x:this.ruleForm.location_x ,
						location_y:this.ruleForm.location_y,
						share_descript:this.ruleForm.share_descript,
						cert_logo:this.ruleForm.cert_logo,
						receipt_logo:this.ruleForm.receipt_logo,
						phone2:this.ruleForm.phone2,
						
						}).then(msg=>{
						
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		toBing() {
			this.dialogVisible = true;
			this.$refs.qrcode.getQrcode();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function() {
			this.getAjax(this, {}, msg => {
				if ("detail" in msg) {
					this.ruleForm = msg.detail;
					this.ruleForm.web_logo = this.ruleForm.web_logo ? this.splitCover(this.ruleForm.web_logo, "product") : [];
					this.ruleForm.wechat_logo = this.ruleForm.wechat_logo ? this.splitCover(this.ruleForm.wechat_logo, "product") : [];
					this.ruleForm.share_logo = this.ruleForm.share_logo ? this.splitCover(this.ruleForm.share_logo, "product") : [];
					this.ruleForm.cert_logo = this.ruleForm.cert_logo ? this.splitCover(this.ruleForm.cert_logo, "product") : [];
					this.ruleForm.receipt_logo = this.ruleForm.receipt_logo ? this.splitCover(this.ruleForm.receipt_logo, "product") : [];
					this.ruleForm.card_user_id_default = parseInt(this.ruleForm.card_user_id_default);
				}
			});

		},
	},
	components: {
		myeditor,
		chooseLocation,
		category,
		category2
	}
}

</script>
