(function(doc, win) {
    var docEl = doc.documentElement,
        /*orientationchange方向变化事件，resize窗口大小改变事件
        判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。*/
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);
