import { useState, useRef } from 'react';
import { ArrowRight, Zap, Shield, Users, Cpu, Star, Globe, CheckCircle2, Sparkles, Briefcase, MapPin, Clock, Building2, Home, Handshake, Rocket } from 'lucide-react';

const SLIDES = [
    {
        id: 0,
        badge: 'Welcome',
        title: 'Your Neighborhood\nOS Has Arrived',
        subtitle: 'Truvornex connects you with trusted local service providers — powered by Simon AI, built for your community.',
        Visual: Building2,
        features: [
            { icon: Zap,    text: '2,400+ verified providers in your area' },
            { icon: Shield, text: 'Every booking is insured & guaranteed'  },
            { icon: Cpu,    text: 'Simon AI personalises your experience'  },
        ],
    },
    {
        id: 1,
        badge: 'What It Is',
        title: 'One App for\nEvery Home Need',
        subtitle: 'From emergency plumbing at 2am to weekly cleaning — book any local service in 60 seconds, 24/7.',
        Visual: Home,
        features: [
            { icon: Clock,  text: 'Same-day & emergency bookings'      },
            { icon: MapPin, text: 'Hyperlocal providers in your street' },
            { icon: Star,   text: '4.9 avg across 15,000+ reviews'     },
        ],
    },
    {
        id: 2,
        badge: 'Why It Exists',
        title: 'Community-First\nService Platform',
        subtitle: "We built Truvornex because finding trustworthy help shouldn't take hours of Googling, calling, and hoping.",
        Visual: Handshake,
        features: [
            { icon: Users,    text: 'Neighbors vouching for every provider' },
            { icon: Globe,    text: 'Group buy deals — save up to 35%'       },
            { icon: Sparkles, text: 'Skill swaps & community time credits'  },
        ],
    },
    {
        id: 3,
        badge: 'Get Started',
        title: 'Ready to Transform\nYour Neighborhood?',
        subtitle: 'Join 2,400+ households already using Truvornex. It only takes 30 seconds to get started.',
        Visual: Rocket,
        features: [
            { icon: CheckCircle2, text: 'Free to join — no hidden fees'  },
            { icon: Briefcase,    text: 'Providers earn more, stress less' },
            { icon: Shield,       text: 'Your data is always private'     },
        ],
        isCta: true,
    },
];

export default function IntroFlow({ onComplete }) {
    const [current, setCurrent] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [direction, setDirection] = useState(1);
    const touchStartX = useRef(null);

    const slide = SLIDES[current];
    const isLast = current === SLIDES.length - 1;

    const goTo = (idx) => {
        if (idx === current || idx < 0 || idx >= SLIDES.length) return;
        setDirection(idx > current ? 1 : -1);
        setExiting(true);
        setTimeout(() => { setCurrent(idx); setExiting(false); }, 250);
    };

    const next = () => isLast ? finish() : goTo(current + 1);

    const finish = () => {
        localStorage.setItem('truvornex-intro-seen', '1');
        onComplete();
    };

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (delta < -50) next();
        else if (delta > 50 && current > 0) goTo(current - 1);
    };

    const VisualIcon = slide.Visual;

    return (
        <div
            className="fixed inset-0 z-[9998] flex flex-col overflow-hidden"
            style={{ backgroundColor: 'var(--color-bg)' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Background grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '52px 52px',
            }} />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 60%)',
            }} />

            {/* Skip button */}
            <div className="absolute top-5 right-5 z-10">
                <button onClick={finish} style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-subtle)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: 8,
                    touchAction: 'manipulation',
                    transition: 'all 0.2s ease',
                }}>
                    Skip
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4 relative z-10">
                <div style={{
                    width: '100%',
                    maxWidth: 400,
                    opacity: exiting ? 0 : 1,
                    transform: exiting ? `translateX(${direction > 0 ? '-32px' : '32px'}) scale(0.98)` : 'translateX(0) scale(1)',
                    transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.19,1,0.22,1)',
                }}>
                    {/* Icon container */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(145deg, var(--color-surface-high) 0%, var(--color-surface) 100%)',
                            border: '1px solid var(--color-border-strong)',
                            boxShadow: `
                                0 8px 32px rgba(0,0,0,0.5),
                                0 2px 8px rgba(0,0,0,0.4),
                                inset 0 1px 0 rgba(255,255,255,0.06)
                            `,
                            position: 'relative',
                        }}>
                            {/* Subtle glow behind */}
                            <div style={{
                                position: 'absolute',
                                inset: -8,
                                background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
                                opacity: 0.5,
                                borderRadius: 24,
                            }} />
                            <VisualIcon style={{ width: 26, height: 26, color: 'var(--color-primary)', opacity: 0.9 }} />
                        </div>
                    </div>

                    {/* Badge */}
                    <div style={{ textAlign: 'center', marginBottom: 12 }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: 9.5,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            background: 'linear-gradient(145deg, var(--color-surface-high) 0%, var(--color-surface) 100%)',
                            border: '1px solid var(--color-border-strong)',
                            padding: '5px 14px',
                            borderRadius: 999,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}>
                            {slide.badge}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(1.45rem, 5.5vw, 1.85rem)',
                        fontWeight: 800,
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        letterSpacing: '-0.045em',
                        lineHeight: 1.08,
                        color: 'var(--color-primary)',
                        textAlign: 'center',
                        marginBottom: 14,
                        whiteSpace: 'pre-line',
                        textRendering: 'geometricPrecision',
                    }}>
                        {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: 13.5,
                        lineHeight: 1.65,
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        margin: '0 auto 24px',
                        maxWidth: 340,
                        letterSpacing: '-0.008em',
                    }}>
                        {slide.subtitle}
                    </p>

                    {/* Feature list card */}
                    <div style={{
                        background: 'linear-gradient(145deg, var(--color-surface) 0%, var(--color-surface-low) 100%)',
                        border: '1px solid var(--color-border-strong)',
                        borderRadius: 18,
                        padding: '6px 0',
                        boxShadow: `
                            0 12px 40px rgba(0,0,0,0.4),
                            0 4px 12px rgba(0,0,0,0.3),
                            inset 0 1px 0 rgba(255,255,255,0.04)
                        `,
                        marginBottom: 28,
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Subtle inner glow */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: 1,
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                        }} />

                        {slide.features.map(({ icon: Icon, text }, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '14px 18px',
                                borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
                                position: 'relative',
                            }}>
                                {/* Icon container */}
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 12,
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--color-surface-high)',
                                    border: '1px solid var(--color-border-strong)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                                }}>
                                    <Icon style={{ width: 16, height: 16, color: 'var(--color-text-muted)', strokeWidth: 1.75 }} />
                                </div>
                                <span style={{
                                    fontSize: 13,
                                    lineHeight: 1.5,
                                    color: 'var(--color-text)',
                                    fontWeight: 500,
                                    letterSpacing: '-0.008em',
                                }}>
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom navigation */}
            <div style={{ padding: '0 24px 36px', position: 'relative', zIndex: 10 }}>
                {/* Dot indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    {SLIDES.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{
                            height: 6,
                            width: i === current ? 28 : 6,
                            borderRadius: 999,
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            backgroundColor: i === current ? 'var(--color-primary)' : 'var(--color-border-strong)',
                            transition: 'all 0.35s cubic-bezier(0.19,1,0.22,1)',
                            touchAction: 'manipulation',
                            boxShadow: i === current ? '0 0 12px rgba(255,255,255,0.25)' : 'none',
                        }} />
                    ))}
                </div>

                {/* CTA button */}
                <button onClick={next} style={{
                    width: '100%',
                    height: 52,
                    borderRadius: 14,
                    fontSize: 14.5,
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    background: 'linear-gradient(145deg, var(--color-primary) 0%, rgba(255,255,255,0.85) 100%)',
                    color: 'var(--color-bg)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: `
                        0 8px 28px rgba(0,0,0,0.5),
                        0 0 0 1px rgba(255,255,255,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.2)
                    `,
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Shimmer effect */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transform: 'translateX(-100%)',
                        animation: 'btnShimmer 2.5s ease-in-out infinite',
                    }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>
                        {isLast ? 'Get Started' : 'Next'}
                    </span>
                    <ArrowRight style={{ width: 18, height: 18, position: 'relative', zIndex: 1 }} />
                </button>

                <style>{`
                    @keyframes btnShimmer {
                        0%, 100% { transform: translateX(-100%); }
                        50% { transform: translateX(100%); }
                    }
                `}</style>

                <p style={{
                    textAlign: 'center',
                    fontSize: 11,
                    marginTop: 14,
                    color: 'var(--color-text-subtle)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                }}>
                    {current + 1} of {SLIDES.length}
                </p>
            </div>
        </div>
    );
}
