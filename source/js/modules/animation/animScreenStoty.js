import {$} from '../../dom';

export const addColorTheme = (nameTheme) => {
  const namesTheme = [`base`, `dark-purple`, `dark-blue`, `light-blue`];
  if (!namesTheme.includes(nameTheme)) {
    return;
  }
  const el = $(document).findEl(`body`);
  if (el.isClass(nameTheme)) {
    return;
  }
  namesTheme.forEach((nameClass) => el.removeClass(nameClass));
  el.addClass(nameTheme);
};
