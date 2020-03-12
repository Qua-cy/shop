import jsonp from 'assets/js/jsonp';
import {jsonpOptions} from './config'

export const getProductDetail = id => {
    const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
        api: 'mtop.taobao.detail.getdetail',
        ttid: '2017@taobao_h5_6.6.0',
        data: `{"itemNumId":"${id}"}`,
        appkey: 12574478,
        dataType: 'jsonp',
        type: 'jsonp',
        v:'6.0'
    }

    return jsonp(url, params, jsonpOptions).then(res => {
        if(res){
            return res;
        }
    }).catch(err => {
        if(err){
            console.log(err);
        }
    })

}