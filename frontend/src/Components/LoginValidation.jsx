function Validation(values){
    let error = {};
    

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    
    if (values.email === "") {
        error.email = "El correo no puede ir vacío";
    } else if (!email_pattern.test(values.email)) {
        error.email = "El formato del correo no es válido";
    } else {
        error.email = "";
    }
    
    if (values.password === "") {
        error.password = "La contraseña no puede ir vacía";
    } else if (!password_pattern.test(values.password)) {
        error.password = "La contraseña debe tener al menos 8 caracteres, con una letra mayúscula, una minúscula y un número";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;
