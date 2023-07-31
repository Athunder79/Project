
addEventListener('load', function () {
    document.getElementById("start").addEventListener("click", showholength);
    document.getElementById("hole1").addEventListener("click", checkInputHole);
    document.getElementById("shot").addEventListener("click", addShot);
    document.getElementById("finishhole").addEventListener("click", nexthole);
    document.getElementById("removeShot").addEventListener("click", removeShot);
    document.getElementById("statsButton").addEventListener("click", sumClubDistRun);
    window.addEventListener("beforeunload", (event) => {
        event.returnValue = 'a';
    });
})
score = 0
const clubMaster = ['Driver', '3 Wood', '5 Wood', '3 Iron', '4 Iron', '5 Iron', '6 Iron', '7 Iron', '8 Iron', '9 Iron', 'Pitching Wedge', 'Sand Wedge', 'Putter'];
const dist = [];
const par = [];
const shots = [];
const club = [];
const clubDist = [];
const shotNum = [];
const hole = [];



// start round
function showholength() {
    document.getElementById("holeLength").className = "show";
    document.getElementById("start").className = "hide";
    document.getElementById("form").className = "hide";
    document.getElementById("holenum").className = "center";
    document.getElementById("intro").className = "hide";
}
// Check input values are entered then submitDetails
function checkInputHole() {
    let holeLengthInput = document.getElementById("HoleLnth").value;
    let holeParInput = document.getElementById("HolePar").value;

    if (holeLengthInput === "" || holeParInput === "a") {
        alert("Please fill in all the required fields.");
    } else {
        submitDetails()
    }
}

// push hole detials to arrays and to html
function submitDetails() {
    document.getElementById("holeLength").className = "hide";
    document.getElementById("form").className = "center";
    dist.push(+document.getElementById("HoleLnth").value);
    par.push(+document.getElementById("HolePar").value);
    pushHoleDetails();
    document.getElementById("shotinfo").innerHTML = "Shot 1";
}

function pushHoleDetails() {
    let i = dist.length;
    document.getElementById(`par${i}`).innerHTML = par[i - 1];
    document.getElementById(`dis${i}`).innerHTML = dist[i - 1];

    if (dist.length <= 9) {
        document.getElementById("totalFrontDist").innerHTML = totalDist();
        document.getElementById("totalFrontPar").innerHTML = totalPar();
        document.getElementById("totalRndDis").innerHTML = totalDist();
        document.getElementById("totalRndPar").innerHTML = totalPar();
    }

    else {

        document.getElementById("totalBkDis").innerHTML = dist.slice(9, dist.length).reduce((x, y) => x + y);
        document.getElementById("totalRndDis").innerHTML = totalDist();
        document.getElementById("totalBkPar").innerHTML = par.slice(9, par.length).reduce((x, y) => x + y);
        document.getElementById("totalRndPar").innerHTML = totalPar();
    };

}
function totalPar() {
    return par.reduce((x, y) => x + y);
}

function totalDist() {
    return dist.reduce((x, y) => x + y);
};

//check shot input details are entered then addShot
function checkInputShot() {
    let clubInput = document.getElementById("club").value;
    let distanceInput = document.getElementById("shotdist").value;

    if (clubInput === "Select Club" || distanceInput === "") {
        alert("Please fill in all the required fields.");
    } else {
        addShot()
    }
}


//  Add current shot to html table and arrays
function addShot() {
    let i = dist.length;
    scoreAdd1();
    hole.push(document.getElementById("holenum").innerText);
    shotNum.push(document.getElementById("shotinfo").innerText);
    club.push(document.getElementById("club").value);
    clubDist.push(+document.getElementById("shotdist").value);
    document.getElementById("statsButton").className = "";
    document.getElementById("removeShot").className = "removeLastShot";
    document.getElementById(`scor${i}`).innerHTML = score;
    document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
};

function removeShot() {
    let i = dist.length;
    scoreRemove1();
    hole.pop();
    shotNum.pop();
    club.pop();
    clubDist.pop();

    document.getElementById(`scor${i}`).innerHTML = score;
    document.getElementById("shotinfo").innerHTML = 'Shot ' + (score + 1);
    document.getElementById("removeShot").className = "hide";
};


function scoreAdd1() {
    return score += 1;
};

function scoreRemove1() {
    return score -= 1;
}


// Push shot details to array and show next hole details input hide shot details input
function nexthole() {
    shots.push(score);
    let i = shots.length;

    document.getElementById(`scor${i}`).innerHTML = shots[i - 1];
    document.getElementById(`ou${i}`).innerHTML = currentOverUnder();
    document.getElementById("totalFrontOU").innerHTML = totalFrontOverUnder();
    document.getElementById("totalBkOu").innerHTML = totalBackOverUnder();
    document.getElementById("totalRndOu").innerHTML = overUnder();
    document.getElementById("removeShot").className = "hide";


    // checks if course position is front 9, back 9 or finished.
    if (dist.length <= 9) {
        document.getElementById("totalFrontScor").innerHTML = shots.reduce((x, y) => x + y)
        document.getElementById("totalRndScor").innerHTML = shots.reduce((x, y) => x + y)
    }
    else {
        document.getElementById("totalBkScor").innerHTML = shots.slice(8, shots.length).reduce((x, y) => x + y);
        document.getElementById("totalRndScor").innerHTML = shots.reduce((x, y) => x + y);

    };
    highLow();
    showholength();

    if (dist.length === 18) {
        document.getElementById("holenum").innerHTML = "Round Finished";
        document.getElementById("holeLength").className = "hide";
    }

    else {
        document.getElementById("holenum").innerHTML = `Hole ${i + 1}`;
        showholength();
        score = 0;
    }
};

function overUnder() {
    let i = dist.length;
    return parseInt(document.getElementById(`ou${i - 1}`).innerHTML) + parseInt(shots[i - 1] - par[i - 1]);

}

function currentOverUnder() {
    let i = dist.length;
    if (i !== 10) {
        return parseInt(document.getElementById(`ou${i - 1}`).innerHTML) + parseInt(shots[i - 1] - par[i - 1]);
    }
    else {
        return parseInt(document.getElementById(`ou${i - 1}`).innerHTML) + parseInt(shots[i - 1] - par[i - 1]) - parseInt(document.getElementById('ou9').innerHTML, 10);
    }
}



function totalFrontOverUnder() {
    let i = dist.length;
    if (i < 9) {
        return currentOverUnder();
    }
    else {
        return parseInt(document.getElementById('ou9').innerHTML, 10);
    }
}

function totalBackOverUnder() {
    let i = dist.length;
    if (i > 9) {
        return currentOverUnder();
    } else {
        return '';
    }
}



// Colour code completed hole cells
function highLow() {
    let i = dist.length;
    document.getElementById(`scor${i}`).className = (par[i - 1] - shots[i - 1] === 0 ? "par" : (par[i - 1] - shots[i - 1] > 0 ? "underpar" : "overpar"));
};

function sumClubDistRun() {
    function sumClubDist(a) {
        let sum = 0;
        let clubTot = 0;

        for (let i = 0; i < club.length; i++) {
            if (club[i] === clubMaster[a]) {

                sum += clubDist[i];
                clubTot += 1;
            }
        }
        document.getElementById("stats").classList.toggle("stats");
        document.getElementById("statsButton").classList.toggle("blue");

        let avg = 0;
        if (clubTot === 0) {
            avg = 0;
        } else {
            avg = Math.round(sum / clubTot);
        }


        document.getElementById(`stats${a}`).innerHTML = `<td>${clubMaster[a]}</td>
                                                        <td>${clubTot}</td>
                                                        <td>${sum}</td>
                                                        <td>${avg}</td>`;
    }

    for (let i = 0; i < clubMaster.length; i++) {
        sumClubDist(i);
    }
}