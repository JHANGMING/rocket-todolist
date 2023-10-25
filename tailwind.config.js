/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html, js}", "**/**/*.{html, js}", "./page/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Mulish', "sans-serif"],
    },
    container: {
      center: true,
      padding: "12px",
    },
    fontSize: {
      base: [
        "16px",
        {
          lineHeight: "28px",
        },
      ],
      "sm": [
        "12px",
        {
          lineHeight: "21px",
        },
      ],
      "xm": [
        "14px",
        {
          lineHeight: "14px",
        },
      ],
      "m": [
        "21px",
        {
          lineHeight: "37px",
        },
      ],
      "xl": [
        "24px",
        {
          lineHeight: "36px",
        },
      ],
      "2m": [
        "26px",
        {
          lineHeight: "40px",
        },
      ],
      "2xl": [
        "32px",
        {
          lineHeight: "40px",
        },
      ],
      "4xl": [
        "32px",
        {
          lineHeight: "43px",
        },
      ],
      "5xl": [
        "40px",
        {
          lineHeight: "40px",
        },
      ],
      "6xl": [
        "48px",
        {
          lineHeight: "84px",
        },
      ],
      "7xl": [
        "64px",
        {
          lineHeight: "89px",
        },
      ],
    },
    spacing: {
      0:"0px",
      1: "3px",
      2: "6px",
      3: "9px",
      4: "12px",
      5: "15px",
      6: "18px",
      7: "21px",
      8: "24px",
      9: "27px",
      10: "30px",
      11:"33px",
      12:"36px",
      15:"45px",
      17:"51px",
      23:"69px",

      20:"60px",
      30: "90px",
      40:"120px",
      55:"165px",
      62:"186px",
      91:"273px",

      42:"126px",
      60:"180px",
      80: "240px",
      106:"318px",
      120:"320px",
      170:"510px",
      195:"585px"
    },
    extend: {
      colors: {
        list: {
          first: "#413529",
          DEFAULT: "#fff",
          second: "#6F7986",
          third: "#B9BDC2",
          forth:"#BEA97C",
          fifth:"#FFCA59",
          sixth:"#D9AF57",
          seventh:"#D0E0F5",
          eighth:"D9D9D9",
          night:"#2C1809",
          tenth:"#462209",
          eleventh:"#525151"
        },
      },
      fontFamily: {
        TC: ['"Noto Sans TC"', "sans-serif"],
        EN: ['"Roboto"', "sans-serif"],
      },
      spacing: {
        74: "296px",
      },
      boxShadow: {
        "2xl": "0px 0px 0px 1px #fff",
        "3xl": "0px 0px 0px 1px #3F5D45;",
      },
    },
    screens: {
      md:"767px",
      lg: "992px",

    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",

          "@screen md": {
            maxWidth: "100%",
          },
          "@screen lg": {
            maxWidth: "1320px",
          },
        },
      });
    },
  ],
};

