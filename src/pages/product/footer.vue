<template>
    <div class="footer">
        <div class="footer-icon">
            <a href="#">
                <i class="iconfont icon-shop"></i>
                <span>店铺</span>
            </a>
            <a href="#" class="active">
                <i class="iconfont icon-service"></i>
                <span>客服</span>
            </a>
            <a href="#">
                <i class="iconfont icon-collect"></i>
                <span>收藏</span>
            </a>
        </div>
        <div class="add-cart" @click="addGoodsToCart">加入购物车</div>
        <div class="buy-now">马上抢</div>
    </div>
</template>
<script>
export default {
    name:'ProductFooter',
    props:{
        cartData:{
            type:[Array, Object]
        }
    },
    methods:{
        // 采用localStorage进行本地传值，但是接收使无法实时监控值得变化。
        addGoodsToCart(){
            localStorage.setItem('product',JSON.stringify(this.cartData));
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

@mixin flex-around(){
    display: flex;
    justify-content: space-around;
}
@mixin button-type(){
    flex: 0.5;
    color: #fff;
    font-size: 15px;
    text-align: center;
    line-height: 50px;
}
.footer{
    height: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(154, 141, 141, 0.6);
    @include flex-around();
    .footer-icon{
        flex: 1;
        @include flex-around();
        a{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            i{
                font-size: 20px;
                margin-bottom: 3px;
            }
        }
        .active{
            i{
                color: #26d4da;
            }
        }
    }
    .add-cart{
        
        background-color: #ee8d0e;  
        @include button-type();
    }
    .buy-now{
        background-color: #f82626;
        @include button-type();

    }
}
</style>