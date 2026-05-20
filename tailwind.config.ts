import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette inspired by lusion.co
        "deep-black": "#080808",
        "warm-beige": "#EDE4D7",
        "soft-lilac": "#D8C8FF",
        "rich-purple": "#8E5CFF",
        "muted-lavender": "#B89DFF",
        
        // Extended palette for versatility
        "brand-primary": "#8E5CFF",
        "brand-secondary": "#D8C8FF",
        "brand-accent": "#B89DFF",
        "neutral-dark": "#080808",
        "neutral-light": "#EDE4D7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-clash)", "sans-serif"],
      },
      fontSize: {
        // Hero and display typography
        "display-xl": ["96px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["72px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-md": ["56px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["44px", { lineHeight: "1.3" }],
        
        // Section headings
        "heading-xl": ["48px", { lineHeight: "1.2" }],
        "heading-lg": ["40px", { lineHeight: "1.2" }],
        "heading-md": ["32px", { lineHeight: "1.3" }],
        "heading-sm": ["24px", { lineHeight: "1.4" }],
        
        // Body typography
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-md": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
      },
      spacing: {
        // Custom spacing for premium layout
        "safe": "2rem",
        "container": "1200px",
      },
      animation: {
        // Custom animations for premium feel
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "1000% 0" },
          "100%": { backgroundPosition: "-1000% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(142, 92, 255, 0.3)",
        "glow-lilac": "0 0 30px rgba(216, 200, 255, 0.2)",
      },
      willChange: {
        transform: "transform",
        opacity: "opacity",
      },
    },
  },
  plugins: [],
};

export default config;
