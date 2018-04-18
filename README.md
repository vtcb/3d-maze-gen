# 3D Maze Generator

Generates a maze in a 3D grid.

The objective of this generation is to represent a 2D maze that changes through time, where the first dimension is time and the other 2 dimensions are space. The maze is generated so that a number of points scattered through the grid are garanteed to be connected. Automata are used to generate a random 2D maze. An overview of the steps used to generate the maze can be found in `src/generator.js`.

Example of use is can be found in `src/main.js`.
