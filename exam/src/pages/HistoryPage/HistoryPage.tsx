import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearHistory } from '../../store/slices/historySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './HistoryPage.module.scss';
import { Link } from 'react-router-dom';

interface HistoryItem {
    text: string;
    translatedText: string;
    fromLanguage: string;
    toLanguage: string;
}

const HistoryPage: React.FC = () => {
    const history = useSelector((state: { history: { items: HistoryItem[] } }) => state.history.items);
    const dispatch = useDispatch();

    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="/" className={styles.backLink}>
                    <ArrowBackIcon />
                </Link>

                {history.length > 0 && (
                    <button onClick={handleClearHistory} className={styles.clearButton}>
                        <DeleteIcon />
                    </button>
                )}
            </div>

            <h1 className={styles.title}>История переводов</h1>

            {history.length === 0 ? (
                <p className={styles.emptyMessage}>История пуста</p>
            ) : (
                <ul className={styles.historyList}>
                    {history.map((item, index) => (
                        <li key={index} className={styles.historyItem}>
                            <div className={styles.historyText}><strong>Исходный текст:</strong> {item.text}</div>
                            <div className={styles.historyTranslation}><strong>Перевод:</strong> {item.translatedText}</div>
                            <div className={styles.historyLanguages}><strong>Язык:</strong> {item.fromLanguage} → {item.toLanguage}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistoryPage;
