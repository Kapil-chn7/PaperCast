import { createApp } from "vue";
import mitt from 'mitt'

import App from "./App";

const app = createApp(App);

const emitter=mitt();
app.config.globalProperties.emitter=emitter;

app.mount("#app");
