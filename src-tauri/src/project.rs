use std::path::PathBuf;

pub struct Project {
    pub path: PathBuf
}

impl Project {
    pub fn new(path: PathBuf) -> Self {
        Self {
            path
        }
    }
}