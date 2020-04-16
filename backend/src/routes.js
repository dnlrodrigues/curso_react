const express = require('express');

const routes = express.Router();

routes.get('/users/:id', (request, response) => {
    const query = request.query;
    const params = request.params;

    return response.json({
        evento: 'Semana OmniStack',
        aluna: 'Daniela',
        queryParams: query,
        params: params
    });
});

routes.post('/users', (request, response) => {
    const body = request.body;

    console.log(body);

    return response.json({
        usuario: body
    });
});

routes.post('/ongs', (request, response) => {
    const body = request.body;

    console.log(body);
    let resp = body;
    resp.id = 1;
    return response.json(resp);
});

routes.get('/profile', (request, response) => {
    let incidents = [];
    incidents.push({
        id: 1,
        name: 'APAD',
        title: 'Cadelinha tristonha',
        description: "Cadelinha está tristonha e precisa de ajuda",
        whatsapp: '+5544998012133',
        email: 'dani.22fg@gmail.com',
        value: 120
    });
    incidents.push({
        id: 2,
        name: 'APAD',
        title: 'Caso teste 1',
        description: "Descrição caso teste 1",
        whatsapp: '+5544998012133',
        email: 'dani.22fg@gmail.com',
        value: 120
    });
    incidents.push({
        id: 3,
        name: 'APAD',
        title: 'Caso teste 2',
        whatsapp: '+5544998012133',
        email: 'dani.22fg@gmail.com',
        description: "Descrição caso teste 2",
        value: 200
    });
    incidents.push({
        id: 4,
        name: 'APAD',
        title: 'Caso teste 3',
        description: "Descrição caso teste 3",
        whatsapp: '+5544998012133',
        email: 'dani.22fg@gmail.com',
        value: 50
    });
    return response.json(incidents);
});

routes.delete('/incidents/:id', (request, response) => {    
    return response.json({});
});

routes.post('/sessions', (request, response) => {
    let resp = {id : 1 , name: "Ong Teste 1"};
    console.log(request);
    
    return response.json({resp});
});

routes.post('/incidents', (request, response) => {
    return response.json();
})

module.exports = routes;