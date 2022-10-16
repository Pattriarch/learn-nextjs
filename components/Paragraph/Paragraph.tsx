import {ParagraphProps} from "./Pargarph.props";
import styles from './Paragraph.module.css';
import cn from "classnames";

export const Paragraph = ({children, size = 'm', className, ...props}: ParagraphProps): JSX.Element => {
    return (
        <p
            className={
                cn(styles.size, className, {
                    [styles.l]: size == 'l',
                    [styles.m]: size == 'm',
                    [styles.s]: size == 's',
                })}
            {...props}
        >
            {children}
        </p>
    );
};
