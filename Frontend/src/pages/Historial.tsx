import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Table, Spinner } from "react-bootstrap";

function Historial() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/reservas", {
          headers: {
            Accept: "application/json",
          },
        });
        setReservas(response.data);
      } catch (err) {
        console.error("Error al obtener reservas:", err);
        setError("Error al obtener reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Historial de Reservas</h2>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && reservas.length === 0 && (
        <Alert variant="info" className="text-center">
          No hay reservas registradas.
        </Alert>
      )}

      {!loading && reservas.length > 0 && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha</th>
              <th>Hora Entrada</th>
              <th>Hora Salida Máxima</th>
              <th>Hora Salida</th>
              <th>Vehículo</th>
              <th>Placa</th>
              <th>Habitación</th>
              <th>Valor</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.nombre}</td>
                <td>{reserva.email}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora_entrada}</td>
                <td>
                  {reserva.hora_entrada
                    ? new Date(
                        new Date(`1970-01-01T${reserva.hora_entrada}Z`).getTime() +
                          4 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .substr(11, 5)
                    : ""}
                </td>
                <td>{reserva.hora_salida || "Sin definir"}</td>
                <td>{reserva.vehiculo}</td>
                <td>{reserva.placa_vehiculo || "Sin definir"}</td>
                <td>{reserva.habitacion}</td>
                <td>{reserva.valor}</td>
                <td>{reserva.observaciones || "Sin observaciones"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Historial;
