---
title: Sudoku algorithms in Rust
description: I wrote 3 different algorithms to solve sudoku
slug: sudoku-algorithms-in-rust
tags: [rust]
hide_table_of_contents: false
---
Sudoku is a game where your goal is to fill all the 9x9 grid where each row, column and subgrid of 3x3 must contain numbers from 1 to 9 only once. Algorithm that solves these problems are really fun and they can go much more complex than you think.

<!-- truncate -->

## Why Sudoku?
I have played Sudoku when I was young and that was one of the few options for games I had in my phone. As I grew up and the smart phone came, Sudoku wan't the the type of game I spent my time on. Last year a friend of mine who is learning programming came to me and showed a new challenge gave to him: build an algorithm that can solve Sudoku. I spent some time about the problem, and it didn't sound to me very complex, but it would be cool to write it in rust. A good opportunity to learn concepts that I didn't really get it (mainly ownership and borrowing).

## Algorithms
For all the algorithms I also have implemented a performance summary which contains the number of actions that defines how many times grids in the sudoku board was set with any number or unset; and the elapsed which contains how much time it consumed to resolve the puzzle.

All the algorithms will have a gif that shows each of the algorithms' behavior and the summary. Because the resolution is too quick, I have implement a sleep mode which after setting any value to the grid, the thread sleep for 10ms. This impacted the performance. For this reason I also added a benchmark. 

### My first solution
The first obvious solution was backtraking, where for each grid that need to be filled the algorithm try every option until it find a valid one, and then it goes to the next grid and do it again. If it can find a valid number, then it cleans the grid and return back to the previous grid and try the next number. This process will repeat until the final solution is found.

![backtraking](./assets/bt.gif)

| Level | Number of actions | Elapsed in Seconds (Avg) |
| ----- | ----------------- | ------------------------ |
| easy  | 645               | 0.000032s                |
| hard  | 1910119           | 0.141178s                |

### Candidate election
It is still a backtraking solution, but for the first interaction, the algorithm goes to every empty grid and check what are the possible values that can be inserted. This strategy helps to remove values in the first interaction, which directly impacts the final performance.

![candidate election](./assets/ce.gif)

| Level | Number of actions | Elapsed in Seconds (Avg) |
| ----- | ----------------- | ------------------------ |
| easy  | 205               | 0.0000174                |
| hard  | 929098            | 0.0750074                |

### Simulated annealing

I found this [paper](https://rhydlewis.eu/papers/META_CAN_SOLVE_SUDOKU.pdf) while searching for more algorithms that can solve Sudoku, and it introduced me Simulated Annealing (SA). In metallurgy, annealing is the process of heating and slowly cooling of a material to change its physical properties. Simulated annealing is an algorithm inspired in this process that probabilistically finds the global solution for a function.

To find the optimal solution for a certain Sudoku board, the paper splits it into a few steps:

- Direct representation: the process of forming the initial candidate by random filling the 3x3 grid with the missing values for that grid.
- Neighborhood Operator: chooses 2 non-fixed cells in the same grid and swaps them.
- Defining the temperature: the algorithms needs to calibrate the temperature first, this is done by making the some initial interactions and then calculating the standard deviation of the cost during the Neighborhood moves.
- Evaluation the candidate solutions: the algorithm looks at each row and column and sum the missing values between 1 to 9. If the final cost is 0 it means that the global solution was found.
  - In case, the cost is not 0 yet, the algorithm will check whether the new cost is acceptable or it should revert the Neighborhood Operator. This process involves the temperature and cost.
- Temperature reduction: during the run the temperature is reduced by a certain alpha parameter (which is 0,99 in the code).
- Reheating process: if the process of choosing cells to swap and evaluating the candidate solution can't find the global solution after the minimal temperature or a certain number of interaction is reached, then the reheat process starts
  - The temperature is set to the initial value, a new direct representation is generated and the algorithm continues.


![simulated annealing](./assets/sa.gif)

| Level | Number of actions (Avg) | Number of actions (Min) | Number of actions (Max) | Elapsed in Seconds (Avg) |
| ----- | ----------------------- | ----------------------- | ----------------------- | ------------------------ |
| easy  | 71682.6                 | 25732                   | 140598                  | 0.0419584                |
| hard  | 35278006                | 3364824                 | 81660879                | 6.14526411s              |
