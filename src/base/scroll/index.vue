<template>
    <swiper :options="swiperOption" ref="swiper">
        <!-- 下拉刷新区域 -->
        <div class="mine-scroll-pull-down" v-if="pullDown">
            <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
        </div>
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <!-- 上拉加载区域 -->
        <div class="mine-scroll-pull-up" v-if="pullUp">
            <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
        </div>
        <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import MeLoading from 'base/loading';
import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
} from './config';

export default {
    name:'MeScroll',
    components:{
        swiper,
        swiperSlide,
        MeLoading
    },
    props:{
        scrollbar:{
            type:Boolean,
            default:true
        },
        data:{
            type:[Array, Object]
        },
        pullDown:{
            type:Boolean,
            default:false
        },
        pullUp:{
            type:Boolean,
            default:false
        }
    },
    // 如果数据不要经常改变的话可以放到methods的init方法里。
    // data(){
    //     return{
            
    //     }
    // },
    watch: {
        // 监测父组件的data，如果发生变化调用update()更新滚动条
        data(){
            this.update();
        }
    },
    created(){
        this.init();
    },
    methods:{
        update(){
            // 获取swiper实例,调用该实例下面的update()更新滚动条
            // Vue提供的$nextTick可以确保数据已经渲染完毕，才能准确获取高度，然后再更新滚动条
            this.$nextTick(() => {
                this.$refs.swiper && this.$refs.swiper.swiper.update();
            })
        },
        scrollToTop(speed, runCallbacks){
            // 调用swiper实例的的slideTo方法，返回第1个slide（0表示第一个slide，也就是顶部）
            this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
        },
        init(){
            this.pulling = false;//是否正在上拉或下拉的标志位
            this.pullDownText = PULL_DOWN_TEXT_INIT;
            this.pullUpText = PULL_UP_TEXT_INIT;
            this.swiperOption = {
                direction:'vertical',
                slidesPerView:'auto',
                freeMode:true,
                setWrapperSize:true,
                scrollbar:{
                    el:this.scrollbar ? '.swiper-scrollbar' : null,
                    hide:true
                },
                on: {
                    sliderMove: this.scroll,//监听swiper的sliderMove事件，拉动就执行scroll()
                    touchEnd: this.touchEnd,
                    transitionEnd: this.scrollEnd
                }
            }
        },

        scroll(){
            const swiper = this.$refs.swiper.swiper;

            this.$emit('scroll',swiper.translate, this.$refs.swiper.swiper);

            // 打印swiper拉动的距离
            // console.log(swiper.translate);

            // 如果正在拉动，直接return
            if(this.pulling) {
                return;
            }

            if(swiper.translate > 0){//下拉
                if(!this.pullDown){
                    return;
                }
                if(swiper.translate > PULL_DOWN_HEIGHT){
                    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
                }else{
                    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
                }
            }else if(swiper.isEnd){//上拉
                if(!this.pullUp){
                    return;
                }
                const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

                if (isPullUp) {
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
                } else {
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
                }
            }

        },

        scrollEnd(){
            this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper, this.pulling);
        },

        touchEnd(){
            const swiper = this.$refs.swiper.swiper;

            // 如果正在拉动，直接return
            if(this.pulling) {
                return;
            }

            if(swiper.translate > PULL_DOWN_HEIGHT){
                if(!this.pullDown){
                    return;
                }

                this.pulling = true; //修改标志位，正在拉动
                swiper.allowTouchMove = false;// 禁止触摸
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(PULL_DOWN_HEIGHT);
                swiper.params.virtualTranslate = true;// 定住不给回弹
                this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING); 
                this.$emit('pull-down', this.pullDownEnd)//父组件接收pull-down事件，并传一个函数过去，父组件接收后调用执行。
            } else if (swiper.isEnd) { // 底部
                const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
                const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

                if (isPullUp) { // 上拉
                    if (!this.pullUp) {
                        return;
                    }
                    this.pulling = true;
                    swiper.allowTouchMove = false; // 禁止触摸
                    swiper.setTransition(swiper.params.speed);
                    swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
                    swiper.params.virtualTranslate = true; // 定住不给回弹
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
                    this.$emit('pull-up', this.pullUpEnd);
                }
            }

        },
        pullDownEnd(){
            const swiper = this.$refs.swiper.swiper;

            this.pulling = false;//拉动结束后，把标志位修改回来
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
            swiper.params.virtualTranslate = false;// 可以回弹
            swiper.allowTouchMove = true;// 可以触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(0);
            setTimeout(() => {
                this.$emit('pull-down-transition-end');
            }, swiper.params.speed);

        },
        pullUpEnd() {
            const swiper = this.$refs.swiper.swiper;

            this.pulling = false;
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
            swiper.params.virtualTranslate = false;
            swiper.allowTouchMove = true;
      }
    }
}
</script>

<style lang="scss" scoped>
.swiper-container{
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.swiper-slide{
    height: auto;
}
.mine-scroll-pull-up,
.mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
.mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }

.mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>