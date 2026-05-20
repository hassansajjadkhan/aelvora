/**
 * Theme Configuration
 * Premium color palette and design tokens
 */

export const theme = {
  colors: {
    // Primary palette
    deepBlack: "#080808",
    warmBeige: "#EDE4D7",
    softLilac: "#D8C8FF",
    richPurple: "#8E5CFF",
    mutedLavender: "#B89DFF",
    
    // Semantic
    background: "#080808",
    foreground: "#EDE4D7",
    primary: "#8E5CFF",
    secondary: "#D8C8FF",
    accent: "#B89DFF",
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  
  // Z-index scale for layering
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    notification: 70,
  },
  
  // Transition timing
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
    slower: "0.8s ease",
  },
  
  // Typography scales
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "44px",
    "5xl": "56px",
    "6xl": "72px",
  },
};

export type Theme = typeof theme;
