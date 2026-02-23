export function counter() {
  /*
  Константы здесь, а не в constants.js потому что иначе ломается логика,
  все элементы создаются один раз а затем каждый раз вызывается эта функция,
  из-за чего возникает наложение обработчиков(Я могу добавить функцию создания кнопок, 
  но тогда код будет немного запутанней)
  */
  const counterWrapper = document.createElement('div');
  const buttonMinusContent = document.createElement('span');
  const input = document.createElement('input');
  const buttonPlusContent = document.createElement('span');
  const buttonMinus = document.createElement('button');
  const buttonPlus = document.createElement('button');
  buttonMinus.className = 'counter-buttons';
  buttonMinusContent.className = 'counter-buttons-text';
  buttonMinusContent.textContent = '-';
  input.name = 'counter';
  input.className = 'product-counter-input';
  input.type = 'number';
  input.inputmode = 'numeric';
  input.value = '1';
  buttonPlus.className = 'counter-buttons';
  buttonPlusContent.className = 'counter-buttons-text';
  buttonPlusContent.textContent = '+';

  buttonMinus.addEventListener('click', () => {
    if (input.value > 1) {
      input.value = +input.value - 1;
    }
  });
  buttonPlus.addEventListener('click', () => {
    input.value = +input.value + 1;
  });

  input.addEventListener('input', () => {
    input.value = Math.abs(input.value);
  });

  buttonMinus.appendChild(buttonMinusContent);
  buttonPlus.appendChild(buttonPlusContent);

  counterWrapper.appendChild(buttonMinus);
  counterWrapper.appendChild(input);
  counterWrapper.appendChild(buttonPlus);

  return counterWrapper;
}
