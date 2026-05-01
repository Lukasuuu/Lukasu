import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const R3FScene = lazy(() => import('./r3f-hero-scene'));

export default function Lazy3DHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-[500px] bg-background">
      {isVisible ? (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Carregando 3D...</div>}>
          <R3FScene />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg animate-pulse" />
        </div>
      )}
    </div>
  );
}
