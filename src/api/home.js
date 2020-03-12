import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {SUCCESS_CODE,TIMEOUT,HOME_RECOMMEND_PAGE_SIZE,jsonpOptions} from './config'


// 打乱数组的顺序
const shuffle = (arr) => {
    const arrLength = arr.length;
    let i = arrLength;
    let rndNum;

    while(i--) {
        if(i !== (rndNum = Math.floor(Math.random() * arrLength))){
            // 调换位置，ES6的写法
            [arr[i],arr[rndNum]] = [arr[rndNum],arr[i]];
        }
    }
    return arr;
}

// 获取幻灯片数据--ajax
export const getHomeSlider = () => {
    // axios返回的就是promise对象，可以直接用then
    // 请求数据一般需要用timeout，表示在这个时间内要请求到数据，否则算失败
   return axios.get('http://www.imooc.com/api/home/slider', {
       timeout:TIMEOUT
   }).then((res)=> {
    //    code等于0表示接受成功，返回slider数据。
       if(res.data.code === SUCCESS_CODE){
            let sliders = res.data.slider;
            const slider = [sliders[Math.floor(Math.random() * sliders.length)]]//随机获取一个slider
            sliders = shuffle(sliders.filter(() => Math.random() >= 0.5))//遍历sliders，如果是true就过滤从新放进sliders里面

            // 如果全部被过滤掉，就把随机获取的那个放进去
            if(sliders.length === 0){
                sliders = slider;
            }
           return sliders;
       }

       throw new Error('没有成功获取数据');
   }).catch(err => {
       if(err){
           console.log(err);
       }
       //处理错误，引入错误图片
       return [
           {
               linkUrl:'https://www.imooc.com',
               picUrl:require('assets/img/404.png')
           }
       ]
    //    catch虽然是处理错误的，但是只要里面没有手动抛出错误，就可以继续使用then,这里的then获取的数据就是上面的then返回的数据data
   })
//    .then(data => {
//        return new Promise(resolve => {
//            setTimeout(()=>{
//                resolve(data);
//            },1000);
//        })
//    });
}

// 获取热门推荐商品数据--jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
    const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
    const params = {
        page,
        psize,
        type: 0,
        frontCatId: ''
    };
    return jsonp(url, params, jsonpOptions).then(res => {
        if(res.code == 200){
            return res;
        }
        // 如果获取到数据就不会执行catch，直接跳过catch，没获取到了就执行catch，相当于返回undefined，后面的then就收的就是undefined；
    }).catch(err => {
        if(err){
            console.log(err);
        }
        // return undefined;
     //    catch虽然是处理错误的，但是只要里面没有手动抛出错误，就可以继续使用then,这里的then获取的数据就是上面的then返回的数据data
    })
    // .then(data => {
    //     return new Promise(resolve => {
    //         setTimeout(()=>{
    //             console.log(data);
    //             resolve(data);
    //         },1000);
    //     })
    // });
}