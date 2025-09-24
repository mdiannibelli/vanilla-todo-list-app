export function formValidation(type, value) {
    switch (type) {
        case 'email':
            let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return emailValid ? null : 'Email is required';
        case 'password':
            let passwordValid = value.length >= 8;
            return passwordValid ? null : 'Invalid password';
        default:
            return null;
    }
}

export function passwordMatch(password, userPassword) {
    return password === userPassword;
}