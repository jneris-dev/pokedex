import { createContext, ReactElement, useContext, useEffect, useState, SetStateAction } from "react";

interface ThemeContextProps {
    children: ReactElement;
}

type ThemeContextData = {
    theme: boolean;
    setTheme: React.Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeContextProvider({ children }: ThemeContextProps) {

    const [theme, setTheme] = useState(() => localStorage.theme === 'dark')

    useEffect(() => {
        const rootElement = window.document.documentElement
        const currentTheme = theme

        const prevTheme = currentTheme ? 'light' : 'dark'
        rootElement.classList.remove(prevTheme)

        const nextTheme = currentTheme ? 'dark' : 'light'
        rootElement.classList.add(nextTheme)

        localStorage.setItem('theme', nextTheme)
    }, [theme])


    return (
        <ThemeContext.Provider value={{ theme, setTheme }} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)