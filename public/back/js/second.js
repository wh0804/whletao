$(function(){
	var currentPage=1;
	var pageSize=5;
	function render(){
		$.ajax({
			type:"get",
			url:"/category/querySecondCategoryPaging",
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				// console.log(data);
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

	$(".btn_add").on("click",function(){
		$("#addModal").modal("show");

		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			data:{
				page:1,
				pageSize:100
			},
			success:function(data){
				  $(".dropdown-menu").html(template("tpl2",data));
			}

		})
	});

	$(".dropdown-menu").on("click","a",function(){
		$(".dropdown-text").html($(this).text());

		// 修改隐藏域的val值
		$("#categoryId").val($(this).data("id")); 

		// 让categoryId的校验通过
		$form.data("bootstrapValidator").updateStatus("categoryId","VALID");
	})



	// 初始化文件上传
	$("#fileupload").fileupload({
		dataType:"json",
		done:function(e,data){
			// 获取文件上传结果
			// console.log(data);
			$(".img_box img").attr("src",data.result.picAddr);

			$("#brandLogo").val(data.result.picAddr);

			$form.data("bootstrapValidator").updateStatus("brandLogo","VALID");
		}
	});



	// 表单校验
	var $form =$("#form");
	$form.bootstrapValidator({
		// 默认不校验的配置
		excluded:[],
		feedbackIcons: { 
			valid: 'glyphicon glyphicon-ok', 
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields:{

      //name属性
      categoryId:{
      	validators:{
      		notEmpty:{
      			message:"请选择一级分类"
      		}
      	}
      },
      brandName:{
      	validators:{
      		notEmpty:{
      			message:"请输入二级分类名称"
      		}
      	}
      },
      brandLogo:{
      	validators:{
      		notEmpty:{
      			message:"请上传图片"
      		}
      	}
      }
  }
});
	$form.on("success.form.bv",function(e){
		e.preventDefault();

		// 发送请求，把二级请求存起来
		$.ajax({
			type:"post",
			url:"/category/addSecondCategory",
			data:$form.serialize(),
			success:function(data){
				if (data.success) {
					$("#addModal").modal("hide");
					currentPage=1;
					render();
					// console.log($form);
					$form[0].reset();
					$form.data("bootstrapValidator").resetForm();
					$(".dropdown-text").text("请选择一级分类");
					$(".img_box img").attr("src","images/none.png")
				}
			}
		})
	})
})