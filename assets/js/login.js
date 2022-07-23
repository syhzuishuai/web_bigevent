$(function(){
    //点击切换登录和显示
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    let form = layui.form
    //通过form.verify()函数 来自定义函数规则
    form.verify({
        //自定义了pwd的校验规则 校验密码
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //校验密码是否一直的规则  
        repwd:function(value){ 
            //value值为添加元素中的表单内容
            //通过形参确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行相等判断
            //如果判断失败就return 错误提示消息 
            let pwd = $('.reg-box [name=password]').val()
            if(pwd!== value){
                return '两次密码不一致'
            }
        }
    })

    function changeFormShow(){
        $('.reg-box [name=username]').val('')
        $('.reg-box [name=password]').val('')
        $('.reg-box [name=repassword]').val('')
        $('#link_login').trigger('click')
    }

    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        let username = $('.reg-box [name=username]').val()
        let password = $('.reg-box [name=password]').val()
        $.post('/api/reguser',{username,password},function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            console.log(res.message);//注册成功 清空内容 切换到登录
            changeFormShow()
            layer.msg(res.message)

        })
    })

    $('#form_login').on('submit',function(e){
        e.preventDefault()
        let username = $('.login-box [name=username]').val()
        let password = $('.login-box [name=password]').val()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:{username,password},
            success:function(res){
                if(res.status !== 0){
                    console.log(res.message);
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                //将获取到的token值存入本地缓存中
                localStorage.setItem('token',res.token)
                //跳转页面
                location.href = '/index.html'
            }
        })
    })
})