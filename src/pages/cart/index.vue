<template>
    <div class="cart">
        <cart-header class="header"></cart-header>
        <me-scroll>
            <cart-list></cart-list>
        </me-scroll>
    </div>
</template>

<script>
import MeScroll from 'base/scroll'
import CartHeader from './header'
import CartList from './cartlist'
export default {
    name:'Cart',
    components:{
        MeScroll,
        CartHeader,
        CartList
    },
    data(){
        return {
            productData:null
        }
    },
    methods:{
        // 获取本地存储，无法实时监控值得变化
        getProductData(){
            this.productData = JSON.parse(localStorage.getItem('product'));
            console.log(this.productData);
        }
    },
    created(){
        this.getProductData();
    }
}
</script>

<style scoped>
.cart{
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 要多给出header和tabbar占据的高度，否则滚动条拉不到底 */
    padding-bottom: 100px;
    
}
.cart .header{
    border-bottom: 1px solid #ddd;
}
</style>