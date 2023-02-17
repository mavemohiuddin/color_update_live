let color_box = document.querySelector("#color_details");
let output = document.querySelector(".output");
let hue = document.querySelector(".hue");
let color_grad = document.querySelector(".color_grad");
let clickX = "";
let clickY = "";
let isDown = 0;

hue.addEventListener("input", () => {
    console.log(color_grad);
    color_grad.style.cssText = `background-image: linear-gradient(to left, hsl(${hue.value}, 100%, 50%), transparent)`;
    colorUpdate();
})
color_box.addEventListener("click", (event) => {
    clickX = event.offsetX;
    clickY = event.offsetY;
    colorUpdate();
})
color_box.addEventListener("mousedown", () => {
    isDown = 1;
})
color_box.addEventListener("mousemove", (event) => {
    if (isDown == 1) {
        clickX = event.offsetX;
        clickY = event.offsetY;
        colorUpdate();
    }
})
color_box.addEventListener("mouseup", () => {
    isDown = 0;
})

const colorUpdate = () => {
    let selected = document.createElement("div");
    let currentSelected = color_box.querySelector(".marker");
    let boxHeight = color_box.offsetHeight;
    let boxWidth = color_box.offsetWidth;
    let hue_temp = hue.value;
    
    addClass(selected, ["border-2", "pointer-events-none", "border-white", "bg-transparent", "h-4", "w-4", "rounded-full", "absolute", "z-10", "-translate-x-1/2", "-translate-y-1/2", "marker", "shadow-gray-400", "shadow-md"])
    selected.style.top = `${clickY}px`;
    selected.style.left = `${clickX}px`;

    if (currentSelected != null) {
        currentSelected.remove();
    }
    color_box.appendChild(selected);

    let saturation_temp = Math.round((clickX / boxWidth) * 100);
    let light_temp = Math.round((clickY / boxHeight) * 100);
    let color = colorCalc(hue_temp, saturation_temp, light_temp);
    
    output.style.background = color;
}
const addClass = (item, classlist) => {
    for (i in classlist) {
        item.classList.add(classlist[i]);
    }
}
const colorCalc = (hue_temp, saturation_temp, light_temp) => {
    let saturation = saturation_temp;
    let light = Math.round(100 * (100-light_temp) / (100 + saturation_temp));
    let hue = hue_temp;
    textUpdate(hue, saturation, light);
    return `hsl(${hue}, ${saturation}%, ${light}%)`;
};

const textUpdate = (hue, saturation, light) => {
    document.querySelector(".color_hsl").innerHTML = `hsl(${hue}, ${saturation}%, ${light}%)`;
    let colorHex = hslToHex(hue, saturation, light);
    document.querySelector(".color_hex").innerHTML = colorHex;
    let colorRgb = hexToRgb(colorHex);
    document.querySelector(".color_rgb").innerHTML = colorRgb;
}

const hslToHex = (hue, saturation, light) => {
    light /= 100;
    const temp = saturation * Math.min(light, 1-light) / 100;
    const converter = input => {
        const temp2 = (input + hue / 30) % 12;
        const color = light - temp * Math.max(Math.min(temp2 - 3, 9 - temp2, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${converter(0)}${converter(8)}${converter(4)}`;
}

const hexToRgb = hex => {
    let red = parseInt(hex.slice(1,3), 16);
    let green = parseInt(hex.slice(3,5), 16);
    let blue = parseInt(hex.slice(5,7), 16);
    console.log(hex.slice(1,3), hex.slice(3,5), hex.slice(5,7));
    return `rgb(${red}, ${green}, ${blue})`
}