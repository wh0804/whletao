$(function(){
	var currentPage=1;
	var pageSize=5;

	function render(){
		$.ajax({
			type:'get',
			url:'/user/queryUser',
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				var html=template("tpl",data);
				$("tbody").html(html);

			// 分页功能
			$("#pagintor").bootstrapPaginator({
				bootstrapMajorVersion:3,
				currentPage:currentPage,
				totalPages:Math.ceil(data.total/pageSize),
				size:"small",//设置控件的大小，mini, small, normal,large
				onPageClicked:function(event, originalEvent, type,page){
   				 //为按钮绑定点击事件 page:当前点击的按钮值
   				 currentPage=page;
   				 render();
   				}
   			})
		}	
	})
	}
	render();

	// 点击启用或者禁用按钮弹出模态框
	//这里的按钮都是动态渲染出来的所以需要注册委托时间
	$("tbody").on("click",".btn",function(){
		$("#userModal").modal("show");
		var id =$(this).parent().data("id");
		var isDelete=$(this).parent().data("isDelete");
		isDelete=isDelete===1?0:1;

		$(".btn_confirm").off().on("click",function(){
 		$.ajax({
 			type:"post",
 			url:"/user/updateUser",
 			data:{
 				id:id,
 				isDelete:isDelete
 			},
 			success:function(data){
 				if (data.success) {
 					$("#userModal").modal("hide");
 					render();
 				}
 			}
 		})
	})

	});
	

})