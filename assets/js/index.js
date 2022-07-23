$(function(){
    getUserInfo()
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            //点击确定之后跳转到登录页面 然后清空token
            localStorage.removeItem('token')
            location.href = './login.html'

            //关闭 询问框(必要的)
            layer.close(index);
          });
    })
})

//获取用户的基本信息
function getUserInfo(){
    
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !==0 ){
                return layer.msg('获取用户信息失败')
            }
            //调用渲染头像函数(传入用户的信息)
            console.log(res.data);
            renderAvatar(res.data)
        },
        //无论成功还是失败 都会执行complete函数
        //避免直接跳入index.html  需要token值才可以进入index页面
        // complete:function(res){
        //     console.log(res.responseJSON);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         //清空token值
        //         localStorage.removeItem('token')
        //         //跳转回login.html
        //         location.href = './login.html'
        //     }
        // }
    })
}

function  renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp &nbsp'+name)
    if(!user.user_pic){//如果用户没有设置头像则隐藏img标签 
        $('.layui-nav-img').hide()
        // 并且将用户名称的第一个字母渲染成头像
        $('.text-avatar').text(user.username[0].toUpperCase())
        return
    }
    //如果用户设置了头像则显示设置的头像
    $('.text-avatar').hide()
    $('.layui-nav-img').attr('src',user.user_pic).show()
}