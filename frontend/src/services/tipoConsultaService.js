import axios from 'axios';

const baseUrl = 'http://localhost:8081/tipos-consulta';



export const tipoConsultaService = {
    getTipoConsulta: async () => {
        try {
          const response = await axios.get(`${baseUrl}/listar`, {
            withCredentials: true 
          });
          return response.data;
        } catch (error) {
          console.error('Error al obtener los tipos de consulta:', error);
          throw error;
        }
      }

}