let score = 0

export function checkCrystalCollision(heliMesh, crystals, scene) {
    for (let i = crystals.length - 1; i >= 0; i--) {
      const crystal = crystals[i];
      const distance = heliMesh.position.distanceTo(crystal.position);
  
      if (distance < 3) {
        scene.remove(crystal);
        crystals.splice(i, 1);
        updateCrystalUI();
        
      }
    }
  }
  
function updateCrystalUI(){
  const crystalScore = document.getElementById('crystal-score');
  if (crystalScore){
    score++;
    crystalScore.innerText = `Kristalle eingesammelt 🟣: (${score} / 10)`;
  }
  if (score === 10) {
    const confettiGif = document.createElement('img');
    confettiGif.src = 'textures/confetti.gif'; // Replace with the actual path to your GIF
    confettiGif.style.position = 'fixed';
    confettiGif.style.top = '0';
    confettiGif.style.left = '0';
    confettiGif.style.width = '100vw';
    confettiGif.style.height = '100vh';
    confettiGif.style.zIndex = '1000';
    document.body.appendChild(confettiGif);

    setTimeout(() => {
      document.body.removeChild(confettiGif);
    }, 5000); // Adjust the duration of the animation as needed
  }
}