const n1 = document.getElementById('number1');
const n2 = document.getElementById('number2');
const result = document.getElementById('result');
const errorBox = document.getElementById('error');

function showError(msg) {
  errorBox.hidden = false;
  errorBox.textContent = msg;
  result.value = '';
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = '';
}

function parseInputs() {
  clearError();
  const a = parseFloat(n1.value.replace(',', '.'));
  const b = parseFloat(n2.value.replace(',', '.'));

  if (isNaN(a) || isNaN(b)) {
    showError('Proszę wpisać liczby');
    return null;
  }

  return { a, b };
}

document.getElementById('add').addEventListener('click', () => {
  const v = parseInputs();
  if (!v) return;
  result.value = v.a + v.b;
});

document.getElementById('subtract').addEventListener('click', () => {
  const v = parseInputs();
  if (!v) return;
  result.value = v.a - v.b;
});

document.getElementById('multiply').addEventListener('click', () => {
  const v = parseInputs();
  if (!v) return;
  result.value = v.a * v.b;
});

document.getElementById('divide').addEventListener('click', () => {
  const v = parseInputs();
  if (!v) return;
  if (v.b === 0) {
    showError('Nie można dzielić przez zero');
    return;
  }
  result.value = v.a / v.b;
});
