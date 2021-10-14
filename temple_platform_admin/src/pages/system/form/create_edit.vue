<template>
	<section>
		<div class="nav-sheet pb20 pt20 flex flex-between" style="position: relative;">
			<div class="flex flex-middle">
				<label class="sheet-label m0">表单名称</label>
				<div class="sheet-bar el-input" style="width: 200px;">
					<el-input v-model="appointment_name"> </el-input>
				</div>
			</div>
			<div class="flex flex-middle plr20">
				<label class="sheet-label m0">表单标题</label>
				<div class="sheet-bar el-input" style="width: 200px;">
					<el-input v-model="appointment_title"> </el-input>
				</div>
			</div>
			<div class="flex flex-middle">
				<label class="sheet-label m0">预约开关</label>
				<div class="sheet-bar el-input" style="width: 100px;">
					<el-switch v-model="status" on-text="" off-text="" :active-value="1"  :inactive-value="0"> </el-switch>
				</div>
			</div>
			<div class="flex flex-middle mr20" style="flex-direction: row-reverse;flex: 1;overflow: hidden;">
				<button type="button" class="el-button el-button--success " @click="submit"><span>保存</span></button>
				<button type="button" class="el-button el-button--default mr20"><span>取消</span></button>
			</div>
		</div>
		<div class="text-right">
			<span  class="tip tip-link mr20" style="color: #f59642;"><i  class="el-icon-info el-icon"></i>表单更新后需前往对应的动态或官网重新关联新表单</span>
		</div>
		<!-- 左边开始 -->
		<div class="flex mt20">
			<div class="tabs-box" style="overflow: auto; max-height: 644px;"><h3 >基础组件</h3>
				<div class="ivu-tabs ivu-tabs-card">
					<div class="ivu-tabs-content ivu-tabs-content-animated">
						<div class="ivu-tabs-tabpane">
							<div class="coms-list">
								<div id="modular">
									<div @click="add('标题')" class="coms-item sortable-drag" draggable="false"><i alt="" class="icon-temp  iconfont icon-title" ></i> <span> 标题</span></div>
									<div @click="add('文本')" class="coms-item"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 单行文本</span></div>
									<div class="coms-item" @click="add('多行文本')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 多行文本</span></div>
									<div class="coms-item" @click="add('时间')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 时间</span></div>
									<div class="coms-item" @click="add('日期')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 日期</span></div>
									<div class="coms-item" @click="add('单项选择')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 单项选择</span></div>
									<div class="coms-item" @click="add('多项选择')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 多项选择</span></div>
									<div class="coms-item" @click="add('下拉框')"><i alt="" class="icon-temp  iconfont icon-title"></i> <span> 下拉框</span></div>
									<div class="coms-item" @click="add('上传图片')"><i  alt="" class="icon-temp  iconfont icon-title"></i> <span >上传图片</span></div>
									<div class="coms-item" @click="add('地址')"><i  alt="" class="icon-temp  iconfont icon-title"></i> <span >选择省市区</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 左边结束 -->
			<!-- 中间开始 -->
			<authLists :lists="lists" ref="authLists" :appointmentTitle="appointment_title"></authLists>
			<!-- 中间结束 -->
			<!-- 右边开始 -->
			<authForm :ruleForm="ruleForm" :lists="lists"></authForm>
		</div>
	</section>
</template>
<style type="text/css" scoped="">
@import url('form.css');

</style>
<script type="text/javascript">
import authLists from './layouts/lists/lists';
import authForm from './layouts/form/form';

export default {
	data() {
		return {
			ruleForm: { /*title: '管理团队', icon: 1, type: '管理团队', authDiag: false, checked: true,children:[]*/ },
			siteName: this.getSiteName(),
			showType: 0,
			appointment_name:'',
			appointment_title:'',
			status: 0,
			title: '',
			formAction: '/admin/appointment/lists',
			data: this.formatData(this),
			lists: [ /*{ title: '管理团队', icon: 1, type: '管理团队', authDiag: false, checked: true,children:[] }*/ ]
		}
	},
	mounted() {

		this.ajax();
	},
	methods: {
		ajax() {
			this.getAjax(this, {}, msg => {
				if(msg.siteConfig.appointment_title){
					this.appointment_title = msg.siteConfig.appointment_title;
					this.appointment_name = msg.siteConfig.appointment_name;
				}
				if (msg.lists.length > 0) {
					msg.lists.forEach((v, i) => {
						this.status = v.status
						if (v.children) {
							v.children = JSON.parse(v.children);

						}
						if (v.checked) {
							this.ruleForm = v;
						}
					});
					this.lists = msg.lists;
				}
			});
		},
		noChecked() {
			this.lists.forEach((v, i) => {
				v.checked = true;
			});
		},
		add(type) {
			this.$refs.authLists.add(type);
		},
		submit() {
			if (this.lists.length == 0) {
				this.getError("请选择表单内容");
				return false;
			}
			if(!this.appointment_title){
				this.getError("请选择表单标题 ");
				return false;
			}
			if(!this.appointment_name){
				this.getError("请选择表单名称 ");
				return false;
			}
			this.postAjax("/admin/appointment/create", { formData: this.lists, status: this.status,appointment_title:this.appointment_title,appointment_name:this.appointment_name }, msg => {
				this.ajax();
			});
		}

	},
	components: {
		authLists,
		authForm
	}
}

</script>
<style type="text/css" scoped="">
</style>
