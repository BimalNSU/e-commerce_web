import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "bn";

interface SettingsState {
  language: Language;
  theme: "light" | "dark";
  //   currency: "BDT" | "USD";
  //   dateFormat: string;

  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  //   setCurrency: (currency: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "bn",
      theme: "light",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "bn" : "en",
        })),

      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "app-settings" },
  ),
);
