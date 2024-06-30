import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { root } from "./theme_editor";

export { initialize_config, theme, update_theme };
export type { BruleeTheme };

let default_theme_config: Record<string, string> = {};

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
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    const cssVars: Record<string, string> = {};

    // Iterate over the styles to find CSS variables
    for (let i = 0; i < styles.length; i++) {
        const prop = styles[i];
        if (prop.startsWith('--')) {
            const value = styles.getPropertyValue(prop).trim();
            cssVars[prop] = value;
            if (prop.startsWith("--color--")) {
                default_theme_config[prop] = value;
            }
        }
    }

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