import styles from './SellForm.module.scss'

export default function SellForm() {
    return (
        <section id="vender" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.imageCol}>
                    <div className={styles.imagePlaceholder}>
                        <span>🤝</span>
                    </div>
                </div>
                <div className={styles.formCol}>
                    <span className={styles.eyebrow}>¿VENDES?</span>
                    <h2 className={styles.title}>Tu auto tiene valor. Véndelo hoy.</h2>
                    <p className={styles.subtitle}>
                        Recibe ofertas de compradores verificados en minutos, sin complicaciones.
                    </p>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className={styles.input}
                        />
                        <input
                            type="tel"
                            placeholder="Número telefónico"
                            className={styles.input}
                        />
                        <button type="submit" className={styles.cta}>
                            ¡VÉNDELO HOY MISMO!
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
