# 3D Maze Generator

Generates a maze in a 3D grid.

## About

The objective is to generate a 2D maze that changes through time, where the first dimension is time and the other 2 dimensions are space.

The maze is generated so that a number of _special_ points scattered through the grid are garanteed to be connected.

A random minimum spanning tree containing this set of _special_ points is used to garantee connectivity.

Automata are used to generate a random 2D maze, which is extended through time dimension while respecting the generated tree.

Positions for players or objectives are generated so that they are connected. 

An overview of the steps used to generate the maze can be found in `src/generator.js`.

Example of use is can be found in `src/main.js`.

## Dependencies

- `vis.js` library is used to help visualize the generated maze. A minified version of the library is included here.
