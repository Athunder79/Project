window.addEventListener('load', function () {
    document.getElementById("start").addEventListener("click", showholength);
    document.getElementById("hole1").addEventListener("click", submitDetails);
    document.getElementById("shot").addEventListener("click", addShot);
    document.getElementById("finishhole").addEventListener("click", nexthole);
})

score = 0
const dist = [];
const par = [];
const club =[];
const clubDist =[];
const shots =[];
const ou = [];



// start round
function showholength(){
    document.getElementById("holeLength").className = "show";
    document.getElementById("start").className ="hide";
    document.getElementById("form").className ="hide";
    document.getElementById("holenum").className= "show";
}

// push hole detail to html
function submitDetails(){
    document.getElementById("holeLength").className = "hide";
    document.getElementById("form").className ="show";
    dist.push(+document.getElementById("HoleLnth").value);
    par.push(+document.getElementById("HolePar").value); 
    push();
}

function push(){
    let i = dist.length;
    document.getElementById(`par${i}`).innerHTML = par[i-1];
    document.getElementById(`dis${i}`).innerHTML = dist[i-1];
    document.getElementById("totalFrontDist").innerHTML = dist.reduce((x, y) => x + y);
    document.getElementById("totalFrontPar").innerHTML = par.reduce((x, y) => x + y);
     };


//  Add current shot to html table
    function addShot(){
        let i = dist.length;
        scoreAdd1();
        clubDist.push([document.getElementById("shotdist").value,document.getElementById("club").value]);
        document.getElementById(`scor${i}`).innerHTML = score;
        document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
    }

   
function scoreAdd1(){
    return score += 1;
}


// Push shot details to array and show next hole details input hide shot details input
function nexthole(){
    shots.push(score);
    let i = dist.length
    document.getElementById(`scor${i}`).innerHTML = shots[i-1];
    document.getElementById(`ou${i}`).innerHTML =parseInt(document.getElementById(`ou${i-1}`).innerHTML) + parseInt(shots[i-1] - par[i-1]); 
    document.getElementById("totalFrontScor").innerHTML = shots.reduce((x, y) => x + y);   
    highLow();
    showholength();
    document.getElementById(`holenum`).innerHTML = `Hole ${i+1}`;
    score = 0;

}



// Colour code completed hole cells
function highLow(){
    let i = dist.length;   
    if (par[i-1]-shots[i-1] === 0) {
        document.getElementById(`scor${i}`).className= "par";
    }

    else if (par[i-1]-shots[i-1] > 0){
        document.getElementById(`scor${i}`).className= "underpar";
    }

    else {
        document.getElementById(`scor${i}`).className= "overpar";
    }
    }
    
