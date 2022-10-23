import styles from './Up.module.css';
import UpIcon from '../ButtonIcon/up.svg';
import {useScrollY} from "../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

export const Up = (): JSX.Element => {
    const controls = useAnimation()
    const y = useScrollY();

    useEffect(() => {
        // вся высота нашего боди - страницы
        controls.start({ opacity: y / document.body.scrollHeight });
    }, [y, controls])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <motion.div
            className={styles.up}
            animate={controls}
            // чтобы при загрузке не было видно
            initial={{opacity: 0}}
        >
            <ButtonIcon appearance={'primary'} icon={'up'} aria-label={'Наверх'} onClick={scrollToTop}/>
        </motion.div>
    );
};
