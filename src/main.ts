import { start_engine } from "./tab_engine/tab_engine";
import { initialize_config } from "./ts/config_manager";
import { theme_selector_button_listener } from "./ts/theme_editor";

window.onload = function() {
    initialize_config();
    start_engine();
};

document.getElementById("theme_editor_button")!.onclick = theme_selector_button_listener;