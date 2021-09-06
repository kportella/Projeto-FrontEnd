export async function EnvioProposta(proposta) {
    const response = await fetch('http://localhost:5000/api/proposta',
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }, body: JSON.stringify(proposta)
        }).then(e => e.json())
    return response;
}

export async function VerificarSituacao(situacao) {
    const response = await fetch(`http://localhost:5000/api/situacaoproposta/${situacao}`,
        {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(e => e.json())

    return response.descricao;
}

export async function TodasDescricoes() {
    const response = await fetch('http://localhost:5000/api/situacaoproposta', {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.token
        }
    }).then(e => e.json())
    return response
}

export async function PegarTodasPropostas() {
    const response = await fetch(`http://localhost:5000/api/proposta/usuario/${sessionStorage.usuario}`,
        {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(e => e.json())
    return response;
}

export async function ConsultarCPF(cpf) {
    const response = await fetch(`http://localhost:5000/api/proposta/${cpf}`,
        {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(e => e.json())
    return response;
}

export async function ConsultarCEP(body) {

    if (body.CEP !== "") {
        let validaCep = /^[0-9]{8}$/;
        if (validaCep.test(body.CEP)) {
            const response = await fetch('http://localhost:5000/api/cep', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.token
                }, body: JSON.stringify(body)
            }).then(e => e.json())

            if (!("erro" in response))
                return (response)
            else {
                return 1;
            }
        }
        else {
            return 2;
        }
    }
    else {
        return 3
    }
}

export async function ConsultarConveniada() {
    const response = await fetch('http://localhost:5000/api/conveniada', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.token
        }
    }).then(e => e.json());
    return response;
}

export async function CalcularValor(param) {
    const response = await fetch('http://localhost:5000/api/calcularproposta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.token
        }, body: JSON.stringify(param)
    });

    return await response.json();
}
