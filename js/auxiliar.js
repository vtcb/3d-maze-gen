/* Creates a N-Dimensional array */
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

/* Check if x is in the interval [min, max) */
function valid(x, min, max) {
    return x >= min && x < max;
}

/* Shuffles an array */
function shuffle(arr) {
    for(var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

/* Generates a random integer in range [0, x) */
function randomInt(x) {
    return Math.floor( Math.random() * x );
}
