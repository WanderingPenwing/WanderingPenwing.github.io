console.log("Hello there")

var Player = '<div name="joueur" >' + 
	'<p name="title" >Joueur 1</p>' +
	'<div>' +
    '<input type="text" value="soleil" disabled />' +
    '<input type="text" value="pluie" disabled />' +
    '<input type="text" value="averse" disabled />' +
    '<input type="text" value="bruine" disabled />' +
    '<input type="text" value="chaud" disabled />' +
    '<input type="text" value="froid" disabled />' +
    '<input type="text" value="nuage" disabled />' + 
    '<input type="text" value="vent" disabled />' +
    '</div>' +
	'<input type="number" name="soleil" min="0" max="100" value=0 />' +
	'<input type="number" name="pluie" min="0" max="100" value=0 />' +
	'<input type="number" name="averse" min="0" max="100" value=0 />' +
	'<input type="number" name="bruine" min="0" max="100" value=0 />' +
	'<input type="number" name="chaud" min="0" max="100" value=0 />' +
	'<input type="number" name="froid" min="0" max="100" value=0 />' +
	'<input type="number" name="nuage" min="0" max="100" value=0 />' +
	'<input type="number" name="vent" min="0" max="100" value=0 />' +
	'</div>';
	

function add_player() {
	document.getElementById("list").innerHTML += Player;

	var titles = document.getElementsByName("title");
	titles[titles.length - 1].innerHTML = "Joueur " + titles.length;

	var joueurs = document.getElementsByName("joueur");

	joueurs[joueurs.length - 1].innerHTML += '<input name="x" type="button" value="x" onclick="remove_player(' + (joueurs.length - 1) + ')"/>';
}

function remove_player(index) {
	console.log(index);
	var joueurs = document.getElementsByName("joueur");

	joueurs[index].remove();
	
	var titles = document.getElementsByName("title");
	var removes = document.getElementsByName("x");

	for (var i=index; i<titles.length; i++) {
		removes[removes.length-1].remove();
	}
	for (var i=index; i<joueurs.length; i++) {
		joueurs[i].innerHTML += '<input name="x" type="button" value="x" onclick="remove_player(' + i + ')"/>';
		titles[i].innerHTML = "Joueur " + (i + 1);
	}
} 

function compute_output() {
	var soleils = document.getElementsByName("soleil");
	var pluies = document.getElementsByName("pluie");
	var averses = document.getElementsByName("averse");
	var bruines = document.getElementsByName("bruine");
	var chauds = document.getElementsByName("chaud");
	var froids = document.getElementsByName("froid");
	var nuages = document.getElementsByName("nuage");
	var vents = document.getElementsByName("vent");
	
	var points = new Array(soleils.length).fill(0);
	
	for (var i=0; i<soleils.length; i++) {
		points[i] += 2 * soleils[i].value;
	}
	
	var n_chauds = total(chauds)
	for (var i=0; i<chauds.length; i++) {
		points[i] += (1 + n_chauds) * pluies[i].value;
	}

	console.log(points)
	
	var n_averses = total(averses)
	for (var i=0; i<averses.length; i++) {
		if (averses[i].value > 0) {
			points[i] += n_averses * averses[i].value;	
			console.log("got averse")
		} else {
			points[i] -= n_averses
			console.log("not averse")
		}
	}

	console.log(points)
	
	var n_bruines = total(bruines)
	for (var i=0; i<bruines.length; i++) {
		points[i] += n_bruines * (bruines[i].value - soleils[i].value);
	}

	console.log(points)
	
	var n_joueurs_sans_soleil = chauds.length;
	for (var i=0; i<chauds.length; i++) {
		if (chauds[i].value == 0) {
			continue
		}
		n_joueurs_sans_soleil -=1
		points[(i - 1 + chauds.length) % chauds.length] -= 2 * chauds[i].value;
		points[i] += 4 * chauds[i].value;
		points[(i + 1) % chauds.length] -= 2 * chauds[i].value;		
	}

	console.log(points)
	
	for (var i=0; i<froids.length; i++) {
		points[i] += 4 * n_joueurs_sans_soleil * froids[i].value;
	}

	console.log(points)
	
	var n_nuages = total(nuages)
	for (var i=0; i<vents.length; i++) {
		points[i] += nuages[i].value * (3 * nuages[i].value - (n_nuages - nuages[i].value));
	}
	
	console.log(points)
	
	var n_vents = total(vents)
	for (var i=0; i<vents.length; i++) {
		points[i] += 4 * n_vents * vents[i].value;
	}

	console.log(points)
	
	var result = "";

	for (var i=0; i<points.length; i++) {
		result += "Joueur " + (i+1) + " : " + points[i] + " ; ";
	} 
	
	document.getElementById("output").innerHTML = result;
}

function total(liste) {
	var total = 0;
	for (var i=0; i<liste.length; i++) {
		var n = parseInt(liste[i].value);
		if (!isNaN(n)) {
			total += n;
		}
	}
	return total
}
