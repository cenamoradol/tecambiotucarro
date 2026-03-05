import styles from './LocationMap.module.scss'

export default function LocationMap() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.mapCol}>
                    <iframe
                        className={styles.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8!2d-87.192!3d14.088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA1JzE2LjgiTiA4N8KwMTEnMzEuMiJX!5e0!3m2!1ses!2shn!4v1700000000000!5m2!1ses!2shn"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación del concesionario"
                    />
                </div>
                <div className={styles.infoCol}>
                    <div className={styles.infoCard}>
                        <span className={styles.eyebrow}>VISÍTANOS HOY</span>
                        <h3 className={styles.title}>Visítanos en Tegucigalpa</h3>

                        <div className={styles.detail}>
                            <span className={styles.detailIcon}>📍</span>
                            <div>
                                <strong>Dirección Física</strong>
                                <p>Blvd. Morazán, Edificio Platinum, Local #4, Tegucigalpa, Honduras</p>
                            </div>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.detailIcon}>🕐</span>
                            <div>
                                <strong>Horario de Atención</strong>
                                <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                <p>Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>

                        <a
                            href="https://maps.google.com/?q=14.088,-87.192"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cta}
                        >
                            Cómo llegar →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
