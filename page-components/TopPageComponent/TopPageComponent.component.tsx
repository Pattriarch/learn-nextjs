import {HhData, Htag, Sort, Tag} from "../../components";
import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/page.interface";
import {Advantages} from "../../components/Advantage/Advantages";
import {SortEnum} from "../../components/Sort/Sort.props";

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag={"h1"}>{page.title}</Htag>
                {products && <Tag color={'gray'} size={'m'}>{products.length}</Tag>}
                <Sort sort={SortEnum.Rating} setSort={() => {}}/>
            </div>
            <div>
                {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={"h2"}>Вакансии - {page.category}</Htag>
                <Tag color={'red'} size={'m'}>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag={'h2'}>Преимущества</Htag>
                <Advantages advantages={page.advantages}></Advantages>
            </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText}}></div>}
            <Htag tag={'h2'}>Получаемые навыки</Htag>
            {page.tags && page.tags.map((t) => (<Tag key={t} size={'s'} color={'primary'}>{t}</Tag>))}
        </div>
    );
};