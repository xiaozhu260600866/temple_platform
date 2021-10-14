<template>
	<section v-if="data.show">
		<el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="">
			<!-- 基础设置开始 -->
			<el-tabs v-model="activeName2" type="card">
				<el-tab-pane label="基础设置" name="first">

					<el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '商品名称不能为空'},]">
						<el-input v-model="ruleForm.name" style="width:40%"></el-input>
					</el-form-item>
					<el-form-item label="请选择分类" prop="fclass" :rules="[{ required: true, message: '分类不能为空'},]">
						<el-cascader placeholder="请输入分类" expand-trigger="hover" :options="data.fclass" v-model="ruleForm.fclass"
							style="width:200px"></el-cascader>
					</el-form-item>
					<div class="flex">
						<el-form-item label="商品售价" prop="price" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
							<el-input v-model="ruleForm.price" style="width: 120px"></el-input>
						</el-form-item>
						<!-- <el-form-item label="商品标价" prop="new_price">
							<el-input v-model="ruleForm.new_price" style="width: 120px"></el-input>
						</el-form-item> -->
						<el-form-item label="商品运费" prop="yunfei">
							<el-input v-model="ruleForm.yunfei" style="width: 120px"></el-input>
						</el-form-item>
					</div>
					
				
					<div class="flex">
						
						<el-form-item label="商品排序" prop="sort" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
							<el-input v-model="ruleForm.sort" style="width: 120px"></el-input><span class="red pl5">数值越大，排名越高</span>
						</el-form-item>
					</div>
					<div class="flex">
						<el-form-item label="回向文" class="xiaozhuEvaluate" prop="evaluate" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
							<el-input v-model="ruleForm.evaluate" style="width: 520px;" type="textarea">
							</el-input>
						</el-form-item>
					</div>
					<el-form-item label="开启限购" prop="can_max_buy">
						<el-switch v-model="ruleForm.can_max_buy" on-text="" off-text="" :active-value="1"
							:inactive-value="0" style="width: 100px"> </el-switch>
					</el-form-item>
					<el-form-item label="限购数量" v-if="ruleForm.can_max_buy" prop="max_num" :rules="[{ required: true, message: '产品库存不能为空'},{ type: 'number', message: '必须为数字值'}]">
						<el-input v-model.number="ruleForm.max_num" style="width: 130px">
							<template slot="append">件</template>
						</el-input>
					</el-form-item>
					<el-form-item label="发表时间" required>
						<el-col :span="11">
							<el-form-item prop="date1">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.published_at" style="width:200px"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="是否上架" prop="putaway" :rules="[{ required: true, message: '是否上架不能为空'}, ]">
						<el-switch v-model="ruleForm.putaway" on-text="" off-text="" :active-value="1" :inactive-value="0">
						</el-switch>
					</el-form-item>
					<!-- <el-form-item label="备注" prop="intro">
						<el-input v-model="ruleForm.intro" style="width:280px" type="textarea"></el-input>
					</el-form-item> -->

					<my-cropUpload v-model="ruleForm.thumb_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:1,widthRatio:'最佳尺寸300*300',heightRatio:'最佳尺寸300*300'}}"
						message="最佳尺寸300*300" label="缩略图"></my-cropUpload>
					<!-- <my-cropUpload v-model="ruleForm.poster_cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:1,widthRatio:'最佳尺寸300*300',heightRatio:'最佳尺寸300*300'}}"
						message="最佳尺寸300*300" label="海报图"></my-cropUpload> -->

					<my-cropUpload v-model="ruleForm.cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:5,widthRatio:'最佳尺寸750*750',heightRatio:'最佳尺寸750*750'}}"
						message="最佳尺寸750*750" label="滚动图片"></my-cropUpload>
					<div class="el-form-item" style="padding-left: 100px">
						<div class="el-form-item__content" style="">
							<myeditor :content="data.content ? data.content : ''" ref="editor"></myeditor>
						</div>
					</div>
				</el-tab-pane>
				<!-- 分销配置结束 -->
				<!-- <el-tab-pane label="分销配置" name="second">
					<disConfig :ruleForm="ruleForm" :disConfig="data.disConfig"></disConfig>
				</el-tab-pane>
				<el-tab-pane label="团购配置" name="third">
					<group :ruleForm="ruleForm"></group>
				</el-tab-pane>
				 <el-tab-pane label="秒杀配置" name="fifth">
					<miaosha :ruleForm="ruleForm"></miaosha>
				</el-tab-pane> -->

			</el-tabs>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>
<style type="text/css">
.proImg .el-upload--picture-card {width: 120px;height: 120px;line-height: 120px;}
.shopping .el-radio{margin-bottom: 0;}
</style>
<script>
	import myeditor from "@/components/editor.vue";
	import disConfig from './layouts/dis_config.vue'
	import group from "./layouts/group.vue";
	import miaosha from "./layouts/miaosha.vue";
	export default {
		mounted: function() {
			if (this.getOptions("id")) {
				this.formAction = '/admin/shop/product/edit?id=' + this.getOptions("id");

			} else {
				this.formAction = '/admin/shop/product/create';
			}
			this.ajax();
		},
		data() {
			return {
				ruleForm: {
					fclass: [],
					shipping: 2,
					tag:'',
					published_at: new Date(),
					is_share_distribution: 1,
					member_update_distribution: 0,
					can_distribution: 1,
					is_update_member: 0,
					is_distribution_ratio: 0,
					can_coupon: true,
					is_hot: 0,
					is_new: 1,
					group_num: 2,
					is_group: 0,
					yunfei: 0,
					is_favourable: 0,
					putaway: 1,
					give_coupon: 0,
					sort: 0,
					cover: [],
					thumb_pic: [],
					can_buy: 1,
					integral: 0,
					num: 100,
				},
				formAction: '',
				getSiteName: this.getSiteName(),
				data: this.formatData(this),
				activeName2: 'first',
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.content = this.$refs.editor.getContent();
						this.ruleForm.disConfig = this.data.disConfig;
						this.ruleForm.is_new = 1;
						if (this.ruleForm.group_expire_date && typeof this.ruleForm.group_expire_date ==
							"object") {
							this.ruleForm.group_expire_date = this.dateToString(this.ruleForm.group_expire_date,
								"dateTime");
						}
						if (this.ruleForm.miaosha_start_date && typeof this.ruleForm.miaosha_start_date ==
							"object") {
							this.ruleForm.miaosha_start_date = this.dateToString(this.ruleForm.miaosha_start_date,
								"dateTime");
						 }

						if (this.ruleForm.miaosha_end_date && typeof this.ruleForm.miaosha_end_date ==
							"object") {
							this.ruleForm.miaosha_end_date = this.dateToString(this.ruleForm.miaosha_end_date,
								"dateTime");
						}
						console.log(this.ruleForm);

						this.postAjax(this.formAction, this.ruleForm, msg => {
							if (msg.data.status == 2) {
								this.$router.back(-1)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			ajax: function() {
				this.getAjax(this, {}, msg => {
					if ("detail" in msg) {
						this.ruleForm = msg.detail;
						this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover,
							"product") : [];
						this.ruleForm.thumb_pic = this.ruleForm.thumb_pic ? this.splitCover(this.ruleForm.thumb_pic,
							"product") : [];
						this.ruleForm.poster_cover = this.ruleForm.poster_cover ? this.splitCover(this.ruleForm
							.poster_cover, "product") : [];
						this.ruleForm.fclass = this.ruleForm.fclassArr;
						this.ruleForm.group_expire_date = this.ruleForm.group_expire_date ==
							"2099-12-30 00:00:00" ? '' : this.ruleForm.group_expire_date;
						this.$nextTick(()=>{
							this.$refs.editor.setContent(this.ruleForm.content);
						});
					}else{
						this.$nextTick(()=>{
							this.$refs.editor.setContent('');
						});
					}
				});
			},
		},
		components: {
			myeditor,
			disConfig,
			group,
			miaosha
		}
	}
</script>
