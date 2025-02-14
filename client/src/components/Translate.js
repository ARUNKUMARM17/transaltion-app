import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, Typography, Card, Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HistoryIcon from '@mui/icons-material/History';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



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

const Container = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'url(translate.png) no-repeat center center fixed', 
    backgroundSize: 'cover',  
    padding: '20px',
}));

const StyledCard = styled(Card)(() => ({
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    borderRadius: '20px',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.8)',  
    backdropFilter: 'blur(10px)',  
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',  
        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)',  
    },
}));

const TranslateButton = styled(Button)(() => ({
    fontWeight: 'bold',
    marginTop: '20px',
    background: 'linear-gradient(135deg, #FF4081, #3f51b5)', 
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(135deg, #F50057, #1a237e)',
    },
    transition: 'background-color 0.3s',
}));

const HistoryLink = styled(Link)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3f51b5',
    fontWeight: '500',
    marginTop: '20px',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
        color: '#2e3a8c',
    },
}));
const BackButton = styled(IconButton)({
    position: 'absolute',
    top: '20px',
    left: '20px',
    // backgroundColor: '#fff',
    color: '#3f51b5',
    // border: '2px solid #3f51b5',
    // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    borderRadius: '50%',
    transition: '0.3s',
    '&:hover': {
        backgroundColor: '#3f51b5',
        color: '#fff',
    },
});


const Translate = () => {
    const [userId, setUserId] = useState(null);
    const [sourceLang, setSourceLang] = useState('en-GB');
    const [targetLang, setTargetLang] = useState('es-ES');
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
        return unsubscribe;
    }, []);

    const handleTranslate = async () => {
        if (!originalText) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${originalText}&langpair=${sourceLang}|${targetLang}`);
            const data = await response.json();
            setTranslatedText(data.responseData.translatedText);
            saveTranslation(userId, originalText, data.responseData.translatedText, sourceLang, targetLang);
        } catch (error) {
            console.error('Error during translation:', error);
        }
        setLoading(false);
    };

    const saveTranslation = async (userId, originalText, translatedText, sourceLang, targetLang) => {
        if (!userId) {
            console.error("User ID is required to save translation.");
            return;
        }
        try {
            await addDoc(collection(db, "translations"), {
                userId,
                originalText,
                translatedText,
                sourceLanguage: sourceLang,
                targetLanguage: targetLang,
                timestamp: new Date(),
            });
            console.log("Translation saved to Firestore.");
        } catch (error) {
            console.error("Error saving translation:", error);
        }
    };

    const handleSwapLanguages = () => {
        const tempLang = sourceLang;
        setSourceLang(targetLang);
        setTargetLang(tempLang);
        setOriginalText(translatedText);
        setTranslatedText('');
    };
    function handleBackClick() {
        navigate('/login');
    }

    return (
        <Container>
            <BackButton onClick={handleBackClick}>
                <ArrowBackIcon fontSize="large" />
                Login
            </BackButton>


            <StyledCard>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                    <TranslateIcon fontSize="large" /> Language Translator
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                    <Tooltip title="Select Source Language">
                        <Select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                                '& .MuiSelect-select': { padding: '10px' }
                            }}
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Tooltip>

                    <IconButton onClick={handleSwapLanguages} color="primary" sx={{ background: '#e3f2fd', borderRadius: '50%' }}>
                        <SwapHorizIcon fontSize="large" />
                    </IconButton>

                    <Tooltip title="Select Target Language">
                        <Select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                                '& .MuiSelect-select': { padding: '10px' }
                            }}
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Tooltip>
                </Box>

                <TextField
                    label="Enter Text"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Type something to translate..."
                    sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                    }}
                />

                <TranslateButton
                    variant="contained"
                    onClick={handleTranslate}
                    startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <TranslateIcon />}
                >
                    {loading ? 'Translating...' : 'Translate'}
                </TranslateButton>

                {translatedText && (
                    <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: '10px' }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Translated Text
                        </Typography>
                        <Typography>{translatedText}</Typography>
                    </Box>
                )}

                <HistoryLink to="/history">
                    <HistoryIcon sx={{ mr: 1 }} /> View Translation History
                </HistoryLink>
            </StyledCard>
        </Container>
    );
};

export default Translate;
