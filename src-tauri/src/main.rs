// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, fs, mem, path::Path, process, sync::Mutex};

use brulee::project::Project;

static OPEN_PROJ: Mutex<Option<Project>> = Mutex::new(None);

#[tauri::command]
fn my_custom_command() {
  println!("I was invoked from JS!");
  let oproj_mut = OPEN_PROJ.lock().unwrap();
  match *oproj_mut {
    Some(ref p) => println!("AOK! {:?}", p.path.display()),
    None => println!("NO PROJECT YET"),
  }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    
    // Ensure we have one argument, the path
    if args.len() != 2 {
        println!("No project selected (usage: {} <path>)", args[0]);
        // process::exit(1);
    } else {
        let proj_path = &args[1];

        // Check if the path exists and is a directory
        if !Path::new(proj_path).exists() {
            eprintln!("Error: Path '{}' does not exist.", proj_path);
            process::exit(1);
        } 

        if !Path::new(proj_path).is_dir() {
            eprintln!("Error: Path '{}' is not a directory.", proj_path);
            process::exit(1);
        }   

        // Convert to absolute path
        match fs::canonicalize(proj_path) {
            Ok(absolute_path) => {
                let mut oproj_mut = OPEN_PROJ.lock().unwrap();
                *oproj_mut = Some(Project::new(absolute_path));
                mem::drop(oproj_mut);
            },
            Err(e) => {
                eprintln!("Error converting to absolute path: {}", e);
                process::exit(1);
            }
        }
    }

    // Initialize Tauri
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
