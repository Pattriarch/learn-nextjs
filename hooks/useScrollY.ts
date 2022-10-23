import {useEffect, useState} from "react";

export const useScrollY = (): number => {
    // чтобы в будущем понмиать в браузере мы или на сервере
    // чтобы изменять window
    // он undefined на сервере.
    const isBrowser = typeof window !== 'undefined';

    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll = () => {
          const currentScrollY = isBrowser ? window.scrollY : 0;
          setScrollY(currentScrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // только один раз при появлении ухка
    return scrollY;
}
