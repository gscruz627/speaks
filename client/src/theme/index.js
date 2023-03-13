export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#404040",
        700: "#333333",
        800: "#0A0A0A",
        900: "#0A0A0A",
        1000: "#000000"
    },
    primary: {
        0: "#FFFFFF",
        10: "#F0FBE7",
        50: "#EDFFDE",
        100: "#e3ffcc",
        200: "#C6F79E",
        300: "#A4CD83",
        400: "#90AA78",
        500: "#82A368",
        600: "#60784D",
        700: "#3E4D32",
        800: "#2E3826",
        900: "#242B1E",
        1000: "#000000",

    }
}

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark" ? {
                primary: {
                    dark: colorTokens.primary[600],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[200],
                },
                neutral: {
                    dark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumMain: colorTokens.grey[600],
                    medium: colorTokens.grey[500],
                    light: colorTokens.grey[600],
                },
                background: {
                    default: colorTokens.grey[700],
                    alt: colorTokens.grey[600],
                }
            } : {
                primary: {
                    dark: colorTokens.primary[600],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[200],
                },
                neutral: {
                    dark: colorTokens.grey[700],
                    main: colorTokens.grey[500],
                    mediumMain: colorTokens.grey[400],
                    medium: colorTokens.grey[300],
                    light: colorTokens.grey[100],
                },
                background: {
                    default: colorTokens.grey[10],
                    alt: colorTokens.grey[0],
                }
            })
        },
        typography: {
            fontFamily: ["Roboto Slab", "serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto Slab", "serif"].join(","),
                fontSize: 14,
            }
        }
    }
}