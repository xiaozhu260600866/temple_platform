<template>
	<section class="index-sec" v-if="data.show">
        <div class="welcome">欢迎进入观音赞后台管理系统</div>
	</section>
</template>
<style type="text/css">
.content-container{position: relative;}
.welcome{position: absolute;width: 100%;text-align: center;top: 50%;font-size: 30px;margin-top: -20px;}
</style>
<script type="text/javascript">
import "./index.css";
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
export default {
	name: 'App',
	data() {
		return {
			ruleform: {},
			formAction: '/admin/user/boss-count',
			getSiteName: this.getSiteName(),
			LDataTime: 7,
			data: this.formatData(this),
			RDataTime: 1,
			chartShow:0,
			form: {
				region: '',
			}

		}
	},
	methods: {
		 ajax() {
            this.getAjax(this, {timeType:this.LDataTime}, msg => {
            	this.drawLine();
				this.show = true;

            });
        },
        drawLine: function() {
			setTimeout(() => {
				let myChart = echarts.init(document.getElementById('myChart'))
				let myChart2 = echarts.init(document.getElementById('myChart2'))
				let myChart3 = echarts.init(document.getElementById('myChart3'))
				let myChart4 = echarts.init(document.getElementById('myChart4'))
				// 绘制图表

				myChart.setOption({
					color: ['#3398DB'],
					title: { text: '商城销量统计', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
					tooltip: {},
					xAxis: {
						data: this.data.data.shop.name
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: this.data.data.shop.value
					}]
				});

				myChart2.setOption({
					color: ['#3398DB'],
					title: { text: '客户新增数', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
					tooltip: {},
					xAxis: {
						data: this.data.data.memberAdd.name
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						data: this.data.data.memberAdd.value
					}]
				});

				myChart3.setOption({
					color: ['#3398DB'],
					title: { text: '咨询客户数', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
					tooltip: {},
					xAxis: {
						data: this.data.data.memberConsult.name
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						data: this.data.data.memberConsult.value
					}]
				});
				myChart4.setOption({
					color: ['#3398DB'],
					title: { text: '跟进客户数', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
					tooltip: {},
					xAxis: {
						data: this.data.data.staffConsult.name
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						data: this.data.data.staffConsult.value
					}]
				});

			}, 1000)

		},
	},
	mounted() {
		this.ajax();
	}
}

</script>
