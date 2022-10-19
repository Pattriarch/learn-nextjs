import {ReviewFormProps} from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import UserIcon from './user.svg';
import CloseIcon from './close.svg';
import cn from "classnames";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {Controller, useForm} from "react-hook-form";
import {IReviewForm} from "./ReviewForm.interface";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit } = useForm<IReviewForm>();

    const onSubmit = (data: IReviewForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                {/*неуправляемый инпут*/}
                <Input {...register('name')} placeholder={'Имя'}/>
                {/*неуправляемый инпут*/}
                <Input {...register('title')} className={styles.title} placeholder={'Заголовок отзыва'}/>
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    {/*управляемый рейтинг*/}
                    <Controller
                        control={control}
                        name={'rating'}
                        render={({ field }) => (
                            <Rating isEditable rating={field.value} setRating={field.onChange}/>
                        )}
                    />
                </div>
                {/*неуправляемый инпут*/}
                <TextArea {...register('description')} className={styles.description} placeholder={'Текст отзыва'}/>
                <div className={styles.submit}>
                    <Button appearance={'primary'}>
                        Отправить
                    </Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={styles.close}/>
            </div>
        </form>
    );
};