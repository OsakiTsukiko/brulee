import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { root } from "./theme_editor";

export { initialize_config, theme, update_theme };
export type { BruleeTheme };

const default_theme_config = {
    "--main-cont-background": "#292828",
    "--docker-cont-left-docker-background": "#363636",
    "--docker-cont-button-docker-background": "#363636",
    "--docker-cont-docker-button-background": "#292828",
    "--docker-cont-docker-button-color": "#787070",
    "--docker-cont-docker-button-hover-color": "#a89d9d",
    "--docker-cont-docker-button-disabled-background": "#292828",
    "--docker-cont-docker-button-disabled-color": "#3e3a3a",
    "--status-bar-background": "#1c1b1b",
    "--status-bar-color": "#a89d9d",
    "--status-bar-text-color": "#787070",
    "--status-bar-title-color": "#787070"
};

const theme_config_file = "theme/theme.brulee" // in AppConfig

let theme: Object;

interface BruleeTheme {
    [key: string]: string;
}

async function update_theme(field: string, value: string) {
    (theme as BruleeTheme)[field] = value;
    await writeTextFile(
        theme_config_file, 
        JSON.stringify(theme), 
        { dir: BaseDirectory.AppConfig }
    );
}

let initialize_config = async () => {
    // Load Theme
    let theme_cfg_exists = await exists(
        theme_config_file, 
        { dir: BaseDirectory.AppConfig }
    );

    if (!await exists("theme", { dir: BaseDirectory.AppConfig })) {
        await createDir(
            "theme", 
            { dir: BaseDirectory.AppConfig, recursive: true }
        );
        // no need to be recursive.. but eh..
    }

    if (theme_cfg_exists) {
        console.log("Found Theme Config File!");
        const contents = await readTextFile(
            theme_config_file, 
            { dir: BaseDirectory.AppConfig }
        );

        let parsed = JSON.parse(contents);
        if (parsed != undefined) {
            theme = parsed;
        } else {
            console.error("Theme File Corrupted, Overwriting with default theme!");
            await writeTextFile(
                theme_config_file, 
                JSON.stringify(default_theme_config), 
                { dir: BaseDirectory.AppConfig }
            );
            theme = theme_cfg_exists;
        }
    } else {
        console.log("Creating new Theme Config File!");
        await writeTextFile(
            theme_config_file, 
            JSON.stringify(default_theme_config), 
            { dir: BaseDirectory.AppConfig }
        );
        theme = default_theme_config;
    }

    for (let field in theme) {
        root.style.setProperty(
            field, (theme as BruleeTheme)[field]
        )
    }

    console.log(theme_cfg_exists);
};