### NPM repository scafollding

This repository will be created based on this article: https://medium.com/simform-engineering/building-a-component-library-with-react-typescript-and-storybook-a-comprehensive-guide-ba189accdaf5

### How to develop components locally

The esiest way to develop library components in isolation - it is developing it
via Storybook that provides hot-reload updates during developmnet process.

If you want to test library locally within another project where this library
is supposed to used without publishing it to NPM repository - via linking

Step 1:
Build library in this repository

```
yarn build
```

The best way to develop component within the Storybook and it provides the hot-reloading
