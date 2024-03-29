var BOLADO = BOLADO || {};

/**
 * Cellular Automata
 *
 * Creates a 2D map of dimensions [X, Y] of cellular automata
 * The automata are specifically for 2D maze generation
 *   0 -> Empty
 *   1 -> Full
 *   2 -> Reserved (Mandatory Empty)
 */
BOLADO.automata = function(X, Y, A) {
    var X = X || 10;
    var Y = Y || 10;
    var A = A || function() {
        var A = createArray(X, Y);
        for(var x = X - 1; x >= 0; x--) {
            for(var y = Y - 1; y >= 0; y--) {
                A[x][y] = 0;
            }
        }
        return A;
    }();

    var delta = [
        [ 0,  1,  0, -1, -1, -1,  1,  1],
        [ 1,  0, -1,  0, -1,  1, -1,  1]
    ];

    var B = createArray(X, Y);

    var generateSeed = function() {
        for(var i = 0; i < X * Y / 2; i++) {
            var x = Math.floor( Math.random() * X );
            var y = Math.floor( Math.random() * Y );

            A[x][y] = 1;
        }
    };

    var rule = function(x, y) {
        var alive = 0;
        for(var k = 0; k < 8; k++) {
            var dx = x + delta[0][k];
            var dy = y + delta[1][k];

            if(!valid(dx, 0, X)) continue;
            if(!valid(dy, 0, Y)) continue;

            alive += A[dx][dy] === 1 ? 1 : 0;
        }

        if(A[x][y] === 1) {
            return alive >= 1 && alive <= 5 ? 1 : 0;
        } else {
            return alive === 3 ? 1 : 0;
        }
    };

    var iterate = function() {
        for(var x = X - 1; x >= 0; x--) {
            for(var y = Y - 1; y >= 0; y--) {
                B[x][y] = rule(x, y);
            }
        }
        for(var x = X - 1; x >= 0; x--) {
            for(var y = Y - 1; y >= 0; y--) {
                A[x][y] = B[x][y];
            }
        }
    };

    var plot = function() {
        //BOLADO.plot2D(A);

        for(var x = X - 1; x >= 0; x--) {
            var str = '' + ( (X - x)&1 ) + ": ";
            for(var y = Y - 1; y >= 0; y--) {
                str += A[x][y];
            }
            console.log(str);
        }
    };

    var get = function(x, y) {
        return A[x][y];
    }

    return {
        generateSeed : generateSeed,
        iterate      : iterate,
        plot         : plot,
        get          : get
    };
};
