const animJumpTextSvg = (el) => {
  let height = window.getComputedStyle(el, null).height;
  let kHeight = 70;
  el.style.height = `${parseInt(height, 10) + kHeight}px`;
  el.style.position = `relative`;
  el.style.bottom = `${kHeight / 2}px`;
  const children = el.children;
  let del = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeName !== `path`) {
      continue;
    }

    let animation = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);
    animation.setAttributeNS(null, `begin`, `indefinite`);
    animation.setAttributeNS(null, `attributeName`, `transform`);
    animation.setAttributeNS(null, `values`, `-2 -50; -2 0;  -2 -10; -2 0;  -2 -5; -2 0`
    );
    animation.setAttributeNS(null, `dur`, `1s`);
    animation.setAttributeNS(null, `fill`, `freeze`);

    children[i].appendChild(animation);
    setTimeout(() => {
      animation.beginElement();
    }, del);
    del += 50;
  }
};

const animTextSvg = (el) => {
  const children = el.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeName !== `path`) {
      continue;
    }
    const pathLength = Math.ceil(children[i].getTotalLength());
    children[i].setAttributeNS(null, `stroke-dasharray`, `0 ${pathLength}`);

    let animation = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`
    );
    animation.setAttributeNS(null, `begin`, `indefinite`);
    animation.setAttributeNS(null, `attributeName`, `stroke-dasharray`);
    animation.setAttributeNS(null, `to`, `${pathLength / 4} 0`);
    animation.setAttributeNS(null, `from`, `3 ${pathLength / 4}`);
    animation.setAttributeNS(null, `fill`, `freeze`);
    animation.setAttributeNS(null, `dur`, `0.5s`);
    children[i].appendChild(animation);
    animation.beginElement();
  }
};

export {
  animJumpTextSvg,
  animTextSvg
};
