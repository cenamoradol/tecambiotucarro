import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🚗</span>
                    <span className={styles.logoText}>Te Cambio Tu Carro</span>
                </Link>

                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Ej. Honda CRV 2017"
                        className={styles.searchInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                                window.location.href = `/vehiculos?search=${encodeURIComponent(e.target.value.trim())}`
                            }
                        }}
                    />
                </div>

                <div className={styles.links}>
                    <Link to="/vehiculos" className={`${styles.link} ${pathname === '/vehiculos' ? styles.active : ''}`}>
                        Vehículos
                    </Link>
                    <a href="#vender" className={styles.link}>Vender</a>
                    <Link to="#" className={styles.btnLogin}>Ingresar</Link>
                </div>
            </div>
        </nav>
    )
}
