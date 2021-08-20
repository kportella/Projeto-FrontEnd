export async function EnvioProposta(proposta, token) {
    const response = await fetch('http://localhost:5000/api/proposta',
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }, body: JSON.stringify(proposta)
        })
    return response;
}

export async function ConsultarCEP(body, token) {

    if (body.CEP !== "") {
        let validaCep = /^[0-9]{8}$/;
        if (validaCep.test(body.CEP)) {
            const response = await fetch('http://localhost:5000/api/cep', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token
                }, body: JSON.stringify(body)
            }).then(e => e.json())

            if (!("erro" in response))
                return (response)
            else {
                return 3;
            }
        }
        else {
            return (1);
        }
    }
    else {
        return (2)
    }
}

export async function ConsultarConveniada(token) {
    const response = await fetch('http://localhost:5000/api/conveniada', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        }
    }).then(e => e.json());
    return response;
}

export async function CalcularValor(param, token) {
    const response = await fetch('http://localhost:5000/api/calcularproposta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        }, body: JSON.stringify(param)
    });

    return await response.json();
}
