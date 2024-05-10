import { initialize_config } from "./ts/config_manager";
import { theme_selector_button_listener } from "./ts/theme_editor";

window.onload = initialize_config;

document.getElementById("theme_editor_button")!.onclick = theme_selector_button_listener;