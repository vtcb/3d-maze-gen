var BOLADO = BOLADO || {};

/**
 * Maze Generator
 *
 * Generates a 3D maze with dimensions [T, X, Y] with O objectives
 * Each cell of the maze is a value in [0, 1] representing the density of a cell
 * The maze contains a special path between S special points, which are randomly generated
 * D ====> Discretization of Wall Growth!! TODO
 * Z ====> Don't change probability!!
 *
 * The algorithm is composed of six steps
 *  1. Generation of S random 3D points
 *  2. Generation of the special path
 *      - Random best path (using BFS)
 *  3. Generation of a 2D maze for a specific value of T (near the middle)
 *      - Cellular automata
 *  4. Generation of a 3D maze from the 2D maze slice obtained in step 3 respecting the special path obtained in step 2
 *      - A cell knows in how much time it must be empty
 *  5. Definition of the player starting point
 *  6. Scattering of the objectives along the maze
 *      - Autonomous agent (?)
 */
BOLADO.MazeGenerator = function(T, X, Y, O, D, Z, S) {
    var T = T || 20;
    var X = X || 20;
    var Y = Y || 20;
    var O = O ||  4;
    var D = D ||  5; /* 0 a 100 */
    var Z = Z ||  0.7;
    var S = S || (2 * O);

    var maze;
    var specialPoints;

    /* Auxiliary vars */
    var mark;
    var best;
    var step;
    var delta = [
        [ 0,  0,  1, -1,  0,  0],
        [ 0,  0,  0,  0, -1,  1],
        [-1,  1,  0,  0,  0,  0]
    ];

    /**
     * Create an empty 3D maze
     */
    var initMaze = function() {
        maze = createArray(T, X, Y);

        for(var t = T - 1; t >= 0; t--) {
            for(var x = X - 1; x >= 0; x--) {
                for(var y = Y - 1; y >= 0; y--) {
                    maze[t][x][y] = 0;
                }
            }
        }
    };

    var dimToNode = function(t, x, y) {
        return t + T * (x + X * (y));
    }

    /**
     * Generation of S random 3D points
     */
    var step1 = function() {
        specialPoints = [];

        for(var i = S - 1; i >= 0; i--) {
            specialPoints.push({
                t: randomInt(T),
                x: randomInt(X),
                y: randomInt(Y)
            });

        }
    };

    /**
     * Generation of the special path
     */
    var getPath = function(t, x, y) {
        var q = [];
        var initial = {t: t, x: x, y: y};

        q.push(initial);
        mark[t][x][y] = step;
        dist[t][x][y] = 0;
        best[t][x][y] = q[0];

        while(q.length > 0) {
            var t = q[0].t;
            var x = q[0].x;
            var y = q[0].y;
            var P = q.shift();

            if(maze[t][x][y] === 1) {
                var eq = function(a, b) {
                    return a.t === b.t && a.x === b.x && a.y === b.y;
                }

                while(!eq(P, initial)) {
                    maze[P.t][P.x][P.y] = 1;
                    P = best[P.t][P.x][P.y];
                }

                break;
            }

            var ks = [0, 1, 2, 3, 4, 5];
            shuffle(ks);

            for(var ik = 0; ik < 6; ik++) {
                var k = ks[ik];

                var dt = t + delta[0][k];
                var dx = x + delta[1][k];
                var dy = y + delta[2][k];

                if(!valid(dt, 0, T)) continue;
                if(!valid(dx, 0, X)) continue;
                if(!valid(dy, 0, Y)) continue;

                if(mark[dt][dx][dy] === step) continue;
                mark[dt][dx][dy] = step;
                dist[dt][dx][dy] = dist[t][x][y] + 1;
                best[dt][dx][dy] = P;

                q.push({t: dt, x: dx, y: dy});
            }
        }
    }

    var step2 = function() {
        mark = createArray(T, X, Y);
        dist = createArray(T, X, Y);
        best = createArray(T, X, Y);

        for(var t = T - 1; t >= 0; t--) {
        for(var x = X - 1; x >= 0; x--) {
        for(var y = Y - 1; y >= 0; y--) {
            mark[t][x][y] = 0;
            dist[t][x][y] = 0;
            best[t][x][y] = 0;
        } } }

        step = 0;
        
        maze[specialPoints[0].t]
            [specialPoints[0].x]
            [specialPoints[0].y] = 1;

        for(var i = specialPoints.length - 1; i > 0; i--) {
            step++;
            getPath(
                specialPoints[i].t,
                specialPoints[i].x,
                specialPoints[i].y
            );
        }

        for(var t = T - 1; t >= 0; t--) {
        for(var x = X - 1; x >= 0; x--) {
        for(var y = Y - 1; y >= 0; y--) {
            maze[t][x][y] = 1 - maze[t][x][y];
        } } }


        if(false)
        for(var i = specialPoints.length - 1; i >= 0; i--) {
            maze[specialPoints[i].t]
                [specialPoints[i].x]
                [specialPoints[i].y] = 2;
        }
    }

    /**
     * Generation of a 2D maze for a specific value of T (near the middle)
     */
    var A = null; /* Outside the function for debugging reasons */
    var step3 = function() {
        var specialMap = createArray(X, Y);

        for(var x = X - 1; x >= 0; x--) {
        for(var y = Y - 1; y >= 0; y--) {
            specialMap[x][y] = maze[T / 2][x][y] > 0 ? 2 : 0;
        } }

        A = new BOLADO.automata(X, Y, specialMap);
        A.generateSeed();
        for(var i = 3 * Math.max(X, Y) - 1; i >= 0; i--) {
            A.iterate();
        }

        // DEBUG
        BOLADO.A = A;
    }

    var step4 = function() {
        /* Special Path limitations */
        limitF = createArray(T, X, Y);
        var limitB = createArray(T, X, Y);

        /* Growth Control
         *  0 -> not
         * -1 -> down
         *  1 -> up
         */
        var growth = createArray(T, X, Y);

        for(var x = X - 1; x >= 0; x--) {
        for(var y = Y - 1; y >= 0; y--) {
            var last = 3 * T;

            for(var t = T - 1; t >= 0; t--) {
                if(maze[t][x][y] === 0) {
                    last = t;
                }

                limitF[t][x][y] = last - t;
            }

            var last = -3 * T;

            for(var t = 0; t < T; t++) {
                if(maze[t][x][y] === 0) {
                    last = t;
                }

                limitB[t][x][y] = t - last;
            }
        } }

        for(var x = X - 1; x >= 0; x--) {
        for(var y = Y - 1; y >= 0; y--) {
            if(A.get(x, y) === 0) {
                maze[T / 2][x][y] = 0;
            } else {
                maze[T / 2][x][y] = randomInt( Math.min(D + 1, Math.min(limitF[T / 2][x][y], limitB[T / 2][x][y])) ) / D;
            }

            var possible_growth = [];

            if(maze[T / 2][x][y] === 0 && maze[T / 2][x][y] === 1) {
                possible_growth.push( {g:  0, p: Z} );
            }

            if(maze[T / 2][x][y] !== 1 && limitF[T / 2][x][y] >= 2 * D) {
                possible_growth.push( {g:  1, p: (1 - Z) / 2} );
            }

            if(maze[T / 2][x][y] !== 0 && limitB[T / 2][x][y] >= 2 * D) {
                possible_growth.push( {g: -1, p: (1 - Z) / 2} );
            }

            if(possible_growth.length === 0) {
                maze[T / 2][x][y] = 0;
                possible_growth.push( {g:  1, p: 1} );
            }

            for(var i = 1; i < possible_growth.length; i++) {
                possible_growth[i].p += possible_growth[i - 1].p;
            }

            for(var i = 0; i < possible_growth.length; i++) {
                possible_growth[i].p /= possible_growth[possible_growth.length - 1].p;
            }

            var P = Math.random();

            for(var i = 0; i < possible_growth.length; i++) {
                if(P < possible_growth[i].p) {
                    growth[T / 2][x][y] = possible_growth[i].g;
                    break;
                }
            }

            if(!growth[T / 2][x][y]) {
                growth[T / 2][x][y] = possible_growth[possible_growth.length - 1].g;
            }
        } }


    };

    var generate = function() {
        initMaze();
        step1();
        step2();
        step3();
        step4();
    };

    var plot = function() {
        BOLADO.plot3D(maze, limitF);
        //A.plot();
    };

    return {
        generate : generate,
        plot     : plot
    };
}
