<template>
	<section>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="cover in v.cover_pic" >
		        	<div :style="'background: url('+cover.url+') center center / cover; height: 200px;'"></div>
		        </div>
		    </div>
		    <div class="swiper-pagination"></div>
		</div>
	</section>
</template>
<script type="text/javascript">
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default{
	props:["v"],
	mounted(){
		this.$nextTick(()=>{
		    var mySwiper = new Swiper ('.swiper-container', {
		   	autoplay:true,
		   	observer:true,//修改swiper自己或子元素时，自动初始化swiper
    		observeParents:true,//修改swiper的父元素时，自动初始化swiper
		    // 如果需要分页器
		    pagination: {
		      el: '.swiper-pagination',
		    },
		    navigation: {
		      nextEl: '.swiper-button-next',
		      prevEl: '.swiper-button-prev',
		    },
		    scrollbar: {
		      el: '.swiper-scrollbar',
		    },
		  }) 
  		})       
  }
}	
</script>
<style scoped>
 .swiper-container {
        width:100%;
     
        margin: 0px auto;
    }
</style>