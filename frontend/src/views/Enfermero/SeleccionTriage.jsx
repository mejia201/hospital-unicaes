import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { specialtyService } from 'services/specialtyService';
import { pacienteService } from 'services/pacienteService';
import { tipoConsultaService } from 'services/tipoConsultaService';
import { consultaService } from 'services/consultaService';
import Swal from 'sweetalert2';

const SeleccionTriage = () => {

  const [especialidades, setEspecialidades] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState([]);


  const initialUserState = {
    id_tipo_consulta: '',
    id_paciente: '',
    id_especialidad: '',
    estado_paciente: '',
    motivo_consulta: '',
  };

  const [userForm, setUserForm] = useState(initialUserState);
  const [errors, setErrors] = useState({});


  useEffect(() => {


    const loadPacientes = async () => {
      try {
        const data = await pacienteService.getPacientes();
        setPacientes(data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    const loadEspecialidades = async () => {
      try {
        const data = await specialtyService.getEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };


    const loadTipoConsulta = async () => {
      try {
        const data = await tipoConsultaService.getTipoConsulta();
        setTipoConsulta(data);
      } catch (error) {
        console.error('Error al obtener los tipos de consulta:', error);
      }
    };


    loadEspecialidades();
    loadPacientes();
    loadTipoConsulta();

  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

    
  const validateFields = () => {
    const newErrors = {};
    if (!userForm.id_tipo_consulta) newErrors.id_tipo_consulta = "El tipo de la consulta es requerido";
    if (!userForm.id_paciente) newErrors.id_paciente = "El paciente es requerido";
    if (!userForm.id_especialidad) newErrors.id_especialidad = "La especialidad es requerido";
    if (!userForm.estado_paciente) newErrors.estado_paciente = "El estado del paciente es requerido";
    if (!userForm.motivo_consulta) newErrors.motivo_consulta = "El motivo de la consulta es requerido";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleSaveConsulta = async () => {

    if (!validateFields()) return;

    try {
        const response = await consultaService.createConsulta(userForm);
        console.log('Consulta registrada:', response);
        
        Swal.fire({
          title: 'Éxito',
          text: 'La seleccion fue agregada exitosamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        setUserForm(initialUserState);

    } catch (error) {
        console.error('Error al guardar la consulta:', error);
    }
};

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Seleccion Triage" isOption>

          <Form>
          <Row className="mt-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Tipo de consulta</Form.Label>
              <div>
                {tipoConsulta.map((consulta) => (
                  <Form.Check
                    key={consulta.id_tipo_consulta} 
                    inline
                    type="radio"
                    name="id_tipo_consulta"
                    label={consulta.nombre_tipo_consulta}
                    value={consulta.id_tipo_consulta} 
                    onChange={handleInputChange}
                    isInvalid={!!errors.id_tipo_consulta}
                  />
                ))}
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.id_tipo_consulta}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>


                {/* Estado */}
                <Col md={6}>
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <div>
                  
                    <Form.Check
                      inline
                      type="radio"
                      name="estado_paciente"
                      value="rojo"
                      checked={userForm.estado_paciente === "rojo"}
                      onChange={handleInputChange}
                      isInvalid={!!errors.estado_paciente}
                      label={
                        <>
                        2 <span className="badge" style={{ backgroundColor: 'red', marginLeft: '10px' }}>&nbsp;</span>
                        </>
                      }
                    />
                    
                    <Form.Check
                      inline
                      type="radio"
                      name="estado_paciente"
                      value="amarillo"
                      checked={userForm.estado_paciente === "amarillo"}
                      onChange={handleInputChange}
                      isInvalid={!!errors.estado_paciente}
                      label={
                        <>
                          4 <span className="badge" style={{ backgroundColor: '#f89e1f', marginLeft: '10px' }}>&nbsp;</span>
                        </>
                      }
                    />
                    
                    <Form.Check
                      inline
                      type="radio"
                      name="estado_paciente"
                      value="verde"
                      checked={userForm.estado_paciente === "verde"}
                      onChange={handleInputChange}
                      isInvalid={!!errors.estado_paciente}
                      label={
                        <>
                          8 <span className="badge" style={{ backgroundColor: 'green', marginLeft: '10px' }}>&nbsp;</span>
                        </>
                      }
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">{errors.estado_paciente}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              </Row>


          <Row className='mt-2'>
           
           <Col md={6}>
             <Form.Group>
               <Form.Label>Paciente</Form.Label>
               <Form.Select name="id_paciente" onChange={handleInputChange}  value={userForm.id_paciente}  isInvalid={!!errors.id_paciente} required>
                 <option value="">Seleccione un paciente</option>
                 {pacientes.map(paciente => (
                   <option key={paciente.id_paciente} value={paciente.id_paciente}>
                     {paciente.nombre_paciente} {paciente.apellido_paciente}
                   </option>
                 ))}
               </Form.Select>
               <Form.Control.Feedback type="invalid">{errors.id_paciente}</Form.Control.Feedback>

             </Form.Group>
           </Col>
           <Col md={6}>
             <Form.Group>
               <Form.Label>Especialidad</Form.Label>
               <Form.Select name="id_especialidad" onChange={handleInputChange}  value={userForm.id_especialidad}  isInvalid={!!errors.id_especialidad} required>
                 <option value="">Seleccione una especialidad</option>
                 {especialidades.map(esp => (
                   <option key={esp.id_especialidad} value={esp.id_especialidad}>
                     {esp.nombre_especialidad}
                   </option>
                 ))}
               </Form.Select>
               <Form.Control.Feedback type="invalid">{errors.id_especialidad}</Form.Control.Feedback>

             </Form.Group>
           </Col>
         </Row>


          <Row className="mt-4">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Motivo de la consulta</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="motivo_consulta"
                      value={userForm.motivo_consulta}
                      onChange={handleInputChange}
                      rows={6}
                      isInvalid={!!errors.motivo_consulta}
                    />
                    <Form.Control.Feedback type="invalid">{errors.motivo_consulta}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

          <div className='text-end mt-4'>
          <Button variant="primary" onClick= {() => {
            handleSaveConsulta()
            setUserForm(initialUserState);

            }}>
            Guardar
          </Button>
          </div>
          

        </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SeleccionTriage;