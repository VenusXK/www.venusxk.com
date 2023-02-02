// 初始化变量
let left_btn_arr = document.getElementsByClassName('r-btn');
let right_btn_arr = document.getElementsByClassName('l-btn');
let detail_wide_container_arr = document.getElementsByClassName('detail-wide-container');


let detail_right_count = new Array(detail_wide_container_arr.length);
// 初始化浮动值
for(container_num = 0; container_num < detail_wide_container_arr.length; container_num++){
    detail_wide_container_arr[container_num].style.marginLeft = 0;
    detail_right_count[container_num] = 0;
    detail_btn_display(container_num)
}


// 遍历向左按键
for(let btn_num = 0; btn_num < left_btn_arr.length; btn_num++){
    // 对每个向左按键点击操作封装
    left_btn_arr[btn_num].onclick = function(){
        // 桌面端
        // 移动过量回复
        if(parseFloat(detail_wide_container_arr[btn_num].style.marginLeft) > document.body.clientWidth){
            detail_wide_container_arr[btn_num].style.marginLeft = -1.2 * document.body.clientWidth;
        }
        // 移动操作
        animate({
            duration: 500,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                detail_wide_container_arr[btn_num].style.marginLeft = parseFloat(detail_wide_container_arr[btn_num].style.marginLeft)+progress*10+'px';
            }
        });
        detail_right_count[btn_num]--;
        detail_btn_display(btn_num);
    };
}

// 遍历向右按键
for(let btn_num = 0; btn_num < right_btn_arr.length; btn_num++){
    // 对每个向左按键点击操作封装
    console.log(detail_wide_container_arr[btn_num].style.marginLeft)
    right_btn_arr[btn_num].onclick = function(){
        // 桌面端
        // 移动过量回复
        if(parseFloat(detail_wide_container_arr[btn_num].style.marginLeft)<-1 * document.body.clientWidth){
            detail_wide_container_arr[btn_num].style.marginLeft = document.body.clientWidth;
        }
        // 移动操作
        animate({
            duration: 500,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                detail_wide_container_arr[btn_num].style.marginLeft = parseFloat(detail_wide_container_arr[btn_num].style.marginLeft)-progress*10+'px';
            }
        });
        detail_right_count[btn_num]++;
        detail_btn_display(btn_num);
    };
}

function detail_btn_display(btn_num){
    if(btn_num == 2){
        left_btn_arr[btn_num].style.display = "none";
        right_btn_arr[btn_num].style.display = "none";
    }
    else{
        if(detail_right_count[btn_num] <= 0){
            left_btn_arr[btn_num].style.display = "none";
        }
        else{
            left_btn_arr[btn_num].style.display = "";
        };
        if(detail_right_count[btn_num] >= 1){
            right_btn_arr[btn_num].style.display = "none"
        }
        else{
            right_btn_arr[btn_num].style.display = ""
        }
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