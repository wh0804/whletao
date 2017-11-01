$(function(){
	var currentPage=1;
	var pageSize=8;
	var array=[];
	function render(){
		$.ajax({
			type:"get",
			url:"/product/queryProductDetailList",
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
		});
	}
	render();

	// 点击添加显示模态框
	$(".btn_add").on("click",function(){
		$("#addModal").modal("show");
		// 渲染二级分类列表
		$.ajax({
			type:"get",
			url:"/category/querySecondCategoryPaging",
			data:{
				page:1,
				pageSize:100
			},
			success:function(data){
				$(".dropdown-menu").html(template("tpl2",data));
			}
		})
	})

	$(".dropdown-menu").on("click","a",function(){
		$(".dropdown-text").text($(this).text());
		$("#brandId").val($(this).data("id"));
		$form.data("bootstrapValidator").updateStatus("brandId","VILID");
	

	});

	$("#fileupload").fileupload({
		dataType:"json",
		done:function(e,data){
			$(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100">');
			array.push(data.result);
			// console.log(data.result);
			if (array.length===3) {
				$form.data("bootstrapValidator").updateStatus("productLogo","VALID");
			}else{
				$form.data("bootstrapValidator").updateStatus("productLogo","INVALID");
			}
		}
	});

	var $form = $("#form");
	$form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
    	valid: 'glyphicon glyphicon-ok',
    	invalid: 'glyphicon glyphicon-remove',
    	validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    	brandId:{
    		validators:{
    			notEmpty:{
    				message:"请选择二级分类"
    			}
    		}
    	},
    	proName:{
    		validators:{
    			notEmpty:{
    				message:"请输入商品名称"
    			}
    		}
    	},
    	proDesc:{
    		validators:{
    			notEmpty:{
    				message:"请输入商品描述"
    			}
    		}
    	},
    	num:{
    		validators:{
    			notEmpty:{
    				message:"请输入商品库存"
    			},
    			regexp:{
            //必须是0以上的数字
            regexp:/^[1-9]\d*$/,
            message:"请输入一个大于0的库存"
        }
    }
},
size:{
	validators:{
		notEmpty:{
			message:"请输入商品尺寸"
		},
		regexp:{
            //33-55
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码（30-50）"
        }
    }
},
oldPrice:{
	validators:{
		notEmpty:{
			message:"请输入商品的原价"
		}
	}
},
price:{
	validators:{
		notEmpty:{
			message:"请输入商品的折扣价"
		}
	}
},
productLogo:{
	validators:{
		notEmpty:{
			message:"请上传三张图片"
		}
	}
}
}
});

$form.on("success.form.bv",function(e){
	e.preventDefault();
	var param=$form.serialize();
	param+="&picName1="+array[0].picName+"&picAddr1="+array[0].picAddr;
	param+="&picName2="+array[0].picName+"&picAddr2="+array[0].picAddr;
	param+="&picName3="+array[0].picName+"&picAddr3="+array[0].picAddr;
	console.log(param);

	$.ajax({
		type:"post",
		url:"/product/addProduct",
		data:param,

		success:function(data){
			
			if (data.success) {

				$("#addModal").modal("hide");
				currentPage=1;
				render();
				$form[0].reset();
				$form.data("bootstrapValidator").resetForm();
				$(".dropdown-text").text("请选择二级分类");
				$(".img_box img").remove();
			}
		}
	})
	})
})