import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Validation from '../Components/LoginValidation';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const validationErrors = Validation(values);
      setErrors(validationErrors);

      if (!validationErrors.email && !validationErrors.password) {
          try {
              const res = await axios.post('http://localhost:8081/login', values, {
                  withCredentials: true 
              });

              if (res.status === 200 && res.data.message === "Success") {
                  Swal.fire({
                      title: 'Éxito',
                      text: 'Inicio de sesión exitoso!',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                  });
                  navigate('/dashboard');
              } else {
                  
                  Swal.fire({
                      title: 'Error',
                      text: 'Credenciales incorrectas!',
                      icon: 'error',
                      confirmButtonText: 'Aceptar',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                  });
              }
          } catch (err) {
            
              if (err.response && err.response.status === 401) {
                  Swal.fire({
                      title: 'Error',
                      text: 'Credenciales incorrectas!',
                      icon: 'error',
                      confirmButtonText: 'Aceptar',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                  });
              } else {
                  console.error("Error en la solicitud:", err);
                  Swal.fire({
                      title: 'Error',
                      text: 'Ocurrió un error al procesar tu solicitud.',
                      icon: 'error',
                      confirmButtonText: 'Aceptar',
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                  });
              }
          }
      }
  };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <div className="text-center mb-4">
                    <img 
                        src="./src/assets/images/UNICAES_Logo.png" 
                        alt="Logo UNICAES" 
                        style={{ width: '160px' }} 
                    />
                    <h6 className="mt-3" style={{ color: '#9a2921' }}> <strong>Hospital Unicaes</strong></h6>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className='mb-1' htmlFor="email" style={{ textAlign: 'left', display: 'block' }}><strong>Usuario</strong></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name='email'
                            placeholder="Ingrese su usuario"
                            onChange={handleInput}  
                        />
                        {errors.email && <small className='text-danger ms-1' style={{ textAlign: 'left', display: 'block' }}> {errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label className='mb-1' htmlFor="password" style={{ textAlign: 'left', display: 'block' }}> <strong>Contraseña</strong></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name='password'
                            placeholder="Ingrese su contraseña"
                            onChange={handleInput}
                        />
                        {errors.password && <small className='text-danger ms-1' style={{ textAlign: 'left', display: 'block' }}> {errors.password}</small>}
                    </div>
                    <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: '#9a2921', color: 'white' }}>
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
