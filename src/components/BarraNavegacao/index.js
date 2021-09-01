import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Add, Search, ExitToApp } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BarraNavegacao.css'

function BarraNavegacao() {
    const [value, setValue] = useState(0);
    useEffect(() => {
        switch (window.location.href) {
            case ('http://localhost:3000/cadastroproposta'):
                setValue(0)
                break;
            case ('http://localhost:3000/consultarproposta'):
                setValue(1)
                break;
            case ('http://localhost:3000/'):
                setValue(2)
                break;
        }
    }, [])

    return (
        <BottomNavigation
            showLabels
            value={value}
            className='nav'
        >
            <BottomNavigationAction component={Link} to="/cadastroproposta" label='Cadastro' icon={<Add />} />
            <BottomNavigationAction component={Link} to="/consultarproposta" label='Consulta' icon={<Search />} />
            <BottomNavigationAction component={Link} to="/" label='Sair' icon={<ExitToApp />} />

        </BottomNavigation>
    )
}
export default BarraNavegacao
