//登录
// 切换
$(function(){
	$(".lr_b > div").not(":first").hide();
	$(".lr_h li").unbind("click").bind("click", function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		var index = $(".lr_h li").index( $(this) );
		$(".lr_b > div").eq(index).siblings(".lr_b > div").hide().end().fadeIn(300);
   });
});

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
	focusBlur('.login_area input');//登录
})