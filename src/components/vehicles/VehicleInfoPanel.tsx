import React from 'react';
import { Vehicle } from '@/components/vehicles/VehicleCard';
import { Clock, Gauge, Settings, Fuel, Calendar, Info, MapPin } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/api/vehicles';

interface VehicleInfoPanelProps {
    vehicle: Vehicle;
}

// Helper: solo renderiza un spec si tiene valor real
function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value?: string | number | null }) {
    if (!value && value !== 0) return null;
    return (
        <div className="bg-background-light p-4 rounded-xl flex flex-col items-start gap-2 group hover:bg-[#e7f3ec] transition-colors duration-300">
            <div className="p-2 rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">{label}</p>
                <p className="text-base font-bold text-text-main">{value}</p>
            </div>
        </div>
    );
}

export default function VehicleInfoPanel({ vehicle }: VehicleInfoPanelProps) {
    const currency = vehicle.currency || 'HNL';

    // Construir la lista de specs solo con campos que tengan valor
    const specs = [
        { icon: Gauge, label: 'Kilometraje', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString('es-HN')} km` : null },
        { icon: Settings, label: 'Transmisión', value: vehicle.transmission || null },
        { icon: Fuel, label: 'Combustible', value: vehicle.fuelType || null },
        { icon: Calendar, label: 'Año', value: vehicle.year || null },
    ].filter(s => s.value !== null);

    return (
        <div className="w-full relative lg:w-[60%]">
            <div className="sticky top-24 flex flex-col gap-6 lg:gap-8 bg-surface rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100">

                {/* Header & Price */}
                <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
                    <div className="flex items-start justify-between">
                        {vehicle.badge && (
                            <span className="bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {vehicle.badge}
                            </span>
                        )}
                        <span className="text-text-muted text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> Activo
                        </span>
                    </div>
                    {vehicle.title && (
                        <h1 className="text-3xl lg:text-4xl font-bold text-text-main leading-tight mt-2">
                            {vehicle.title}
                        </h1>
                    )}
                    {vehicle.price > 0 && (
                        <div className="flex items-end gap-3 mt-1">
                            <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                                {formatPrice(vehicle.price, currency)}
                            </h2>
                            {vehicle.offerPrice && (
                                <span className="text-text-muted line-through text-lg mb-1">
                                    {formatPrice(vehicle.offerPrice, currency)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Specs Grid — solo muestra campos con valor */}
                {specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-3">
                        {specs.map((spec, i) => (
                            <SpecCard key={i} icon={spec.icon} label={spec.label} value={spec.value} />
                        ))}
                    </div>
                )}

                {/* Description — solo si tiene contenido real */}
                {vehicle.description && vehicle.description.trim() !== '' && (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            Descripción Detallada
                        </h3>
                        <div className="p-4 bg-background-light rounded-xl">
                            <p className="text-text-main whitespace-pre-wrap leading-relaxed text-sm">
                                {vehicle.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <button className="w-full h-16 bg-whatsapp hover:brightness-105 text-white rounded-full flex items-center justify-center gap-3 font-bold text-lg shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group shadow-primary/20">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                    </svg>
                    <span>Contactar Vendedor</span>
                </button>
            </div>
        </div>
    );
}
