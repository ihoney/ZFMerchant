
//input focus所有input焦点效果
$(function(){
	$("input").focus(function(){
		$(this).addClass("focus");
	})
	$("input").blur(function(){
		$(this).removeClass("focus");
	})
	
})

//input默认值
function focusBlur(e){
	$(e).focus(function(){
		var thisVal = $(this).val();
		if(thisVal == this.defaultValue){
			$(this).val('');
		}	
	})	
	$(e).blur(function(){
		var thisVal = $(this).val();
		if(thisVal == ''){
			$(this).val(this.defaultValue);
		}	
	})	
}

$(function(){
	focusBlur('.search input');//search input默认值
	focusBlur('.sp_search input');//search input默认值
	focusBlur('.addAddr_box input[type=text]');//添加地址 input默认值
	focusBlur('.modification input[type=text]');//修改手机号
})

//topinfo 地址
$(function(){
	$(".address").hover(
		function(){
			$(this).find(".addr_h").addClass("addr_h_hover");
			$(this).find(".addr_b").css("display","block");
		},
		function(){
			$(".addr_btn").click(function(){
				$(this).parents(".address").find(".addr_h").removeClass("addr_h_hover");
				$(this).parents(".address").find(".addr_b").css("display","none");
			});
			$(document).bind('click', function(e) {
				var $clicked = $(e.target);
				if (! $clicked.parents().hasClass("address"))
				$(".address").find(".addr_b").css("display","none");
				$(".address").find(".addr_h").removeClass("addr_h_hover");
			});
		}
	)
})

//购物车
$(function(){
	$(".shoppingCart").hover(
		function(){
			$(this).find(".sCart_h").addClass("sCart_h_hover");
			$(this).find(".sCart_b").css("display","block");
		},
		function(){
			$(this).find(".sCart_h").removeClass("sCart_h_hover");
			$(this).find(".sCart_b").css("display","none");
		}
	)
})

//首页hotPOS机，处理图片大小
$(function(){	
	proImg(".pro_img_a img");
	proImg(".td_proBox a.cn_img img");
	proImg(".hotPro_img img");
})
function proImg(e){
	$(e).each(function(i){
        var img = $(this);
        var realWidth;//真实的宽度
        var realHeight;//真实的高度
  		var temporaryImg = $("<img/>").attr("src", $(img).attr("src"));
   		 temporaryImg.load(function() {
                realWidth = this.width;
                realHeight = this.height;
                if(realWidth>=150){
                       $(img).css("width","150").css("height","auto");
                    }
                    else{
                      $(img).css("height","140").css("width","auto");
                    }
            })
    });
}


//商品分类 category_item_con
$(function(){
	var a=1;
	$(".category_item a.more").click(function(){
		if(a==1){
			$(this).parent(".category_item").addClass("category_item_maxHeight");
			$(this).addClass("up").html("收起<i></i>");
			a=0;
		}else if(a==0){
			$(this).parent(".category_item").removeClass("category_item_maxHeight");
			$(this).removeClass("up").html("更多<i></i>");
			a =1;
		}
		
	});
	
})




//.sortbar 商品排序
$(function(){
	$(".sortbar li").hover(
		function(){
			$(this).find(".droplist").css("display","block");
		},
		function(){
			$(this).find(".droplist").css("display","none");
		}
	)
	
	var text1 = $(".on_1").find("span").html();

	$(".sortbar li.default_sort").click(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".on_1").find("span").html(text1);
		return false;
	})
	

	$(".droplist a").click(function(){
		
		$(this).parents(".sortbar li").addClass("hover").siblings().removeClass("hover");
		if($(this).parents(".sortbar li").hasClass("hover")){
			$(this).parents(".sortbar li").find("span").html($(this).html());
		}else{
			$(this).parents(".sortbar li").find("span").html(text1);
		}
		
	});	
})



//商品详细支付通道  购买/租赁
$(function(){
	$(".selected_li a").click(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		if($(this).hasClass("lease_a")){
			$(".price_li").css("display","none");
			$(".deposit_li").css("display","block");
			
			$("a.buy_btn").css("display","none");
			$("a.shoppingCart_btn").css("display","none");
			$("a.lease_btn").css("display","inline-block");
			
		}
		if($(this).hasClass("buy_a")){
			$(".deposit_li").css("display","none");
			$(".price_li").css("display","block");
			
			$("a.buy_btn").css("display","inline-block");
			$("a.shoppingCart_btn").css("display","inline-block");
			$("a.lease_btn").css("display","none");
		}
	});
})

// pro_detail 商品详细信息
$(function(){
	$(".pro_detail_con > div").not(":first").hide();
	$(".pro_detail_title li").unbind("click").bind("click", function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		var index = $(".pro_detail_title li").index( $(this) );
		$(".pro_detail_con > div").eq(index).siblings(".pro_detail_con > div").hide().end().fadeIn(300);
   });
});




//订单需要发票
$(function(){
	 //alert($(".invoice_checkbox input").prop("checked"));
	 if($(".invoice_checkbox input").prop("checked")==true){
			$(".invoice").css("display","block");
		}else if($(this).prop("checked")!=true) {
			$(".invoice").css("display","none");
	 }
	$(".invoice_checkbox input").bind("click", function(){
		if($(".invoice_checkbox input").prop("checked")==true){
			$(".invoice").css("display","block");
			$(".invoice_area").removeAttr("disabled");
		}else if($(this).prop("checked")!=true) {
			$(".invoice").css("display","none");
			$(".invoice_area").attr("disabled","disabled");
		}
		
     });
	 
	 $(".invoice a").click(function(){
		$(this).addClass("hover").siblings().removeClass("hover");	 
	 });
	 
})




//selectBox div模拟select
$(function(){
	$(".tag_select").click(function() {
		$(this).parent(".selectBox").find("ul").toggle();
	});
	$(".selectBox ul li").click(function() {
		var text = $(this).html();
		var $val = $(this).find("input").val();
		$(this).parents(".selectBox").find(".tag_select span").html(text);
		$(this).parents(".selectBox").find("input.tag_input").val($val);
		
		$(this).parents(".selectBox").find("ul").hide();
	});
	
	$(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("selectBox"))
		$(".selectBox ul").hide();
		
	});
})

//弹出层
function popup(t,b){
	var doc_height = $(document).height();
	var doc_width = $(document).width();
	var win_height = $(window).height();
	var win_width = $(window).width();
	
	var layer_height = $(t).height();
	var layer_width = $(t).width();
	
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	
	//tab
	$(b).bind('click',function(){
		
		    $(".mask").css({display:'block',height:doc_height});
			$(t).css('top',(win_height-layer_height)/2);
			$(t).css('left',(win_width-layer_width)/2);
			$(t).css('display','block');
			return false;
		}
	)
	$(".close").click(function(){
		$(t).css('display','none');
		$(".mask").css('display','none');
	})
}
$(function(){
	popup(".buyIntention_tab",".buyIntention_a");//首页购买意向
	popup(".payTab",".goPay");//其它筛选条件
	popup(".starGrade_tab",".starGrade_a");//评分
	popup(".otherTerminal_tab",".addOtherTerminal_a");//添加其他终端
	popup(".leaseExplain_tab",".leaseExplain_a");//租赁说明
	popup(".creditsExchange_tab",".ce_a");//兑换积分
	popup(".logistics_tab",".logistics_a");//提交物流信息
	popup(".seeNumber_tab",".seeNumber_a");//查看终端号
	popup(".posPassword_tab",".posPassword_a");//找回POS机密码
	popup("#qwert","#qwert_btn");//查询进度
	popup(".notice_tab",".no_con ul li");//首页公告
})


/*--------------------------------------------------------------------------------------*/

//鼠标经过小图提示大图
function infoTab(i_tab,i_box){
	$(i_tab).hover(
		function(e){
			$(i_box).css('display','block');
			$(i_box).css({'top':($(this).offset().top)-$(this).height()+'px', 
			              'left':($(this).offset().left)+$(this).width()+'px'
						});
			//alert($(this).find("img").height()/2)
		},
		function(e){
			$(i_box).css('display','none');
			$(i_box).css({'top':0+'px', 'left':0+'px'});
		}
	);
}

$(document).ready(function(){
		infoTab('.cover','.img_info');//首页设置弹出框
})


//交易流水 dealNav菜单
$(function(){
	var page = 1;
	var i = 7;	
	var len = $("ul.li_show").find('li').length;
	if(len <= i){
		$('a.dn_next').css("display","none");
		$('a.dn_prev').css("display","none");
	}
	$('a.dn_next').click(function(){
		//alert(0)
		var $parent = $(this).parents('div.dealNav');
		var $pic_show = $parent.find('.li_show')
		var $smallImg = $parent.find('.dealNavBox');
		var small_width = $smallImg.width();
		
		var page_count = Math.ceil(len/i);
		
		if(!$pic_show.is(':animated')){
			
			if(page == page_count){
				$pic_show.animate({left:'0px'},'slow');
				page = 1;
			}else{
				$pic_show.animate({left:'-='+small_width},'slow');
				page++;	
			}
		}
	})
	
	
	$('a.dn_prev').click(function(){
		//alert(0)
		var $parent = $(this).parents('div.dealNav');
		var $pic_show = $parent.find('.li_show')
		var $smallImg = $parent.find('.dealNavBox');
		var small_width = $smallImg.width();
		var page_count = Math.ceil(len/i);
		
		if(!$pic_show.is(':animated')){
			
			if(page == 1){
				$pic_show.animate({left:'-='+small_width*(page_count-1)},'slow');
				page = page_count;
			}else{
				$pic_show.animate({left:'+='+small_width},'slow');
				page--;	
			}
		}
	})
	
})