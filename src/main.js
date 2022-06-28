import App from "./App.svelte";

// définition de la taille de la fenêtre
const win = nw.Window.get();
const width = 800, height = 500;
win.resizeTo(width, height);
win.setMaximumSize(width, height);
win.setMinimumSize(width, height);
win.setResizable(false);

const app = new App({ target: document.body });

export default app;
