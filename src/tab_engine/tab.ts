export { Tab };

class Tab {
    root_element: HTMLDivElement
    tab_icon: HTMLDivElement
    tab_title: HTMLDivElement
    tab_btns: HTMLDivElement

    close_tab_btn: HTMLElement

    constructor(title: string, is_selected: boolean = false) {
        this.root_element = document.createElement("div");
        this.root_element.classList.add("tab");
        if (is_selected) {
            this.root_element.classList.add("selected");
        }

        this.tab_icon = document.createElement("div");
        this.tab_icon.classList.add("tab-icon");
        this.root_element.appendChild(this.tab_icon);

        let icon = document.createElement("i");
        icon.classList.add("fa-brands", "fa-rust");
        this.tab_icon.appendChild(icon);

        this.tab_title = document.createElement("div");
        this.tab_title.classList.add("tab-title");
        this.tab_title.textContent = title;
        this.root_element.appendChild(this.tab_title);

        this.tab_btns = document.createElement("div");
        this.tab_btns.classList.add("tab-btns");
        this.root_element.appendChild(this.tab_btns);
        
        this.close_tab_btn = document.createElement("i");
        this.close_tab_btn.classList.add("fa-solid", "fa-dragon");
        this.tab_btns.appendChild(this.close_tab_btn);
    }

    get_root() {return this.root_element;}
}