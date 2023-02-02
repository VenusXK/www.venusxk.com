// 初始化变量
let l_btn_arr = document.getElementsByClassName('media-leftbtn');
let r_btn_arr = document.getElementsByClassName('media-rightbtn');
let wide_arr = document.getElementsByClassName('media-wide-container');


let media_r_c = new Array(wide_arr.length);
// 初始化浮动值
for(wide_num = 0; wide_num < wide_arr.length; wide_num++){
    wide_arr[wide_num].style.marginLeft = 0;
    media_r_c[wide_num] = 0;
    media_btn_display(wide_num)
}


// 遍历向左按键
for(let btn_num = 0; btn_num < l_btn_arr.length; btn_num++){
    // 对每个向左按键点击操作封装
    l_btn_arr[btn_num].onclick = function(){
        // 移动操作
        animate({
            duration: 500,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                wide_arr[btn_num].style.marginLeft = parseFloat(wide_arr[btn_num].style.marginLeft)+progress*10+'px';
            }
        });
        media_r_c[btn_num]--;
        media_btn_display(btn_num);
    };
}

// 遍历向右按键
for(let btn_num = 0; btn_num < r_btn_arr.length; btn_num++){
    // 对每个向左按键点击操作封装
    console.log(wide_arr[btn_num].style.marginLeft)
    r_btn_arr[btn_num].onclick = function(){
        // 移动操作
        animate({
            duration: 500,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                wide_arr[btn_num].style.marginLeft = parseFloat(wide_arr[btn_num].style.marginLeft)-progress*10+'px';
            }
        });
        media_r_c[btn_num]++;
        media_btn_display(btn_num);
    };
}

function media_btn_display_execute(btn_num, l_num, r_num){
    if(media_r_c[btn_num] <= l_num){
        l_btn_arr[btn_num].style.display = "none";
    }
    else{
        l_btn_arr[btn_num].style.display = "";
    };
    if(media_r_c[btn_num] >= r_num){
        r_btn_arr[btn_num].style.display = "none"
    }
    else{
        r_btn_arr[btn_num].style.display = ""
    }
}


function media_btn_display(btn_num){
    if(btn_num == 0){
        media_btn_display_execute(btn_num, 0, 4)
    }
    if(btn_num == 1){
        media_btn_display_execute(btn_num, 0, 7)
    }
    if(btn_num == 2){
        media_btn_display_execute(btn_num, 0, 1)
    }
    if(btn_num == 3){
        media_btn_display_execute(btn_num, 0, 1)
    }
    if(btn_num == 4){
        media_btn_display_execute(btn_num, 0, 10)
    }

}



function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}

function animate({duration, draw, timing}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction 从 0 增加到 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // 计算当前动画状态
        let progress = circ(timeFraction);
        draw(1-progress); // 绘制
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}