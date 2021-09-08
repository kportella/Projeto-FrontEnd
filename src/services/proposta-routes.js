import api from './api'

export async function EnvioProposta(proposta) {
    const response = api.post("/proposta", {
        TreinaClientesEntity: proposta.TreinaClientesEntity,
        TreinaPropostasEntity: proposta.TreinaPropostasEntity
    },
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    )
    return response
}

export async function VerificarSituacao(situacao, setDescricaoSituacao) {
    api.get(`/situacaoproposta/${situacao}`,
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    ).then(resp => setDescricaoSituacao(resp.data.descricao))
}

export async function TodasDescricoes() {
    const response = api.get('/situacaoproposta',
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    )

    return response;

}

export async function PegarTodasPropostas() {
    const response = api.get(`/proposta/usuario/${sessionStorage.usuario}`,
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    )

    return response
}

export async function ConsultarCPF(cpf) {
    const response = api.get(`proposta/${cpf}`,
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    )

    return (await response).data
}

export async function ConsultarCEP(body) {
    if (body.CEP !== "") {
        let validaCep = /^[0-9]{8}$/;
        if (validaCep.test(body.CEP)) {
            const response = api.post('http://localhost:5000/api/cep',
                {
                    CEP: body.CEP
                },
                {
                    headers: { Authorization: 'Bearer ' + sessionStorage.token }
                }
            )
            if (!("erro" in (await response).data)) {
                console.log('entrou')
                return (await response).data
            }
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
    const response = api.get('/conveniada',
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        }
    )

    return (await response).data;
}

export async function CalcularValor(param) {
    const response = api.post('/calcularproposta',
        {
            Prazo: param.Prazo,
            Vlr_Solicitado: param.Vlr_Solicitado
        },
        {
            headers: { Authorization: 'Bearer ' + sessionStorage.token }
        })

    return (await response).data
}

