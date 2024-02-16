const defaultValues = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];

function constructColorValues(base?: number) {
    return base ? [...defaultValues, base].sort((a, b) => b - a) : [...defaultValues];
}

export interface ColorMatrix {
    base: number;
    values: number[];
}

export const redBase = 42;
export const red: ColorMatrix = {
    base: redBase,
    values: constructColorValues(redBase),
};

export const orangeBase = 55;
export const orange: ColorMatrix = {
    base: orangeBase,
    values: constructColorValues(),
};

export const yellowBase = 62;
export const yellow: ColorMatrix = {
    base: yellowBase,
    values: constructColorValues(yellowBase),
};

export const limeBase = 45;
export const lime: ColorMatrix = {
    base: limeBase,
    values: constructColorValues(),
};

export const greenBase = 29;
export const green: ColorMatrix = {
    base: greenBase,
    values: constructColorValues(greenBase),
};

export const cyanBase = 35;
export const cyan: ColorMatrix = {
    base: cyanBase,
    values: constructColorValues(),
};

export const lightBlueBase = 54;
export const lightBlue: ColorMatrix = {
    base: lightBlueBase,
    values: constructColorValues(lightBlueBase),
};

export const blueBase = 45;
export const blue: ColorMatrix = {
    base: blueBase,
    values: constructColorValues(),
};

export const purpleBase = 46;
export const purple: ColorMatrix = {
    base: purpleBase,
    values: constructColorValues(purpleBase),
};

export const magentaBase = 54;
export const magenta: ColorMatrix = {
    base: magentaBase,
    values: constructColorValues(magentaBase),
};

export const pinkBase = 75;
export const pink: ColorMatrix = {
    base: pinkBase,
    values: constructColorValues(),
};

export const whiteBase = 99;
export const white: ColorMatrix = {
    base: whiteBase,
    values: constructColorValues(whiteBase),
};

export const lightGrayBase = 60;
export const lightGray: ColorMatrix = {
    base: lightGrayBase,
    values: constructColorValues(),
};

export const grayBase = 30;
export const gray: ColorMatrix = {
    base: grayBase,
    values: constructColorValues(),
};

export const blackBase = 12;
export const black: ColorMatrix = {
    base: blackBase,
    values: constructColorValues(blackBase),
};

export const brownBase = 35;
export const brown: ColorMatrix = {
    base: brownBase,
    values: constructColorValues(),
};

export const colors = [
    { name: 'red', matrix: red },
    { name: 'orange', matrix: orange },
    { name: 'yellow', matrix: yellow },
    { name: 'lime', matrix: lime },
    { name: 'green', matrix: green },
    { name: 'cyan', matrix: cyan },
    { name: 'light blue', matrix: lightBlue },
    { name: 'blue', matrix: blue },
    { name: 'purple', matrix: purple },
    { name: 'magenta', matrix: magenta },
    { name: 'pink', matrix: pink },
    { name: 'white', matrix: white },
    { name: 'light gray', matrix: lightGray },
    { name: 'gray', matrix: gray },
    { name: 'black', matrix: black },
    { name: 'brown', matrix: brown },
];
