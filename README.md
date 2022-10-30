# PostCSS Demo Setup

From Brad Traversy video [PostCSS Crash Course](https://youtu.be/SP8mSVSAh6s), Oct 26, 2022 - [his repo](https://github.com/bradtraversy/postcss-crash)

NOTE: It's odd how you have to create files and folders in `dist`!!!

## Basic overview

- It's integrated into tools like next.js, Parcel, Webpack, Gulp, and others
- It's a tool for transforming y our CSS using JS plugins - go to postcss.parts - it's not a preprocessor like SASS
- It parses your CSS strings as JS objects - Abstract Syntax Tree - it makes it easy to make your own Postcss plugins
- Common plugins: autoprefixer, postcss-preset-env, stylelint, cssnano,
- LINKS: [PostCSS on GitHub](https://github.com/postcss/postcss) and [PostCSS docs](https://postcss.org/docs/)

Parcel has built-in PostCSS support. It already uses Autoprefixer and cssnano. If you want to change plugins, create `postcss.config.js` in project’s root:

```js
module.exports = {
  plugins: [require("autoprefixer"), require("postcss-nested")]
};
```

## Installation and setup

- Run `npm init -y`
- Then `npm i -D postcss postcss-cli`
- Create a folder `src`, inside it `input.css`,
- Create another folder for the output named `dist`
- In `package.json` create a script - you to to have the CLI installed to do this
- Call it `build:css` and you add `postcss [source file] -o [output file]` where `-o` is for Output
- Or `postcss src/input.css -o dist/style.css` and that will build it
- If you just use this script, every time you edit your CSS you will have to run `npm run build:css` in order for it to build, but it has a `--watch` flag you can use though he used `-w`
- Add some CSS rules then `npm run build:css` and then style.css is created in the dist folder and that is the file you would include in your HTML

> NOTE: what is a source map?

`SourceMap`: a file that maps from the transformed source to the original source, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger | ...a file that maps from the transformed source to the original source.

It is a mapping between the generated/transpiled/minified JavaScript file and one or more original source files. The main purpose of Sourcemaps is to aid debugging.

From MDN: The `SourceMap` HTTP response header links generated code to a source map, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger.

- Then in the `dist` folder create `index.html` and link to `style.css`

## Installing plugins

Basics on Plugins: 1) Install it, 2) Add it to the config file, 3) Add options if necessary

### Installing Autoprefixer

- Install Autoprefixer `npm i -D autoprefixer`
- After installing a plugin you need to install it to y our config so you need to create that file in the root and name it `postcss.config.js`
- In there you want `module.exports` object and in there a `plugins` array where each entry is a require fx for each plugin
- The autoprefixer plugin uses the caniuse website - test it with the attribute and pseudo element of `::placeholder` so add a form element with an input
- Then add a css rule for it in input.css - run `npm run build:css` - works!
- Instead run `npm run watch:css`

### Installing Postcss Preset Env

- Install postcss-preset-env which allows you to the cutting edge features of CSS which aren't yet implemented in browsers (why use it then?)
- `CTRL+C` then `npm i -D postcss-preset-env` then add it to the config file
- This plugin does take options which you have to add to the config file - he wants to define the `stage`
- NOTE: the syntax is really odd for the options
- CSS and JS come out in different stages and the default I think is `2` so he is using `1`
- Anytime you change your config file you have to restart the watch command
- He is using some new CSS features: 1) custom selector, 2) custom media queries, 3) nesting but you need to add `&`

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

### Installing Precss

- The next plugin gives you the same syntax as SASS and you don't need `&`
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
- As in SASS, variables go in their own file - need a new plugin

### Installing Postcss Import

- `npm i -D postcss-import` - 25:10
- in `src` create `vars.css`, add your variables in there, then in the main file import t hat file via `@import "vars";`
- run `npm run watch:css` - do I have to open with Liveserver?
- create some more variables then create `card.css` and add some styles then import that into the main file but make sure to have `vars` as the first import so you can use it in all other files

### Installing Postcss Assets

- `CTRL+C` then `npm i -D postcss-assets` - it allows you to manage your images and other assets
- it takes options so parens and curly brackets, `({})` directly after the closing parens for `require`
- add `loadPaths` and set it to `dist/img` in an array - then add a logo or something to it
- he is using it as a bg img and a function called `resolve("img-filename")` then he used `width("img-filename")` - looks like crap - can also do `height()`
- I'm removing that css but here it is:

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

### Installing CSS Nano

- `npm i -D cssnano` to optimize and minify your CSS with options of `preset`
