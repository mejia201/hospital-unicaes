import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from 'components/AuthContext';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ready } from 'jquery';

const Personal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: '',
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
    estado: '',
    nombre_rol: '',
    nombre_especialidad: '',
    nombre_area: '',
    id_rol: '',
    id_especialidad: '',
    id_area: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      listarUsuarios();
      cargarRolAreaEsp();
    }
  }, [user, navigate]);

  const listarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8081/usuarios/listar', { withCredentials: true });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
    }
  };

  const cargarRolAreaEsp = async () => {
    try {
      const [rolesRes, especialidadesRes, areasRes] = await Promise.all([
        axios.get('http://localhost:8081/roles/listar', { withCredentials: true }),
        axios.get('http://localhost:8081/especialidades/listar', { withCredentials: true }),
        axios.get('http://localhost:8081/areas/listar', { withCredentials: true })
      ]);
      setRoles(rolesRes.data);
      setEspecialidades(especialidadesRes.data);
      setAreas(areasRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingId ? `http://localhost:8081/usuarios/actualizar/${editingId}` : 'http://localhost:8081/usuarios/registrar';
    const method = editingId ? 'put' : 'post';

    try {
      await axios[method](endpoint, formData, { withCredentials: true });
      listarUsuarios();
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.patch('http://localhost:8081/usuarios/cambiar-estado', { id, estado: 'inactivo' }, { withCredentials: true });
      listarUsuarios();
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  const handleEdit = (usuario) => {
    setEditingId(usuario.id_usuario);
    setFormData(usuario);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      id_usuario: '',
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
      estado: '',
      nombre_rol: '',
      nombre_especialidad: '',
      nombre_area: '',
      id_rol: '',
      id_especialidad: '',
      id_area: ''
    });
    setShowModal(true);
  };

  // Configuración de las columnas para DataTable
  const columns = [
    { name: 'Nombre', selector: (row) => row.nombre, sortable: true, style: { width: '10px' } }, // Establecer un ancho fijo para la columna},
    { name: 'Apellido', selector: (row) => row.apellido, sortable: true, style: { width: '10px' } },
    { name: 'DUI', selector: (row) => row.dui, style: { width: '10px' } },
    { name: 'Teléfono', selector: (row) => row.telefono, style: { width: '10px' } },
    { name: 'Email', selector: (row) => row.email, style: { width: '10px' } },
    { name: 'Direccion', selector: (row) => row.direccion, style: { width: '10px' } },
    { name: 'Fecha Nacimiento', selector: (row) => new Date(row.fecha_nacimiento).toISOString().split('T')[0], style: { width: '10px' } },
    { name: 'Sexo', selector: (row) => row.sexo, style: { width: '10px' } },
    { name: 'Estado', selector: (row) => row.estado, sortable: true, style: { width: '10px' } },
    { name: 'Rol', selector: (row) => row.nombre_rol, sortable: true, style: { width: '10px' } },
    { name: 'Especialidad', selector: (row) => row.nombre_especialidad, sortable: true, style: { width: '10px' } },
    { name: 'Área', selector: (row) => row.nombre_area, sortable: true, style: { width: '10px' } },
    {
      name: 'Acciones',
      Button: true,
      cell: (row) => (
        <>
          <Button variant="warning" size="sm" onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="primary" size="sm" className="text-nowrap" onClick={() => handleDelete(row.id_usuario)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </>
      )
    }
  ];

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h3>Gestión de Usuarios</h3>
          <Button variant="info" onClick={handleAdd}>
            Agregar Usuario
          </Button>
        </Col>
      </Row>
      <DataTable
        title="Lista de Usuarios"
        columns={columns}
        data={usuarios}
        dense
        striped
        pagination
        responsive
        highlightOnHover
        expandableRows // Habilitar filas expandibles
        className="custom-tablesize" // Agregar una clase personalizada
        expandableRowsComponent={({ data }) => (
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            <Row>
              <Col md={2}>
                <p>
                  <strong>Nombre:</strong> {data.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {data.apellido}
                </p>
                <p>
                  <strong>DUI:</strong> {data.dui}
                </p>
                <div>
                  <label className="form-label">
                    <strong>Dirección </strong>
                  </label>
                  <textarea className="custom-textarea" rows="4" readOnly>
                    {data.direccion}
                  </textarea>
                </div>
              </Col>

              <Col md={2}>
                <p>
                  <strong>Teléfono:</strong> {data.telefono}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong> {new Date(data.fecha_nacimiento).toLocaleDateString()}
                </p>
                <p>
                  <strong>Sexo:</strong> {data.sexo}
                </p>
                <p>
                  <strong>Estado:</strong> {data.estado}
                </p>
              </Col>

              <Col md={2}>
                <p>
                  <strong>Rol:</strong> {data.nombre_rol}
                </p>
                <p>
                  <strong>Especialidad:</strong> {data.nombre_especialidad}
                </p>
                <p>
                  <strong>Área:</strong> {data.nombre_area}
                </p>
              </Col>
            </Row>
          </div>
        )}
      />

      <hr></hr>
      {/* Modal de agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-custom">
        {/* Contenido del modal */}
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSubmit}>
            <Row>
              {/*COLUMNA 1 */}
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    placeholder="Nombres"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
                      if (regex.test(e.target.value)) {
                        setFormData({ ...formData, nombre: e.target.value });
                      }
                    }}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    placeholder="0000-0000"
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => {
                      const regex = /^[0-9]{0,4}(-?[0-9]{0,4})$/; // Permite 4 dígitos, guion opcional y otros 4 dígitos
                      if (regex.test(e.target.value)) {
                        setFormData({ ...formData, telefono: e.target.value });
                      }
                    }}
                    maxLength={9} // Limita a 9 caracteres (0000-0000)
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Número de Seguro Social</Form.Label>
                  <Form.Control
                    placeholder="000-00-0000"
                    type="text"
                    value={formData.numero_seguro_social}
                    onChange={(e) => setFormData({ ...formData, numero_seguro_social: e.target.value })}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    placeholder="Ingrese una dirección"
                    as="textarea"
                    rows="5"
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>

              {/*COLUMNA 2 */}
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    placeholder="Ingrese los apellidos"
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
                      if (regex.test(e.target.value)) {
                        setFormData({ ...formData, apellido: e.target.value });
                      }
                    }}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    placeholder="example@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    placeholder="Ingrese una fecha válida"
                    type="date"
                    value={formData.fecha_nacimiento.toString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                    disabled={!!formData.id_usuario} // Deshabilita el campo si hay un ID (si hay id de usuario en la row)
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado Laboral </Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    required
                  >
                    <option value="activo">activo</option>
                    <option value="inactivo">inactivo</option>
                  </Form.Control>
                </Form.Group>

                {/* COLUMNA 3///////////////////////////////////////////////////////////////////////////////// */}

                <Form.Group className="mb-3">
                  <Form.Label>Especialidad que desarrolla</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.id_especialidad}
                    onChange={(e) => setFormData({ ...formData, id_especialidad: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar Especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                        {especialidad.nombre_especialidad}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* COLUMNA 3 */}
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Número de DUI</Form.Label>
                  <Form.Control
                    placeholder="00000000-0"
                    type="text"
                    value={formData.dui}
                    onChange={(e) => {
                      const regex = /^[0-9]{0,8}(-[0-9]{0,1})?$/; // Permite 8 dígitos seguidos de un guion obligao y 1 dígito
                      if (regex.test(e.target.value)) {
                        setFormData({ ...formData, dui: e.target.value });
                      }
                    }}
                    maxLength={10} // Limita a 10 caracteres (00000000-0)
                    disabled={!!formData.id_usuario} // Deshabilita el campo si hay un ID (si hay id de usuario en la row)
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    placeholder="Crear contraseña"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.sexo}
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.id_rol}
                    onChange={(e) => setFormData({ ...formData, id_rol: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar Un Rol</option>
                    {roles.map((rol) => (
                      <option key={rol.id_rol} value={rol.id_rol}>
                        {rol.nombre_rol}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Área</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.id_area}
                    onChange={(e) => setFormData({ ...formData, id_area: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar área</option>
                    {areas.map((area) => (
                      <option key={area.id_area} value={area.id_area}>
                        {area.nombre_area}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" type="submit">
                {editingId ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Personal;
