const inputfield = document.getElementById('input1');
const resultfield = document.getElementById('result-texts');
inputfield.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const text = inputfield.value;
        if (text.trim() === '') {
            resultfield.innerText = 'Please enter some text.';
        } else {
            resultfield.innerText = "You entered: " + text;
            inputfield.value = '';
        }
    }
});