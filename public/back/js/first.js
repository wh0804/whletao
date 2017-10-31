$(function(){
	var currentPage=1;
	var pageSize=5;

	function render(){
		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				$("tbody").html(template("tpl",data));

				$("#pagintor").bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:currentPage,
					totalPages:Math.ceil(data.total/pageSize),
					size:"small",
					onPageClicked(a,b,c,page){
						currentPage=page;
						render();
					}
				})
			}
		})
	}
	render();


	// 添加分类模态框
	$(".btn_add").on("click",function(){
		$("#addModal").modal("show");
	});


	// 给表单校验
	var $form=$("#form");
	$form.bootstrapValidator({
		feedbackIcons: { 
			valid: 'glyphicon glyphicon-ok', 
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields:{

      //name属性
      categoryName:{
      	validators:{
      		notEmpty:{
      			message:"一级分类名称不能为空"
      		}
      	}
      }

  }
	})

	// 校验成功发ajax请求
	$form.on("success.form.bv",function(e){
		e.preventDefault();
		$.ajax({
			type:'post',
			url:"/category/addTopCategory",
			data:$form.serialize(),
			success:function(data){
				if (data.success) {
					$("#addModal").modal("hide");
					
					currentPage=1;
					render();

					// 3.重置表单
					$form.data("bootstrapValidator").resetForm();
					// 表单有一个reset方法，会把表单中所有的值都清空,js对象的方法
					$form[0].reset();
				}
			}
		})
	})
})