let countEl = document.getElementById("count-el");
let loadbtn = document.getElementById("load-btn");
let entries = document.getElementById("entries");
let count = 0;
let saved = 0;
let num = 0;
let savelist = [];

function increment(){
    countEl.textContent = count++;
}

function save(){
    if(count == 0){
        document.getElementById("save-btn").textContent = "Cannot save 0 entries!"
        setInterval(() => {
            document.getElementById("save-btn").textContent = "SAVE";
        }, 2000);
    } else {
        saved = countEl.textContent;
        savelist.push(saved);
        countEl.textContent = 0;
        count = 0;
        loadbtn.textContent = "LOAD (Num = " + saved + ")";
        entries.textContent = savelist.toString();
    }

}

function load(){
    if(saved == 0){
        loadbtn.textContent = "LOAD (No number saved)";
    } else {
        count = savelist.pop();
        countEl.textContent = count;
        loadbtn.textContent = "Loaded previous entry!";
        if(savelist.length == 0){
            entries.textContent = "No previous entries!"
        } else {
            entries.textContent = savelist.toString();
        }
    }

    setInterval(() => {
        loadbtn.textContent = "LOAD";
    }, 2000);
}