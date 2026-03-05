import { Link } from 'react-router-dom'
import styles from './HeroVideo.module.scss'

export default function HeroVideo() {
    return (
        <section className={styles.hero}>
            <video
                className={styles.video}
                autoPlay
                muted
                loop
                playsInline
                src="/video-placeholder.mp4"
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
                <h1 className={styles.title}>Encuentra tu próximo vehículo</h1>
                <p className={styles.subtitle}>Compra y vende autos de forma fácil, rápida y segura.</p>
                <Link to="/vehiculos" className={styles.cta}>
                    Ver Inventario →
                </Link>
            </div>
        </section>
    )
}
