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

![npm version](https://img.shields.io/npm/v/@sumcode/svgify.svg?label=version&style=flat-square)
![npm downloads](https://img.shields.io/npm/dw/@sumcode/svgify.svg?color=red&style=flat-square)
![bundle size](https://img.shields.io/bundlephobia/min/@sumcode/svgify.svg?color=gold&style=flat-square)
![license](https://img.shields.io/npm/l/@sumcode/svgify.svg?color=orange&style=flat-square)
![dependencies](https://img.shields.io/librariesio/release/npm/@sumcode/svgify?style=flat-square)
![TypeScript](https://img.shields.io/npm/types/@sumcode/svgify.svg?style=flat-square)
![issues](https://img.shields.io/github/issues/M7mmedATeF/svgify.svg?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/M7mmedATeF/svgify.svg?style=social)

The project is still in its beta version so some errors may occur or some icons may not accept the changes .. so please be helpful and report us for any problems you face.

## 2. Testing

For Exhaustive 10K icon is being randomly generated from 70 icon [click here](https://svgify-exhaustive.netlify.app/)

## 3. Basic Installation

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
    ├── node_modules
    ├── public
    │   └── assets
    │       └── icons (Add your svg icons here)
    │           └── YOUR_ICON_NAME.svg
    └── src
        └── app.jsx (Add stylesheet here)
```

## 5. Example

```js
import "./App.css";
import Svgify from "@sumcode/svgify";

function App() {
    return (
        <>
            <Svgify IconName="YOUR_ICON_NAME" Scale={1.2} FontWeight="stroke" />
        </>
    );
}

export default App;
```

## 6. For version controlling ( optional - recommended for icon changing with the same name )

```js
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Svgifier } from "@sumcode/svgify";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* Add Svgify Provider around your routes */}
        <Svgifier version={1} clearForOldVersion>
            <App />
        </Svgifier>
    </StrictMode>
);
```

| Parameter            | Type                                                               | Initial value          | Usage                                                                                                                                         |
| :------------------- | :----------------------------------------------------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`            | `Number`\*                                                         | `1`                    | Your current icon's version `should be different from the old one`                                                                            |
| `clearForOldVersion` | `Boolean`?                                                         | `false`                | needs to be activated for upgrading from versions older than `2.0.0` <br/> _`(recommended to be disabled if starting with version >= 2.0.0)`_ |
| `base_path`          | `string`?                                                          | `/assets/icons/`       | Path of icon's folder starting from public folder                                                                                             |
| `FetchIcon`          | `(Icon_Path: string) => Promise<AxiosResponse<unknown, unknown>>`? | `axios.get(Icon_Path)` | Custom function to fetch the icon (Head to section 7.0 for example)                                                                           |

## 7. Custom fetching function

```javascript
    import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@sumcode/svgify/styles";
import { Svgifier } from "@sumcode/svgify";
import axios from "axios";

/*
 * for this example:
 *      icon_path = "/assets/iconization/YOUR_ICON_NAME"
 */
const FetchIcon = async (icon_path: string) => {
    return axios.get(`http://YOUR_SERVER_PUBLIC_URI.com/${icon_path}`);
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Svgifier
            base_path="/assets/iconization" // Changing public icon folder path
            version={2}
            FetchIcon={FetchIcon}
            clearForOldVersion>
            <App />
        </Svgifier>
    </StrictMode>
);

```

## 7. Parameters

| Parameter         | Type                     | Initial value | Usage                                                            |
| :---------------- | :----------------------- | :------------ | :--------------------------------------------------------------- |
| `IconName`        | `string`\*               | `""`          | The name of the icon in the mentioned path without its extension |
| `FontWeight`      | `string`?                | `fill`        | Specifies the type of the icon `"stroke"` , `"fill"` , `"both"`  |
| `Scale`           | `float`?                 | `1`           | The factor to be multiplied by the styled `font-size`            |
| `className`       | `string`?                | `""`          | Custom ClassName to be passed to the `span` element              |
| `LoadingElement`  | `"" \| React.ReactNode`? | `""`          | The text or element to be displayed while fetching the svg       |
| `NotFoundElement` | `"" \| React.ReactNode`? | `""`          | The text or element to be displayed on fetch error               |

## 8. Author

<p style="margin-bottom: 5px">Mohammed Atef</p>

-   [LinkedIn](https://www.linkedin.com/in/m7mmed3atef/)
-   [Github](https://github.com/M7mmedATeF)
