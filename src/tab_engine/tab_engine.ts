import { TabCont } from "./tab_cont";

export { start_engine };

let root_tab;

function start_engine() {
    root_tab = new TabCont();
    root_tab.add_tab("10th Class".toString());
    root_tab.add_tab("rust_file.rs".toString());
    root_tab.add_tab("webserver.go".toString());

    console.log("AYO");
    document.getElementById("editor-docker")?.appendChild(root_tab.get_root());
}