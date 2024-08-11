<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/images/banner@light.png">
  <source media="(prefers-color-scheme: light)" srcset="./public/images/banner@dark.png">
  <img alt="Logo" src="./public/images/banner@light.png">
</picture>

# **MINI**

A lightweight minimalistic player for watching YouTube videos through a proxy. MINI uses the piped.video and cobalt.tools API to get a proxied video stream

## Known issues

- ~~https://github.com/aElDi/mini/issues/1~~
    **Solved**
    Just use a `piped` provider 💗


## Local Development

The MINI written on [Vite.js](https://vitejs.dev/) framework. Also it uses [axios](https://axios-http.com/), [Radix Themes](https://www.radix-ui.com/), [Vidstack.js](https://www.vidstack.io/) libraries

### Clone repository

```bash
git clone https://github.com/aElDi/mini.git
```

### Install dependencies

```bash
npm install
```

### Run server

```bash
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)