import styles from './Menu.module.css';
import cn from "classnames";
import {useContext, useEffect, KeyboardEvent, useState} from "react";
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            height: 0
        }
    }

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == 'Enter' || key.code == 'Space') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    }

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(menu => (
                    <li key={menu.route} aria-expanded={menu.id == firstCategory}>
                        <Link href={`/${menu.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: menu.id == firstCategory
                                })}>
                                    {menu.icon}
                                    <span>{menu.name}</span>
                                </div>
                            </a>
                        </Link>
                        {menu.id == firstCategory && buildSecondLevel(menu)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button tabIndex={0}
                                 onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                                 onClick={() => openSecondLevel(m._id.secondCategory)}
                                 className={styles.secondLevel}
                            >{m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                                aria-expanded={m.isOpened}
                            >{buildThirdLevel(m.pages, firstLevelMenuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map((p) => (
                <motion.li key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                        })}
                            aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
                        >
                            {p.category}
                        </a>
                    </Link>
                </motion.li>
            ))
        );
    };

    return (
        <nav className={styles.menu} role={'navigation'}>
            {announce && <span
                role={'log'}
                className={'visuallyHidden'}
            >{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
};
