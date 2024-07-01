import { Tab, TabType } from "./tab";

export { TabCont };

class TabCont {
    root_element: HTMLDivElement
    tab_cont: HTMLDivElement
    content_cont: HTMLDivElement

    tabs: Array<Tab> = []
    selected_tab: Tab | null = null;

    constructor() {
        this.root_element = document.createElement("div");
        this.root_element.classList.add("editor-tab-container");

        let top_bar = document.createElement("div");
        top_bar.classList.add("top-bar");

        this.root_element.appendChild(top_bar);

        this.tab_cont = document.createElement("div");
        this.tab_cont.classList.add("tab-cont");

        top_bar.appendChild(this.tab_cont);


        this.content_cont = document.createElement("div");
        this.content_cont.classList.add("content-cont");

        this.root_element.appendChild(this.content_cont);

        this.tab_cont.addEventListener("wheel", (event) => {
            this.tab_cont.scrollLeft += event.deltaY;
        });
    }   

    get_root() {return this.root_element;}

    add_code_tab(tab_title: string) {
        
        let tab = new Tab(tab_title, this, TabType.CODE, false);
        this.tabs.push(tab);
        this.tab_cont.appendChild(tab.get_root());

        this.select_tab(tab);
    }

    add_empty_tab(tab_title: string) {
        
        let tab = new Tab(tab_title, this, TabType.EMPTY, false);
        this.tabs.push(tab);
        this.tab_cont.appendChild(tab.get_root());

        this.select_tab(tab);
    }

    remove_tab(tab: Tab) {
        if (!this.tabs.includes(tab)) {
            return;
        }

        let index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        this.tab_cont.removeChild(tab.get_root());

        if (this.tabs.length == 0) {
            this.select_tab(null);
            // IS EMPTYY
            this.add_empty_tab("EMPTY TAB");
        } else {
            this.select_tab(this.tabs[0]);
        }
    }

    select_tab(tab: Tab | null) {
        if (tab == null) {
            for (let t of this.tabs) {
                t.visual_deselect();
            }

            this.selected_tab = null;

            return;
        }

        if (!this.tabs.includes(tab)) {
            return;
        }

        for (let t of this.tabs) {
            t.visual_deselect();
        }

        tab.visual_select();
        this.selected_tab = tab;

        for (let child of this.content_cont.children) {
            this.content_cont.removeChild(child);
        }

        this.content_cont.appendChild(tab.content.get_root());
    }
}

