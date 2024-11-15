import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from 'components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Personal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [areas, setAreas] = useState([]);

  const [formData, setFormData] = useState({
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
      cargarDatos();
    }
  }, [user, navigate]);

  // Cargar usuarios
  const listarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8081/usuarios/listar', { withCredentials: true });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
    }
  };

  // Cargar roles, especialidades y áreas
  const cargarDatos = async () => {
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
      id_rol: '',
      id_especialidad: '',
      id_area: ''
    });
    setShowModal(true);
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h3>Gestión de Usuarios</h3>
          <Button variant="primary" onClick={handleAdd}>
            Agregar Usuario
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* Encabezados */}
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DUI</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Dirección</th>
            <th>Fecha</th>
            <th>Sexo</th>
            <th>N° Seguro</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Especialidad</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.dui}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.email}</td>
              <td>{usuario.password}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.fecha_nacimiento}</td>
              <td>{usuario.sexo}</td>
              <td>{usuario.numero_seguro_social}</td>
              <td>{usuario.estado}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.especialidad}</td>
              <td>{usuario.area}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(usuario)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(usuario.id_usuario)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>DUI</Form.Label>
              <Form.Control type="text" value={formData.dui} onChange={(e) => setFormData({ ...formData, dui: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Form.Control as="select" value={formData.sexo} onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}>
                <option value="">Seleccionar sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Número de Seguro Social</Form.Label>
              <Form.Control
                type="text"
                value={formData.numero_seguro_social}
                onChange={(e) => setFormData({ ...formData, numero_seguro_social: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </Form.Control>
            </Form.Group>

            {/* Select de Rol */}
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control as="select" value={formData.id_rol} onChange={(e) => setFormData({ ...formData, id_rol: e.target.value })}>
                <option value="">Seleccionar rol</option>
                {roles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Select de Especialidad */}
            <Form.Group>
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                as="select"
                value={formData.id_especialidad}
                onChange={(e) => setFormData({ ...formData, id_especialidad: e.target.value })}
              >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                    {especialidad.nombre_especialidad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Select de Área */}
            <Form.Group>
              <Form.Label>Área</Form.Label>
              <Form.Control as="select" value={formData.id_area} onChange={(e) => setFormData({ ...formData, id_area: e.target.value })}>
                <option value="">Seleccionar área</option>
                {areas.map((area) => (
                  <option key={area.id_area} value={area.id_area}>
                    {area.nombre_area}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editingId ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Personal;
