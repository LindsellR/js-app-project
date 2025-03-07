# stylelint-plugin-styled-components

[![NPM version](https://img.shields.io/npm/v/stylelint-file-max-lines.svg)](https://www.npmjs.com/package/stylelint-file-max-lines)

A [Stylelint] plugin for the styled-components Library

## Installation

```sh
npm install --save-dev stylelint-plugin-styled-components postcss postcss-styled-syntax
```

## Configuration

Add this config to your `.stylelintrc`:

```json
{
    "customSyntax": "postcss-styled-syntax",
    "plugins": ["stylelint-plugin-styled-components"],
    "rules": {
        "plugin/styled-components-enforce-ampersand": true
    }
}
```

## Rules

### plugin/styled-components-enforce-ampersand

---

### Usage:

This rule helps to find all pseudo elements and toast an error in console if this pseudo element does't have ampersand.
If you pass the --fix option, it will add the ampersand to all the pseudo elements that don't have it.

### Purpose:

-   when updating the styled-components from v5 to v6 there are a breaking changes.

![image](https://github.com/ArkadiK94/stylelint-plugin-styled-components/assets/76536506/d27aa215-3d19-433d-aa95-a15669b2594d)
Source: https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6

The problem is that you will not notice any error on the console when updating to v6. However, the styles will not work as you expected!

## Suggestions

If you have any suggestion for a new rule to enhance DX when using styled-components library, you are welcome to open an issue.

## Known Issues Realated to postcss-styled-syntax Library
![image](https://github.com/ArkadiK94/stylelint-plugin-styled-components/assets/76536506/517e7b72-e536-4772-bd66-5ec56d99bdf6)


[stylelint]: https://github.com/stylelint/stylelint/
