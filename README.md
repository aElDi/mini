![Logo](./public/images/banner.png)

# **MINI** - proxy youtube player

A lightweight minimalistic player for watching YouTube videos through a proxy. MINI uses the cobalt.tools API to get a proxied video stream

## Known issues

- #1
  > [!CAUTION]
  > [Cobalt.tools API](https://github.com/imputnet/cobalt/blob/current/docs/api.md#get-apistream) returns a stream for downloading, not a whole file, which makes it impossible to get its duration, control rewind with `Content-Range`. This can be fixed by downloading the video before viewing, but then the service needs a backend. I will try to fix it using [piped.video](https://piped.video/trending).

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