// Tool Images Uploads
const toolImages = ["./Assets/3.webp", "./Assets/1.webp", "./Assets/2.webp"];
const imgElements = toolImages.map(src => {
  let img = document.createElement("img");
  img.src = src;
  return img;
});

document.getElementById("toolImg1").appendChild(imgElements[0]);
document.getElementById("toolImg2").appendChild(imgElements[1]);
document.getElementById("toolImg3").appendChild(imgElements[2]);

// Remaining Moves
let remainingMoves = document.getElementById('remainingMoves');
let remainCount = 10;
remainingMoves.textContent = `Remaining Moves : ${remainCount}`;

// Screen1 Image Generating
let img4 = document.createElement("img");
let img5 = document.createElement("img");

document.getElementById("screenImg1").appendChild(img4);
document.getElementById("screenImg2").appendChild(img5);

let player = 0, cpu = 0;
let pRes = document.getElementById('playerResult');
let cRes = document.getElementById('cpuResult');
let displayResult = document.getElementById('displayResult');
let resDiv = document.getElementById('result');

// Function to handle player's move
function handlePlayerMove(playerChoiceIndex) {
  if (remainCount > 0) {
    resDiv.style.display = "block";
    let playerChoice = toolImages[playerChoiceIndex];
    img4.setAttribute("src", playerChoice);

    let computerChoice = generateRandomImage();
    img5.setAttribute("src", computerChoice);

    remainingMoves.textContent = `Remaining Moves : ${--remainCount}`;

    if (playerChoice === computerChoice) {
      displayResult.textContent = `Tie`;
    } else if (
      (playerChoiceIndex === 0 && computerChoice === toolImages[1]) ||
      (playerChoiceIndex === 1 && computerChoice === toolImages[2]) ||
      (playerChoiceIndex === 2 && computerChoice === toolImages[0])
    ) {
      displayResult.textContent = `Computer Win`;
      cpu++;
    } else {
      displayResult.textContent = `You Win`;
      player++;
    }
    pRes.textContent = `Player : ${player}`;
    cRes.textContent = `Computer : ${cpu}`;

    OverallResult();
  }
}

// Attach event listeners dynamically
imgElements.forEach((img, index) => {
  img.addEventListener("click", () => handlePlayerMove(index));
});

// Computer image generator
function generateRandomImage() {
  return toolImages[Math.floor(Math.random() * 3)];
}

// Display Overall Result
function OverallResult() {
  if (remainCount === 0) {
    if (player === cpu) {
      displayResult.textContent = `Match is Tie`;
    } else if (player > cpu) {
      displayResult.textContent = `You Win The Match`;
    } else {
      displayResult.textContent = `Computer Wins The Match`;
    }
  }
}

// Reset button
document.getElementById('reset').addEventListener('click', () => window.location.reload());
