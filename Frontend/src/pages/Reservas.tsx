import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Reservas() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    fecha: "",
    hora: "",
  });

  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener reservas de la base de datos al cargar la página
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
        setError("Error al obtener reservas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reservas",
        form,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Si se guarda correctamente, añade la reserva al estado
      setReservas([...reservas, { id: response.data.id, ...form }]);
      setForm({ nombre: "", email: "", fecha: "", hora: "" }); // Limpia el formulario
      alert("Reserva creada con éxito");
    } catch (err) {
      console.error("Error al enviar la reserva:", err);
      setError("Error al crear la reserva. Verifica los datos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-8">
      {/* Formulario de reservas */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mb-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Reserva tu espacio</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Juan Pérez"
              value={form.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Ej. correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Hora</label>
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 active:scale-95 transition duration-300"
          >
            Reservar
          </button>
        </form>
      </div>

      {/* Lista de reservas */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Reservas Guardadas</h2>

        {loading ? (
          <p className="text-center text-gray-600">Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p className="text-center text-gray-600">No hay reservas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">Nombre</th>
                  <th className="py-2 px-4 border">Correo</th>
                  <th className="py-2 px-4 border">Fecha</th>
                  <th className="py-2 px-4 border">Hora</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id} className="text-center border-b hover:bg-gray-100">
                    <td className="py-2 px-4 border">{reserva.nombre}</td>
                    <td className="py-2 px-4 border">{reserva.email}</td>
                    <td className="py-2 px-4 border">{reserva.fecha}</td>
                    <td className="py-2 px-4 border">{reserva.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservas;
