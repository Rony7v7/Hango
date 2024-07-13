// Este componente de preact es el encargado de mostrar el ahorcado dinamico en la pantalla.
// Recibe un parametro que es el intento actual del usuario, y en base a eso muestra un componente de 
// Astro diferente. Son 7 en total y están ubicados en /public/img/gallow

const Gallow = ({attempts}) => {
    if (attempts >= 8) {
        attempts --;
    }

    return (
        <img src={`/img/gallow/gallow_${attempts}.svg`} alt={`Gallow ${attempts}`} />
    );
}

// hango_client/public/img\gallow\Gallow_1.png

export default Gallow;