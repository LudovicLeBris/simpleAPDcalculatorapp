function openNav() {
    if (innerWidth <= 400) {
        document.getElementById("sideNavigation").style.width = "100%";
    } else if (innerWidth <= 640) {
        document.getElementById("sideNavigation").style.width = "75%";
    } else if (innerWidth <= 800) {
        document.getElementById("sideNavigation").style.width = "50%";
    } else {
        document.getElementById("sideNavigation").style.width = "33%";
    }
}

document.getElementById("sideNavigation").addEventListener('click', e => {
    if (e.target !== e.currentTarget) {} else {
        closeNav();
    }
});

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("techInfo").style.display = "none"
    document.getElementById("about").style.display = "none"
}

function toggle(id) {
    let info = document.getElementById(id).style;
    if (info.display === "block") {
        info.display = "none";
    } else {
        info.display = "block";
    }
}