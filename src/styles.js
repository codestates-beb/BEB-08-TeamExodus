import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
};

export const GlobalStyles = createGlobalStyle`
${reset}



input {
    all: unset;
}

* {
    box-sizing: border-box;
}

body {
    height: 200vh;
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family:'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor};
    


    
}
a {
    text-decoration: none;
    color: inherit;
}


`;
