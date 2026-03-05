import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchVehicles, formatPrice, getImageUrl } from '../../api/vehicles'
import styles from './FeaturedVehicles.module.scss'

export default function FeaturedVehicles() {
    const [vehicles, setVehicles] = useState([])
    const [store, setStore] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchVehicles()
            .then(data => {
                setVehicles(data.vehicles?.slice(0, 8) || [])
                setStore(data.store || null)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const symbol = store?.currencySymbol || 'L'

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Recién Llegados</h2>
                    <Link to="/vehiculos" className={styles.viewAll}>Ver Todo →</Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>Cargando vehículos...</div>
                ) : (
                    <div className={styles.grid}>
                        {vehicles.map((v) => {
                            const img = getImageUrl(v)
                            return (
                                <Link to={`/vehiculos/${v.publicId}`} key={v.id} className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        {img ? (
                                            <img src={img} alt={v.title || 'Vehículo'} className={styles.image} />
                                        ) : (
                                            <div className={styles.noImage}>📷</div>
                                        )}
                                        {v.offerPrice && (
                                            <span className={styles.badge}>{formatPrice(v.offerPrice, symbol)}</span>
                                        )}
                                        {!v.offerPrice && v.price && (
                                            <span className={styles.badgePrice}>{formatPrice(v.price, symbol)}</span>
                                        )}
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>{v.title || `${v.brand?.name} ${v.model?.name}`}</h3>
                                        <p className={styles.meta}>
                                            {v.year || '-'} • {v.mileage ? `${v.mileage.toLocaleString()} km` : '-'}
                                        </p>
                                        <div className={styles.tags}>
                                            {v.transmission && <span className={styles.tag}>{v.transmission}</span>}
                                            {v.colorRef?.name && <span className={styles.tag}>{v.colorRef.name}</span>}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
