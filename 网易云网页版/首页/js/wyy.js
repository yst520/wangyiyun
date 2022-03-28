window.onload=function(){
    /* 获取元素 */

        var main = document.getElementById('main');
        var bg = document.querySelector('.bg');
        var image = document.querySelector('.image');
        var select = document.querySelector('.select');
        var dian = document.getElementsByClassName('dian');
        var left = document.querySelector('.left');
        var right = document.querySelector('.right');

        /* 设置数组，里面放图片的地址 */

        var picture = ['./img/lb1.jpg', './img/lb2.jpg', 
        './img/lb3.jpg', './img/lb4.jpg',
        './img/lb5.jpg', './img/lb6.jpg',
        './img/lb7.jpg', './img/lb8.jpg',
        './img/lb9.jpg', './img/lb10.jpg',];

        /* 设置index为0，这个变量后面就一直用来充当图片数组的下标 */
        var index = 0;

        /* 从图片数组的长度，动态添加小圆点 */

        for (let i = 0; i < picture.length; i++) {
            let dot = document.createElement('div');
            dot.classList.add('dian');
            select.appendChild(dot);
            /* 添加自定义属性index，对应每张图片的下标 */
            dot.bianhao = i;
        }

        /* 排他思想，清除所有小圆点check样式，后面要引用这个封装函数 */

        function qingchu() {
            for (let i = 0; i < dian.length; i++) {
                dian[i].classList.remove('check');

            }
        }


        /* 切下一张图的封装函数，后面也是要引用 */

        function yunxing() {
               /* index加1 */
            index = index + 1;
            if (index == picture.length) {
                index = 0;
            }
             /* 显示图片，显示图片数组下标为目前index那张 */
            image.src = picture[index];
             /* 虚化背景也要换 */
            bg.style.cssText = ` background-image: url(${picture[index]});`

            /* 小圆点的显示 */
            qingchu();
              /* 显示那张图就显示对于的圆点，给他.check的样式 */
            dian[index].classList.add('check');

            /* 若index超过，回到-1 */
            if (index == picture.length - 1) {
                index = -1;
            }

        }



        /* 点击向右按钮时的操作 */

        right.addEventListener('click', function () {
            /* 直接用上面的切图封装函数 */
            yunxing();
        })

        /* 点击向左按钮时的操作，跟上面的切下张图封装函数异曲同工 */

        left.addEventListener('click', function () {

            index = index - 1;
            if (index == -1) {
                index = picture.length - 1;
            }
            image.src = picture[index];
            bg.style.cssText = ` background-image: url(${picture[index]});`

            /* 向左时小圆点的显示 */
            qingchu();
            dian[index].classList.add('check');

        })


        /* 进入main这个底层盒子时，停止自动轮播和.yun类的动画效果，自动轮播的定时器我写在最后面 */

        main.addEventListener('mouseover', function () {

            clearInterval(lunbo);

            image.classList.remove('yun');

        })

        /*  离开main这个底层盒子时，开始自动轮播和.yun类的动画效果，自动轮播的定时器我写在最后面 */

        main.addEventListener('mouseout', function () {

            lunbo = setInterval(yunxing, 2000);

            image.classList.add('yun');
            image.style.animationDelay = '2s';
        })


        /*  点击小圆点时的切图操作 */
        for (let i = 0; i < picture.length; i++) {
            dian[i].addEventListener('click', function () {
                qingchu();
                this.classList.add('check');
                index = i;
                image.src = picture[index];
            bg.style.cssText = ` background-image: url(${picture[index]});`

            })
        }

        /* 自动轮播定时器与初始状态 */

        lunbo = setInterval(yunxing, 2000);
        image.classList.add('yun');
        dian[0].classList.add('check');

}