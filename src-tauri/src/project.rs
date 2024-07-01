use std::{fs, path::PathBuf};

use crate::conf::BuildCfg;

pub struct Project {
    pub path: PathBuf,
    pub brulee_path: PathBuf
}

impl Project {
    pub fn new(path: PathBuf) -> Self {
        // path should exist..
        
        let brulee_path = path.join(BuildCfg::PROJECT_DIR_NAME);

        if cfg!(debug_assertions) {
            println!("Checking for brulee project folder.");
        }
        if !brulee_path.exists() {
            fs::create_dir_all(&brulee_path).unwrap();
            if cfg!(debug_assertions) {
                println!("None Found! Creating brulee folder at {:?}.", brulee_path.display());
            }
            // TODO: save default project config
        } else {
            if cfg!(debug_assertions) {
                println!("Brulee folder exists. Loading Config..");
            }    
            // TODO: load project config
        }
        
        Self {
            path,
            brulee_path
        }
    }
}