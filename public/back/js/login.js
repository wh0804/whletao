$(function(){
	var $form =$("#form");
	$form.bootstrapValidator({
		// [':disabled', ':hidden', ':not(:visible)'], 
		feedbackIcons: { 
			valid: 'glyphicon glyphicon-ok', 
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},

		fields:{
      //配置所有的字段的规则,对应表单中的name属性
      username:{
      	validators:{
      		notEmpty:{
      			message:"用户名不能为空"
      		},
      		callback:{
      			message:"用户名错误"
      		}
      	}
      },
      password:{
      	validators:{
      		notEmpty:{
      			message:"用户密码不能为空"
      		},
      		stringLength:{
      			min:6,
      			max:12,
      			message:"用户密码必须是6-12位"
      		},
      		callback:{
      			message:"用户密码错误"
      		}
      	}
      }
}
});
      var validator = $form.data("bootstrapValidator");
      $form.on("success.form.bv",function(e){
           e.preventDefault();
           $.ajax ({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function(data){
             if(data.success){
              location.href = "index.html";
        }else {

              if(data.error === 1000){
            //使用js代码让username这个字段校验失败。
            //第一个参数：name属性
            //第二个参数：INVALID    VALID
            //第三个参数：
            validator.updateStatus("username", "INVALID", "callback");
      }

      if(data.error === 1001){
            validator.updateStatus("password", "INVALID", "callback");
      }

}
}
})
     })



     $("[type='reset']").on("click",function(){
            $form.data("bootstrapValidator").resetForm();
     })
})