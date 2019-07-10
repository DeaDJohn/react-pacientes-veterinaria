import React, { Component } from 'react';
import uuid from "uuid";
import PropTypes from 'prop-types';

const stateInicial = {
    
    cita: {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    },
    error: false

}

class NuevaCita extends Component {
    state = { ...stateInicial }

    // Cuando el usuario escribe en los inputs
    handleChange = e =>{
        // console.log(e.target.name + ': ' +e.target.value);

        // colocar lo que el usuario escrie en el state
        this.setState({
            cita : {
                ...this.state.cita,
                [e.target.name] : e.target.value
            },
            error: false
        });
    }

    // Cuando el usuario envia el formulario
    handleSubmit = e => {
        e.preventDefault();


        // extraer los valores del state
        const { mascota, propietario, fecha, hora, sintomas} = this.state.cita;
        // Validad que todos los campos esten llenos
        if(mascota === '' || propietario === '' || fecha === '' || hora === '' ||  sintomas === ''){
            this.setState({
                error:true
            });

            // detener la ejecución
            return;
        }

        // generar objeto con los datos
        const nuevaCita = {...this.state.cita};
        nuevaCita.id = uuid();

        // Agregar la cita al state de App
        this.props.crearNuevaCita(nuevaCita);

        // Colocar en el state el stateInicial
        this.setState({...stateInicial});
    }

    render() {
        // extraer el valor del state
        const { error } = this.state;
        
        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Rellena el formulario para obtener una nueva cita.
                    </h2>
                    { error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null}
                    <form
                        onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label  className="col-sm-4 col-lg-2 col-form-label">
                                Nombre Mascota
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre mascota"
                                    name="mascota"
                                    onChange={this.handleChange}
                                    value={this.state.cita.mascota}/>
                            </div>
                        </div>{/* form grpuo */}

                        <div className="form-group row">
                            <label  className="col-sm-4 col-lg-2 col-form-label">
                                Nombre dueño
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre dueño mascota"
                                    name="propietario"
                                    onChange={this.handleChange}
                                    value={this.state.cita.propietario}/>
                            </div>
                        </div>{/* form grpuo */}
                        <div className="form-group row">
                            <label  className="col-sm-4 col-lg-2 col-form-label">
                                Fecha
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input 
                                    type="date" 
                                    className="form-control"
                                    name="fecha"
                                    onChange={this.handleChange}
                                    value={this.state.cita.fecha}/>
                            </div>

                            <label  className="col-sm-4 col-lg-2 col-form-label">
                                Hora
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input 
                                    type="time" 
                                    className="form-control"
                                    name="hora"
                                    onChange={this.handleChange}
                                    value={this.state.cita.hora}/>
                            </div>
                        </div>{/* form grpuo */}
                        <div className="form-group row">
                            <label  className="col-sm-4 col-lg-2 col-form-label">
                                Sintomas
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    placeholder="Describe los sintomas"
                                    onChange={this.handleChange}
                                    value={this.state.cita.sintomas}
                                ></textarea>
                            </div>
                        </div>{/* form grpuo */}
                        <div className="form-group row">
                            <div className="col-12 text-right">
                                <input type="submit" value="Agragar nueva cita" className="py-2 mt-2 btn btn-success"/>
                            </div>
                        </div>{/* form grpuo */}
                    </form>
                </div>
            </div>
        )
    }
}

NuevaCita.propTypes = {
    crearNuevaCita: PropTypes.func.isRequired
}

export default NuevaCita;