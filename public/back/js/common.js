// NProgress.start();
// NProgress.end();

$(document).ajaxStart(function(){
	// 让进度条显示出来

	NProgress.start();
})
$(document).ajaxStop(function(){
	// 让进度条结束
	setTimeout(function(){
		NProgress.done();
	},500);
})
