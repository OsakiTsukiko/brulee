import { Tab, TabType } from "./tab"

export { TabContent };

class TabContent {
    tab: Tab;
    type: TabType;
    
    root_element: HTMLElement;


    constructor(tab: Tab, type: TabType) {
        this.tab = tab;
        this.type = type;

        this.root_element = document.createElement("div");
        this.root_element.classList.add("tab-content");

        if (type == TabType.EMPTY) {
            let center_cont = document.createElement("div");
            center_cont.classList.add("center-cont");
            this.root_element.appendChild(center_cont);

            let logo = document.createElement("img");
            logo.src = "src/assets/brulee.png";
            logo.classList.add("logo");
            center_cont.appendChild(logo);
            
            // TODO: add buttons for new file or sum..

            return;
        }
    }

    get_root() {
        return this.root_element;
    }
}