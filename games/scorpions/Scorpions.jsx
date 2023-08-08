"use client";

import { useState } from "react";
import "./Scorpions.css";

import {
  SETTINGS,
  findConnectedCellsToReveal,
  getDisplayValues,
  initialize,
} from "./setup.js";
// import ControlPanel from "./ControlPanel.jsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//////////

let board = initialize();

let display = getDisplayValues(board);

export default function Game() {
  const [revealedCells, setRevealedCells] = useState(
    new Array(SETTINGS.numRows * SETTINGS.numCols).fill(false)
  );

  const [gameState, setGameState] = useState("playing");

  const [flagged, setFlagged] = useState(
    new Array(SETTINGS.numMines).fill(false)
  );

  const toggleFlag = (element, index) => {
    element.preventDefault();

    if (revealedCells[index]) return;

    let flaggedCopy = [...flagged];
    flaggedCopy[index] = !flaggedCopy[index];
    setFlagged(flaggedCopy);

    checkWin();
  };

  const handleCellClick = (index) => {

    let newRevCells;

    if (board[index] >= 10) {
      setGameState("lost");
      newRevCells = new Array(SETTINGS.numRows * SETTINGS.numCols).fill(true);
    } else {
      newRevCells = [...revealedCells];
      const cellsToReveal = findConnectedCellsToReveal(index, board);
      cellsToReveal.forEach((c) => {
        newRevCells[c] = true;
      });
      newRevCells[index] = true;
    }

    setRevealedCells(newRevCells);
  };

  const total = SETTINGS.numRows * SETTINGS.numCols;
  let numRevealed = revealedCells.filter((cell) => cell === true).length;
  let numFlagged = flagged.filter((cell) => cell === true).length;

  let checkWin = () => {
    console.log("numRevealed", numRevealed);
    console.log("numFlagged", numFlagged);

    if (numRevealed + numFlagged >= total) {
      setGameState("won");
    }
  };

  const longestSide = Math.max(SETTINGS.numRows, SETTINGS.numCols);
  const divided = 100 / longestSide;

  const minesLeft = SETTINGS.numMines - numFlagged

  const getProgress = () => {
    return total - revealedCells.length
  }

  return (
    <>
      {gameState === "lost" && <p>You lost!</p>}
      {gameState === "won" && <p>You won!</p>}

      {/* <div>Mines Left: {SETTINGS.numMines - numFlagged}</div> */}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>

      <div className="p-4"></div>

      <div
        className={`grid grid-rows-${SETTINGS.numRows} grid-cols-${SETTINGS.numCols}`}
        style={{
          display: "grid",
          width: "100vh",
          height: "auto",
          gridTemplateRows: `repeat(${SETTINGS.numRows},
            calc(100vmin / ${Math.max(
            SETTINGS.numRows,
            SETTINGS.numCols
          )}))
            `,
          gridTemplateColumns: `repeat(${SETTINGS.numCols},
            calc(100vmin / ${Math.max(
            SETTINGS.numRows,
            SETTINGS.numCols
          )}))            `,
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {display.map((element, index) => (
          <GameCell
            key={index}
            index={index}
            isRevealed={revealedCells[index]}
            isFlagged={flagged[index]}
            cellValue={element}
            onClick={() => handleCellClick(index)}
            onContextMenu={(event) => toggleFlag(event, index)}
          />
        ))}
      </div>
    </>
  );
}

const GameCell = (props) => {
  let cn = "cell";

  if (props.isRevealed) {
    cn += " revealed";
  } else {
    cn += " notrevealed";
  }

  if (props.isFlagged) {
    cn += " flagged";
  } else {
    cn += " notflagged";
  }

  return (
    <div
      key={props.index}
      className={cn}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      {props.isRevealed && props.cellValue}
      {!props.isRevealed && props.isFlagged && "🚩"}
      {/* {props.isRevealed && `${getDisplayValue(props.cellValue)}`} */}
    </div>
  );
};
