import {ReviewFormProps} from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import cn from "classnames";
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {Controller, useForm} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios, {AxiosError} from "axios";
import {API} from "../../helpers/api";
import {useState, KeyboardEvent} from "react";

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors} = useForm<IReviewForm>();
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
                />
                {/*неуправляемый инпут*/}
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' }})}
                    className={styles.title}
                    placeholder={'Заголовок отзыва'}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
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
                                tabIndex={isOpened ? 0 : -1}
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
                    tabIndex={isOpened ? 0 : -1}
                    aria-label={'Текст отзыва'}
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button
                        onClick={() => clearErrors()}
                        tabIndex={isOpened ? 0 : -1}
                        appearance={'primary'}>
                        Отправить
                    </Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)} role={'alert'}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <button
                    className={styles.close}
                    onClick={() => setError(undefined)}
                    aria-label={'Закрыть оповещение'}
                >
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)} role={'alert'}>
                Что-то пошло не так, попробуйте обновить страницу
                <button
                    className={styles.close}
                    onClick={() => setError(undefined)}
                    aria-label={'Закрыть оповещение'}
                >
                    <CloseIcon/>
                </button>
            </div>}
        </form>
    );
};


