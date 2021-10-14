<template>
	<section v-if="data.show">
		<div class="toolbar t-search fs13">
			<table class="table table-bordered order-info">
				<tbody>
					<tr>
						<td class="active" width="50%">
							<p class="ltitle pb10">
								订单信息
							</p>
							<ul class="order-info-left">
								<li>
									<table width="100%">
										<tbody>
											<tr>
												<td class="lname"> 订单编号： </td>
												<td> {{ data.detail.order_no}}</td>
											</tr>
											<tr>
												<td class="lname">订单总价：</td>
												<td>
													￥{{ data.detail.amount }}
													<button class="btn btn-info btn-xs fs13" id="modifyAmount" type="submit" @click="changePrice" v-if="data.detail.status<3">修改价格</button>
												</td>
											</tr>
											<tr>
												<td class="lname">会员：</td>
												<td>{{ data.detail.addr_name }}</td>
											</tr>
											<tr>
												<td class="lname">付款方式</td>
												<td>{{ data.detail.payMethod }}</td>
											</tr>
											<tr>
												<td class="lname">
													<p class="pb3">收货地址：</p>
													<button class="btn btn-info btn-xs fs13" id="modifyAddress" type="submit" @click="changeAddress" v-if="data.detail.status<5">修改收货地址</button>
												</td>
												<td>
													<span id="order_address">{{ data.detail.addr_name }}，{{ data.detail.addr_phone }}，<br>
													{{ data.detail.addr_province }} {{ data.detail.addr_city }} {{ data.detail.addr_area }}{{ data.detail.addr_address }}</span>
													<br>
												</td>
											</tr>
											<tr>
												<td class="lname">送货方式：</td>
												<td>{{ data.detail.getShipping }}</td>
											</tr>
											<tr>
												<td class="lname"> 客户留言：</td>
												<td>{{ data.detail.remark }} </td>
											</tr>
											<tr>
												<td>订单日期</td>
												<td>{{ data.detail.created_at }}</td>
											</tr>
											<tr v-if="data.detail.is_bill">
												<td>发票</td>
												<td>单位：{{ data.detail.unit_name }}
													<br> 纳税人识别号：{{ data.detail.bill_no }}
												</td>
											</tr>
										</tbody>
									</table>
								</li>
							</ul>
						</td>
						<td class="right-td" width="50%">
							<p class="rtitle pb10">
								<span class="glyphicon glyphicon-exclamation-sign"></span> 当前订单状态：
								<span class="green_color">{{ data.detail.status_message }}</span>
							</p>
							<p class="rope">
								您可以：
								<button type="button" class="btn btn-info btn-xs toExpress fs12" v-if="data.detail.status==1" @click="$refs.engineer.ajax(data.staff,data.detail)">分配工程师</button>
								<button class="btn btn-danger btn-xs toClose fs12" type="button" @click="changeStatus(0)" v-if="data.detail.status!=0">
									关闭订单
								</button>
								<button class="btn btn-info btn-xs" @click="changeStatus(9)" v-if="data.detail.status == 5">收货</button>
							</p>
							<div class="order-timer">
								<ul>
									<li v-for="(v,key) in data.detail.systemLog">
										<font class="dark_color"> [{{ v.created_at }}]</font>
										[{{ v.content }}]
									</li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table table-bordered">
				<thead>
					<tr class="active">
						<th align="center">购买商品</th>
						<th align="center" width="100">商品价格</th>
						<th align="center" width="80"> 数量</th>
						<th align="center" width="120"> 小计</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(v,key) in data.detail.products" >
						<td class="pr-info">
							<div class="limg pr20">
								<img :src="v.firstCover" height="60" width="60" />
							</div>
							<div class="rinfo">
								<p class="name">{{ v.is_info ? v.name+"("+v.attribute+")" : v.name}}</p>
								<p class="num">产品编号：{{ v.product_no }}</p>
							</div>
						</td>
						<td align="center">￥{{ v.price  }}</td>
						<td align="center">1 </td>
						<td align="center"> ￥{{ v.price }} </td>
					</tr>
				</tbody>
			</table>
		</div>
		<info ref="info" :type="type" :title="title" :ruleForm="data.detail" formAction="/admin/decorate/order/modify"></info>
		<engineer ref="engineer"></engineer>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/decorate/order/info',
			data: this.formatData(this),
			title: '',
			type: 0,
			siteName: this.getSiteName()
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		
		ajax() {
			this.getAjax(this, { id: this.getOptions('id') }, msg => {});
		},
		changeStatus(status) {
			let title = status == 0 ? '关闭订单' : '确认收货';
			this.getConfirm(title, () => {
				this.postAjax("/admin/decorate/order/change-order-status", { id: this.data.detail.id, status: status }, msg => {
					if (msg.data.status == 2) {
						this.ajax();
					}
				});
			});
		},
		changePrice() {
			this.type = 0;
			this.$refs.info.ajax();
			this.title = "修改价格";
		},
		changeAddress() {
			this.type = 1;
			this.$refs.info.ajax();
			this.title = "修改地址";
		},
		changeDelivery() {
			this.type = 2;
			this.$refs.info.ajax();
			this.title = "发货";
		},
		goodsAfter(item) {
			this.$refs.goodsAfter.dialogVisible = true;
			item.type = item.type == 1 ? '退货' : '退货';
			this.$refs.goodsAfter.ruleForm = item;
			if (item.pic) this.$refs.goodsAfter.fileList = splitCover(item.pic, "product");
			console.log(this.$refs.goodsAfter.ruleForm);

		},
	},
	components: {
		"info": resolve => require(['./layouts/info'], resolve),
		"engineer": resolve => require(['./layouts/engineer'], resolve),
	}
}

</script>
<style type="text/css" scoped="">
.pr-info{display: flex;border: 0;}
.pr-info .name{ text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px;height: 40px;}
.pr-info .num{line-height: 16px;color: #999;margin-top: 4px;}
.order-info-left .lname{width: 110px;}
</style>
