import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { consultaService } from '../../services/consultaService';
import { detalleConsultaService } from 'services/detalleConsultaService';
import { estadoConsultaService } from 'services/estadoConsultaService';
import Card from '../../components/Card/MainCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd} from '@fortawesome/free-solid-svg-icons';
import { faHeartbeat, faStethoscope, faEdit, faQuestionCircle, faSmile } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Button, InputGroup, FormControl, Container, Badge, Modal, Form} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useAuth } from 'components/AuthContext';

const Consulta = () => {

  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = React.useState({ id_consulta: '' });

  const [estadoConsultas, setEstadosConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
 
  const initialDetalleState = {
    id_estado_consulta: '',
    motivo_consulta: '',
    presente_enfermedad	: '',
    antecedentes: '',
    presion_arterial: '',
    frecuencia_cardiaca: '',
    saturacion_oxigeno: '',
    temperatura: '',
    peso: '',
    altura: '',
    diagnostico: '',
    observaciones: '',
    examen_fisico: '',
    id_consulta: '',

  };

  
  const [detalleForm, setDetalleForm] = useState(initialDetalleState);
  const [errors, setErrors] = useState({});

  const { user } = useAuth();

  useEffect(() => {
      const loadConsultas = async () => {
        try {
          const data = await consultaService.getConsutasById(user.id_usuario);
          setConsultas(data);
        } catch (error) {
          console.error('Error al obtener las consultas del medico:', error);
        } finally {
          setLoading(false);
        }
      };

      const loadEstadosConsultas = async () => {
        try {
          const data = await estadoConsultaService.getEstados();
          setEstadosConsultas(data);
        } catch (error) {
          console.error('Error al obtener los estados de la consulta:', error);
        } finally {
          setLoading(false);
        }
      };


     
  
  
      loadConsultas();
      loadEstadosConsultas();
  
    }, []);


    const handleShowAddModal = (id_consulta) => {
      const consultaSeleccionada = consultas.find(
          (consulta) => consulta.id_consulta === id_consulta
      );
      setSelectedConsulta(consultaSeleccionada || { id_consulta });
      setDetalleForm({ ...initialDetalleState, id_consulta });
      setShowModal(true);
  };
  


  
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDetalleForm({ ...detalleForm, [name]: value });
    };



    const validateFields = (detalleForm) => {
      const newErrors = {};
      
      if (!detalleForm?.id_estado_consulta) newErrors.id_estado_consulta = "El estado de la consulta es requerido";
      if (!detalleForm?.motivo_consulta) newErrors.motivo_consulta = "El motivo de la consulta es requerido";
      if (!detalleForm?.presente_enfermedad) newErrors.presente_enfermedad = "La descripción de la enfermedad presente es requerida";
      if (!detalleForm?.presion_arterial) newErrors.presion_arterial = "La presión arterial es requerida";
      if (!detalleForm?.frecuencia_cardiaca) newErrors.frecuencia_cardiaca = "La frecuencia cardíaca es requerida";
      if (!detalleForm?.temperatura) newErrors.temperatura = "La temperatura es requerida";
      if (!detalleForm?.saturacion_oxigeno) newErrors.saturacion_oxigeno = "La saturacion de oxigeno es requerida";
      if (!detalleForm?.peso) newErrors.peso = "El peso del paciente es requerido";
      if (!detalleForm?.altura) newErrors.altura = "La altura del paciente es requerida";
      if (!detalleForm?.diagnostico) newErrors.diagnostico = "El diagnóstico es requerido";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };



  const handleSaveDetalle = async () => {

    if (!validateFields(detalleForm)) return;

    try {

        const response = await detalleConsultaService.createDetalleConsulta(detalleForm);
        console.log('Detalle guardado:', response);
        
        const data = await consultaService.getConsutasById(user.id_usuario);
        setConsultas(data);


        Swal.fire({
          title: 'Éxito',
          text: 'Detalle agregado exitosamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        handleCloseModal();
    } catch (error) {
        console.error('Error al guardar el detalle:', error);
    }
};

    

    const getBadgeVariant = (estado) => {
      switch (estado.toLowerCase()) {
        case 'rojo':
          return 'danger';
        case 'amarillo':
          return 'warning';
        case 'verde':
          return 'success';
        default:
          return 'secondary'; 
      }
    };

    const getHealthIcon = (estado) => {
      switch (estado.toLowerCase()) {
        case 'rojo':
          return <FontAwesomeIcon icon={faHeartbeat} /> ;
        case 'amarillo':
          return <FontAwesomeIcon icon={faStethoscope} />;
        case 'verde':
          return <FontAwesomeIcon icon={faSmile} />;
        default:
          return <FontAwesomeIcon icon={faQuestionCircle} />;
      }
    };


    const getHours = (estado) => {
      switch (estado.toLowerCase()) {
        case 'rojo':
          return <p>2</p>;
        case 'amarillo':
          return <p>4</p>;
        case 'verde':
          return <p>8</p>;
        default:
          return <p>0</p>;
      }
    };

    const columns = [
      {
        name: 'Nombre',
        selector: row => `${row.nombre_paciente} ${row.apellido_paciente}`,
        sortable: true,
      },
      {
        name: 'Tipo',
        selector: row => row.nombre_tipo_consulta,
        sortable: true,
      },
      
      {
        name: 'Estado',
        cell: row => (
          <div className="d-flex align-items-center">
           
            <Badge
              bg={getBadgeVariant(row.estado_paciente)}
              style={{
                fontSize: '1rem',
                padding: '0.4rem 0.6rem',
              }}
              className="me-2"
            >
              {getHealthIcon(row.estado_paciente)}
            </Badge>
      
            <span className='mt-3'>
              {getHours(row.estado_paciente)}
            </span>
          </div>
        ),
        sortable: true,
      },
      
      {
        name: 'Motivo',
        selector: row => row.motivo_consulta,
        sortable: true,
      },
  
      {
        name: 'Acciones',
        cell: row => (
          <div className="btn-group mt-2 mb-2" role="group" aria-label="Detalle actions">
              <Button variant="primary"  
                onClick={() => handleShowAddModal(row.id_consulta)}
              >
                <FontAwesomeIcon icon={faUserMd} className="" /> 
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
      return <p>Cargando tus consultas...</p>;
    }


  return (
    <React.Fragment>
    <Row>
      <Col>
        <Card title="Tus Consultas" isOption>

        <DataTable
          columns={columns}
          data={consultas.filter(consulta => 
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
          noDataComponent={<div>No tienes consultas disponibles para mostrar, toma primero una.</div>}
        />


        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
            Agregar Detalle de Consulta
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                
              <Form.Group>
                <Form.Control
                  name="id_consulta"
                  value={selectedConsulta.id_consulta || ''}
                  type="hidden"
                />
              </Form.Group>



              <Col md={6}>
             <Form.Group>
               <Form.Label>Estado de la consulta</Form.Label>
               <Form.Select
                  name="id_estado_consulta"
                  onChange={handleInputChange}
                  value={detalleForm.id_estado_consulta || ''}
                  isInvalid={!!errors.id_estado_consulta}
                  required
                >
                  <option value="">Seleccione un estado</option>
                  {estadoConsultas.map((estado) => (
                    <option key={estado.id_estado_consulta} value={estado.id_estado_consulta}>
                      {estado.nombre_estado_consulta}
                    </option>
                  ))}
                </Form.Select>

               <Form.Control.Feedback type="invalid">{errors.id_estado_consulta}</Form.Control.Feedback>

              </Form.Group>
              </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Motivo de Consulta</Form.Label>
                    <Form.Control
                      name="motivo_consulta"
                      onChange={handleInputChange}
                      value={detalleForm.motivo_consulta || ""}
                      as="textarea"
                      isInvalid={!!errors.motivo_consulta}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.motivo_consulta}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Presente Enfermedad</Form.Label>
                    <Form.Control
                      name="presente_enfermedad"
                      onChange={handleInputChange}
                      value={detalleForm.presente_enfermedad || ""}
                      type="text"
                      maxLength={500}
                      isInvalid={!!errors.presente_enfermedad}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.presente_enfermedad}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Antecedentes</Form.Label>
                    <Form.Control
                      name="antecedentes"
                      onChange={handleInputChange}
                      value={detalleForm.antecedentes || ""}
                      type="text"
                      maxLength={400}
                      isInvalid={!!errors.antecedentes}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.antecedentes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Presión Arterial</Form.Label>
                    <Form.Control
                      name="presion_arterial"
                      onChange={handleInputChange}
                      value={detalleForm.presion_arterial || ""}
                      type="text"
                      maxLength={50}
                      isInvalid={!!errors.presion_arterial}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.presion_arterial}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Frecuencia Cardíaca</Form.Label>
                    <Form.Control
                      name="frecuencia_cardiaca"
                      onChange={handleInputChange}
                      value={detalleForm.frecuencia_cardiaca || ""}
                      type="number"
                      step="0.1"
                      isInvalid={!!errors.frecuencia_cardiaca}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.frecuencia_cardiaca}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Saturación de Oxígeno</Form.Label>
                    <Form.Control
                      name="saturacion_oxigeno"
                      onChange={handleInputChange}
                      value={detalleForm.saturacion_oxigeno || ""}
                      type="number"
                      step="0.1"
                      isInvalid={!!errors.saturacion_oxigeno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.saturacion_oxigeno}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control
                      name="temperatura"
                      onChange={handleInputChange}
                      value={detalleForm.temperatura || ""}
                      type="number"
                      step="0.1"
                      isInvalid={!!errors.temperatura}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.temperatura}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Peso</Form.Label>
                    <Form.Control
                      name="peso"
                      onChange={handleInputChange}
                      value={detalleForm.peso || ""}
                      type="number"
                      step="0.1"
                      isInvalid={!!errors.peso}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.peso}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Altura</Form.Label>
                    <Form.Control
                      name="altura"
                      onChange={handleInputChange}
                      value={detalleForm.altura || ""}
                      type="number"
                      step="0.1"
                      isInvalid={!!errors.altura}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.altura}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Diagnóstico</Form.Label>
                    <Form.Control
                      name="diagnostico"
                      onChange={handleInputChange}
                      value={detalleForm.diagnostico || ""}
                      as="textarea"
                      isInvalid={!!errors.diagnostico}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.diagnostico}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                      name="observaciones"
                      onChange={handleInputChange}
                      value={detalleForm.observaciones || ""}
                      as="textarea"
                      isInvalid={!!errors.observaciones}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.observaciones}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Examen Físico</Form.Label>
                    <Form.Control
                      name="examen_fisico"
                      onChange={handleInputChange}
                      value={detalleForm.examen_fisico || ""}
                      type="text"
                      maxLength={800}
                      isInvalid={!!errors.examen_fisico}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.examen_fisico}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveDetalle}
            >
              Guardar Detalle
            </Button>
          </Modal.Footer>
        </Modal>


        </Card>
      </Col>
    </Row>
  </React.Fragment>
  );
};

export default Consulta;
