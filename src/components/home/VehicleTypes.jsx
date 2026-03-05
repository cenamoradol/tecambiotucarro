import styles from './VehicleTypes.module.scss'

const types = [
    { icon: '🚙', label: 'Camioneta' },
    { icon: '🛻', label: 'Pickup' },
    { icon: '🚗', label: 'Turismo' },
    { icon: '🚐', label: 'SUV' },
    { icon: '🏎️', label: 'Deportivo' },
]

export default function VehicleTypes() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h3 className={styles.title}>Tipos de Vehículos</h3>
                <div className={styles.grid}>
                    {types.map((t) => (
                        <button key={t.label} className={styles.card}>
                            <span className={styles.icon}>{t.icon}</span>
                            <span className={styles.label}>{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
