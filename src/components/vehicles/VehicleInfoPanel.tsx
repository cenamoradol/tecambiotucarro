'use client';

import React from 'react';
import { Vehicle } from '@/components/vehicles/VehicleCard';
import { Clock, Gauge, Settings, Fuel, Calendar, Info, Palette, CarFront, Activity } from 'lucide-react';
import { formatPrice } from '@/api/vehicles';

interface VehicleInfoPanelProps {
    vehicle: Vehicle;
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value?: string | number | null }) {
    if (!value && value !== 0) return null;
    return (
        <div className="bg-background-light p-4 rounded-sm flex flex-col items-start gap-2 group hover:bg-[#e7f3ec] transition-colors duration-300">
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

    const specs = [
        { icon: Gauge, label: 'Kilometraje', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString('es-HN')} km` : null },
        { icon: Settings, label: 'Transmisión', value: vehicle.transmission || null },
        { icon: Fuel, label: 'Combustible', value: vehicle.fuelType || null },
        { icon: Calendar, label: 'Año', value: vehicle.year || null },
        { icon: Palette, label: 'Color', value: vehicle.colorRef?.name || null },
        { icon: Activity, label: 'Motor', value: vehicle.engineSize ? `${vehicle.engineSize}L` : null },
        { icon: CarFront, label: 'Tipo', value: vehicle.vehicleType?.name || null },
    ].filter(s => s.value !== null);

    return (
        <div className="w-full relative lg:w-[60%]">
            <div className="sticky top-24 flex flex-col gap-6 lg:gap-8 bg-surface rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100">
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

                {specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-3">
                        {specs.map((spec, i) => (
                            <SpecCard key={i} icon={spec.icon} label={spec.label} value={spec.value} />
                        ))}
                    </div>
                )}

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
            </div>
        </div>
    );
}