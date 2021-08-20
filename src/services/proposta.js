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
        console.log(localStorage.getItem('token'))
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
                return "CEP não encontrado";
            }
        }
        else {
            return "Formato de CEP inválido";
        }
    }
    else {
        return "CEP vazio"
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


export function calcularIdade(dataNascimento) {
    const anoNascimento = dataNascimento.getFullYear();
    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate()

    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const mesAtual = dataAtual.getMonth() + 1
    const diaAtual = dataAtual.getDate()

    let quantos_anos = anoAtual - anoNascimento;

    if (mesAtual < mesNascimento || mesAtual == mesNascimento && diaAtual < diaNascimento) {
        quantos_anos--;
    }
    if (quantos_anos >= 18) {
        return true
    }
    else {
        return false
    }
}
