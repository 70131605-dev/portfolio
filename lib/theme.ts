export type Theme = "light" | "dark";

export const THEME_KEY = "theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#07090d", light: "#f6f1e9" };

/**
 * Inlined in <head> and run before first paint: applies the saved theme,
 * or the OS preference when nothing is saved, so there is never a flash.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;
