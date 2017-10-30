// NProgress.start();
// NProgress.end();

// 校验用户是否登录的功能
if(location.href.indexOf("login.html")<0){
	$.ajax({
	type:"get",
	url:"/employee/checkRootLogin",
	success:function(data){
		 if (data.error===400) {
		 	location.href="login.html";
		 }
	}
});
}


$(document).ajaxStart(function(){
	// 让进度条显示出来

	NProgress.start();
})
$(document).ajaxStop(function(){
	// 让进度条结束
	setTimeout(function(){
		NProgress.done();
	},500);
});


// 点击分类管理。显示或者隐藏二级分类
$(".child").prev().on("click",function(){
	$(this).next().slideToggle();
})
// 点击icon——menu，隐藏或者显示侧边栏
$(".icon_menu").on("click",function(){
	$(".lt_aside").toggleClass("now");
	$(".lt_main").toggleClass("now");
})

// 公用的推出功能
$(".icon_logout").on("click",function(){
	$("#logoutModal").modal("show");
});


$(".btn_logout").on("click",function(){
	// 发送ajax请求，告诉服务器我要推出了，服务器会清session空你的

	$.ajax({
		type:'get',
		url:'/employee/employeeLogout',
		success:function(data){
			if (data.success) {
				window.location.href="login.html";
			}
		}
	})
})


