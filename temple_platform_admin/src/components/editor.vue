<template>
    <section>
        <div id="editor" type="text/plain" style="width:100%;height:500px;z-index: 3000;"></div>
    </section>
</template>

<script type="text/javascript">
import "../../static/utf8-php/ueditor.config.js";
import "../../static/utf8-php/ueditor.all.min.js";
import "../../static/utf8-php/lang/zh-cn/zh-cn.js";
export default {
    props: ["content"],
    mounted() {

    },
    methods: {
        getContent() {
            return this.ue.getContent();
        },
        setContent(content,type){
             
            UE.delEditor('editor'); /*使用前必须要消毁editor*/
            this.ue = UE.getEditor('editor', {
                BaseUrl: '',
                UEDITOR_HOME_URL: '/static/utf8-php/',
                // toolbars:[]
            });
            if(!type){
               setTimeout(()=>{
                       $(".edui-editor").removeAttr("style","");
                      $(".edui-editor").css("z-index", "3000");
               
               
               },1000); 
            }
          

              this.ue.ready(() => {
                    this.ue.setContent(content);
            });
        }
    },
    data() {
        return {
            ue: ''
        }
    }
}

</script>
