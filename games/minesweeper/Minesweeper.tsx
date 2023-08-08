"use client";

import { useState } from "react";
import {
  SETTINGS,
  changeSettings,
  reinit,
  findConnectedCellsToReveal,
  getDisplayValues,
  initialize,
} from "./setup.js";
import "./Minesweeper.css";

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
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation.js";

//////////


export default function Game() {

  const [ settings, setSettings ] = useState({ mines: 25, rows: 16, cols: 30 });

  const [gameState, setGameState] = useState("playing");

  const [flagged, setFlagged] = useState(
    new Array(settings.mines).fill(false)
  );

  const [revealedCells, setRevealedCells] = useState(
    new Array(settings.rows * settings.cols).fill(false)
  );

  const toggleFlag = (element: any, index: number) => {
    element.preventDefault();

    if (revealedCells[index]) return;

    let flaggedCopy = [...flagged];
    flaggedCopy[index] = !flaggedCopy[index];
    setFlagged(flaggedCopy);

    checkWin();
  };

  const handleCellClick = (index: number) => {

    let newRevCells;

    if (board[index] >= 10) {
      setGameState("lost");
      newRevCells = new Array(settings.rows * settings.cols).fill(true);
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

  const total = settings.rows * settings.rows;
  let numRevealed = revealedCells.filter((cell) => cell === true).length;
  let numFlagged = flagged.filter((cell) => cell === true).length;

  let checkWin = () => {
    console.log("numRevealed", numRevealed);
    console.log("numFlagged", numFlagged);

    if (numRevealed + numFlagged >= total) {
      setGameState("won");
    }
  };

  const longestSide = Math.max(settings.rows, settings.cols);
  const divided = 100 / longestSide;

  const minesLeft = settings.mines - numFlagged

  const getProgress = () => {
    return total - revealedCells.length
  }

  const router = useRouter();
  
  const handleReset = () => {
    // if value === "easy" 
    // if value === "medium"
    // if value === "hard"
  }
  
    let board = initialize(settings);
    let display = getDisplayValues(board);

  return (
    <> 
      {gameState === "lost" && <p>You lost!</p>}
      {gameState === "won" && <p>You won!</p>}

      {/* <div>Mines Left: {SETTINGS.numMines - numFlagged}</div> */}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"><div>Mines Left to Flag: {minesLeft}</div></Button>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <Card className="w-[350px]">
            <CardHeader>
              {/* <CardTitle className="text-sm">Settings</CardTitle> */}
              <CardDescription className="text-bold">Customize your game.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    {/* <Label htmlFor="mines">Mines</Label>
                    <Separator /> */}
                    <Input id="mines" placeholder="12" className="w-[50px]"/>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    {/* <Label htmlFor="difficulty">Level</Label>
                    <Separator /> */}
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleReset}>Go</Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
      
      <Button variant="outline" onClick={() => router.refresh()}>Reset</Button>

      <div className="p-4"></div>

      <div
        className={`grid grid-rows-${settings.rows} grid-cols-${settings.cols}`}
        style={{
          display: "grid",
          width: "100vh",
          height: "auto",
          gridTemplateRows: `repeat(${settings.rows},
            calc(100vmin / ${Math.max(
            settings.rows,
            settings.cols
          )}))
            `,
          gridTemplateColumns: `repeat(${settings.cols},
            calc(100vmin / ${Math.max(
            settings.rows,settings.cols
          )}))            `,
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {display.map((element: any, index: number) => (
          <GameCell
            key={index}
            index={index}
            isRevealed={revealedCells[index]}
            isFlagged={flagged[index]}
            cellValue={element}
            onClick={() => handleCellClick(index)}
            onContextMenu={(event: any) => toggleFlag(event, index)}
          />
        ))}
      </div>
    </>
  );
}

const GameCell = (props: any) => {
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
