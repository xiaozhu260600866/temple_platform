<template>
   <section>
       <keep-alive > <!-- 后退不刷新 -->
           <router-view v-if="$store.state.mutations.refresh"></router-view>
       </keep-alive>
       <router-view v-if="!$store.state.mutations.refresh"></router-view>
    </section>
</template>
<script>
    export default{
        data(){
          return {

          }
        },
        methods:{
        }
    }
</script>
