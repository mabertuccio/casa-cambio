let dataMoneda;
const API_URL = ("https://open.er-api.com/v6/latest");

fetch(API_URL)
    .then(respuesta => respuesta.json())
    .then(data => {
        dataMoneda = data;
        
        const keyMonedas = dataMoneda.rates;
        Object.keys(keyMonedas).forEach((key) => {
            agregarOpcionesBase(key, keyMonedas);
        });

        function actualizarTabla() {
            limpiarTablaValores();

            const opcionElegida = document.querySelector("#opciones-tabla").value;
            console.log(opcionElegida);
            Object.keys(keyMonedas).forEach((key) => {
                mostrarValoresActualizados(opcionElegida, key, keyMonedas);
            });
        }

        function mostrarValoresActualizados(opcionElegida, key, keyMonedas) {
            const $tr = document.createElement("tr");

            const $th = document.createElement("th");
            $th.textContent = `${key}`;

            const $td = document.createElement("td");
            $td.textContent = `${opcionElegida * keyMonedas[key]}`;

            $tr.appendChild($th);
            $tr.appendChild($td);

            const $tabla = document.querySelector("#cuerpo-tabla");
            $tabla.appendChild($tr);
        }

        const $tabla = document.querySelector("#opciones-tabla");

        $tabla.addEventListener("change", actualizarTabla);
    })
    .catch(error => console.error("Falló", error));

function agregarOpcionesBase(key, keyMonedas) {
    const nombresSelect = ["opciones-base", "opciones-convertir", "opciones-tabla"];

    for (let i = 0; i < nombresSelect.length; i++) {
        const $option = document.createElement("option");
        $option.textContent = `${key}`;
        $option.value = `${keyMonedas[key]}`;

        const $selectPadre = document.querySelector(`#${nombresSelect[i]}`);
        $selectPadre.appendChild($option);
    }
}

const $botonConvertir = document.querySelector("#boton-convertir");

$botonConvertir.onclick = () => {
    const importeIngresado = document.querySelector("#importe-dinero").value;
    const baseSeleccionada = document.querySelector("#opciones-convertir").value;
    const importeConvertido = importeIngresado * baseSeleccionada;

    mostrarMonedaConvertida(importeIngresado, importeConvertido);
}

function mostrarMonedaConvertida(importeIngresado, importeConvertido) {
    document.querySelector("#div-cantidad-convertida").classList.remove("oculto");

    document.querySelector("#importe").textContent = importeIngresado;
    document.querySelector("#base").textContent = ` ${$("#opcion-base option:selected").text()}`;
    document.querySelector("#importe-convertido").textContent = importeConvertido;
    document.querySelector("#base-convertido").textContent = ` ${$("#opcion-convertir option:selected").text()}`;
}

function limpiarTablaValores() {
    const $tabla = document.querySelector("#cuerpo-tabla");
    const $th = $tabla.querySelectorAll("th");
    const $td = $tabla.querySelectorAll("td");

    for (let i = 0; i < $th.length; i++) {
        $th[i].remove();
    }

    for (let i = 0; i < $td.length; i++) {
        $td[i].remove();
    }
}
