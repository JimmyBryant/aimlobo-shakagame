document.addEventListener('DOMContentLoaded', function() {
    const lineList = [
        { c1: "#69E4F6", c2: "#69e4f600", l: "0px", d: 3 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", l: "60px", d: 5 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", r: "72px", d: 2 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "30px", d: 0 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "41px", d: 1 },
        { c1: "#69E4F6", c2: "#69e4f600", l: "105px", d: 4 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", l: "30px", d: 2 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", r: "111px", d: 5 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "2px", d: 3 }
    ];

    const lineBox = document.getElementById('line-box');

    lineList.forEach(item => {
        const lineItem = document.createElement('span');
        lineItem.className = 'line-item';
        lineItem.style.setProperty('--c1', item.c1);
        lineItem.style.setProperty('--c2', item.c2);
        if (item.l) {
            lineItem.style.setProperty('--l', item.l);
        }
        if (item.r) {
            lineItem.style.setProperty('--r', item.r);
        }
        lineItem.style.setProperty('--d', item.d);
        lineBox.appendChild(lineItem);
    });
});
