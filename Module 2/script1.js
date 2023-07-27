addEventListener('load', function () {
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
const shotNum =[];
const shots =[];
const hole = [];



// start round
function showholength(){
    document.getElementById("holeLength").className = "show";
    document.getElementById("start").className ="hide";
    document.getElementById("form").className ="hide";
    document.getElementById("holenum").className= "center";
}

// push hole detials to arrays and to html
function submitDetails(){
    document.getElementById("holeLength").className = "hide";
    document.getElementById("form").className ="center";
    dist.push(+document.getElementById("HoleLnth").value);
    par.push(+document.getElementById("HolePar").value); 
    pushHoleDetails();
    document.getElementById("shotinfo").innerHTML="Shot 1";
}

function pushHoleDetails(){
    let i = dist.length;
    document.getElementById(`par${i}`).innerHTML = par[i-1];
    document.getElementById(`dis${i}`).innerHTML = dist[i-1];

    if (dist.length <= 9){
        document.getElementById("totalFrontDist").innerHTML = totalDist();
        document.getElementById("totalFrontPar").innerHTML = totalPar();
        document.getElementById("totalRndDis").innerHTML = totalDist();
        document.getElementById("totalRndPar").innerHTML = totalPar();
    }

    else{

        document.getElementById("totalBkDis").innerHTML = dist.slice(8, dist.length-1).reduce((x, y) => x + y);
        document.getElementById("totalRndDis").innerHTML = totalDist();
        document.getElementById("totalBkPar").innerHTML = par.slice(8, par.length-1).reduce((x, y) => x + y);
        document.getElementById("totalRndPar").innerHTML = totalPar();
    };
       
}
function totalPar(){
    return par.reduce((x, y) => x + y);     
    }

function totalDist(){
    return dist.reduce((x, y) => x + y);
    };

//  Add current shot to html table and arrays
    function addShot(){
        let i = dist.length;
        scoreAdd1();
        hole.push(document.getElementById("holenum").innerText);
        shotNum.push(document.getElementById("shotinfo").innerText);
        club.push(document.getElementById("club").value);
        clubDist.push(+document.getElementById("shotdist").value);
                       
        document.getElementById(`scor${i}`).innerHTML = score;
        document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
    };

   
function scoreAdd1(){
    return score += 1;
};


// Push shot details to array and show next hole details input hide shot details input
function nexthole(){
    shots.push(score);
    let i = shots.length;
    
    document.getElementById(`scor${i}`).innerHTML = shots[i-1];
    document.getElementById(`ou${i}`).innerHTML = currentOverUnder();
    document.getElementById("totalFrontOU").innerHTML = currentOverUnder();
    document.getElementById("totalRndOu").innerHTML = currentOverUnder();
        // checks if course position is front 9, back 9 or finished.
        if (dist.length <= 9){
            document.getElementById("totalFrontScor").innerHTML = shots.reduce((x, y) => x + y)
            document.getElementById("totalRndScor").innerHTML = shots.reduce((x, y) => x + y)}
        else{
            document.getElementById("totalBkScor").innerHTML = shots.slice(8, shots.length-1).reduce((x, y) => x + y);
            document.getElementById("totalRndScor").innerHTML = shots.reduce((x, y) => x + y);
            
        };
            highLow();
            showholength();

        if (dist.length === 18){
            document.getElementById("holenum").innerHTML = "Round Finished";
            document.getElementById("holeLength").className = "hide";}
            
        else {
            document.getElementById("holenum").innerHTML = `Hole ${i+1}`;
            showholength();
            score = 0;}
};

function currentOverUnder(){
    let i = dist.length;
    return parseInt(document.getElementById(`ou${i-1}`).innerHTML) + parseInt(shots[i-1] - par[i-1]);
 }

// Colour code completed hole cells
function highLow(){
    let i = dist.length;   
    document.getElementById(`scor${i}`).className=(par[i-1]-shots[i-1] === 0 ? "par" : (par[i-1]-shots[i-1] > 0 ? "underpar" : "overpar"));
};
