<template>
	<el-dialog title="结算" :visible.sync="dialogFormVisible" width="800px" top="10px" :before-close="handleClose"
		class="pay_confirm">
		<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm validform_ajax pay-list">
			<div class="list-item">
				<div class="pay_left">
					<div class="pay-user pay-item">
						<div class="pay-user_info">
							<p class="item">姓名：<span>{{clientInfo.name}}</span></p>
							<p class="item">电话：<span>{{clientInfo.phone}}</span></p>
						</div>
					</div>
					<div class="pay-count pay-item">
						<el-form-item label="应收金额：" prop="remark">
							<div class="pay-price">{{ruleForm.amount}}</div>
						</el-form-item>
						<!-- <el-form-item :label="payMethod.label+'：'" v-for="(payMethod,key) in pay_method_arr"
							v-if="payMethod.show && payMethod.checked">
							<el-input v-model="ruleForm['amount']" :ref="'input'+key"
								placeholder="0" @click.native="clickPrice(payMethod)" @blur="payMethodPrice(payMethod)">
							</el-input>
						</el-form-item>
						<el-form-item label="找零：" prop="name" >
							<el-input v-model="oprice" placeholder="0" disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="结算日期：" prop="name">
							<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</el-form-item>
						<el-form-item label="牌位号：" prop="no">
							<el-input v-model="ruleForm.no" placeholder="请输入牌位号" type="text"></el-input>
						</el-form-item>
						<el-form-item label="备注：" prop="remark">
							<el-input v-model="ruleForm.remark" placeholder="请输入备注" type="textarea"></el-input>
						</el-form-item> -->
					</div>
				</div>
				<div class="pay_right">
					<div class="order-pay">
						<div :class="['order-pay-btn', payMethod.checked  ? 'cur' :'',payMethod.disabled  ? 'disabled' :'']"
							@click="addPay(payMethod)" v-for="(payMethod,key) in pay_method_arr">
							<img class="ticon disabled" :src="[siteName+'/images/admin/pay-type'+key+'-no.png']"
								v-if="payMethod.disabled">
							<img class="ticon" :src="[siteName+'/images/admin/pay-type'+key+'.png']" v-else>
							<p class="txt">{{ payMethod.label }}</p>
						</div>
					</div>
					<div class="keyboard">
						<div class="keyboard-item">
							<p class="txt" @click="addNum(7)">7</p>
							<p class="txt" @click="addNum(8)">8</p>
							<p class="txt" @click="addNum(9)">9</p>
							<p class="txt integer" @click="addNum('clear');addNum(100)">￥100</p>
							<p class="txt" @click="addNum(4)">4</p>
							<p class="txt" @click="addNum(5)">5</p>
							<p class="txt" @click="addNum(6)">6</p>
							<p class="txt integer" @click="addNum('clear');addNum(50)">￥50</p>
							<p class="txt" @click="addNum(1)">1</p>
							<p class="txt" @click="addNum(2)">2</p>
							<p class="txt" @click="addNum(3)">3</p>
							<p class="txt integer" @click="addNum('clear');addNum(20)">￥20</p>
							<p class="txt" @click="addNum(0)">0</p>
							<p class="txt" @click="addNum('.')">.</p>
							<p class="txt clearN" @click="addNum('clear')">清除</p>
							<p class="txt integer" @click="addNum('clear');addNum(10)">￥10</p>
						</div>
						<div class="keyboard-nav">
							<div class="knav esc" @click="handleClose">取消 Esc</div>
							<div class="knav enter" @click="submit()">确认 Enter</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</el-form>
	</el-dialog>
</template>
<script>
	export default {
		props: ['top'],
		data() {
			return {
				ruleForm: {
					no: '',
					password: '',
					remark: '',
					date: new Date(),
					amount:0,
					pay_method:1
				},
				formAction: '',
				dialogFormVisible: false,
				siteName: this.getSiteName(),
				oprice: '',
				clientInfo: {},
				parentData:{},
				pay_method_arr: [{
						label: '微信',
						value: 1,
						checked: true,
						show: true,
						disabled: false,
						focus: true
					},
					{
						label: '现金',
						value: 2,
						checked: false,
						show: true,
						disabled: false,
						focus: false
					},
					{
						label: '银行收讫',
						value: 3,
						checked: false,
						show: true,
						disabled: false,
						focus: false
					},
					{
						label: '悦农e付3040',
						value: 4,
						checked: false,
						show: true,
						disabled: false,
						focus: false
					},
					{
						label: '悦农e付3041',
						value: 5,
						checked: false,
						show: true,
						disabled: false,
						focus: false
					},
					{
						label: '作废单',
						value: 6,
						checked: false,
						show: true,
						disabled: false,
						focus: false
					},
				],
			};
		},
		methods: {
			addNum(num) {
				this.pay_method_arr.forEach((payMethod, index) => {
					if (payMethod.focus) {
						if (num == 'clear') {
							this.ruleForm["amount"] = "";
						} else {
							let value = this.ruleForm["amount"].toString().split("");
							value.push(num);
							console.log(value)
							console.log(value.join(""))
							if (num == ".") {
								this.ruleForm["amount"] = value.join("");
							} else {
								this.ruleForm["amount"] = parseFloat(value.join(""));
							}
						}
					}
				})
				console.log(this.ruleForm.amount);
				
			},
			addPay(item) {
				this.pay_method_arr.forEach(v => {
					v.checked = false;
				})
				item.checked = true;
				this.ruleForm.pay_method = item.value;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			ajax: function(clientInfo,tableData,parentData) {
				this.clientInfo = clientInfo;
				this.tableData = tableData;
				this.parentData  = parentData;
				//this.user_id = params.user_id;
				//this.siteName = params.site_name;
				this.dialogFormVisible = true;

			},
			submit(){
			   if(this.ruleForm.amount == 0){
				   return this.getError("金额不能为0");
			   }
			   this.ruleForm.date = this.dateToString(this.ruleForm.date,1);
			   this.postAjax("/admin/project/order-add",{payData:this.ruleForm,clientInfo:this.clientInfo,tableData:this.tableData,parentData:this.parentData}).then(msg=>{
				   if(msg.data.status == 2){
					   this.dialogFormVisible = false;
					   setTimeout(()=>{
						   window.location.reload();
					   },3000);
				   }
			   })
			},
			handleClose() {
				this.dialogFormVisible = false;
			}
		},
	}
</script>
<style>
	@import "../cashier.css";
</style>
