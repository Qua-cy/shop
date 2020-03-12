<template>
    <swiper :options="swiperOption" :key="keyId">
        <slot></slot>
        <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import {swiper} from 'vue-awesome-swiper';//引入插件swiper容器组件
export default {
    name:'MeSlider',
    components:{
        swiper
    },
    props:{
        // 接收滑动方向
        direction:{
            type:String,
            default:'horizontal',
            // 验证传过来的值是否是horizontal和，返回true通过，false不通过
            validator(value){
                return [
                    'horizontal',
                    'vertical'
                ].indexOf(value) > -1;
            }
        },
        // 接收循环方式，大于0是无限循环
        interval:{
            type:Number,
            default:3000,
            validator(value){
                return value >= 0;
            }
        },
        // 接收滚动方式，是否为无缝滚动
        loop:{
            type:Boolean,
            default:true
        },
        pagination:{
            type:Boolean,
            default:true
        },
        // 接收父组件的数据是否变化，更新数据
        data:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            keyId: Math.random(),
        }
    },
    watch:{
        // 组件中 :key 值的改变会使该组件重新渲染。
        // 监听父组件传过来的data（也就是sliders），如果发生变化，重新渲染
        data(newData){
            if(newData.length === 0){
                return;
            }

            this.swiperOption.loop = newData.length === 1 ? false : this.loop;
            this.keyId = Math.random();
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.swiperOption = {
                watchOverflow: true,
                direction: this.direction,
                autoplay: this.interval ? {
                    delay: this.interval,
                    disableOnInteraction: false
                } : false,
                slidesPerView: 1,
                loop: this.data.length <= 1 ? false : this.loop,
                pagination: {
                    el: this.pagination ? '.swiper-pagination' : null
                }
            }
        }
    }
}
</script>

<style scoped>
    .swiper-container{
        width: 100%;
        height: 100%;
    }
</style>