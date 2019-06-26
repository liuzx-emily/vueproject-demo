export function render_background(vc) {
    const target = vc.containerEle;
    const data = vc.data;
    const type = data.backgroundType
    if (type == 1) {
        // 无
        target.style.background = 'none';
    } else if (type == 2) {
        // 颜色
        target.style.background = data.backgroundColor;
    } else if (type == 3) {
        // 背景图片
        target.style.backgroundImage = `url(${BASE_PATH+data.backgroundImgUrl})`;
        target.style.backgroundSize = "cover";
        // target.style.backgroundPosition = "center center";
        target.style.backgroundRepeat = "no-repeat";
    }
}
export function render_border(vc) {
    const target = vc.containerEle;
    const data = vc.data;
    target.style.borderRadius = data.borderRadius + "px";
    if (data.borderStyle == 1) {
        // 无
        target.style.border = 'none';
    } else {
        target.style.borderStyle = data.borderStyle;
        target.style.borderColor = data.borderColor;
        target.style.borderWidth = data.borderWidth + "px";
    }
}