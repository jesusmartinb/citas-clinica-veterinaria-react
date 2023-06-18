/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [error, setError] = useState(false);

	useEffect(() => {
		if(Object.keys(paciente).length > 0) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha);
			setSintomas(paciente.sintomas);
		}
	}, [paciente])

	const generarId = () => {
		const random = Math.random().toString(36).substring(2);
		const fecha = Date.now().toString(36);

		return random + fecha;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validación del formulario
		if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
			console.log('Hay al menos un campo vacio');

			setError(true);
			return;
		}

		setError(false);

		// Objeto de paciente
		const objetoPaciente = {
			nombre, 
			propietario, 
			email, 
			fecha, 
			sintomas
		}

		if(paciente.id){
			// Editando el registro
			objetoPaciente.id = paciente.id;
			console.log(objetoPaciente);
			console.log(paciente);

			const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

			setPacientes(pacientesActualizados);
			setPaciente({});
		}else{
			// Nuevo registro
			// console.log(objetoPaciente)
			objetoPaciente.id = generarId();
			setPacientes([...pacientes, objetoPaciente]);
		}


		// Reiniciar formulario
		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');

	
	}



	return (
		<div className="md:w-1/2 lg:w-2/5 mx-5">
			<h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
			<p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''}
			<span className="text-indigo-600 font-bold">Administralos</span></p>

			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
				{ error && <Error><p>Todos los campos son obligatorios</p></Error> }
				<div className="mb-5">
					<label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
					<input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" name="" id="mascota" placeholder="Nombre de la Mascota" value={nombre} onChange={ (e) => setNombre(e.target.value) } />
				</div>
				<div className="mb-5">
					<label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
					<input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" name="" id="propietario" placeholder="Nombre del Propietario" value={propietario} onChange={ (e) => setPropietario(e.target.value) } />
				</div>
				<div className="mb-5">
					<label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
					<input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" name="" id="email" placeholder="Email Contacto Propietario" value={email} onChange={ (e) => setEmail(e.target.value) } />
				</div>
				<div className="mb-5">
					<label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
					<input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" name="" id="alta" value={fecha} onChange={ (e) => setFecha(e.target.value) } />
				</div>
				<div className="mb-5">
					<label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
					<textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" name="" id="sintomas" cols="30" rows="10" placeholder="Describe los Síntomas"  value={sintomas} onChange={ (e) => setSintomas(e.target.value) }></textarea>
				</div>
				<input className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md" type="submit" value={ paciente.id ? 'Editar Paciente' : 'Añadir Paciente' } />
			</form>
		</div>
	)
}

export default Formulario
