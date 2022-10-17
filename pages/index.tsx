import {Button, Htag, Paragraph, Tag, Rating, Input} from "../components/";
import {useState} from "react";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";
import {TextArea} from "../components/TextArea/TextArea";

function Home({ menu }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag="h1">Заголовок</Htag>
            <Button appearance={'primary'} arrow={'right'}>Кнопка</Button>
            <Button appearance={'ghost'} arrow={'down'}>Кнопка</Button>
            <Paragraph size={"l"}>Большой</Paragraph>
            <Paragraph>Средний</Paragraph>
            <Paragraph size={"s"}>Маленький</Paragraph>
            <Tag size={'s'}>Ghost</Tag>
            <Tag size={'m'} color={'red'}>Red</Tag>
            <Tag size={'m'} color={'green'}>Green</Tag>
            <Tag size={'s'} color={'primary'}>Primary</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder={'Test'}/>
            <TextArea placeholder={'Area'}/>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
