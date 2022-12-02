# PostCSS Demo Setup

Lnks: 

1. [Postcss docs](https://postcss.org/docs/)
1. [Postcss plugins](https://postcss.org/docs/postcss-plugins)
1. [Postcss plugins 2](https://www.postcss.parts/)
1. [PostCSS on GitHub](https://github.com/postcss/postcss)
1. [PostCSS with Parcel](https://github.com/postcss/postcss#parcel)
1. [PostCSS with npm scripts](https://github.com/postcss/postcss#npm-scripts)
1. [What It Really Is And What It Really Does](https://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/)
1. [Postcss Guides](https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889)

<a id="back-to-top"></a>

## Table of contents

1. [Overview](#overview)
1. [Installation and setup](#installation-and-setup)
1. [Plugins](#plugins)
   1. [PostCSS Config File](#postcss-config-file)
   1. [postcss-import](#postcss-import)
   1. [Autoprefixer](#autoprefixer)
   1. [Postcss Preset Env](#postcss-preset-env)
   1. [Precss](#precss)
   1. [CSSNano](#cssnano)
   1. [Postcss Assets](#postcss-assets)
   1. [postcss-nested](#postcss-nested)
   1. [Stylelint](#stylelint)

## Overview

- It's all about the plugins
- It's integrated into tools like _Next.js_, _Vite_, _Parcel_, _Webpack_, _Gulp_, and others
- It's a tool for transforming your CSS using JS plugins 
- It's not a preprocessor like SASS - no eexternal compiler needed
- It takes your CSS and converts it into an AST (_Abstract Syntax Tree_) and parses your CSS strings as JavaScript Objects
- Postcss has an API that allows JavaScript plugins to access the AST 
- It parses your CSS strings as JavaScript objects - Abstract Syntax Tree 
- It makes it easy to make your own Postcss plugins
- You can use CSS and get the SASS functionality like importing modules
- Kevin Powell has: `src/style.css` and folders names `base` (base.css, reset.css), `components` (buttons.css), and `utilities` (container.css, flex.css, font-sizes.css)

> Kevin Powell email: he uses PostCSS and his fav plugins: `purgeCSS` and `postcss-preset-env` - he uses `gulp` in a lot of his videos

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

## Installation and setup

```bash
npm init -y
npm i -D postcss postcss-cli
```

- Run `npm init -y`
- Then `npm i -D postcss postcss-cli`
- Create a folder `src`, inside it create `input.css`
- Create another folder for the output named `dist` (why did he create this?)
- In `package.json` create a script - you have to have the CLI installed for this
- Call it `build:css` and you add `postcss [source file] -o [output file]` where `-o` is for Output
- Or `postcss src/input.css -o dist/style.css` and that will build it
- If you just use this script, every time you edit your CSS you will have to run `npm run build:css` in order for it to build, but it has a `--watch` flag you can use though he used `-w`
- Add some CSS rules then `npm run build:css` and then `style.css` is created in the `dist` folder and that is the file you would include in your HTML
- NOTE: It's odd how you have to create files and folders in `dist`!!!
- Then in the `dist` folder create `index.html` and link to `style.css`

> NOTE: what is a source map?

`SourceMap`: a file that maps from the transformed source to the original source, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger | ...a file that maps from the transformed source to the original source.

It is a mapping between the generated/transpiled/minified JavaScript file and one or more original source files. The main purpose of Sourcemaps is to aid debugging.

> From MDN: The `SourceMap` HTTP response header links generated code to a source map, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger.

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

## Plugins

Basics on Plugins: 

1. Install it, 
2. Add it to the config file in the `plugins` array with `require`,
3. Add options if necessary `()` after `require('plugin-name')`

Popular plugins:

**_postcss-cli_**: To use PostCSS from your command-line interface or with npm scripts in `package.json`, or when you have a static site build - [npm on postcss-cli](https://www.npmjs.com/package/postcss-cli)

1. _Autoprefixer_: generates vendor prefixes
1. _postcss-preset-env_: allows you to use cutting-edge CSS features
1. _precss_: Use SASS-like syntax
1. _Stylelint_: Linting for your styles to avoid errors
1. _PostCSS Assets_: asset manager
1. _CSSNano_: optimize and minify CSS
1. _postcss-import_: import CSS modules
1. _postcss-nested_: for SASS-like nesting


### PostCSS Config File

- After installing a plugin you need to install it to your config so you need to create that file in the root and name it `postcss.config.js`
- In there you want `module.exports` object and in there a `plugins` array where each entry is a require function for each plugin

> Parcel has built-in PostCSS support. It already uses _Autoprefixer_ and _cssnano_. If you want to change plugins, create `postcss.config.js` in project’s root

```js
module.exports = {
  plugins: [
    require("autoprefixer"), 
    require("postcss-nested")
    ]
};
```

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### postcss-import

- `npm i -D postcss-import` and add to the config file in t he `plugins` array
- In `src` create `vars.css`, add your variables in there, then in the main file import that file via `@import "vars";`
- Run `npm run watch:css` - do I have to open with Liveserver?
- Create some more variables then create `card.css` and add some styles 
- Then import that into the main file but make sure to have `vars` as the first import so you can use it in all other files
- To use this you need a file in the root named `postcss.config.js`
- Then in `style.css` add `@import 'foldername/filename.css';` for each file

Then in package.json:

```json
  "scripts": {
    "postcss:watch": "postcss src/style.css --dir dist --watch",
    "build:css": "postcss src/input.css -o dist/style.css"
  },
```

- NOTE: `-d` can be substituted for `--dir` and `-w` for `--watch`
- Then `npm run postcss:watch`

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### Autoprefixer

- Install Autoprefixer `npm i -D autoprefixer`
- The autoprefixer plugin uses the **caniuse** website - test it with the attribute and pseudo element of `::placeholder` so add a form element with an input
- Then add a css rule for it in `input.css` - run `npm run build:css` - works!
- Instead run `npm run watch:css`

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### Postcss Preset Env

- Install `postcss-preset-env` which allows you to the cutting edge features of CSS which aren't yet implemented in browsers
- You need options for some things - `stage` 2 is the default, `stage` 1 gives you nesting, e.g.:
- `CTRL+C` then `npm i -D postcss-preset-env` then add it to the config file
- This plugin take options which you have to add to the config file - define the `stage`
- **NOTE**: the syntax is really odd for the options
- CSS and JS come out in different stages and the default I think is `2` so use `1`
- Anytime you change your config file you have to restart the watch command
- CSS features: 1) custom selector, 2) custom media queries, 3) nesting but you need to add `& h2` or whatever the selector is
- You need the ampersand in CSS not with SASS though in SASS you use `&-`

```css
@custom-selector :--heading h1, h2, h3, h4, h5;
@custom-media --viewport-small (width <= 500px);

:--heading {
  @media (--viewport-small) {
    font-size: 2.5rem;
    color: blue;
  }
}
```

Nesting: 

```css
nav {
  padding: 1rem;
  & ul {
    margin: 0;
  }
}
```

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### Precss

- This plugin gives you the same syntax as SASS and you don't need `&`
- `CTRL+C` then `npm i -D precss` then add it to the config file
- Then `npm run watch:css` but you will get a message:

```
| This version of postcss-preset-env is not optimised to work with PostCSS 8. │
│              Please update to version 7 of PostCSS Preset Env.              │
│                                                                             │
│                  If you find issues, you can report it at:                  │
│        https://github.com/csstools/postcss-plugins/issues/new/choose        |
```

- You can still use it, they just haven't done the update yet
- As in SASS, variables go in their own file

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### CSSNano

- `npm i -D cssnano` to optimize and minify your CSS with options of `preset` set to default (what does that do?)
- `cssnano` minifies the output CSS file - just run `npm run postcss:watch`

### Postcss Assets

- `CTRL+C` then `npm i -D postcss-assets` - it allows you to manage your images and other assets
- It takes options so parens and curly brackets, `({})` directly after the closing parens for `require`
- Add `loadPaths` and set it to `dist/img` in an array 
- Create an `img` folder in `dist` then add a logo or something to it
- Try using it as a bg img and a function called `resolve("img-filename")` then use a width function: `width("img-filename")` - looks like crap - can also do `height()` - looks better without the width fx
- I'm removing that CSS but here it is:

```scss
.card {
  padding: 1.25rem;
  margin-top: 1.25rem;
  border: $borderWidth solid $borderColor;
  width: 31.25rem;
  background-image: resolve("kernix-logo6-90.png");
  background-repeat: no-repeat;
  background-position: center;
  width: width("kernix-logo6-90.png");

  h2 {
    color: green;
  }
}
```

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>

### postcss-nested

- Isn't `postcss-nested` for nesting? Why use this if you have `postcss-preset-env`?

### Stylelint

Link: [Stylelint](https://stylelint.io/)

- A mighty, modern linter that helps you avoid errors and enforce conventions in your styles
- You can lint CSS files by using the standard config and everything else by using extensions written by the community

<div align="right"><a href="#back-to-top" title="Table of Contents">Back to Top</a></div>