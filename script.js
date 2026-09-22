const inputfield = document.getElementById('input1');
const resultfield = document.getElementById('result-texts');
inputfield.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const text = inputfield.value;
        if (text.trim() === '') {
            resultfield.innerText = 'Please enter some text.';
            //add error class and remove success class
            resultfield.classList.add('error');
            resultfield.classList.remove('success');
        } else {
            resultfield.innerText = "You entered: " + text;
            //remove error class and add success class
            resultfield.classList.remove('error');
            resultfield.classList.add('success');

            inputfield.value = '';
        }
    }
});
