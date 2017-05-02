function main(){
	var treeIcon = document.getElementById('treeIcon');
	var rainIcon = document.getElementById('rainIcon');
	var lotusIcon = document.getElementById('lotusIcon');

	treeIcon.addEventListener('mouseover', pauseRotation);
	rainIcon.addEventListener('mouseover', pauseRotation);
	lotusIcon.addEventListener('mouseover', pauseRotation);

	treeIcon.addEventListener('mouseout', resumeRotation);
	rainIcon.addEventListener('mouseout', resumeRotation);
	lotusIcon.addEventListener('mouseout', resumeRotation);
}

document.addEventListener('DOMContentLoaded', main);


// pause rotation of the three icons around one another
function pauseRotation(event){
	var content = document.querySelector('.content');
	content.classList.add('pauseRotation');
	content.classList.remove('resumeRotation');
}

// resume rotation of the three icons
function resumeRotation(event){
	var content = document.querySelector('.content');
	content.classList.add('resumeRotation');
	content.classList.remove('pauseRotation');
}