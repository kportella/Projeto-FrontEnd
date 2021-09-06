export function calcularIdade(dataNascimento) {
    console.log(dataNascimento)
    const anoNascimento = dataNascimento.getFullYear();
    const mesNascimento = dataNascimento.getMonth() + 1;
    const diaNascimento = dataNascimento.getDate()

    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const mesAtual = dataAtual.getMonth() + 1
    const diaAtual = dataAtual.getDate() - 1

    let quantos_anos = anoAtual - anoNascimento;

    if (mesAtual < mesNascimento || mesAtual == mesNascimento && diaAtual < diaNascimento) {
        quantos_anos--;
    }
    if (quantos_anos >= 18) {
        return true
    }
    else {
        if (anoNascimento > anoAtual) alert('Data futuro não permitido')
        else if (anoNascimento == anoAtual) {
            if (mesNascimento > mesAtual) alert('Data futuro não permitido')
            else if (mesAtual == mesNascimento) {
                if (diaNascimento > diaAtual) alert('Data futuro não permitida')
            }
        }
        else alert('Usuario menor de idade')
        return false
    }
}

export function ValidarCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    let CPFInvalido = true;

    if (strCPF.length < 11) return false

    for (let i = 0; i < strCPF.length; i++) {
        if (strCPF[0] != strCPF[i]) {
            CPFInvalido = false
            break;
        }
    }

    if (CPFInvalido) return false

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export const isEmpty = ((obj) => {
    const element = new Array;
    let aux = Object.entries(obj);
    for (let x = 0; x < aux.length; x++) {
        if (aux[x][1] === '' && aux[x][0] != 'Observacao' && aux[x][0] != 'Proposta') {
            element.push(aux[x][0])
        }
        else if (typeof aux[x][1] === 'number') {
            if (isNaN(aux[x][1])) element.push(aux[x][0])
        }
    }
    return element;
})

export const mCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}
