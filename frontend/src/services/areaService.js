import axios from 'axios';

const baseUrl = 'http://localhost:8081/areas';



export const areaService = {
    getAreas: async () => {
        try {
          const response = await axios.get(`${baseUrl}/listar`, {
            withCredentials: true 
          });
          return response.data;
        } catch (error) {
          console.error('Error al obtener las areas:', error);
          throw error;
        }
      }

}