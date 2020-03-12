import jsonp from 'jsonp';

// {
//     page:1,
//     psize:20
// }
// 把这种对象转化为page=1&psize=20

const parseParam = param => {
    let params = [];

    for(const key in param){
        params.push([key, encodeURIComponent(param[key])])
        // 这时变成了[[page,1], [psize,20]]
    }

    return params.map(value => value.join('=')).join('&');
    // map遍历数组，编程[page=1, psize=20],然后再join('&"")j就变成了page=1&psize=20
}

export default (url, data, options) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);

    return new Promise((resolve, reject) => {
        jsonp(url, options, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}