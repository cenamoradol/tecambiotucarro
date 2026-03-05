import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.logo}>🚗 Te Cambio Tu Carro</span>
                    <p className={styles.copy}>© {new Date().getFullYear()} Te Cambio Tu Carro. Todos los derechos reservados.</p>
                </div>
                <div className={styles.links}>
                    <Link to="#">Términos</Link>
                    <Link to="#">Privacidad</Link>
                    <Link to="#">Soporte</Link>
                </div>
            </div>
        </footer>
    )
}
