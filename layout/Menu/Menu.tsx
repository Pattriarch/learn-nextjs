import styles from './Menu.module.css';
import cn from "classnames";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import Link from 'next/link';
import {useRouter} from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
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
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div onClick={() => openSecondLevel(m._id.secondCategory)} className={styles.secondLevel}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLevel(m.pages, firstLevelMenuItem.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map((p, index) => (
                <Link key={index} href={`/${route}/${p.alias}`}>
                    <a className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </a>
                </Link>
            ))
        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );
};
