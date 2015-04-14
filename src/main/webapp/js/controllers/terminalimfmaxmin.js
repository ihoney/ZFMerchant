
/*--------------------------------------------------------------------------------------*/


//鼠标经过小图提示大图
	$(document).ready(function(){
		infoTab('.cover','.img_info'); 
})
//鼠标经过小图提示大图
function infoTab(i_tab,i_box){
	$(i_tab).hover(
		function(e){
          $(i_box).children("img").attr("src", $(this).attr("data-src"));

			$(i_box).css('display','block');
			$(i_box).css('top',$(this).offset().top - $(i_box).height() +'px');
			
			if($(this).offset().left+$(i_box).width() > $(document).width()){
				$(i_box).css( 'left',($(this).offset().left)-$(i_box).width()+'px');
			}else {
				$(i_box).css('left',($(this).offset().left)+$(this).width()+'px');
			}
		},
		function(e){
			$(i_box).children("img").attr("src", "");
			$(i_box).css('display','none');
			$(i_box).css({'top':0+'px', 'left':0+'px'});
		}
	);
}

