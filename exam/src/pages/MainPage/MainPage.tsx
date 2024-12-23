import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTranslation } from '../../store/slices/historySlice';
import languages from './assets/languages.json';
import { fetchTranslation } from '../../utils/api';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
    const [text, setText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('Autodetect');
    const [toLanguage, setToLanguage] = useState('ru-RU');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleTranslate = async () => {
        if (!text.trim()) {
            setError('Введите текст для перевода');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const { translatedText, detectedLanguage } = await fetchTranslation(text, fromLanguage, toLanguage);

            let matchedLang = fromLanguage;

            if (fromLanguage === 'Autodetect' && detectedLanguage) {
                matchedLang = Object.keys(languages).find(key => key.startsWith(detectedLanguage)) || fromLanguage;

                if (matchedLang !== fromLanguage) {
                    setFromLanguage(matchedLang);
                }
            }

            setResult(translatedText);

            if (matchedLang !== 'Autodetect') {
                dispatch(addTranslation({ text, translatedText, fromLanguage: matchedLang, toLanguage }));
            }

        } catch {
            setError('Произошла ошибка при переводе');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Переводчик</h1>

            <div className={styles.translatedContainer}>
                <div className={styles.inputWrapper}>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={fromLanguage}
                            onChange={(e) => setFromLanguage(e.target.value)}
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        className={styles.textarea}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Введите текст"
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={toLanguage}
                            onChange={(e) => setToLanguage(e.target.value)}
                        >
                            {Object.entries(languages).filter(([code]) => code !== 'Autodetect').map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        className={`${styles.textarea} ${styles.resultTextarea}`}
                        value={result}
                        readOnly
                        placeholder="Результат перевода"
                    />
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={handleTranslate}
                    disabled={loading}
                >
                    {loading ? 'Перевожу...' : 'Перевести'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <Link to="/history" className={styles.historyLink}>
                <HistoryIcon className={styles.historyIcon} />
                История
            </Link>
        </div>
    );
};

export default MainPage;
