<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="22" :offset="1">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="渠道">
                        <el-input v-model="formInline.channel" placeholder="全部渠道"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="onFilterTabel">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onNewDeal">新增</el-button>
                    </el-form-item>
                </el-form>
                
                <el-form ref="form" :model="form" label-width="80px" v-show="formShow">
                    <hr>
                    
                    <el-form-item label="交易名称">
                        <el-col :span="8">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="交易渠道">
                        <el-col :span="8">
                            <el-select v-model="form.channel" placeholder="请选择">
                                <el-option
                                  v-for="item in channelOptions"
                                  :key="item.channelId"
                                  :label="item.channelName"
                                  :value="item.channelId">
                                </el-option>
                            </el-select>
                            <!-- <el-cascader expand-trigger="hover" :options="channelOptions" v-model="form.channel"></el-cascader> -->
                        </el-col>
                    </el-form-item>
                    <el-form-item label="交易条款">
                        <el-col :span="8">
                            <el-input v-model="form.terms"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="优惠形式">
                        <el-col :span="8">
                            <el-input v-model="form.allowance"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动形式">       
                        <el-col :span="8">
                            <el-input v-model="form.incentive"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="价格" prop="price" :rules="[{ required: true, message: '价格不能为空'}, { type: 'number', message: '价格必须为数字值'}]">
                        <el-col :span="8">
                            <el-input type="age" v-model.number="form.price" auto-complete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-col :span="8">
                            <el-select v-model="form.currency" placeholder="请选择">
                                <el-option
                                  v-for="item in currencyOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-col :span="8">
                            <el-input v-model="form.description"></el-input>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="info" @click="dialogFormVisible = true">添加商品</el-button>
                    </el-form-item>
                    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                        <el-form :model="productForm">
                        <el-form-item label="商品名称" label-width="120px">
                            <el-select v-model="productForm.productId" filterable placeholder="请选择">
                                <el-option
                                  v-for="item in productsOptions"
                                  :key="item.productId"
                                  :label="item.productName"
                                  :value="item.productId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数量" label-width="120px">
                            <el-input-number v-model="productForm.quantity" :min="1" :max="10" label="数量"></el-input-number>
                        </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addProduct">确 定</el-button>
                        </div>
                    </el-dialog>
                   
                    <el-form-item>
                        <template>
                            <el-table :data="form.items" style="width: 100%">
                                <el-table-column prop="sku" label="SKU"></el-table-column>
                                <el-table-column prop="price" label="价格"></el-table-column>
                                <el-table-column prop="currency" label="单位"></el-table-column>
                                <el-table-column prop="spu" label="SPU"></el-table-column>
                                <el-table-column prop="ssu" label="SSU"></el-table-column>
                                <el-table-column prop="line" label="产品线"></el-table-column>
                                <el-table-column prop="quantity" label="数量"></el-table-column>
                            </el-table>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="onNewDeal">取消</el-button>
                    </el-form-item>
                </el-form>
               
                <hr>
                
                <el-table :data="deals" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.items" style="width: 100%">
                                <el-table-column prop="sku" label="SKU"></el-table-column>
                                <el-table-column prop="price" label="价格"></el-table-column>
                                <el-table-column prop="currency" label="单位"></el-table-column>
                                <el-table-column prop="spu" label="SPU"></el-table-column>
                                <el-table-column prop="ssu" label="SSU"></el-table-column>
                                <el-table-column prop="line" label="产品线"></el-table-column>
                                <el-table-column prop="quantity" label="数量"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="交易识别码" width="300"></el-table-column>
                    <el-table-column prop="name" label="名称" width="240"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column prop="channel" label="渠道" width="100" :formatter="channelFormatter"></el-table-column>
                    <el-table-column prop="terms" label="交易条款" width="120"></el-table-column>
                    <el-table-column prop="allowance" label="优惠形式" width="120"></el-table-column>
                    <el-table-column prop="incentive" label="活动形式" width="120"></el-table-column>
                    <el-table-column prop="price" label="价格" width="80"></el-table-column>
                    <el-table-column prop="currency" label="单位" width="80"></el-table-column>
                    <el-table-column prop="timestamp" label="更新时间" sortable></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                deals: [],
                channels: {},
                products: {},
                formInline: {
                    channel: ''
                },
                formShow: false,
                dialogFormVisible: false,
                form: {
                    "name": "",
                    "channel": "",
                    "terms": "",
                    "allowance": "",
                    "incentive": "",
                    "price": 1,
                    "currency": "RMB",
                    "description": "",
                    "items": []
                },
                productForm: {
                    "productId": "",
                    "quantity": 1
                },
                channelOptions: [],
                productsOptions: [],
                currencyOptions: [{
                    value: 'RMB',
                    label: '人民币'
                }, {
                    value: 'USD',
                    label: '美元'
                }],
            }
        },
        methods: {
            appInit() {
                console.log("begin")
                // deal 在 channel 中刷新
                this.refreshChannels();
                console.log("end");
            },
            addProduct() {
                this.dialogFormVisible = false;  
                var item = {
                    "productId": this.productForm.productId,
                    "quantity": this.productForm.quantity
                }
                if (item["productId"] != null && item["productId"] != "") {
                    item["sku"] = this.getProductProperty(item["productId"], "productName");
                    item["spu"] = this.getProductProperty(item["productId"], "spu");
                    item["ssu"] = this.getProductProperty(item["productId"], "ssu");
                    item["line"] = this.getProductProperty(item["productId"], "productLine");
                    item["price"] = this.getProductProperty(item["productId"], "price");
                    item["currency"] = this.getProductProperty(item["productId"], "currencyUnit");
                    this.form.items.push(item);
                }
                console.log(this.form.items);
                this.productForm.productId = "";
                this.productForm.quantity = 1;
            },
            refreshDeals() {
                this.$http.get('/api/deal/all').then((data, error) => {
                    if (!error) {
                        this.deals = JSON.parse(data["bodyText"])["data"];
                        for (let deal of this.deals) {
                            var items = deal["items"];
                            for (var item of items) {
                                item["sku"] = this.getProductProperty(item["productId"], "productName");
                                item["spu"] = this.getProductProperty(item["productId"], "spu");
                                item["ssu"] = this.getProductProperty(item["productId"], "ssu");
                                item["line"] = this.getProductProperty(item["productId"], "productLine");
                                item["price"] = this.getProductProperty(item["productId"], "price");
                                item["currency"] = this.getProductProperty(item["productId"], "currencyUnit");
                            }
                        }
                    }
                });
            },
            refreshChannels() {
                this.$http.get('/api/channel/all').then((data, error) => {
                    if (!error) {
                        let items = JSON.parse(data["bodyText"]);
                        this.channels = {};
                        for (let item of items) {
                            this.channels[item["channelId"]] = item;
                        }
                        // 刷新 deal
                        this.refreshProducts();
                        this.channelOptions = items;
                    }
                });
            },
            refreshProducts() {
                this.$http.get('/api/product/all').then((data, error) => {
                    if (!error) {
                        let items = JSON.parse(data["bodyText"]);
                        // console.log(items);
                        this.products = {};
                        for (let item of items) {
                            this.products[item["productId"]] = item;
                        }
                        this.refreshDeals();
                        this.productsOptions = items;
                    }
                });
            },
            getProductProperty(productId, propertyName) {
                return this.products[productId] !== null ? this.products[productId][propertyName] : "not found";
            },
            channelFormatter(row, column) {
                return this.channels !== {} ? this.channels[row.channel]["channelName"] : row.channel;
            },
            handleEdit(index, row) {
                console.log(index);
                console.log(row);
                const h = this.$createElement;
                this.$notify({
                  title: 'TODO',
                  message: h('i', { style: 'color: teal'}, '该功能尚在开发中')
                });
            },
            onFilterTabel() {
                const h = this.$createElement;
                this.$notify({
                  title: 'TODO',
                  message: h('i', { style: 'color: teal'}, '该功能尚在开发中')
                });
            },
            onNewDeal() {
                this.formShow = !this.formShow;
            },
            onSubmit() {
                var submitObject = this.form;
                this.$http.post('/api/deal/', this.form).then((data, error) => {
                    if (!error) {
                        const h = this.$createElement;
                        this.$notify({
                            title: 'SUCCESS',
                            message: h('i', { style: 'color: teal'}, '添加成功'),
                            type: 'success'
                        });
                        this.form = {
                            "name": "",
                            "channel": "",
                            "terms": "",
                            "allowance": "",
                            "incentive": "",
                            "price": 1,
                            "currency": "RMB",
                            "description": "",
                            "items": []
                        },
                        this.refreshDeals();
                    } else {
                        const h = this.$createElement;
                        this.$notify.error({
                            title: 'FAIL',
                            message: h('i', { style: 'color: teal'}, '操作失败')
                        });
                    }
                });
            }
        },
        mounted() {
            this.appInit();
        }
    }

</script>
