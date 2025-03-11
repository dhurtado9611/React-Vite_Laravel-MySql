import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Reservas() {
  const [form, setForm] = useState({
    vehiculo: "",
    placa: "",
    habitacion: "",
    valor: "",
    observaciones: "",
    horaEntrada: "",
    horaSalidaMaxima: "",
    horaSalida: "",
  });

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "danger" | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Calcular hora de salida máxima al seleccionar hora de entrada
    if (name === "horaEntrada" && value) {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setHours(date.getHours() + 4);

      const horaSalidaMaxima = date.toTimeString().slice(0, 5);
      setForm((prev) => ({ ...prev, horaSalidaMaxima }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/reservas", form);

      // Mostrar mensaje de éxito
      setMensaje("Reserva creada con éxito");
      setTipoMensaje("success");

      // Limpiar formulario
      setForm({
        vehiculo: "",
        placa: "",
        habitacion: "",
        valor: "",
        observaciones: "",
        horaEntrada: "",
        horaSalidaMaxima: "",
        horaSalida: "",
      });
    } catch (error) {
      console.error("Error al crear la reserva", error);
      setMensaje("Error al crear la reserva. Verifica los datos.");
      setTipoMensaje("danger");
    }

    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      setMensaje(null);
      setTipoMensaje(null);
    }, 5000);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl w-100 mb-4">
      <h2 className="text-center text-primary mb-4">Reserva tu espacio</h2>

      {/* Alerta de éxito o error */}
      {mensaje && (
        <div className={`alert alert-${tipoMensaje} text-center`} role="alert">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Vehículo */}
        <div className="mb-3">
          <label className="form-label">Vehículo</label>
          <select
            name="vehiculo"
            value={form.vehiculo}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="sin definir">Sin definir</option>
          </select>
        </div>

        {/* Placa */}
        <div className="mb-3">
          <label className="form-label">Placa del vehículo</label>
          <input
            type="text"
            name="placa"
            value={form.placa}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej. ABC-123"
            required
          />
        </div>

        {/* Habitación */}
        <div className="mb-3">
          <label className="form-label">Habitación</label>
          <input
            type="number"
            name="habitacion"
            value={form.habitacion}
            onChange={handleChange}
            className="form-control"
            min="1"
            max="16"
            required
          />
        </div>

        {/* Valor */}
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej. 50000"
            required
          />
        </div>

        {/* Observaciones */}
        <div className="mb-3">
          <label className="form-label">Observaciones</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="form-control"
            rows={3}
            placeholder="Escribe observaciones (opcional)"
          />
        </div>

        {/* Hora de entrada y salida */}
        <div className="row">
          {/* Hora de entrada */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Hora de entrada</label>
            <input
              type="time"
              name="horaEntrada"
              value={form.horaEntrada}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Hora de salida máxima (calculada) */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Hora de salida máxima</label>
            <input
              type="time"
              name="horaSalidaMaxima"
              value={form.horaSalidaMaxima}
              className="form-control"
              disabled
            />
          </div>

          {/* Hora de salida */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Hora de salida</label>
            <input
              type="time"
              name="horaSalida"
              value={form.horaSalida}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}

export default Reservas;
