import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';
//axios.defaults.baseURL = 'http://172.16.10.121:8343';

//import qs from 'qs';// 将url中的参数转为对象、将对象转为url参数形式


let http = axios.create({
    withCredentials: true,
    timeout: 5000,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        "Access-Control-Allow-Origin":"*"
    },
    transformRequest:[function(data){
        let newData = '';
        for (let k in data) {
            if(data.hasOwnProperty(k) === true){
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
            }
        }
        return newData;
    }]
});
function apiAxios(method,url,params,response){
    http({
        method:method,
        url:url,
        data:method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function(res){
        response(res);
    }).catch(function(err){
        response(err);
    });
}
export default{
    get: function(url,params,response){
        return apiAxios('GET',url,params,response);
    },
    post: function(url,params,response){
        return apiAxios('POST',url,params,response);
    },
    put: function(url,params,response){
        return apiAxios('PUT',url,params,response);
    },
    delete: function(url,params,response){
        return apiAxios('DELETE',url,params,response);
    }
};
