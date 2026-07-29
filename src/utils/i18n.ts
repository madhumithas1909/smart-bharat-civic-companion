import type { Language } from '../types';

export type TranslationKey =
  | 'nav.home' | 'nav.services' | 'nav.assistant' | 'nav.tracker' | 'nav.dashboard' | 'nav.about'
  | 'hero.title' | 'hero.subtitle' | 'hero.getStarted' | 'hero.talkToAI'
  | 'common.search' | 'common.apply' | 'common.call' | 'common.submit' | 'common.clear' | 'common.copy' | 'common.save'
  | 'footer.tagline';

type Translations = Record<TranslationKey, string>;

const en: Translations = {
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.assistant': 'AI Assistant',
  'nav.tracker': 'Complaint Tracker',
  'nav.dashboard': 'Dashboard',
  'nav.about': 'About',
  'hero.title': 'Smart Bharat - Your AI Civic Assistant',
  'hero.subtitle': 'Access government services, report issues, receive AI guidance, and simplify public services.',
  'hero.getStarted': 'Get Started',
  'hero.talkToAI': 'Talk to AI',
  'common.search': 'Search',
  'common.apply': 'Apply',
  'common.call': 'Call',
  'common.submit': 'Submit',
  'common.clear': 'Clear',
  'common.copy': 'Copy',
  'common.save': 'Save',
  'footer.tagline': 'AI Powered Civic Companion for every Indian citizen.',
};

const ta: Translations = {
  'nav.home': 'முகப்பு',
  'nav.services': 'சேவைகள்',
  'nav.assistant': 'AI உதவியாளர்',
  'nav.tracker': 'புகார் கண்காணிப்பு',
  'nav.dashboard': 'டாஷ்போர்டு',
  'nav.about': 'எங்களை பற்றி',
  'hero.title': 'ஸ்மார்ட் பாரத் - உங்கள் AI குடிமக்கள் உதவியாளர்',
  'hero.subtitle': 'அரசு சேவைகளை அணுக, பிரச்சினைகளைப் புகாரளிக்க, AI வழிகாட்டுதலைப் பெறவும்.',
  'hero.getStarted': 'தொடங்குங்கள்',
  'hero.talkToAI': 'AI உடன் பேசுங்கள்',
  'common.search': 'தேடு',
  'common.apply': 'விண்ணப்பிக்க',
  'common.call': 'அழை',
  'common.submit': 'சமர்ப்பிக்க',
  'common.clear': 'அழி',
  'common.copy': 'நகலெடு',
  'common.save': 'சேமி',
  'footer.tagline': 'ஒவ்வொரு இந்திய குடிமகனுக்கும் AI இயங்கும் குடிமக்கள் துணை.',
};

const hi: Translations = {
  'nav.home': 'होम',
  'nav.services': 'सेवाएं',
  'nav.assistant': 'AI सहायक',
  'nav.tracker': 'शिकायत ट्रैकर',
  'nav.dashboard': 'डैशबोर्ड',
  'nav.about': 'हमारे बारे में',
  'hero.title': 'स्मार्ट भारत - आपका AI नागरिक सहायक',
  'hero.subtitle': 'सरकारी सेवाओं तक पहुंच, शिकायतें दर्ज करें, AI मार्गदर्शन प्राप्त करें।',
  'hero.getStarted': 'शुरू करें',
  'hero.talkToAI': 'AI से बात करें',
  'common.search': 'खोजें',
  'common.apply': 'आवेदन करें',
  'common.call': 'कॉल',
  'common.submit': 'जमा करें',
  'common.clear': 'साफ़ करें',
  'common.copy': 'कॉपी',
  'common.save': 'सहेजें',
  'footer.tagline': 'हर भारतीय नागरिक के लिए AI संचालित नागरिक साथी।',
};

const kn: Translations = {
  'nav.home': 'ಮುಖಪುಟ',
  'nav.services': 'ಸೇವೆಗಳು',
  'nav.assistant': 'AI ಸಹಾಯಕ',
  'nav.tracker': 'ದೂರು ಟ್ರ್ಯಾಕರ್',
  'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
  'hero.title': 'ಸ್ಮಾರ್ಟ್ ಭಾರತ್ - ನಿಮ್ಮ AI ನಾಗರಿಕ ಸಹಾಯಕ',
  'hero.subtitle': 'ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ, ದೂರುಗಳನ್ನು ದಾಖಲಿಸಿ, AI ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
  'hero.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
  'hero.talkToAI': 'AI ಜೊತೆ ಮಾತನಾಡಿ',
  'common.search': 'ಹುಡುಕಿ',
  'common.apply': 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
  'common.call': 'ಕರೆ',
  'common.submit': 'ಸಲ್ಲಿಸಿ',
  'common.clear': 'ತೆರವುಗೊಳಿಸಿ',
  'common.copy': 'ನಕಲಿಸಿ',
  'common.save': 'ಉಳಿಸಿ',
  'footer.tagline': 'ಪ್ರತಿ ಭಾರತೀಯ ನಾಗರಿಕರಿಗೆ AI ನಾಗರಿಕ ಸಂಗಾತಿ.',
};

const ml: Translations = {
  'nav.home': 'ഹോം',
  'nav.services': 'സേവനങ്ങൾ',
  'nav.assistant': 'AI സഹായി',
  'nav.tracker': 'പരാതി ട്രാക്കർ',
  'nav.dashboard': 'ഡാഷ്‌ബോർഡ്',
  'nav.about': 'ഞങ്ങളെക്കുറിച്ച്',
  'hero.title': 'സ്മാർട്ട് ഭാരത് - നിങ്ങളുടെ AI പൗര സഹായി',
  'hero.subtitle': 'സർക്കാർ സേവനങ്ങൾ ലഭിക്കുക, പരാതികൾ രേഖപ്പെടുത്തുക, AI മാർഗ്ഗനിർദ്ദേശം നേടുക.',
  'hero.getStarted': 'ആരംഭിക്കുക',
  'hero.talkToAI': 'AI യുമായി സംസാരിക്കുക',
  'common.search': 'തിരയുക',
  'common.apply': 'അപേക്ഷിക്കുക',
  'common.call': 'വിളിക്കുക',
  'common.submit': 'സമർപ്പിക്കുക',
  'common.clear': 'മായ്ക്കുക',
  'common.copy': 'പകർത്തുക',
  'common.save': 'സംരക്ഷിക്കുക',
  'footer.tagline': 'ഓരോ ഇന്ത്യൻ പൗരനും വേണ്ടി AI പൗര കൂട്ടാളി.',
};

const te: Translations = {
  'nav.home': 'హోమ్',
  'nav.services': 'సేవలు',
  'nav.assistant': 'AI సహాయకుడు',
  'nav.tracker': 'ఫిర్యాదు ట్రాకర్',
  'nav.dashboard': 'డాష్‌బోర్డ్',
  'nav.about': 'మా గురించి',
  'hero.title': 'స్మార్ట్ భారత్ - మీ AI పౌర సహాయకుడు',
  'hero.subtitle': 'ప్రభుత్వ సేవలను పొందండి, ఫిర్యాదులు నమోదు చేయండి, AI మార్గదర్శకత్వం పొందండి.',
  'hero.getStarted': 'ప్రారంభించండి',
  'hero.talkToAI': 'AI తో మాట్లాడండి',
  'common.search': 'వెతకండి',
  'common.apply': 'దరఖాస్తు',
  'common.call': 'కాల్',
  'common.submit': 'సమర్పించండి',
  'common.clear': 'క్లియర్',
  'common.copy': 'కాపీ',
  'common.save': 'సేవ్',
  'footer.tagline': 'ప్రతి భారతీయ పౌరుడికి AI ఆధారిత పౌర సహచరుడు.',
};

const translations: Record<Language, Translations> = { en, ta, hi, kn, ml, te };

export function t(lang: Language, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}
