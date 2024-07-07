// Este componente de preact es el encargado de mostrar el ahorcado dinamico en la pantalla.
// Recibe un parametro que es el intento actual del usuario, y en base a eso muestra un componente de 
// Astro diferente. Son 7 en total y están ubicados en ../components/gallow

import { useEffect, useState } from 'preact/hooks';

import {gallow_1} from './gallow/gallow_2.astro';

const Gallow = ({ attempt }) => {

    return (
        <div>
            {gallow_1}
        </div>
    );

}

export default Gallow;

