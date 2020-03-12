<template>
    <div class="product-rate">
        <h4 class="total-rate">商品评价<span>({{totalCount}})</span></h4>
        <ul class="keyword">
            <li v-for="(item, index) in keyWords" :key="index">{{item.word}}</li>
        </ul>
        <div class="detail-rate">
            <div class="userinfo" v-if="rateList">
                <img class="headpic" :src="rateList.headPic" alt="" >
                <span class="username">{{rateList.userName}}</span>
            </div>
            <div class="rate-content">
                <span>{{rateList.content}}</span>
                <div class="rate-img">
                    <img v-for="(imgsrc, index) in rateList.images||[]" :key="index" :src="imgsrc" alt="">
                </div>
            </div>
            <div class="rate-time"  v-if="rateList">
                <span>{{rateList.dateTime}}</span>
                <span class="subtitle">{{subtitle}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProductRate',
    props:{
        rateData:{
            type:[Array, Object]
        }
    },
    data(){
        return{
            rates:'',
            keyWords:'',
            rateList:'',
            totalCount:'',
            subtitle:''
        }
    },
    watch:{
        rateData(value){
            // console.log(value);
            this.rates = value.rate || [];
            this.totalCount = this.rates.totalCount || 0;
            this.keyWords = this.rates.keywords || [];
            if(this.rates.rateList){
                this.rateList = this.rates.rateList[0];
            }
            this.subtitle = value.item.title;
        }
    }

}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.product-rate{
    background-color: #fff;
    margin-top: 8px;
    padding: 8px;
    .total-rate{
        font-size: 14px;
    }
    .keyword {
        display: flex;
        flex-wrap: wrap;
        li{
            padding: 5px;
            background-color: #ffeeee;
            margin: 8px 8px 0 0;
            border-radius: 5px;
        }
    }
    .detail-rate{
        margin-top: 13px;
        .userinfo{
            display: flex;
            align-items: center;
            .headpic{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .username{
                color: #777;
            }
        }
        .rate-content{
            margin-top: 8px;
            line-height: 17px;
            color: #000;
            .rate-img{
                margin-top: 8px;
            }
            img{
                width: 70px;
                height: 70px;
                margin: 0 10px 10px 0;
            }
        }
        .rate-time{
            margin-top: 8px;
            color: #aaa;
            display: flex;
            align-items: center;
            .subtitle{
                margin-left: 5px;
                flex: 1;
                @include ellipsis();
            }
        }
    }
}
</style>