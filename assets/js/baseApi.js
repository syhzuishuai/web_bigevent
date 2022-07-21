//每次调用$.get()  或者 $.post() 或者 $.ajax()时 会先调用 ajaxPerfilter 对url进行拼接
//拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007'+options.url
})