import { useEffect, useState } from 'react';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 5 + Math.floor((i * 83 + 23) % 90),
    y: 5 + Math.floor((i * 61 + 37) % 90),
    size: 1 + (i % 3),
    delay: (i * 0.12) % 2,
    dur: 3.2 + (i % 4) * 0.5,
    opacity: 0.15 + (i % 5) * 0.08,
}));

export default function SplashScreen({ onComplete }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 80);
        const t2 = setTimeout(() => setPhase(2), 450);
        const t3 = setTimeout(() => setPhase(3), 900);
        const t4 = setTimeout(() => setPhase(4), 1450);
        const t5 = setTimeout(() => onComplete(), 1850);
        return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{
                backgroundColor: '#050505',
                opacity: phase === 4 ? 0 : 1,
                transform: phase === 4 ? 'scale(1.03)' : 'scale(1)',
                transition: 'opacity 0.5s cubic-bezier(0.19,1,0.22,1), transform 0.5s cubic-bezier(0.19,1,0.22,1)',
            }}>

            {/* Grid - finer and more subtle */}
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
                `,
                backgroundSize: '64px 64px',
            }} />

            {/* Ambient radial glow */}
            <div className="absolute inset-0" style={{
                background: `
                    radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,255,255,0.04) 0%, transparent 60%),
                    radial-gradient(ellipse 50% 40% at 50% 55%, rgba(255,255,255,0.02) 0%, transparent 50%)
                `,
            }} />

            {/* Central glow burst */}
            <div style={{
                position: 'absolute',
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                opacity: phase >= 1 ? 1 : 0,
                transition: 'opacity 1.2s ease',
                pointerEvents: 'none',
            }} />

            {/* Particles */}
            {PARTICLES.map(p => (
                <div key={p.id} className="absolute rounded-full" style={{
                    width: p.size, height: p.size,
                    left: `${p.x}%`, top: `${p.y}%`,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.3)`,
                    opacity: phase >= 1 ? p.opacity : 0,
                    transition: `opacity 1s ${p.delay}s ease-out`,
                    animation: `floatSmooth ${p.dur}s ease-in-out ${p.delay}s infinite`,
                }} />
            ))}

            {/* Logo container */}
            <div style={{
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.94)',
                transition: 'all 0.85s cubic-bezier(0.19,1,0.22,1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                marginBottom: 36,
            }}>
                {/* Icon */}
                <div className="relative" style={{ width: 88, height: 88, marginBottom: 32 }}>
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 rounded-2xl"
                        style={{
                            border: '1px solid rgba(255,255,255,0.06)',
                            animation: 'spinSlow 20s linear infinite',
                            transform: 'scale(1.15)',
                        }} />

                    {/* Middle rotating ring - opposite direction */}
                    <div className="absolute inset-0 rounded-2xl"
                        style={{
                            border: '1px solid rgba(255,255,255,0.04)',
                            animation: 'spinSlowReverse 25s linear infinite',
                            transform: 'scale(1.25)',
                        }} />

                    {/* Glow backdrop */}
                    <div className="absolute inset-0 rounded-2xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                            transform: 'scale(1.4)',
                            opacity: phase >= 2 ? 1 : 0,
                            transition: 'opacity 0.8s ease 0.2s',
                        }} />

                    {/* Main icon box */}
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: `
                                0 0 0 1px rgba(255,255,255,0.05),
                                0 4px 24px rgba(0,0,0,0.6),
                                inset 0 1px 0 rgba(255,255,255,0.08)
                            `,
                        }}>
                        {/* Icon with animation */}
                        <div style={{
                            opacity: phase >= 2 ? 1 : 0,
                            transform: phase >= 2 ? 'scale(1)' : 'scale(0.8)',
                            transition: 'all 0.6s cubic-bezier(0.19,1,0.22,1) 0.15s',
                        }}>
                            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                                <path d="M8 9h16" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
                                <path d="M8 16h11" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
                                <path d="M8 23h13" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
                                <circle cx="27" cy="23" r="4" fill="rgba(255,255,255,0.95)" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Brand name */}
                <div style={{
                    opacity: phase >= 2 ? 1 : 0,
                    transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.7s cubic-bezier(0.19,1,0.22,1) 0.2s',
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontSize: 36,
                        fontWeight: 800,
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        letterSpacing: '-0.05em',
                        color: '#ffffff',
                        lineHeight: 1,
                        marginBottom: 12,
                        textRendering: 'geometricPrecision',
                    }}>
                        Truvornex
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.32)',
                        fontSize: 10.5,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        opacity: phase >= 3 ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.35s',
                    }}>
                        Powered by Simon AI
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                width: 120, height: 2,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: 999, overflow: 'hidden',
                opacity: phase >= 2 ? 1 : 0,
                transition: 'opacity 0.5s ease 0.4s',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
            }}>
                <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.6) 100%)',
                    borderRadius: 999,
                    width: phase >= 3 ? '100%' : '0%',
                    transition: 'width 0.9s cubic-bezier(0.19,1,0.22,1)',
                    boxShadow: '0 0 12px rgba(255,255,255,0.4), 0 0 4px rgba(255,255,255,0.25)',
                }} />
            </div>

            <style>{`
                @keyframes floatSmooth {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    33% { transform: translateY(-8px) translateX(2px); }
                    66% { transform: translateY(-4px) translateX(-2px); }
                }
                @keyframes spinSlow {
                    to { transform: scale(1.15) rotate(360deg); }
                }
                @keyframes spinSlowReverse {
                    to { transform: scale(1.25) rotate(-360deg); }
                }
            `}</style>
        </div>
    );
}
