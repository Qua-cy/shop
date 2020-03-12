<template>
    <div class="slider-wrapper">
        <!-- me-loading如果还没获取到数据时就显示，否则就显示me-slider -->
        <me-loading v-if="!sliders.length"></me-loading>
        <me-slider
        :data="sliders"
        :direction="direction"
        :loop="loop"
        :interval="interval"
        :pagination="pagination"
        v-else
    >
        <swiper-slide
            v-for="(item,index) in sliders" 
            :key="index"
        >
        <a :href="item.linkUrl" class="slider-link">
            <img :src="item.picUrl" alt="" class="slider-img">
        </a>
        </swiper-slide>
    </me-slider>
    </div>
</template>

<script>
import MeSlider from 'base/slider';
import {swiperSlide} from 'vue-awesome-swiper';//引入插件swiperSlide组件
import {swiperOption} from './config'//引入配置参数
import {getHomeSlider} from 'api/home' //引入幻灯片数据
import MeLoading from 'base/loading'
export default {
    name:'HomeSlider',
    components:{
        MeSlider,
        swiperSlide,
        MeLoading
    },
    data(){
        return {
            direction: swiperOption.direction,
            loop: swiperOption.loop,
            interval: swiperOption.interval,
            pagination: swiperOption.pagination,
            sliders:[
                // {
                //  'linkUrl':'https://www.imooc.com',
                //  'picUrl':require('./1.jpg')//在js里本地图片一定要通过require来引入
                // },
                // {
                //  'linkUrl':'https://www.imooc.com',
                //  'picUrl':require('./2.jpg')
                // },
                // {
                //  'linkUrl':'https://www.imooc.com',
                //  'picUrl':require('./3.jpg')
                // },{
                //  'linkUrl':'https://www.imooc.com',
                //  'picUrl':require('./4.jpg')
                // }
            ],
        }
    },
    methods:{
        // 更新slider
        update(){
            return this.getSliders();
        },

        getSliders(){
            return getHomeSlider().then(data => {
                this.sliders = data;
            })
        }
    },
    created(){
        // 一般获取的远程数据都写在created里
        this.getSliders();
    }
}
</script>

<style lang="scss" scoped>
    .slider-wrapper{
        height: 183px;
    }
    .slider-link{
        display: block;
    }
    .slider-link,
    .slider-img{
        width: 100%;
        height: 100%;
    }
</style>