//每次调用$.get()  或者 $.post() 或者 $.ajax()时 会先调用 ajaxPerfilter 对url进行拼接
//拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007'+options.url
    // 如果请求的地址中含有 /my/ 路由 就添加请求头
    if(options.url.indexOf('/my')!==-1){
        options.headers = {
            //headers 就是请求头配置对象
            Authorization:localStorage.getItem('token') || ''
       }
    }


    //全局统一挂在 complete 回调函数
    options.complete = function(res){
        console.log(res.responseJSON);
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                //清空token值
                localStorage.removeItem('token')
                //跳转回login.html
                location.href = './login.html'
            }
    }
})