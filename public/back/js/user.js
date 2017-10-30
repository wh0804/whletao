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

})