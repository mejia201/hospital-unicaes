import React, { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl, Container, Modal, Form, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';

import DataTable from 'react-data-table-component';
import { usuarioService } from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faToggleOn, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { roleService } from 'services/roleService';
import { specialtyService } from 'services/specialtyService';
import { areaService } from 'services/areaService';
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [areas, setAreas] = useState([]);



  const initialUserState = {
    nombre: '',
    apellido: '',
    dui: '',
    telefono: '',
    email: '',
    password: '',
    direccion: '',
    fecha_nacimiento: '',
    sexo: '',
    numero_seguro_social: '',
    id_rol: '',
    id_especialidad: '',
    id_area: '',
  };


  const [userForm, setUserForm] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await usuarioService.getAllUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadRoles = async () => {
      try {
        const data = await roleService.getRoles();
        setRoles(data);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
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


    const loadAreas = async () => {
      try {
        const data = await areaService.getAreas();
        setAreas(data);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
      }
    };

    loadUsuarios();
    loadRoles();
    loadEspecialidades();
    loadAreas();

  }, []);


  const handleShowAddModal = () => {
    setUserForm(initialUserState); 
    setShowModal(true);
  };
  

  const handleShowEditModal = async (userId) => {
    try {
      const user = await usuarioService.getUsuarioById(userId);
      setUserForm(user[0][0]); 
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };
  
  
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  
  const validateFields = () => {
    const newErrors = {};
    if (!userForm.nombre) newErrors.nombre = "Nombre es requerido";
    if (!userForm.apellido) newErrors.apellido = "Apellido es requerido";
    if (!userForm.dui) newErrors.dui = "DUI es requerido";
    if (!userForm.telefono) newErrors.telefono = "Teléfono es requerido";
    if (!userForm.email) newErrors.email = "Email es requerido";
    if (!userForm.password) newErrors.password = "Contraseña es requerida";
    if (!userForm.direccion) newErrors.direccion = "Dirección es requerida";
    if (!userForm.fecha_nacimiento) newErrors.fecha_nacimiento = "Fecha de nacimiento es requerida";
    if (!userForm.sexo) newErrors.sexo = "El campo sexo es requerido";
    if (!userForm.id_rol) newErrors.id_rol = "Rol es requerido";

  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const handleSaveUser = async () => {

    if (!validateFields()) return;

    try {
        const response = await usuarioService.createUsuario(userForm);
        console.log('Usuario guardado:', response);
        
        const data = await usuarioService.getAllUsuarios();
        setUsuarios(data);

        Swal.fire({
          title: 'Éxito',
          text: 'Usuario agregado exitosamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        handleCloseModal();
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
    }
};


const handleEditUser = async () => {
  if (!validateFields()) return;

  // No enviar contraseña vacía si no se quiere actualizar
  const updatedUser = { ...userForm };
  if (!userForm.password) {
    delete updatedUser.password;
  }

  try {
    const response = await usuarioService.updateUsuario(userForm.id_usuario, updatedUser);
    console.log("Usuario actualizado:", response);

    // Actualizar la lista de usuarios
    const data = await usuarioService.getAllUsuarios();
    setUsuarios(data);

    Swal.fire({
      title: "Éxito",
      text: "Usuario actualizado exitosamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    handleCloseModal();
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al actualizar el usuario.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};



const toggleUserState = async (userId) => {
  try {
   
    await usuarioService.changeStateUsuario(userId);
    
    const data = await usuarioService.getAllUsuarios();
    setUsuarios(data);

    Swal.fire({
      title: 'Éxito',
      text: `Estado del usuario actualizado exitosamente!`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

   
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al cambiar el estado del usuario.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
};



  const columns = [
    {
      name: 'Nombre',
      selector: row => `${row.nombre} ${row.apellido}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: row => row.nombre_rol,
      sortable: true,
    },
    {
      name: 'Especialidad',
      selector: row => row.nombre_especialidad,
      sortable: true,
    },
    {
      name: 'Area',
      selector: row => row.nombre_area,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
    },

    {
      name: 'Acciones',
      cell: row => (
        <div className="btn-group mt-2 mb-2" role="group" aria-label="Usuario actions">
          <Button variant="warning"  onClick={() => handleShowEditModal(row.id_usuario)}>
            <FontAwesomeIcon icon={faEdit} className="me-1" />
          </Button>

          <Button 
            variant={row.estado === 'activo' ? 'success' : 'danger'}
            onClick={() => toggleUserState(row.id_usuario)}
          >
            <FontAwesomeIcon icon={faToggleOn} className="me-1" />
          </Button>
        </div>
      ),
    }
    
  
    
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Container>
        <Row className="justify-content-end">
          <Col md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Buscar</InputGroup.Text>
              <FormControl
                placeholder="Buscar por nombre o email"
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
    return <p>Cargando usuarios...</p>;
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
        <Card title="Usuarios" isOption>

            <Button onClick={() => handleShowAddModal()} variant="primary">
              <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Usuario
            </Button>
  
            <DataTable
              columns={columns}
              data={usuarios.filter((usuario) =>
                (usuario.nombre &&
                  usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (usuario.apellido &&
                  usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (usuario.email &&
                  usuario.email.toLowerCase().includes(searchTerm.toLowerCase()))
              )}
              pagination
              striped
              responsive
              highlightOnHover
              dense
              noHeader
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              noDataComponent={
                <div>No hay usuarios disponibles para mostrar.</div>
              }
            />
  
            <Modal show={showModal} onHide={handleCloseModal} size="xl">
              <Modal.Header closeButton>
                <Modal.Title>
                  {userForm.id_usuario
                    ? "Editar Usuario"
                    : "Agregar Usuario"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          name="nombre"
                          onChange={handleInputChange}
                          value={userForm.nombre || ""}
                          type="text"
                          isInvalid={!!errors.nombre}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nombre}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          name="apellido"
                          onChange={handleInputChange}
                          value={userForm.apellido || ""}
                          type="text"
                          isInvalid={!!errors.apellido}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.apellido}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>DUI</Form.Label>
                        <Form.Control
                          name="dui"
                          value={userForm.dui || ""}
                          onChange={handleInputChange}
                          type="text"
                          maxLength={10}
                          isInvalid={!!errors.dui}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.dui}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          name="telefono"
                          value={userForm.telefono || ""}
                          onChange={handleInputChange}
                          type="text"
                          maxLength={9}
                          isInvalid={!!errors.telefono}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.telefono}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
  
                  <Row className="mt-2">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          onChange={handleInputChange}
                          value={userForm.email || ""}
                          type="email"
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="password"
                            onChange={handleInputChange}
                            placeholder={
                              userForm.id_usuario
                                ? "Llenar solo si cambia la contraseña"
                                : ""
                            }
                            type={showPassword ? "text" : "password"}
                            isInvalid={!!errors.password}
                            required
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={togglePasswordVisibility}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </Button>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          name="direccion"
                          onChange={handleInputChange}
                          type="text"
                          value={userForm.direccion || ""}
                          isInvalid={!!errors.direccion}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.direccion}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className='mt-2'>
         
         <Col md={4}>
           <Form.Group>
             <Form.Label>Fecha de nacimiento</Form.Label>
             <Form.Control name="fecha_nacimiento" onChange={handleInputChange} type="date"
                   value={
                     userForm.fecha_nacimiento
                       ? userForm.fecha_nacimiento.split("T")[0] // Extraer solo la fecha
                       : ""
                   }
                isInvalid={!!errors.fecha_nacimiento} required/>
             <Form.Control.Feedback type="invalid">{errors.fecha_nacimiento}</Form.Control.Feedback>

           </Form.Group>
         </Col>
         <Col md={4}>
         <Form.Group>
             <Form.Label>Sexo</Form.Label>
             <Form.Select name="sexo" onChange={handleInputChange} value={userForm.sexo || ""} isInvalid={!!errors.sexo} >
               <option value="">Seleccione..</option>
                 <option value="M">Masculino</option>
                 <option value="F">Femenino</option>
             </Form.Select>
             <Form.Control.Feedback type="invalid">{errors.sexo}</Form.Control.Feedback>

           </Form.Group>
         </Col>


         <Col md={4}>
           <Form.Group>
             <Form.Label>Número Seguro Social</Form.Label>
             <Form.Control name="numero_seguro_social" onChange={handleInputChange} type='text' value={userForm.numero_seguro_social || ""} maxLength={15}/>
           </Form.Group>
         </Col>

       </Row>
       
  
                  <Row className="mt-2">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Rol</Form.Label>
                        <Form.Select
                          name="id_rol"
                          onChange={handleInputChange}
                          value={userForm.id_rol || ""}
                          isInvalid={!!errors.id_rol}
                          required
                        >
                          <option value="">Seleccione un rol</option>
                          {roles.map((rol) => (
                            <option key={rol.id_rol} value={rol.id_rol}>
                              {rol.nombre_rol}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.id_rol}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
              <Form.Group>
                <Form.Label>Especialidad</Form.Label>
                <Form.Select name="id_especialidad" onChange={handleInputChange} value={userForm.id_especialidad || ""} isInvalid={!!errors.id_especialidad} required>
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

            <Col md={4}>
              <Form.Group>
                <Form.Label>Area</Form.Label>
                <Form.Select name="id_area" onChange={handleInputChange} value={userForm.id_area || ""} isInvalid={!!errors.id_area} required>
                  <option value="">Seleccione una area</option>
                  {areas.map(rol => (
                    <option key={rol.id_area} value={rol.id_area}>
                      {rol.nombre_area}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.id_area}</Form.Control.Feedback>

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
                  onClick={
                    userForm.id_usuario ? handleEditUser : handleSaveUser
                  }
                >
                  {userForm.id_usuario
                    ? "Actualizar Usuario"
                    : "Guardar Usuario"}
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
  
};

export default Usuarios;

