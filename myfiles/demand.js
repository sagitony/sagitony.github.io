function browserType(){
    if(jq.browser.msie&&(jq.browser.version == "7.0")){
       jq('.form_bottom').find('.box').addClass('ie7');
    }
}
function guide_tab(){
    var liObj = jq('.guide ul li');
    liObj.mouseover(function(){
        if(jq(this).find('.tab_02').length <= 0){
            return false;
        }
        else{
            jq(this).find('.tab_01').hide();
            jq(this).find('.tab_02').show();
        }
    }).mouseout(function(){
        jq(this).find('.tab_01').show();
        jq(this).find('.tab_02').hide();
        });
}

function select_new(){
    var value = jq('.select_new .value label');
    var obj = jq('.select_new');
    var ulObj = jq('.select_new ul');
    var liObj = jq('.select_new ul li');

    obj.mouseover(function(){
        jq(this).find('ul').show();
        jq(this).addClass('select_hover');
    }).mouseout(function(){
        jq(this).find('ul').hide();
            jq(this).removeClass('select_hover');
        });
    liObj.click(function(){
        liObj.parent('ul').hide();
    });
}
//悬浮的表单
function fixBottom(){

    var dHeight =  jq(document).height();
    var objH = jq('.form_bottom_wrap').height();
    jq(window).bind("scroll resize",function(){
        jq('.form_bottom_wrap').show();
        var scrollHeight = jq(document).scrollTop();
        var windowHeight = jq(window).height();
        var cH = dHeight - windowHeight - objH ;
        jq('.form_bottom_wrap').css('top',( windowHeight - objH) + 'px');
        if(scrollHeight < 705){
            jq('.form_bottom_wrap').hide();
        }
        if (scrollHeight > cH){
            jq('.form_bottom_wrap').css('top',(windowHeight - objH - 170) + 'px');
        }
    });
}

//弹窗自适应居中
function popup_center(popupObj){

    var windowsWidth = jq(window).width();
    var windowsHeight = jq(window).height();
    var popupWidth = popupObj.width();
    var popupHeight = popupObj.outerHeight();
    var vLeft = (windowsWidth - popupWidth)/2;
    var vTop = (windowsHeight - popupHeight)/2;
    popupObj.css({"left":vLeft,"top":vTop});
}
function showPopup(){
    var liWidth = jq('.img_list ul li').width();
    var num = 0;
    jq('.tab_02').click(function(){
        jq('.popupMask').show();
        jq('.popupContent').show();
        popup_center(jq('.popupContent'));
        num = jq(this).parent('li').index()-1;
        jq('.img_list ul').css('left',-(liWidth * num)+'px');
    });
    jq('.popupContent .prev').click(function(){
        if(num > 0){
            jq(".img_list ul").css({
                left: -(liWidth * (num-1))+'px'
            });
            num --;
        }
    });
    jq('.popupContent .next').click(function(){
        if(num < 2){
            jq(".img_list ul").css({
                left: -(liWidth * (num+1))+'px'
            });
            num ++;
        }
    });
   jq(window).resize(function(){
       popup_center(jq('.popupContent'));
   });
   jq('.img_list .btn_close').click(function(){
       jq('.popupMask').hide();
       jq('.popupContent').hide();
   });
}

function addYzList(){
    jQuery('.assign_add .btn_submit').click(function(){
        var value = jQuery('.assign_add .user_txt').val();
        if(value == ''){
            showPopUp(0);
        }
    });
}


function scrollTopFn(num,selc) {
    var curNum = jq(selc).length;
    if(curNum > num) {
        var SD=24,
            myScroll,
            tardiv = document.getElementById('scroll_content_01'),
            tardiv1 = document.getElementById('list_01'),
            tardiv2 = document.getElementById('list_clone_01');

        tardiv2.innerHTML=tardiv1.innerHTML;
        function Marquee2(){
            if(tardiv2.offsetTop-tardiv.scrollTop<=0){
                tardiv.scrollTop-=tardiv1.offsetHeight;
            }
            else{
                tardiv.scrollTop++;
            }
        }
        myScroll = window.setInterval(Marquee2,24);
//        tardiv.onmouseover=function() {clearInterval(myScroll)};
//        tardiv.onmouseout=function() {myScroll=setInterval(Marquee2,SD)};
    }
}
function scrollTopFn2(num,selc) {
    var curNum = jq(selc).length;
    if(curNum > num) {
        var SD=24,
            myScroll,
            tardiv = document.getElementById('scroll_content_02'),
            tardiv1 = document.getElementById('list_02'),
            tardiv2 = document.getElementById('list_clone_02');

        tardiv2.innerHTML=tardiv1.innerHTML;
        function Marquee2(){
            if(tardiv2.offsetTop-tardiv.scrollTop<=0){
                tardiv.scrollTop-=tardiv1.offsetHeight;
            }
            else{
                tardiv.scrollTop++;
            }
        }
        myScroll = window.setInterval(Marquee2,24);
//        tardiv.onmouseover=function() {clearInterval(myScroll)};
//        tardiv.onmouseout=function() {myScroll=setInterval(Marquee2,SD)};
    }
}
scrollTopFn(10,"#scroll_content_01 > ul.detail > li");
scrollTopFn2(10,"#scroll_content_02 > ul.detail > li");

jQuery.post('/zb/index.php',{getDom:'1'},function(data){
    jQuery('#userMobileDom').html(data.on);
    jQuery('#userMobileDom2').html(data.tw);
    try {
        mobileObj = formObj.find("input[name='phone']");//手机号码
        mobileObj2 = formObj2.find("input[name='phone']");
        labelValueObj = jq(".default_value");
        labelValueObj.click(function(){
            jq(this).next('input').focus();
        });
        jq('form').find("input[name='phone']").focus(function(){
            jq(this).parents('.input_form').find('.msg').hide();
            jq(this).css("border","1px #00b34b solid");
        }).keyup(function(){
            var inputValue = jq(this).val();
                //jq(this).prev('.default_value').hide();
                if(inputValue !== '' ){
                    jq(this).prev('.default_value').hide();
                }
            }).blur(function(){
            var value = jq(this).val();
            if(value !== ""){
                jq(this).prevAll("label.default_value").hide();
            }
            else{
                jq(this).prevAll("label.default_value").show();
            }
            jq(this).css("border","1px #ccc solid");    //失去焦点变为默认的灰色
        });

    } catch (e) {}
    
},"json");





