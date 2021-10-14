<template>
    <div v-if="data.show">
          <el-tabs v-model="data.query.type" @tab-click="ajax">
            <el-tab-pane label="祈福订单" :name="0">
                <dx-table :data="data" :globalData="type0"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button size="small" type="primary" @click="printf(scope.row)">打印</el-button>
                    </div>
					<div slot="tableLeft" slot-scope="scope">
						  <el-button type="primary"  @click="printfText(scope.row)" class="ml20">批量输入打印文字</el-button>	
					</div>
                 </dx-table>
            </el-tab-pane>
            <el-tab-pane label="阶段性祈福牌位" :name="100">
                <dx-table :data="data" :globalData="type100"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button size="small" type="primary" @click="printf(scope.row)">打印</el-button>
                    </div>
					<div slot="tableLeft" slot-scope="scope">
						  <el-button type="primary"  @click="printfText(scope.row)" class="ml20">批量输入打印文字</el-button>	
					</div>
                 </dx-table>
            </el-tab-pane>
            <el-tab-pane :label="v.label + '订单'" :name="v.value" v-for="v in data.typeArr">
                <dx-table :data="data" :globalData="$data['type' + v.value]"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button type="primary" size="small" @click="printf(scope.row)">打印</el-button>
                    </div>
					<div slot="tableLeft" slot-scope="scope">
						  <el-button type="primary"  @click="printfText(scope.row)" class="ml20">批量输入打印文字</el-button>	
					</div>
					
                 </dx-table>
            </el-tab-pane>
          </el-tabs>
		  <el-dialog title="打印文字" :visible.sync="dialogFormVisible"  :before-close="handleClose">
		      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		          <el-form-item label="打印文字" prop="printf_text" :rules="[{ required: true, message: '充值金额不能为空'},]">
		              <el-col :span="8">
		                    <el-input v-model="ruleForm.printf_text" type="textarea"></el-input>
		              </el-col>
		          </el-form-item>
		          <el-form-item>
		              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		              <el-button @click="dialogFormVisible = false">取 消</el-button>
		          </el-form-item>
		      </el-form>
		  </el-dialog>
    </div>
</template>
<script type="text/javascript">
    import type0 from "./layouts/printf/type0.js";
    import type1 from "./layouts/printf/type1.js";
    import type2 from "./layouts/printf/type2.js";
    import type3 from "./layouts/printf/type3.js";
    import type4 from "./layouts/printf/type4.js";
    import type5 from "./layouts/printf/type5.js";
    import type6 from "./layouts/printf/type6.js";
    import type7 from "./layouts/printf/type7.js";
    import type8 from "./layouts/printf/type8.js";
    import type9 from "./layouts/printf/type9.js";
    import type10 from "./layouts/printf/type10.js";
    import type11 from "./layouts/printf/type11.js";
    import type12 from "./layouts/printf/type12.js";
    import type100 from "./layouts/printf/type100.js";

    export default {
        data() {
            return {
                formAction: "/admin/tablet/order-lists",
                data: this.formatData(this),
				checkLists:[],
                siteName: this.getSiteName(),
				dialogFormVisible:false,
                type0: type0,
                type1: type1,
                type2: type2,
                type3:type3,
                type4:type4,
                type5:type5,
                type6:type6,
                type7:type7,
                type8:type8,
                type9:type9,
                type10:type10,
                type11:type11,
                type12:type12,
                type100:type100,
                ruleForm:{},
                type:0
            }
        },
        mounted() {
            this.ajax();
        },
        watch: {
            //"$route": "ajax"
        },
        methods: {
			submitForm(formName) {
			    this.$refs[formName].validate((valid) => {
			        if (valid) {
						this.ruleForm.lists = this.checkLists;
			            this.postAjax("/admin/tablet/order-printf-text", this.ruleForm, msg=> {
			                if (msg.data.status == 2) {
			                    this.dialogFormVisible = false;
			                    this.ajax();
			                }
			            })
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
			handleClose() {
			    this.dialogFormVisible = false;
			},
			printfText(row){
				if(row.length > 0){
					this.checkLists = row;
					this.dialogFormVisible = true;
				}
				console.log(row);
			},
            printf(row){
               window.open(this.siteName + '/printf.html?id='+row.id);
            },
            editField(row,field){
            	this.postAjax("/admin/song/editField", { id:row.id,field:field,value:row[field] }, msg => {
            		if (msg.data.status == 3) {
            			row[field] =0;
            		}
                    if (msg.data.status == 2) {
                    	this.ajax();
                    }
            	});
            },
            submitBeforeCallBack(ruleform){
                delete ruleform.api_token;
            },

            ajax() {
                this.getAjax(this, {}, msg => {});
            },
        },
        components: {
            "dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),

        }
    }
</script>
