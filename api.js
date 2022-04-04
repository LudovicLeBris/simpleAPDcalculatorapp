const air_density = 1.2059;
const air_viscosity = 0.000015081;
const roughness = 0.000010;
const calculate = document.getElementById("calculate");

calculate.addEventListener("click", function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    const Flow_rate = document.getElementById("flow_rate").value;
    const Diameter = document.getElementById("diameter").value;
    const Length = document.getElementById("length").value;
    console.log(Flow_rate);
    console.log(Diameter);
    const Flow_speed = flow_speed(Flow_rate, Diameter);
    document
        .getElementById("flow_speed")
        .textContent = Flow_speed;
    const Linear_apd = linear_apd(Length, Diameter, Flow_speed);
    document
        .getElementById("linear_apd")
        .textContent = Linear_apd;
})

function flow_speed(flow_rate, diameter) {
    const section = (Math.PI * (diameter / 1000) ** 2) / 4;
    return ((flow_rate / 3600) / section).toFixed(2);
}

function linear_apd(length, diameter, flow_speed) {
    const reynolds = (flow_speed * (diameter * 10 ** -3)) / air_viscosity;
    console.log(reynolds);
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
    console.log(lambda_list2);
    let min_lambda2 = Math.min.apply(Math, lambda_list2.slice(2));
    console.log(min_lambda2);
    let lambda_def = lambda_list[lambda_list2.slice(0,6).indexOf(min_lambda2)];
    console.log(lambda_def);
    return ((lambda_def * length * air_density * (flow_speed ** 2)) / (2 * (diameter / 1000))).toFixed(2);
}