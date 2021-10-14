<template>
	<section>
			<el-dialog title="预览二维码" :visible.sync="dialogFormVisible" top="141px" :before-close="handleClose" width="30%">
					<div class="text-center">
						<img :src="siteName+'/website-recode'">
					</div>
			</el-dialog>
	</section>
</template>
<script type="text/javascript">
export default{
	 props:["imgSrc"],
	 data(){
	 	return {
	 		dialogFormVisible:false,
	 		siteName:this.getSiteName()
	 	}
	 },
	 methods:{
	 	  handleClose(){
	 	  	this.dialogFormVisible = false;
	 	  },
	 	  ajax(){
	 	  	 this.dialogFormVisible = true; 
	 	  }

	 }
}	
</script>