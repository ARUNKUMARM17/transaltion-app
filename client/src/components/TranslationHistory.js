import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu",
};

// Styled Components
const HistoryContainer = styled(Box)({
    padding: '20px',
    maxWidth: '900px',
    margin: '20px auto',
    background: 'linear-gradient(135deg, #f9f9f9, #e0e0e0)', 
    borderRadius: '12px', 
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
});

const TableWrapper = styled(Paper)({
    padding: '15px',
    backgroundColor: '#fff', 
    border: '1px solid #ddd',
    borderRadius: '8px',
});

const DateTypography = styled(Typography)({
    fontSize: '0.875rem',
    color: '#757575',
    fontStyle: 'italic',
    marginTop: '8px',
});
const BackButton = styled(Button)({
    position: 'absolute',
    top: '10px',
    left: '10px',
    cursor: 'pointer',
});


const TranslationHistory = ({ userId }) => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) return;
            try {
                const q = query(collection(db, "translations"), where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                const translations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setHistory(translations);
            } catch (error) {
                console.error("Error fetching translation history:", error);
            }
        };
        fetchHistory();
    }, [userId]);
   const handleBackClick = () => {
        navigate('/translation');
    };


    return (
        <HistoryContainer>
        <BackButton onClick={handleBackClick}>Back to Translation</BackButton>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Translation History
            </Typography>

            <TableWrapper elevation={1}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Original Text (Source Language)</strong></TableCell>
                                <TableCell><strong>Translated Text (Target Language)</strong></TableCell>
                                <TableCell><strong>Source Language</strong></TableCell>
                                <TableCell><strong>Target Language</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.originalText}
                                        <Typography variant="caption" display="inline" color="textSecondary">
                                            {" "}({languages[item.sourceLanguage] || item.sourceLanguage})
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {item.translatedText}
                                        <Typography variant="caption" display="inline" color="textSecondary">
                                            {" "}({languages[item.targetLanguage] || item.targetLanguage})
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{languages[item.sourceLanguage] || item.sourceLanguage}</TableCell>
                                    <TableCell>{languages[item.targetLanguage] || item.targetLanguage}</TableCell>
                                    <TableCell>
                                        <DateTypography>
                                            {new Date(item.timestamp?.seconds * 1000).toLocaleString()}
                                        </DateTypography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TableWrapper>
        </HistoryContainer>
    );
};

export default TranslationHistory;
