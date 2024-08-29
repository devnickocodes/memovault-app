# Testing and Validation

## CSS Validation

[W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) was used to validate the CSS code with all css files passing the check.


## ESLint JavaScript Validator


- [ESLint](https://eslint.org/) was utilized by running the command `npx eslint` followed by the path to the specific file or directory you wish to check. For instance, running `npx eslint src/api` would analyze all files within the `api` folder. After conducting an initial check, you can apply automatic fixes by appending the `--fix` flag to the command. For example: `npx eslint src/api --fix`. This flag helps to quickly resolve straightforward issues, such as missing semicolons or ensuring that `<span>` elements are on their own lines, among other common corrections.


- The JavaScript files were validated using the ESLint JavaScript validator. Certain rules that triggered irrelevant warnings have been temporarily disabled in the .eslintrc.js configuration. These warnings will be addressed in future updates, as some code requires refactoring and adjustments. Additionally, some of the flagged issues are not actual problems, and applying some of the suggested fixes at this stage could interfere with the app's current functionality.

- You can find the remaining issues bellow:

    - Missing React import statements.
    - The object passed as the value prop to the Context provider changes every render. To fix this consider wrapping it in a useMemo hook.
    - Long lines
    - Unexpected console statements

























