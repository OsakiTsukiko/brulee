import { Tab } from "./tab";

export { TabCont };

class TabCont {
    root_element: HTMLDivElement
    tab_cont: HTMLDivElement
    content_cont: HTMLDivElement

    tabs: Array<Tab> = []

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

    add_tab(tab_title: string) {
        for (let t of this.tabs) {
            t.get_root().classList.remove("selected");
        }
        let tab = new Tab(tab_title, true);
        this.tabs.push(tab);
        this.tab_cont.appendChild(tab.get_root());
    }
}

