<template>
    <div class="header">
        <me-navbar  title="我的淘吧" class="per-navbar">
            <div slot="right">
                <i class="iconfont icon-setting"></i>
                <i class="iconfont icon-msg"></i>
            </div>
        </me-navbar>
    </div>
</template>
<script>
import MeNavbar from 'base/navbar'
export default {
    name:'PerHeader',
    components:{
        MeNavbar
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.header{
    .per-navbar{
        background-color: $header-bgc-translucent;
        color: #fff;
        .iconfont{
            margin-left: 10px;
        }
    }
}
</style>