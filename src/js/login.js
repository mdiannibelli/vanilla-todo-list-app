import { FORM_VALIDATIONS } from '../constants/constants.js';
import { USER_ACCOUNT } from '../data/users.data.js';
import { formValidation, passwordMatch } from '../utils/form-validations.js';


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const rememberCheckbox = document.getElementById('remember');
    const eyeIcon = document.querySelector('img[data-eye-icon="eye"]');

    const errorMessage = document.querySelectorAll('#errorMessage');
    const formErrorMessage = document.getElementById('formErrorMessage');
    
    function togglePassword() {
        const type = passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        eyeIcon.src = type === 'password' ? '../assets/svgs/eye.svg' : '../assets/svgs/eye-slash.svg';
    }

    function resetFormErrors() {
        errorMessage[0].innerHTML = '';
        errorMessage[1].innerHTML = '';
        formErrorMessage.innerHTML = '';
        formErrorMessage.style.display = 'none';
    }

    const handleLogin = (e) => {
        e.preventDefault();

        resetFormErrors();

        const email = formValidation(FORM_VALIDATIONS.email, emailInput.value);
        const password = formValidation(FORM_VALIDATIONS.password, passwordInput.value);

        if(email || password) {
            errorMessage[0].innerHTML = email;
            errorMessage[1].innerHTML = password;
            return;
        }

        const formValues = {
            email: emailInput.value,
            password: passwordInput.value,
            remember: rememberCheckbox.checked
        }

        const isValidPassword = passwordMatch(formValues.password, USER_ACCOUNT.password);
        if(!isValidPassword) {
            formErrorMessage.style.display = 'block';
            formErrorMessage.innerHTML = 'Invalid credentials';
            return;
        }


        // TODO set in local storage and redirect to home page
        console.log('Login form submitted');
    }

    
    loginForm.addEventListener('submit', handleLogin);
    eyeIcon.addEventListener('click', togglePassword);
});
