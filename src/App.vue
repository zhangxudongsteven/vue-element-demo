<template>
    <div id="app">
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/details">订单详情</el-menu-item>
                <el-menu-item index="/reports">每日战报</el-menu-item>
            </el-menu>
        </div>
        <hr>
        <div class="line"></div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }

</script>
