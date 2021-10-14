<template>
	<section class="pt15" v-if="data.show">
		<div class="ui-group">
			<div class="sec-title">会员详细信息</div>
			<div class="ui-info bd-e">
				<div class="uinfo-item">
					<p class="label">粉丝：</p>
					<div class="info">
						<img width="45" :src="ruleForm.headimgurl">
						<span>{{ ruleForm.userInfo.name }}</span>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">会员等级：</p>
					<div class="info">
						<el-select v-model="ruleForm.member_id" placeholder="普通会员">
							<el-option label="普通会员" value=""></el-option>
							<el-option :label="v.name" :value="v.id" v-for="v in data.lev"></el-option>
						</el-select>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">真实姓名：</p>
					<div class="info">
						<el-input placeholder="真实姓名" v-model="ruleForm.userInfo.name"></el-input>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">手机号码：</p>
					<div class="info">
						<el-input placeholder="手机号码" v-model="ruleForm.userInfo.phone"></el-input>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">微信号：</p>
					<div class="info">
						<el-input placeholder="微信号" v-model="ruleForm.userInfo.wechat"></el-input>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">积分：</p>
					<div class="info">
						<el-input placeholder="0" v-model="ruleForm.userInfo.integral" :disabled="true"></el-input>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">余额：</p>
					<div class="info">
						<el-input placeholder="0" v-model="ruleForm.userInfo.amount" :disabled="true"></el-input>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">成交订单数：</p>
					<div class="info">
						<span class="Arial">{{ ruleForm.orderCount }}</span>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">成交金额：</p>
					<div class="info">
						<span class="Arial">{{ ruleForm.orderSum }}</span>元
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">注册时间：</p>
					<div class="info">
						<span class="Arial">{{ ruleForm.created_at }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="ui-group">
			<div class="sec-title">设置</div>
			<div class="ui-info bd-e">
				<div class="uinfo-item">
					<p class="label">上级业务员：</p>
					<div class="info in-btn">
						<el-input placeholder="0" v-model="ruleForm.userInfo.disName" :disabled="true"></el-input>
						<el-button size="small" type="primary" class="ml10" @click="$refs.changeParent.ajax(ruleForm);">选择上级业务员</el-button>
						<el-button size="small" @click="emtyDis">清空选择</el-button>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">累计佣金：</p>
					<div class="info">
						<span class="Arial">{{ data.dis ? data.dis.amount : ''}}</span>
					</div>
				</div>
				<div class="uinfo-item">
					<p class="label">成为分销商时间：</p>
					<div class="info">
						<span class="Arial">{{ data.dis ? data.dis.created_at : ''}}</span>
					</div>
				</div>
				<div class="uinfo-item mtb20">
					<p class="label"></p>
					<div class="info">
						<el-button type="primary" @click="submit">提交</el-button>
						<el-button>取消</el-button>
					</div>
				</div>
			</div>
		</div>
		<my-changeParent ref="changeParent" @callBack="disCallBack"> </my-changeParent>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/info',
			data: this.formatData(this),
			ruleForm: {},
			vipInfo: {
				class: '',
				name: '',
				phone: '',
				wechat: '',
				integral: '',
				balance: '',
				topdis: ''
			},
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		submit() {
			delete this.ruleForm.api_token;
			console.log(this.ruleForm);
			this.postAjax(this.formAction, this.ruleForm, msg => {
				if (msg.data.status == 2) {
					
				}

			});
		},
		emtyDis() {
			this.ruleForm.userInfo.disName = '总店';
			this.ruleForm.userInfo.distribution_id = 0;
		},
		disCallBack(res) {
			this.ruleForm.userInfo.disName = res.name;
			this.ruleForm.userInfo.distribution_id = res.id;
		},
		ajax() {
			this.getAjax(this, {}, msg => {
				this.ruleForm = msg.detail;
				if(msg.dis){
				   this.ruleForm.userInfo.distribution_id = msg.dis.fid;
				}
				console.log(this.ruleForm);
			});
		},
	},
	components: {
		'my-changeParent': resolve => require(['../shop/dis/layouts/changeParent'], resolve),
	}
}

</script>
<style type="text/css">
.ui-group .sec-title {
	height: 40px;
	line-height: 40px;
	background: #f5f5f5;
	padding: 0 15px;
}

.ui-group .ui-info {
	padding: 10px 0;
}

.uinfo-item {
	display: flex;
	line-height: 36px;
	padding: 10px 0;
	color: #666;
}

.uinfo-item .label {
	width: 150px;
	text-align: right;
	padding-right: 5px;
	font-weight: bold;
}

.uinfo-item .info {
	flex: 1;
	overflow: hidden;
}

.uinfo-item .in-btn {
	display: flex;
	justify-content: flex-start;
}

.uinfo-item .in-btn .el-input {
	width: 300px;
}

.uinfo-item .el-input__inner {
	height: 34px;
	line-height: 34px;
	width: 300px !important;
}

</style>
