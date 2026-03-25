import React from 'react';
import Link from 'next/link';
import { Banknote, Gavel, Wrench, Mountain } from 'lucide-react';

const services =
    [
        {
            id: "eventos",
            href: "/en-remate",
            icon: Banknote,
            title: "Remates",
            description: "Eventos especiales con precios irresistibles.",
            buttonText: "Conoce más aquí",
            color: "#fcad0a",
            buttonBorder: "border-[#0b6b11]",
            buttonHoverBg: "hover:bg-[#0b6b11]",
            bgClasses: "bg-slate-950",
            gradientColor: "from-black/20 via-transparent to-black/60",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUpRu399An1GRpY43HtusHk7Tjqd1JQjXkENVp17A7eMr_Eszjjb0s8UEuaQZaXvXQ5Xt-pYgzF89UQZsBUF1fVSCFhE1jSR4cUZg91JG4LSZTtY8hsU-hKJTG582y2C-o1wjWWgFMO4J0ycBtuSN7VwPuQD9PF9CGUlIW4LIMN-RSyYkof1-iWXwt2FP-eFXzqtqYjKxkFMKm1clLT19t3E6oM7Dw8NmNR1635APgF3vlk1cSpLgdJqU6ughZlz1l4yE3P9DQ8id-"
        },
        {
            id: "subastas",
            href: "/subastas",
            icon: Gavel,
            title: "Subastas",
            description: "Modalidad dinámica competitiva de pujas de precios. El mejor postor se lleva su vehículo.",
            buttonText: "Entérate aquí",
            color: "#0b6b11",
            buttonBorder: "border-[#fcad0a]",
            buttonHoverBg: "hover:bg-[#fcad0a] hover:text-slate-900",
            bgClasses: "bg-slate-900",
            gradientColor: "from-black/40 via-transparent to-black/40",
            image: "/subasta.jpeg"
        },
        {
            id: "restauracion",
            href: "/restauracion",
            icon: Wrench,
            title: "Restauración",
            description: "Proyecto de recuperación integral de automóviles (mecánica y estética) basado en dinámica de redes sociales.",
            buttonText: "Explora más",
            color: "#fcad0a",
            buttonBorder: "border-[#0b6b11]",
            buttonHoverBg: "hover:bg-[#0b6b11]",
            bgClasses: "bg-slate-950",
            gradientColor: "from-black/60 to-transparent",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgiBBDXszn4He3ZUUreGgPzj6aPEqleYiEEPtuRZlBYG7vxQZZqgQg2SZhv45KN4rMMcEFCfeGANUv8NUKIRvC_pqc31iZl3SBTOSKrAmF94P9iLb2pzsobgfXiMSyyjNlpJ30vm5fbXjENpNE4eeqAcayRSebPyDpzylvNRvTD2HiL4Kjw3e-FRsBi8GOAQONtJsoMgbbxt1hTHIKHSRPQuV9yauLyM41NcHY7EWgTeXJXQK9C8mzm6FFYTsYpWvkUgZLkrTGT72m"
        },
        {
            id: "off-road",
            href: "/offroad",
            icon: Mountain,
            title: "Off Road",
            description: "Explora la adrenalina del 4x4 videos y momentos de eventos todoterreno.",
            buttonText: "Siente la adrenalina",
            color: "#0b6b11",
            buttonBorder: "border-[#fcad0a]",
            buttonHoverBg: "hover:bg-[#fcad0a] hover:text-slate-900",
            bgClasses: "bg-black",
            gradientColor: "opacity-30 mix-blend-color from-primary/10 to-transparent",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3xQIakMMo-CpdiRAYS_x-NG1Ds54ELO95wqfQeLsaFJBu11l1yke4AqTh7pTnZv8SFKB_GplAIEY3PRirniRs2Ck7E-0yV1YsXjM0SH0Mcc1GC9aA_Bh3irNR9ee81aBisHcL2xi2vm8gxmENJ20pxk9LLYvtnKBbO0l_0UWd0PLZ3G8ZbNqjun7jNbIZCT7RH3o5LwtfY6QfiLB6uzZWqPSQ1mWH7Ozg9CcPyMV-MlnusxJzBBzT6UZMv_AMEeDSBFRYo5R0fUKV"
        }
    ];

export default function ServicesSection() {
    return (
        <>
            {/* {services.map((svc) => (
                <section key={svc.id} id={svc.id} className={`relative group h-screen ${svc.bgClasses} overflow-hidden`}>
                    <Link href={svc.href} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
                        <svc.icon style={{ color: svc.color }} className="w-16 h-16 md:w-20 md:h-20 mb-6 transform group-hover:scale-110 transition-transform" />
                        <h3 className="text-6xl md:text-8xl font-black text-white mb-4 uppercase italic tracking-tighter drop-shadow-lg">{svc.title}</h3>
                        <p className="text-slate-200 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90 drop-shadow-md">
                            {svc.description}
                        </p>
                        <div className={`mt-10 px-10 py-3 border-2 ${svc.buttonBorder} text-white font-bold rounded-full ${svc.buttonHoverBg} transition-all uppercase tracking-widest text-sm italic backdrop-blur-sm bg-black/20`}>
                            {svc.buttonText}
                        </div>
                    </Link>
                    <div className={`absolute inset-0 bg-gradient-to-b ${svc.gradientColor} z-10 pointer-events-none`}></div>
                    <div
                        className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0 pointer-events-none"
                        style={{ backgroundImage: `url('${svc.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                </section>
            ))} */}
        </>
    );
}
