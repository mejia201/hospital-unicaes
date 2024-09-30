import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

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

    return (
        <>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
                    <p>Rol: {user.rol}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </>
    );
}

export default Dashboard;
