import { emit, listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";
import { theme, update_theme } from "./config_manager";

export { theme_selector_button_listener, root };

let root = document.querySelector(":root") as HTMLElement;

let theme_selector_button_listener = () => {
    const theme_selector_window = new WebviewWindow("themeSelectorWindow", {
        url: "/subwindows/theme_settings/index.html",
        title: "Brulee - Theme Editor"
    });

    theme_selector_window.once('tauri://created', function () {
        console.log("SUCCESS");
    });

    theme_selector_window.once('tauri://error', function (e) {
        console.log("ERROR: ", e);
    });
};

listen<Record<string, string>>("change_theme_variable", (event) => {
    root.style.setProperty(event.payload["name"], event.payload["value"]);
    update_theme(event.payload["name"], event.payload["value"]);
});

listen("request_theme_object", (/* event */) => {
    emit("respond_theme_object", 
        theme as Record<string, string>
    )
});