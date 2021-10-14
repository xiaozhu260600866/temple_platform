<template>
	<section>
		<div class="wrap">
			<div style="width: 700px; margin: 140px auto 0px;">
				<div class="connect-group">
					<div class="connect" @click="connect(0)">
						<p>选择交出方:<span class="choose">选择</span></p>
						<p  class="number" v-for="v in sendLists"><span  class="name1">{{ v.userInfo.name }}</span> 客户数
          					<span  class="s_n_hover">{{ v.client }}</span>人
          				</p>
          				
          			</div>
          			<div  class="arrow"><img  src="https://boss.doxinsoft.com/images/test.png" alt="" style="margin-top: 45px;"></div>
          			<div class="connect" @click="connect(1)">
          				<p>选择接收方:<span class="choose" >选择</span></p>
          				<p  class="number" v-for="v in receiveLists"><span  class="name1">{{ v.userInfo.name }}</span> 客户数
          					<span  class="s_n_hover">{{ v.client }}</span>人
          				</p>
          			</div>

				</div>	
				<div  class="doConnect" :style="canSubmit ? 'background: rgb(26, 173, 25); color: rgb(255, 255, 255);' : ''" @click="submit">进行交接</div>
			</div>	
		</div>
		<connect @callBack="chooseCallBack" ref="connect" :status="status"></connect>
	</section>
</template>
<script type="text/javascript">

export default{
	components:{
		"connect":require("./layouts/connect.vue")
	},
	data(){
		return {
			sendLists:[],
			receiveLists:[],
			status:0,
			canSubmit:false
		}
	},
	methods:{
	   chooseCallBack(lists){
	   	if(this.status == 0) this.sendLists	= lists;
	   	if(this.status == 1) this.receiveLists	= lists;
	   	if(this.receiveLists.length && this.sendLists.length) this.canSubmit = true;  	
	   },
	   connect(status){
	   	  this.status = status;
	   	  this.$refs.connect.open(status); 
	   },
	   submit(){
	   	  if(!this.canSubmit){
	   	  	 this.getError("您还没有勾选，请不要提交");
	   	  	 return false;
	   	  }
	   	  let send = this.sendLists[0];
	   	  let receive = this.receiveLists[0];
	   	  this.getConfirm("正在将"+send.userInfo.name+"的"+send.client+"个客户的备注和跟进转移到"+receive.userInfo.name+"的AI雷达中;交接后,"+send.userInfo.name+"将从组织架构中删除,不可恢复",msg=>{
	   	  		 this.postAjax("/admin/card/connect",{receive_id:receive.id,send_id:send.id},msg=>{
	   	  		 	 if(msg.data.status == 2){
	   	  		 	 	this.goto("/vueadmin/index");
	   	  		 	 }
	   	  		}); 	
	   	  });
	   	 	
	   }
	}
}	
</script>
<style type="text/css" scope>
@import url('./connect.css');	
</style>