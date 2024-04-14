import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
    vus: 5, // Número de usuarios virtuales
    duration: '1m', // Duración de la prueba de carga
};

export default function () {
    const url = 'http://127.0.0.1:8000/api/backoffice/v1/areas/2/show';
    const params = {
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDgwZDY0ODBmZGYwN2MwMGZlYWE0ZmY2ZjYzZGY2ZjUyNzhmZTQ1MzI4NzBjYzhlMTBiODAwYWM1ZDM4NDY2ODQwNjIxNWFlZTE4NmRhYTUiLCJpYXQiOjE3MTMwNTI4MzQuOTc2MTQxLCJuYmYiOjE3MTMwNTI4MzQuOTc2MTQzLCJleHAiOjE3MTM2NTc2MzQuOTY0Mzg4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.PPjyBmN7pHq3jI_cCt_FfoKTcLNC61sh1uRjA8sihiO2GC6orYXySilHwFA7x1SZYw7JQtaDp-CoD_pdRvA7pvfS3uawMAaVI_erDFg68ulQoylX53hHPCnnu0w0vS49D9awadtJ_nhCKVEhEOnYoh96IFqkjEPvOVF-tqks3cI8ekxGPJEQM2bx9RpCLU4qFSOvkrQgQef_1q4XvqqE-ECX27Gb9lDQ_qaluzXTfyjIjfZifMjuoCBHrbsgWs2agYZxVD5B4tamyB5BXUC-8n1TcGMtAjmap-WNn7acOEGSBUFRdItK7fsgBJkfx2BYJByiwNs2Lovzpbk54XpURa0bMHA-hsgrnFl_JH8PcyKLKmQ1SWtCe9VELF8d2SQQc7jy21VyurHYsAiYZK47gETMm3JMVqf0xP4Z8TCMNBor1rjtKpv7iIjfQSJ6t02V5OporQoGcDABxqEIIix_ET-xNN7SdSsX2BqSK32B-jo7mVq2dmx28P6RIED1pAWvAci8EOS_j_g44W5j7Yk2oerx7JZDcsKWs6W5W6St962jbUycsGPxWvxZmQSEKbifgRGiSsanUHkY-8C1EpYWFQcL2STZkg_6eTkTAoGal46Mp7Nof7At8a6j_TBNH7DbQHiTo7w0dgs9JzxPUfstDWBDfhUyhKliVshgZZjsH_M',
        }
    };

    // Realizando la petición GET
    let response = http.get(url, params);

    // Verificaciones para asegurar que la respuesta es correcta
    check(response, {
        'is status 200': r => r.status === 200,
        'response body is correct': r => {
            let body = JSON.parse(r.body);
            return body.data &&
                   body.data.id === 2 &&
                   body.data.nombre === "Cultura" &&
                   body.data.descripcion === "Area de desarrollo" &&
                   body.data.activo === 1; // Verificando que el campo activo es 1
        }
    });

    // Espera para simular tiempo de lectura del usuario
    sleep(1);
}