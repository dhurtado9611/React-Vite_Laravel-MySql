import { useEffect, useState } from 'react';
import axios from 'axios';

interface Reserva {
  id: number;
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
}

const Home = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get<Reserva[]>('http://127.0.0.1:8000/reservas', {
          headers: {
            Accept: 'application/json'
          }
        });
        setReservas(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar las reservas. Intenta de nuevo más tarde.');
      }
    };

    fetchReservas();
  }, []);

  return (
    <div>
      <h1>Lista de Reservas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nombre}</td>
              <td>{reserva.email}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
