<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    html,
    body {
        -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow-x: hidden;
    }

    body {
        line-height: 1;
        font-size: 12px;
    }

    :focus {
        outline: 0
    }

    ol,
    ul {
        list-style: none
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    img {
        border: 0;
        width: 100%;
        max-width: 100% !important;
        vertical-align: middle;
    }

    input,
    textarea {
        margin: 0;
        padding: 0
    }

    a {
        text-decoration: none;
    }

    a:hover,
    a:focus {
        outline: none;
    }

    q:before,
    q:after {
        content: "";
    }
    html, body, div, span, applet, object, iframe, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, h1, h2, h3, h4, h5, article, section, nav, header, footer {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
