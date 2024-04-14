import http from 'k6/http';
import { check, sleep } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.1/index.js';

export let options = {
    vus: 10, // Número de usuarios virtuales simulando la carga
    duration: '30s', // Duración de la prueba
};

export default function () {
    // Datos para el formulario
    let formData = new FormData();
    formData.append('email', 'admin_becas@pruebas.com');
    formData.append('password', 'admin');

    // Cabeceras adicionales
    let headers = {
        'accept': 'application/json',
    };

    // Realizar la petición POST
    let res = http.post('http://127.0.0.1:8000/api/backoffice/v1/login', formData, { headers: headers });

    // Verificaciones (checks) para asegurarnos de que la petición se ejecuta correctamente
    check(res, {
        'is status 200': (r) => r.code === 200,
        'is the login successful': (r) => r.body.includes('access_token') // Ajusta esta línea según el mensaje de éxito esperado
    });

    // Tiempo de espera entre llamadas para simular un patrón de tráfico más realista
    sleep(1);
}