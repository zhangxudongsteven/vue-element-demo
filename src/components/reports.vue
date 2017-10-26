<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table :data="reports" max-height="1000" stripe>
                    <el-table-column prop="path" label="链接" width="100">
                       <template slot-scope="scope">
                           <el-button @click="handleClick(scope.row.filepath)" type='text'>查看</el-button>
                       </template>
                    </el-table-column>
                    <el-table-column prop="name" label="日期"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basePath: "http://10.1.204.69:8090",
                reports: []
            }
        },
        methods: {
            init: function () {
                this.$http.get(this.basePath + '/report_data/').then((data, error) => {
                    if (!error) {
                        var items = Array.from(data["body"]["data"]).map(function (s) {
                            var a = {};
                            a.filepath = s;
                            a.name = "销售战报（" + s.substring(0, 4) + "-" + s.substring(4, 6) + "-" + s.substring(6, 8) + "）";
                            a.value = parseInt(s.substring(0, 8));
                            a.path = "链接"
                            return a;
                        })

                        // 按日期顺序排序
                        this.reports = items.sort(function (a, b) {
                            return b.value - a.value;
                        })
                        console.log(this.reports);
                    }
                });
            },
            refresh: function () {
                console.log("更新战报");
                console.log(this.getTime());
                this.$http.get(this.basePath + '/refresh_report/').then((data, error) => {
                    if (!error) {
                        let code = data["body"]["data"];
                        if (code == 0) {
                            alert("正在更新，请稍候。");
                        } else {
                            alert("更新过于频繁。");
                        }
                    }
                });
            },
            handleClick: function (filepath) {
                console.log(name);
                window.open(this.basePath + '/reports/' + filepath);
            },
            getTime: function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
                return currentdate;
            }
        },
        mounted: function () {
            this.init();
        }

    }
</script>
