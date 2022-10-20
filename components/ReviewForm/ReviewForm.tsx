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
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios, {AxiosError} from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset(); // ресетим саму форму
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                {/*неуправляемый инпут*/}
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' }})}
                    placeholder={'Имя'}
                    error={errors.name}
                />
                {/*неуправляемый инпут*/}
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' }})}
                    className={styles.title}
                    placeholder={'Заголовок отзыва'}
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    {/*управляемый рейтинг*/}
                    <Controller
                        control={control}
                        name={'rating'}
                        rules={{ required: { value: true, message: 'Укажите рейтинг' }}}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                            />
                        )}
                    />
                </div>
                {/*неуправляемый инпут*/}
                <TextArea
                    {...register('description', { required: { value: true, message: 'Заполните описание' }})}
                    className={styles.description}
                    placeholder={'Текст отзыва'}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance={'primary'}>
                        Отправить
                    </Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу
                <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
            </div>}
        </form>
    );
};
