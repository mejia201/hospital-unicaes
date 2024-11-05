import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from 'components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Personal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  // Redirigir al login si no hay token de autenticación
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      listarUsuarios();
    }
  }, [user, navigate]);

  // Función para listar usuarios
  const listarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usuarios/listar', {
        headers: {
          Authorization: `Bearer ${user}`
        }
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
    }
  };

  // Función para manejar el envío del formulario (agregar o actualizar usuario)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingId
        ? `http://localhost:3000/api/usuarios/actualizar/${editingId}`
        : 'http://localhost:3000/api/usuarios/registrar';
      const method = editingId ? 'put' : 'post';

      await axios[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${user}`
        }
      });
      listarUsuarios();
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  // Función para manejar el cambio de estado (eliminar)
  const handleDelete = async (id) => {
    try {
      await axios.patch(
        'http://localhost:3000/api/usuarios/cambiar-estado',
        { id, estado: 'inactivo' },
        {
          headers: {
            Authorization: `Bearer ${user}`
          }
        }
      );
      listarUsuarios();
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  // Función para abrir el modal con datos de usuario (en caso de edición)
  const handleEdit = (usuario) => {
    setEditingId(usuario.id_usuario);
    setFormData(usuario);
    setShowModal(true);
  };

  // Función para abrir el modal vacío para agregar usuario
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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DUI</th>
            <th>Teléfono</th>
            <th>Email</th>
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
            {/* Agrega más campos según tu estructura de datos */}
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
