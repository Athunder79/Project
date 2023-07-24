addEventListener('load', function () {
    document.getElementById("start").addEventListener("click", showholength);
    document.getElementById("hole1").addEventListener("click", submitDetails);
    document.getElementById("shot").addEventListener("click", addShot);
    document.getElementById("finishhole").addEventListener("click", nexthole);
 
})

let score= 0;



function showholength(){
    document.getElementById("holeLength").className = "show";
    document.getElementById("start").className ="hide";
}



function submitDetails() {
    document.getElementById("holeLength").className = "hide";
    document.getElementById("form").className ="show";
    dist = parseInt(document.getElementById("HoleLnth").value,10);
    document.getElementById("dist1").innerText = dist;
    par = parseInt(document.getElementById("HolePar").value,10);
    document.getElementById("par1").innerText = par;
   
   
}


function addShot(){ 
    scoreAdd1();
    let ou = score-par;
    document.getElementById("scor1").innerHTML = score;
    document.getElementById("ou1").innerHTML = ou;
    document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
}

function scoreAdd1(){
    return score += 1;
}

function highLow(){
    if (par-score === 0) {
        document.getElementById("scor1").className= "par";
        document.getElementById("ou1").className= "par";
    }

    else if (par-score > 0){
        document.getElementById("scor1").className= "underpar";
        document.getElementById("ou1").className= "underpar";
    }

    else {
        document.getElementById("scor1").className= "overpar";
        document.getElementById("ou1").className= "overpar";

    }

}



function totalDist() {
    document.getElementById("totalFrontDist").innerHTML = dist;  
}

function totalPar(){
    document.getElementById("totalFrontPar").innerHTML = par;
}

function totalScore(){
    document.getElementById("totalFrontScor").innerHTML = score;
}

function totalOU(){
    document.getElementById("totalFrontOU").innerHTML = ou;

}


function nexthole(){
    highLow();
    totalDist();
    totalPar();
    totalScore();
    totalOU();

}




