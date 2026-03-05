import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchVehicles, formatPrice, getImageUrl } from '../api/vehicles'
import styles from './Listing.module.scss'

export default function Listing() {
    const [searchParams] = useSearchParams()
    const [allVehicles, setAllVehicles] = useState([])
    const [store, setStore] = useState(null)
    const [loading, setLoading] = useState(true)

    // Filters
    const [brandFilter, setBrandFilter] = useState('')
    const [yearMin, setYearMin] = useState('')
    const [yearMax, setYearMax] = useState('')
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
    const [transmissionFilter, setTransmissionFilter] = useState('')
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    useEffect(() => {
        fetchVehicles()
            .then(data => {
                setAllVehicles(data.vehicles || [])
                setStore(data.store || null)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const symbol = store?.currencySymbol || 'L'

    // Extract unique brands
    const brands = useMemo(() => {
        const names = [...new Set(allVehicles.map(v => v.brand?.name).filter(Boolean))]
        return names.sort()
    }, [allVehicles])

    // Filtered
    const filtered = useMemo(() => {
        return allVehicles.filter(v => {
            if (brandFilter && v.brand?.name !== brandFilter) return false
            if (yearMin && v.year && v.year < parseInt(yearMin)) return false
            if (yearMax && v.year && v.year > parseInt(yearMax)) return false
            if (priceMin && v.price && parseFloat(v.price) < parseFloat(priceMin)) return false
            if (priceMax && v.price && parseFloat(v.price) > parseFloat(priceMax)) return false
            if (transmissionFilter && v.transmission?.toLowerCase() !== transmissionFilter.toLowerCase()) return false
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                const haystack = `${v.title || ''} ${v.brand?.name || ''} ${v.model?.name || ''}`.toLowerCase()
                if (!haystack.includes(q)) return false
            }
            return true
        })
    }, [allVehicles, brandFilter, yearMin, yearMax, priceMin, priceMax, transmissionFilter, searchQuery])

    function clearFilters() {
        setBrandFilter('')
        setYearMin('')
        setYearMax('')
        setPriceMin('')
        setPriceMax('')
        setTransmissionFilter('')
        setSearchQuery('')
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h3 className={styles.sidebarTitle}>⚙️ Filtros</h3>
                        <button className={styles.clearBtn} onClick={clearFilters}>Borrar todo</button>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>MARCA</label>
                        <select
                            className={styles.filterSelect}
                            value={brandFilter}
                            onChange={e => setBrandFilter(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>PRECIO</label>
                        <div className={styles.rangeRow}>
                            <input
                                type="number"
                                placeholder="Min"
                                className={styles.filterInput}
                                value={priceMin}
                                onChange={e => setPriceMin(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className={styles.filterInput}
                                value={priceMax}
                                onChange={e => setPriceMax(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>AÑO</label>
                        <div className={styles.rangeRow}>
                            <input
                                type="number"
                                placeholder="Desde"
                                className={styles.filterInput}
                                value={yearMin}
                                onChange={e => setYearMin(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Hasta"
                                className={styles.filterInput}
                                value={yearMax}
                                onChange={e => setYearMax(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>TRANSMISIÓN</label>
                        <select
                            className={styles.filterSelect}
                            value={transmissionFilter}
                            onChange={e => setTransmissionFilter(e.target.value)}
                        >
                            <option value="">Todas</option>
                            <option value="Automática">Automática</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    <div className={styles.sellBanner}>
                        <h4>¿Vendes tu auto?</h4>
                        <p>Publícalo hoy y recibe ofertas al instante.</p>
                        <a href="#vender" className={styles.sellBtn}>Vender Ahora</a>
                    </div>
                </aside>

                {/* Vehicle Grid */}
                <div className={styles.main}>
                    <div className={styles.searchBarMobile}>
                        <input
                            type="text"
                            placeholder="Buscar vehículo..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className={styles.loading}>Cargando vehículos...</div>
                    ) : filtered.length === 0 ? (
                        <div className={styles.empty}>No se encontraron vehículos con estos filtros.</div>
                    ) : (
                        <div className={styles.grid}>
                            {filtered.map((v) => {
                                const img = getImageUrl(v)
                                return (
                                    <Link to={`/vehiculos/${v.publicId}`} key={v.id} className={styles.card}>
                                        <div className={styles.imageWrap}>
                                            {img ? (
                                                <img src={img} alt={v.title || 'Vehículo'} className={styles.image} />
                                            ) : (
                                                <div className={styles.noImage}>📷</div>
                                            )}
                                            {v.offerPrice && <span className={styles.offerBadge}>OFERTA</span>}
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h3 className={styles.cardTitle}>{v.title || `${v.brand?.name} ${v.model?.name}`}</h3>
                                            <p className={styles.cardMeta}>
                                                {v.year || '-'} • {v.mileage ? `${v.mileage.toLocaleString()} km` : '-'}
                                            </p>
                                            <div className={styles.cardFooter}>
                                                <span className={styles.price}>{formatPrice(v.offerPrice || v.price, symbol)}</span>
                                                {v.branch?.name && (
                                                    <span className={styles.location}>📍 {v.branch.name}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
