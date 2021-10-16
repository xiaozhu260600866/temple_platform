<template>
	<div class="bg-f mb8">
		<!-- <div class="sec-block mt10">
			<span>订单信息</span>
		</div> -->
		<div class="detail-list">
			<div class="li-group">
				<label>订单编号</label>
				<p class="rde Arial">{{ ruleform.order_no }}</p>
			</div>
			<div class="li-group">
				<label>订单日期</label>
				<p class="rde Arial">{{ ruleform.payed_at }}</p>
			</div>
			<div class="li-group">
				<label>歌曲</label>
				<p class="rde Arial"> {{ ruleform.getSong ? ruleform.getSong.name : '' }}</p>
			</div>
			<div class="li-group">
				<label>歌手</label>
				<p class="rde Arial">{{ ruleform.getSong ? ruleform.getSong.user_name : '' }}</p>
			</div>
			<div class="li-group">
				<label>排序</label>
				<p class="rde Arial">{{ ruleform.sort }}</p>
			</div>
			<div class="li-group">
				<label>订单总价</label>
				<p class="rde Arial fc-red">{{ruleform.amount_all}}</p>
			</div>
			<div class="li-group" v-if="ruleform.top_price">
				<label>置顶费</label>
				<p class="rde Arial fc-red">{{ parseFloat(ruleform.top_price)}}</p>
			</div>
			<!-- <div class="li-group">
				<label>付款方式</label>
				<p class="rde">{{ ruleform.getPayMethod }}</p>
			</div> -->


			<div class="li-group">
				<label>台号</label>
				<p class="rde">{{ ruleform.table_no }}</p>
			</div>

			<div class="li-group">
				<label>客户留言</label>
				<p class="rde">{{ ruleform.remark }}</p>
			</div>
		</div>
		<div class="Stop-diag">
			<diag :open="thisDiag" :top="30">
				<div slot="content" class="text-center ptb20">
					<weui-input v-model="ruleform.content" type="textarea" name="content" placeholder="请输入拒绝理由" datatype="require" />
					<div class="dx-btn dx-btn-lg dx-btn-orange bdr20 plr50 mt20" @click="$emit('callBack',ruleform.content)">提交</div>
				</div>
			</diag>
		</div>
	</div>
</template>

<script>
	export default{
		props:['ruleform'],
		data(){
			return {
				thisDiag:false
			}
		}
	}
</script>

<style>
</style>
