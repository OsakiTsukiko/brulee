// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

fn main() {
    match env::current_exe() {
        Ok(exe_path) => println!("Path of this executable is: {}",
                                exe_path.display()),
        Err(e) => println!("failed to get current exe path: {e}"),
    };

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
