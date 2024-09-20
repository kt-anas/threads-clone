
import React,{ReactNode} from 'react'
import styles from './replay.module.scss'

interface ReplayProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Replay: React.FC<ReplayProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className={styles["close-btn"]} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
                <div className={styles.body}>
                    <textarea placeholder="Add your comment..." />
                </div>
                <div className={styles.footer}>
                    <button className={styles['submit-btn']}>Post</button>
                </div>
            </div>
        </div>
    );
};

export default Replay;
