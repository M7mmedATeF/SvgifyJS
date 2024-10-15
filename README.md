# Svgify

<div style="display:flex; justify-content:center; margin-inline: auto; margin-block: 3rem 1rem; width: 100%;">
<img src="https://res.cloudinary.com/dclbtusww/image/upload/v1725670993/Sumcode/Svgify/spkctkwkydsmnvki85di.png" alt="Svgify Logo" style="width: 100%; object-fit: contain;" />
</div>
<br/>
`Svgify` is a lightweight tool designed to dynamically render and style SVG icons. It fetches SVG files from the specified directory, allowing you to easily integrate scalable vector graphics into your React application with customizable properties.

## 1. Features

-   **Dynamic SVG Rendering:** Fetches and displays SVG icons based on the provided `IconName`.
-   **Customizable Styling:** Supports inline styles, CSS classes, and different font weights (fill, stroke, or both).
-   **Scalable Icons:** Adjust the size of your icons with the `Scale` factor that will be multiplied by css `font-size` property.
-   **Icons Caching:** Icons is being cached in `localstorage` for better performance.

##

![npm version](https://img.shields.io/npm/v/@sumcode/svgifyjs.svg?label=version&style=flat-square)
![npm downloads](https://img.shields.io/npm/dw/@sumcode/svgifyjs.svg?color=red&style=flat-square)
![bundle size](https://img.shields.io/bundlephobia/min/@sumcode/svgifyjs.svg?color=gold&style=flat-square)
![license](https://img.shields.io/npm/l/@sumcode/svgifyjs.svg?color=orange&style=flat-square)
![dependencies](https://img.shields.io/librariesio/release/npm/@sumcode/svgifyjs?style=flat-square)
![TypeScript](https://img.shields.io/npm/types/@sumcode/svgifyjs.svg?style=flat-square)
![issues](https://img.shields.io/github/issues/M7mmedATeF/svgifyjs.svg?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/M7mmedATeF/svgifyjs.svg?style=social)

The project is still in its beta version so some errors may occur or some icons may not accept the changes .. so please be helpful and report us for any problems you face.

## 2. Testing

For Exhaustive 10K icon is being randomly generated from 70 icon [click here](https://svgify-exhaustive.netlify.app/)

<!-- ## 3. Basic Installation

Install the package via npm:

```
npm install @sumcode/svgify
```

Add StyleSheet to your _`App.jsx`_ file.

```js
import "@sumcode/svgify/styles";
```

Initiate folder structure:

-   Make folder _`public/assets/icons`_.
-   Download your _`YOUR_ICON_NAME.svg`_ in the folder.

```
.
└── my-project
    ├── public
    │   └── assets
    │       └── icons (Add your svg icons here)
    │           └── YOUR_ICON_NAME.svg
    └── src
        └── index.html
``` -->

## 3. Example

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SvgifyJS</title>
        <link rel="stylesheet" href="./your_style.css" />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@sumcode/svgifyjs@latest/dist/style.css" />
    </head>
    <body>
        <i
            class="svgify"
            data-icon="i1"
            data-scale="10"
            data-font-weight="fill"></i>

        <script src="https://cdn.jsdelivr.net/npm/@sumcode/svgifyjs@latest/dist/index.js"></script>
        <script>
            const svgifyInstance = new Svgify();
        </script>
    </body>
</html>
```

## 4. How To Use

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SvgifyJS</title>
        <link rel="stylesheet" href="./your_style.css" />
        <!-- Import Style from CDN -->
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@sumcode/svgifyjs@latest/dist/style.css" />
    </head>
    <body>
        <i
            class="svgify"
            data-icon="i1"
            data-scale="10"
            data-font-weight="fill"></i>
        <!-- Import Library from CDN -->
        <script src="https://cdn.jsdelivr.net/npm/@sumcode/svgifyjs@latest/dist/index.js"></script>
        <script>
            const svgifyInstance = new Svgify({
                path: "assets/icons", // Specify the path to the svg icon (optional).
                version: 1, // add different version to clear all old cached svg icons (default = 1).
                FetchIcon: (Icon_Path) => {
                    return fetch(Icon_Path, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                }, // customize fetching methods (optional).
                loadingMSG: `<p>fetching svg<p>`, // Message or html element to be printed while waiting to fetch icon (optional).
                errorMSG: `<p>Error fetching svg<p>`, // Message or html element to be printed if error occurs (optional).
            });
        </script>
    </body>
</html>
```

## 5. Class Settings

| Parameter    | Type                                        | Initial value          | Usage                                                             |
| :----------- | :------------------------------------------ | :--------------------- | :---------------------------------------------------------------- |
| `path`       | `string`?                                   | `""`                   | Specify the path to the svg icon                                  |
| `version`    | `number`?                                   | `1`                    | Add different version to clear all old cached svg icons           |
| `FetchIcon`  | `(Icon_path: string) => Promise<Response>`? | [Sec 4](#4-how-to-use) | Customize fetching methods                                        |
| `loadingMSG` | `string \| html element`?                   | `""`                   | Message or html element to be printed while waiting to fetch icon |
| `errorMSG`   | `string \| html element`?                   | `""`                   | Message or html element to be printed if error occurs             |

## 6. HTML Tag Attributes

| Parameter          | Type                                        | Initial value | Usage                                                            |
| :----------------- | :------------------------------------------ | :------------ | :--------------------------------------------------------------- |
| `data-icon`        | `string`?                                   | `""`          | The name of the icon in the mentioned path without its extension |
| `data-scale`       | `number`?                                   | `1`           | The factor to be multiplied by the styled font-sizeicons         |
| `data-font-weight` | `(Icon_path: string) => Promise<Response>`? | `fill`        | Specifies the type of the icon "stroke" , "fill" , "both"        |

## 7. Author

<p style="margin-bottom: 5px">Mohammed Atef</p>

-   [LinkedIn](https://www.linkedin.com/in/m7mmed3atef/)
-   [Github](https://github.com/M7mmedATeF)
