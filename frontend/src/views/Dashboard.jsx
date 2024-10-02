import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import '../assets/css/dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8081/user", {
                    withCredentials: true 
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error al obtener los datos del usuario", error);
                Swal.fire({
                    title: 'Error',
                    text: 'No estás autenticado, por favor inicia sesión.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        };

        fetchUser();
    }, []);

    // return (
    //     <>
    //         <h1>Dashboard</h1>
    //         {user ? (
    //             <div>
    //                 <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
    //                 <p>Rol: {user.rol}</p>
    //             </div>
    //         ) : (
    //             <p>Cargando...</p>
    //         )}
    //     </>
    // );


    return (
        <>
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-light bg-white shadow-sm">
                <div className="col-sm-10 d-flex align-items-center align-self-start">
                  <img
                    src="./src/assets/images/UNICAES_Logo.png"
                    alt="Logo Clínica Unicaes"
                  />
                  <h5 className="p-1">Clínica Unicaes</h5>
                </div>
                <div className="col-sm-2 align-self-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user ? (
                        <div>
                          {user.nombre} {user.apellido}
                        </div>
                      ) : (
                        <p>Cargando...</p>
                      )}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Editar perfil
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Cerrar sesión
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
    
            {/* Sidebar */}
            <div className="row">
              <div id="sidebar" className="col-md-2 bg-light p-3 vh-100">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <button className="active">
                      <a href="#">
                        <i className="bi bi-grid me-2"></i>
                        Dashboard
                      </a>
                    </button>
                  </li>
                  <li className="mb-3">
                    <button>
                      <a href="#">
                        <i className="bi bi-grid me-2"></i>
                        Pacientes
                      </a>
                    </button>
                  </li>
                  <li className="mb-3">
                    <button>
                      <a href="#">
                        <i className="bi bi-grid me-2"></i>
                        Selección
                      </a>
                    </button>
                  </li>
                  <li className="mb-2">
                    <button>
                      <a href="#">
                        <i className="bi bi-grid me-2"></i>
                        Consulta
                      </a>
                    </button>
                  </li>
                </ul>
              </div>
    
              {/* Main content */}
              <div className="col-md-10">
                <div>
                  <h1 className="display-4">Dashboard</h1>
                  {user ? (
                    <div>
                      {user.nombre} {user.apellido}
                    </div>
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Dashboard;
