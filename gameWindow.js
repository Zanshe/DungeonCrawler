let gridWidth = 13;
let gridHeight = 13;
let grid = [];
let tileSize = 60;
let playerPos = [1, 1];
let viewDistance = 1;

function initGrid() {
  let mainGrid = document.getElementById("mainGrid");

  mainGrid.style.gridTemplateColumns = `repeat(${gridWidth}, ${tileSize}px)`;
  mainGrid.style.gridTemplateRows = `repeat(${gridHeight}, ${tileSize}px)`;

  for (let i = gridHeight - 1; i >= 0; i--) {
    grid[i] = [];

    for (let j = 0; j < gridWidth; j++) {
      grid[i][j] = "";

      let tile = document.createElement("div");
      tile.classList.add("tile", "unexplored");
      tile.setAttribute("id", "tr" + i + "c" + j);

      // Add random stuff to map
      let rn = Math.floor(Math.random() * 100 + 1);

      if (rn < 3) {
        tile.classList.add("enemy");
      } else if (rn < 5) {
        tile.classList.add("health");
      } else if (rn < 8) {
        tile.classList.add("wall");
      }

      mainGrid.appendChild(tile);
    }
  }
}

function initMovement() {
  document.addEventListener("keyup", (e) => {
    let direction;

    switch (e.key) {
      case "w":
      case "ArrowUp":
        direction = "up";
        break;
      case "a":
      case "ArrowLeft":
        direction = "left";
        break;
      case "s":
      case "ArrowDown":
        direction = "down";
        break;
      case "d":
      case "ArrowRight":
        direction = "right";
        break;
      default:
        return;
    }
    movePlayer(direction);
  });
}

function getTileByPos(pos1, pos2) {
  let id;

  if (Array.isArray(pos1)) {
    id = "tr" + pos1[0] + "c" + pos1[1];
  } else {
    id = "tr" + pos1 + "c" + pos2;
  }

  return document.getElementById(id);
}

function movePlayer(direction) {
  let prevPos = playerPos.slice();

  switch (direction) {
    case "up":
      if (playerPos[0] + 1 >= gridHeight) return;

      playerPos[0] += 1;
      break;
    case "right":
      if (playerPos[1] + 1 >= gridWidth) return;

      playerPos[1] += 1;
      break;
    case "down":
      if (playerPos[0] - 1 < 0) return;

      playerPos[0] -= 1;
      break;
    case "left":
      if (playerPos[1] - 1 < 0) return;

      playerPos[1] -= 1;
      break;
  }

  if (prevPos !== playerPos) {
    getTileByPos(prevPos).classList.remove("player");
  }

  getTileByPos(playerPos).classList.add("player");

  updateVision();
}

function updateVision() {
  for (let i = 0 - viewDistance; i <= viewDistance; i++) {
    for (let j = 0 - viewDistance; j <= viewDistance; j++) {
      if (i + j > viewDistance || i + j < 0 - viewDistance || i + j == 0)
        continue;

      let pos1 = playerPos[0] + i;
      let pos2 = playerPos[1] + j;

      if (pos1 < 0 || pos2 < 0 || pos1 >= gridHeight || pos2 >= gridWidth)
        continue;

      let surroundingTile = getTileByPos(pos1, pos2);
      surroundingTile.classList.remove("unexplored");
    }
  }
}

initGrid();
movePlayer("init");
initMovement();
