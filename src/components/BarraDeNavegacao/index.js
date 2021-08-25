import './BarraDeNavegacao.css'

function BarraDeNavegacao() {

    return (
        <div className="container">
            <header>
                <nav>
                    <div className='nav-container'>
                        <ul>
                            <li><a href='/cadastroproposta'>Cadastrar Cliente</a></li>
                            <li><a href='/consultarproposta'>Lista de Proposta</a></li>
                            <li><a href='/' onClick={() => sessionStorage.removeItem('token')}>Sair</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div >
    )
}

export default BarraDeNavegacao
