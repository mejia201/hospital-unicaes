import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { detalleConsultaService } from 'services/detalleConsultaService';
import Card from '../../components/Card/MainCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-solid-svg-icons';

import { Button, InputGroup, FormControl, Container, Badge, Modal, Form} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useAuth } from 'components/AuthContext';

const DetallesConsultas = () => {

    const [detallesConsultas, setDetallesConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

  useEffect(() => {
      const loadDetallesConsultas = async () => {
        try {
          const data = await detalleConsultaService.getDetalleConsutasByIdUsuario(user.id_usuario);
          setDetallesConsultas(data);
        } catch (error) {
          console.error('Error al obtener los detalles de consultas del medico:', error);
        } finally {
          setLoading(false);
        }
      };


      loadDetallesConsultas();
  
    }, []);



    const columns = [
        {
          name: 'Nombre',
          selector: row => `${row.nombre_paciente} ${row.apellido_paciente}`,
          sortable: true,
        },
        {
          name: 'Motivo',
          selector: row => row.motivo_consulta,
          sortable: true,
        },
        
        
        {
          name: 'Presente Enfermedad',
          selector: row => row.presente_enfermedad,
          sortable: true,
        },
    
        {
            name: 'Diagnostico',
            selector: row => row.diagnostico,
            sortable: true,
        },

        {
            name: 'Estado',
            selector: row => row.nombre_estado_consulta,
            sortable: true,
        },
      

        {
            name: 'Acciones',
            cell: row => (
              <div className="btn-group mt-2 mb-2" role="group" aria-label="Detalle actions">
                  <Button variant="primary"  
                    onClick={() => handleShowAddModal(row.id_detalle_consulta)}
                  >
                    <FontAwesomeIcon icon={faEye} className="" /> 
                  </Button>
    
              </div>
            ),
          }
           
      ];
  
  
      const subHeaderComponentMemo = React.useMemo(() => {
        return (
          <Container>
            <Row className="justify-content-end">
              <Col md={6}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Buscar</InputGroup.Text>
                  <FormControl
                    placeholder="Buscar por nombre del paciente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        );
      }, [searchTerm]);
    
      if (loading) {
        return <p>Cargando tus detalles de consultas...</p>;
      }

      
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Detalles de tus consultas realizadas" isOption>

          <DataTable
          columns={columns}
          data={detallesConsultas.filter(consulta => 
            (consulta.nombre_paciente && consulta.nombre_paciente.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (consulta.apellido_paciente && consulta.apellido_paciente.toLowerCase().includes(searchTerm.toLowerCase()))
          )}
          
          pagination
          striped
          responsive
          highlightOnHover
          dense
          noHeader
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          noDataComponent={<div>No tienes detalles de consultas disponibles para mostrar, completa primero una.</div>}
        />


          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DetallesConsultas;
