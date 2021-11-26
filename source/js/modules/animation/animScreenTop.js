export const animJumpText = (el, {property, direction, timeFunction, classRunAnim}) => {
  const text = el.textContent
    .trim()
    .split(` `)
    .filter((letter) => !letter !== ``);
  const stepDelayStr = 250;
  let startDelayStr = 0;

  el.classList.add(`txt`);

  const content = text.reduce((acc, word) => {
    const fragmentWord = word.split(``).reduce((accWord, char) => {
      const fragmentChar = document.createElement(`span`);
      fragmentChar.innerHTML = char;
      fragmentChar.style.transition = `${property} ${direction}ms ${timeFunction}`;
      fragmentChar.style.transitionDelay = `${Math.random() * 300}ms`;

      accWord.append(fragmentChar);
      return accWord;
    }, document.createDocumentFragment());

    const fragment = document.createElement(`span`);
    fragment.append(fragmentWord);
    fragment.classList.add(`str`);
    fragment.innerHTML += ` `;
    fragment.style.transitionDelay = `${startDelayStr}ms`;

    acc.append(fragment);
    startDelayStr += stepDelayStr;

    return acc;
  }, document.createDocumentFragment());

  el.innerHTML = ``;
  el.append(content);
  setTimeout(() => {
    el.classList.add(classRunAnim);
  }, 200);
};
