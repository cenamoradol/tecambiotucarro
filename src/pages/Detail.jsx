import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { fetchVehicle, formatPrice, timeAgo } from '../api/vehicles'
import styles from './Detail.module.scss'

export default function Detail() {
    const { publicId } = useParams()
    const [vehicle, setVehicle] = useState(null)
    const [store, setStore] = useState(null)
    const [loading, setLoading] = useState(true)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchVehicle(publicId)
            .then(data => {
                setVehicle(data.vehicle)
                setStore(data.store)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [publicId])

    if (loading) return <div className={styles.loading}>Cargando...</div>
    if (!vehicle) return <div className={styles.loading}>Vehículo no encontrado.</div>

    const symbol = store?.currencySymbol || 'L'
    const images = vehicle.media || []
    const title = vehicle.title || `${vehicle.brand?.name} ${vehicle.model?.name}`

    const specs = [
        { icon: '📏', label: 'Kilometraje', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : '-' },
        { icon: '⚙️', label: 'Transmisión', value: vehicle.transmission || '-' },
        { icon: '⛽', label: 'Combustible', value: vehicle.fuelType || '-' },
        { icon: '📅', label: 'Año', value: vehicle.year || '-' },
        { icon: '🎨', label: 'Color', value: vehicle.colorRef?.name || '-' },
        { icon: '🔧', label: 'Motor', value: vehicle.engineSize ? `${vehicle.engineSize} L` : '-' },
    ]

    const descriptionLines = vehicle.description
        ? vehicle.description.split('\n').filter(l => l.trim())
        : []

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Gallery Column */}
                <div className={styles.galleryCol}>
                    <div className={styles.mainSwiper}>
                        <Swiper
                            modules={[Navigation, Thumbs, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            spaceBetween={0}
                            slidesPerView={1}
                            className={styles.swiperMain}
                        >
                            {images.length > 0 ? images.map((m, i) => (
                                <SwiperSlide key={m.id || i}>
                                    <div className={styles.slideWrap}>
                                        <img src={m.url} alt={`${title} - ${i + 1}`} className={styles.slideImg} />
                                    </div>
                                </SwiperSlide>
                            )) : (
                                <SwiperSlide>
                                    <div className={styles.slideWrap}>
                                        <div className={styles.noImage}>📷 Sin imágenes</div>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>

                    {images.length > 1 && (
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={8}
                            slidesPerView={4}
                            watchSlidesProgress
                            className={styles.swiperThumbs}
                        >
                            {images.map((m, i) => (
                                <SwiperSlide key={m.id || i}>
                                    <img src={m.url} alt={`thumb-${i}`} className={styles.thumb} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* Info Column */}
                <div className={styles.infoCol}>
                    <div className={styles.topRow}>
                        <span className={styles.badgeNew}>RECIÉN INGRESADO</span>
                        <span className={styles.timeAgo}>🕐 {timeAgo(vehicle.createdAt)}</span>
                    </div>

                    <h1 className={styles.title}>{title}</h1>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>{formatPrice(vehicle.offerPrice || vehicle.price, symbol)}</span>
                        {vehicle.offerPrice && vehicle.price && (
                            <span className={styles.priceOld}>{formatPrice(vehicle.price, symbol)}</span>
                        )}
                    </div>

                    {/* Specs Grid */}
                    <div className={styles.specsGrid}>
                        {specs.map(s => (
                            <div key={s.label} className={styles.specCard}>
                                <span className={styles.specIcon}>{s.icon}</span>
                                <span className={styles.specLabel}>{s.label}</span>
                                <span className={styles.specValue}>{s.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    {descriptionLines.length > 0 && (
                        <div className={styles.descriptionSection}>
                            <h3 className={styles.sectionTitle}>Detalles Destacados</h3>
                            <ul className={styles.detailsList}>
                                {descriptionLines.map((line, i) => (
                                    <li key={i} className={styles.detailItem}>
                                        <span className={styles.checkIcon}>✅</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Dealer Card */}
                    <div className={styles.dealerCard}>
                        <div className={styles.dealerInfo}>
                            <div className={styles.dealerAvatar}>{store?.name?.[0] || '🚗'}</div>
                            <div>
                                <strong className={styles.dealerName}>{store?.name || 'Concesionario'}</strong>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                        href="#"
                        className={styles.whatsappBtn}
                        onClick={e => e.preventDefault()}
                    >
                        💬 Chat con Vendedor
                    </a>

                    <Link to="/vehiculos" className={styles.backLink}>← Volver al inventario</Link>
                </div>
            </div>
        </div>
    )
}
