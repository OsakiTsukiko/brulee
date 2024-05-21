import { TabCont } from "./tab_cont";

export { start_engine };

let root_tab;

function start_engine() {
    root_tab = new TabCont();
    root_tab.add_tab("TEST1".toString());
    root_tab.add_tab("TEST2".toString());
    root_tab.add_tab("TEST3".toString());
    root_tab.add_tab("TEST4".toString());
    root_tab.add_tab("TEST5".toString());
    root_tab.add_tab("TEST6".toString());
    root_tab.add_tab("TEST7".toString());
    root_tab.add_tab("TEST8".toString());
    root_tab.add_tab("TEST9".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());
    root_tab.add_tab("TEST0".toString());

    console.log("AYO");
    document.getElementById("editor-docker")?.appendChild(root_tab.get_root());
}