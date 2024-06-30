import { emit, listen, once } from "@tauri-apps/api/event";

let output_ta = document.getElementById("output")!;
let input_ta = document.getElementById("input")!;

let root = document.querySelector(":root")!;
let computed_root = getComputedStyle(root);

let color_dict = {};

const unlisten = listen<Record<string, string>>("respond_theme_object", (event) => {
    console.log(event.payload);
    for (let color_var in event.payload) {
        console.log(color_var, event.payload[color_var]!)
        color_dict[color_var] = event.payload[color_var]!;
    }
    continue_execution();
});

function update_output() {
    output_ta.textContent = JSON.stringify(color_dict);
}

window.onload = async () => {
    emit("request_theme_object");
}

function continue_execution() {
    update_output();

    let varlist = document.getElementById("var-list")!;
    for (let color_var in color_dict) {
        /*
            <div class="var">
                <label for="varname">--varname</label>
                <input type="color" name="varname" id="varname">
            </div>
        */
        let var_cont = document.createElement("div");
        var_cont.classList.add("var")
        
        let label = document.createElement("label");
        label.setAttribute("for", color_var);
        label.textContent = color_var;

        let input = document.createElement("input");
        input.setAttribute("type", "color");
        input.setAttribute("id", color_var);
        input.value = color_dict[color_var]!;

        var_cont.appendChild(label);
        var_cont.appendChild(input);

        varlist.appendChild(var_cont);

        input.onchange = function (ev) {
            // console.log(color_var, ": ", input.value);
            color_dict[color_var] = input.value;
            update_output();
            emit(
                "change_theme_variable", 
                { 
                    name: color_var, 
                    value: input.value 
                }
            );
        }
    }
}

