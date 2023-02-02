let right_count = 0;

let fastlook_left_btn = document.getElementById('fastlook-leftbtn');
let fastlook_right_btn = document.getElementById('fastlook-rightbtn');
let fastlook_wide_container = document.getElementById('fastlook-wide-container');

fastlook_wide_container.style.marginLeft = 0;

fastlook_left_btn.style.display = "none";



// 遍历向左按键
// 对每个向左按键点击操作封装
fastlook_left_btn.onclick = function(){
    // 桌面端
    // 移动过量回复
    if(parseFloat(fastlook_wide_container.style.marginLeft) > document.body.clientWidth){
        fastlook_wide_container.style.marginLeft = -1.2 * document.body.clientWidth;
    }
    // 移动操作
    animate({
        duration: 500,
        timing: function(timeFraction) {
            return timeFraction;
        },
        draw: function(progress) {
            fastlook_wide_container.style.marginLeft = parseFloat(fastlook_wide_container.style.marginLeft)+progress*10+'px';
        }
    });
    right_count--;
    fastlook_btn_display();
};

// 遍历向右按键
// 对每个向左按键点击操作封装
console.log(fastlook_wide_container.style.marginLeft)
fastlook_right_btn.onclick = function(){
    // 桌面端
    // 移动过量回复
    if(parseFloat(fastlook_wide_container.style.marginLeft)<-1 * document.body.clientWidth){
        fastlook_wide_container.style.marginLeft = document.body.clientWidth;
    }
    // 移动操作
    animate({
        duration: 500,
        timing: function(timeFraction) {
            return timeFraction;
        },
        draw: function(progress) {
            fastlook_wide_container.style.marginLeft = parseFloat(fastlook_wide_container.style.marginLeft)-progress*10+'px';
        }
    });
    right_count++;
    fastlook_btn_display();
};

function fastlook_btn_display(){
    if(right_count <= 0){
        fastlook_left_btn.style.display = "none";
    }
    else{
        fastlook_left_btn.style.display = "";
    };
    if(right_count >= 1){
        fastlook_right_btn.style.display = "none"
    }
    else{
        fastlook_right_btn.style.display = ""
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