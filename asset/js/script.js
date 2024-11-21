const listeMots = ["abondamment", "bibliographie", "correspondance", "desintoxication", "electromenager", "felicitations", "gouvernemental", "hospitalisation", "inconditionnel", "juxtapositions",
    "kilogrammetres", "laborieusement", "malheureusement", "necessairement", "operationnelle", "precipitations", "qualitativement", "reapprovisionne", "substantiellement", "telecommunication",
    "universellement", "volontairement", "xylographiques", "accelerations", "belligerantes", "cinematographie", "deliberativement", "electromagnetique", "fonctionnalites", "gouvernemental"
]

let motDeLaPartie ="";
let nombreErreur = 0;
let buttons = document.querySelectorAll('.btn');

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

window.onload = function () {
    creerJeuPendu();
};


buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.target.disabled = true;
        event.target.classList.remove('btn-light');
        event.target.classList.add('btn-outline-light');
        let lalettre = event.target.innerText;

        if(!booleanLettreAppartientMot(lalettre, motDeLaPartie)){
            nombreErreur += 1;
            creerPenduEnCanva(nombreErreur);
            nombreChanceRestante(nombreErreur); 
            if (booleanVerifierErreur()) {
                alertePerdu();
                desactiverToutLesBoutons(buttons);
            }
        } else {
            remplacerTiretParLettre(lalettre, motDeLaPartie, 'lettreRechercher');
            let motAffiche = document.getElementById('lettreRechercher').innerHTML.trim().split(' ');
            if (!motAffiche.includes('-')) {
                alerteGagner();
                desactiverToutLesBoutons(buttons);
            }
        }
    });
});

function remplacerTiretParLettre(lettre, mot, idHtml) {
    let motAffiche = document.getElementById(idHtml).innerHTML.trim().split(' ');

    for (let i = 0; i < mot.length; i++) {
        if (mot[i] === lettre) {
            motAffiche[i] = lettre;
        }
    }

    document.getElementById(idHtml).innerHTML = motAffiche.join(' ');
}




function nombreChanceRestante(erreurUtilisateur) {
    let chancesRestantes = 9 - erreurUtilisateur;
    document.getElementById('chanceRestante').innerHTML = chancesRestantes;
}

function booleanLettreAppartientMot(lettre, mot) {
    if (!mot.includes(lettre)) {
        return false
    }
    return true
}


function positionLettre(lettre, mot) {
    let positionLettre = mot.indexOf(lettre)
    return positionLettre;
}

function compterNombreLettreDonnerDansMot(lettre, mot) {
    let nombre = 0;
    for ( i = 0; i < mot.length; i++) {
        if (mot[i] === lettre) {
            nombre = + 1;
        }
    }
    return nombre;
}


function desactiverToutLesBoutons(buttons) {
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.remove('btn-light');
        button.classList.add('btn-outline-light');
    });
}

function nouveauJeuPendu() {
    motDeLaPartie ='';
    nombreErreur = 0;
    reactiverToutlesBoutonsDesactiver();
    effacerPendu("myCanvas");
    creerJeuPendu();
    document.getElementById('chanceRestante').innerHTML = 9; 
}

function reactiverToutlesBoutonsDesactiver() {
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('btn-outline-light');
        button.classList.add('btn-light');
    });
}

function creerJeuPendu() {
    motDeLaPartie = choisirMotAleatoire();
    genererTiretParLettre(motDeLaPartie.length, 'lettreRechercher');
    //console.log(motDeLaPartie);
}

function choisirMotAleatoire() {
    let chiffreAleatoire = Math.floor(Math.random() * 30);
    let motAleatoire = listeMots[chiffreAleatoire];
    return motAleatoire.toUpperCase(); ;
}


function genererTiretParLettre(longueur, idHtml) {
    let tirets = ' ';
    for (let i = 0; i < longueur; i++) {
        tirets += '-' + ' ';
    }
    document.getElementById(idHtml).innerHTML = tirets;
}

function creerPenduEnCanva(nombreErreur) {
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');
    context.lineWidth = 15;
    context.strokeStyle = '#FAEBD7';
    context.lineCap = "round";
    switch (nombreErreur) {
        case 0:
            context.beginPath();
            context.moveTo(0, 400);
            context.lineTo(200, 400);
            context.stroke();
            break;
        case 1:
            context.beginPath();
            context.moveTo(100, 0);
            context.lineTo(100, 400);
            context.stroke();
            break;
        case 2:
            context.beginPath();
            context.moveTo(100, 0);
            context.lineTo(200, 0);
            context.stroke();
            break;
        case 3:
            context.beginPath();
            context.moveTo(200, 0);
            context.lineTo(200, 60);
            context.stroke();
            break;
        case 4:
            context.beginPath();
            context.arc(200, 90, 30, 0, 2 * Math.PI);
            context.stroke();
            break;
        case 5:
            context.beginPath();
            context.moveTo(200, 120);
            context.lineTo(200, 250);
            context.stroke();
            break;
        case 6:
            context.beginPath();
            context.moveTo(200, 150);
            context.lineTo(250, 200);
            context.stroke();
            break;
        case 7:
            context.beginPath();
            context.moveTo(200, 150);
            context.lineTo(150, 200);
            context.stroke();
            break;
        case 8:
            context.beginPath();
            context.moveTo(200, 250);
            context.lineTo(250, 300);
            context.stroke();
            break;
        case 9:
            context.beginPath();
            context.moveTo(200, 250);
            context.lineTo(150, 300);
            context.stroke();
    }
}

function effacerPendu(idCanvas) {
    let canvas = document.getElementById(idCanvas);
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}



function booleanVerifierErreur() {
    if (nombreErreur >= 9) {
        return true;
    }
    return false;
}


function alerteGagner() {
    Swal.fire({
        title: '<strong>Félicitation vous avez gagné</u></strong>',
        html:
            '<iframe width="450" height="315" src="asset/video/Success.mp4" frameborder="0"  allowfullscreen></iframe>',
        showConfirmButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Recommencer',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>Cancel',
    }).then(function (result) {
        if (result.isConfirmed) {
            nouveauJeuPendu();
        }
    });
}


function alertePerdu() {
    Swal.fire({
        title: '<strong>Perdu</u></strong>',
        html:
            '<iframe width="450" height="315" src="asset/video/GameOver.mp4" frameborder="0"  allowfullscreen></iframe>' +
            '<p>Le mot à trouver était : ' + motDeLaPartie + '</p>',

        showConfirmButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Recommencer',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>Cancel',
    }).then(function (result) {
        if (result.isConfirmed) {
            nouveauJeuPendu();
        }
    })
}
