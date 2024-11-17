import axios from 'axios';

const baseUrl = 'http://localhost:8081/especialidades';



export const specialtyService = {
    getEspecialidades: async () => {
        try {
          const response = await axios.get(`${baseUrl}/listar`, {
            withCredentials: true 
          });
          return response.data;
        } catch (error) {
          console.error('Error al obtener las epecialidades:', error);
          throw error;
        }
      }

}