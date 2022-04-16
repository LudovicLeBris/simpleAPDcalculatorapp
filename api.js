const air_density = 1.2059;
const air_viscosity = 0.000015081;
const roughness = 0.000010;
const select_diameter = document.getElementById("diameter")
const calculate = document.getElementById("calculate");
const results = document.getElementById("results");
const reset = document.getElementById("reset");
const actualPage = location.href.split("/").pop();
const singularities = {
    "90_elbow": 0.4,
    "60_elbow": 0.31,
    "45_elbow": 0.23,
    "30_elbow": 0.17,
    "90_sep_tee": 2.0,
    "90_junc_tee": 2.27,
    "45_sep_tee": 0.58,
    "45_junc_tee":1.64,
    "long_reducer": 0.59,
    "pressed_reducer": 0.35
}

function flowSpeedText() {
    const Flow_rate = document.getElementById("flow_rate").value;
    const Diameter = document.getElementById("diameter").value;
    if (Flow_rate != 0) {
        document
            .getElementById("flow_speed")
            .textContent = flow_speed(Flow_rate, Diameter);
    } else {
        select_diameter.value = "0"
        if (actualPage === "index_fr.html") {
            alert("Il manque une valeur numérique dans le champ débit.");
        } else {
            alert("Numeric value is missing in flow rate field.");
        }
        
    }
}

function calculateEvent() {
    const Flow_rate = document.getElementById("flow_rate").value;
    const Diameter = document.getElementById("diameter").value;
    const Flow_speed = flow_speed(Flow_rate, Diameter);
    const Linear_apd = linear_apd(Diameter, Flow_speed);
    if (Flow_rate != 0 && Diameter != 0 ) {
        document
            .getElementById("linear_apd")
            .textContent = Linear_apd;
        for (let sing in singularities) {
            document
                .getElementById(sing)
                .textContent = singular_apd(singularities[sing], Flow_speed);
        results.classList.add("fade");
        }
    } else {
        if (actualPage === "index_fr.html") {
            alert("Il manque une valeur dans le champs débit et/ou un diamètre n'est pas sélectionné.");
        } else {
            alert("Numeric value is missing in flow rate field and/or a duct section is not selected.");
        } 
    }
}

function flow_speed(flow_rate, diameter) {
    const section = (Math.PI * (diameter / 1000) ** 2) / 4;
    return ((flow_rate / 3600) / section).toFixed(2);
}

function linear_apd(diameter, flow_speed) {
    const reynolds = (flow_speed * (diameter * 10 ** -3)) / air_viscosity;
    const b = 2.51 / reynolds;
    let roughness_lambda = (1 / (-2 * Math.log10(roughness))) ** 2;
    let i = 0
    let lambda_list =  [(1 / -2 * Math.log10(roughness + b * (1 / Math.sqrt(roughness_lambda)))) ** 2];
    while (i < 12) {
        let temp_lambda = (1 / (-2 * Math.log10(roughness + b * (1 / Math.sqrt(lambda_list[lambda_list.length -1]))))) ** 2;
        lambda_list.push(temp_lambda);
        i++;
    }
    let lambda_list2 = [];
    for (let j = 0; j < lambda_list.length; j++) {
        lambda_list2.push(lambda_list[j] - roughness_lambda);
    }
    let min_lambda2 = Math.min.apply(Math, lambda_list2.slice(2));
    let lambda_def = lambda_list[lambda_list2.slice(0,6).indexOf(min_lambda2)];
    return ((lambda_def * air_density * (flow_speed ** 2)) / (2 * (diameter / 1000))).toFixed(2);
}

function singular_apd(singularity, flow_speed) {
    return (singularity * air_density * (flow_speed ** 2)/2).toFixed(2);
}

reset.addEventListener("click", function(){
    location.reload();
    return false;
})