/* src/config.js */

const config = {
  
    apiUrl: import.meta.env.VITE_APP_BASE_URL,
    captchaKey: import.meta.env.VITE_APP_SITE_KEY,

    appDomain: "https://sellersmart.com/",

    getSubdomain: () => {
      let host = window.location.host;
      let parts = host.split(".");
      let subdomain = parts[0];
      return subdomain;
    },
  };
//   "eslint-plugin-prettier": "^3.1.3",
  export default config;
  