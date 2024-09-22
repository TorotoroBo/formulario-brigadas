import React, { useState } from 'react';

type Registro = {
  tipo: 'salida' | 'retorno';
  fecha: string;
  hora: string;
  lugar: string;
  responsables: string[];
  voluntarios: string[];
  novedades?: string;
};

export default function FormularioBrigadas() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [tipoFormulario, setTipoFormulario] = useState<'salida' | 'retorno'>('salida');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [responsables, setResponsables] = useState('');
  const [voluntarios, setVoluntarios] = useState('');
  const [novedades, setNovedades] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoRegistro: Registro = {
      tipo: tipoFormulario,
      fecha,
      hora,
      lugar,
      responsables: responsables.split('\n'),
      voluntarios: voluntarios.split('\n'),
      ...(tipoFormulario === 'retorno' && { novedades }),
    };
    setRegistros([...registros, nuevoRegistro]);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFecha('');
    setHora('');
    setLugar('');
    setResponsables('');
    setVoluntarios('');
    setNovedades('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulario de Brigadas</h1>
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 rounded ${tipoFormulario === 'salida' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTipoFormulario('salida')}
        >
          Salida
        </button>
        <button 
          className={`px-4 py-2 rounded ${tipoFormulario === 'retorno' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTipoFormulario('retorno')}
        >
          Retorno
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Lugar</label>
          <input
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Responsables (uno por línea)</label>
          <textarea
            value={responsables}
            onChange={(e) => setResponsables(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={3}
          ></textarea>
        </div>
        {tipoFormulario === 'salida' && (
          <div>
            <label className="block mb-1">Voluntarios (uno por línea)</label>
            <textarea
              value={voluntarios}
              onChange={(e) => setVoluntarios(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              rows={3}
            ></textarea>
          </div>
        )}
        {tipoFormulario === 'retorno' && (
          <div>
            <label className="block mb-1">Novedades</label>
            <textarea
              value={novedades}
              onChange={(e) => setNovedades(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            ></textarea>
          </div>
        )}
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Guardar Registro
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Registros</h2>
        <div className="space-y-4">
          {registros.map((registro, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold">{registro.tipo === 'salida' ? 'Salida' : 'Retorno'}</h3>
              <p>Fecha: {registro.fecha}</p>
              <p>Hora: {registro.hora}</p>
              <p>Lugar: {registro.lugar}</p>
              <h4 className="font-semibold mt-2">Responsables:</h4>
              <ul>
                {registro.responsables.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
              {registro.tipo === 'salida' && (
                <>
                  <h4 className="font-semibold mt-2">Voluntarios:</h4>
                  <ul>
                    {registro.voluntarios.map((vol, i) => (
                      <li key={i}>{vol}</li>
                    ))}
                  </ul>
                </>
              )}
              {registro.tipo === 'retorno' && registro.novedades && (
                <p className="mt-2"><strong>Novedades:</strong> {registro.novedades}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
