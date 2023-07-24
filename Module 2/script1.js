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




function showholength(){
    document.getElementById("holeLength").className = "show";
    document.getElementById("start").className ="hide";
    document.getElementById("form").className ="hide";
    document.getElementById("holenum").className= "show";
}

function submitDetails(){
    document.getElementById("holeLength").className = "hide";
    document.getElementById("form").className ="show";
    dist.push(document.getElementById("HoleLnth").value);
    par.push(document.getElementById("HolePar").value); 
    push();
}

function push(){
    let i = dist.length;
    document.getElementById(`par${i}`).innerHTML = par[i-1]
    document.getElementById(`dis${i}`).innerHTML = dist[i-1]
     };
    

function addShot(){
    let i = dist.length;
    scoreAdd1();
    clubDist.push([document.getElementById("shotdist").value,document.getElementById("club").value]);
    document.getElementById(`scor${i}`).innerHTML = score;
    document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
 
}

function highLow(){
    let i = dist.length;
      
     
    if (par[i-1]-shots[i-1] === 0) {
        document.getElementById(`scor${i}`).className= "par";
        document.getElementById(`ou${i}`).className= "par";
    }

    else if (par[i-1]-shots[i-1] > 0){
        document.getElementById(`scor${i}`).className= "underpar";
        document.getElementById(`ou${i}`).className= "underpar";
    }

    else {
        document.getElementById(`scor${i}`).className= "overpar";
        document.getElementById(`ou${i}`).className= "overpar";
    }
    }
    

function scoreAdd1(){
    return score += 1;
}

function nexthole(){
    shots.push(score);
    let i = dist.length
    document.getElementById(`scor${i}`).innerHTML = shots[i-1];
    document.getElementById(`ou${i}`).innerHTML = shots[i-1] - par[i-1];    
    highLow();
    showholength();
    document.getElementById(`holenum`).innerHTML = `Hole ${i+1}`;
    score = 0;


}

