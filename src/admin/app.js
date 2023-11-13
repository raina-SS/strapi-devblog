// import './extensions/logo.svg';

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    'it',
    // 'ja',
    // 'ko',
    // 'ms',
    'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
  translations: {
    it: {
      'global.marketplace': 'Marketplace italian'
    }
  },
  // auth: {
  //   logo: NewLogo
  // },
  // menu: {
  //   logo: './extensions/logo.svg'
  // },
  theme: {
    colors: {
      buttonPrimary500: '#676767'
    }
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
