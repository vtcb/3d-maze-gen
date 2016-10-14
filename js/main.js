var BOLADO = BOLADO || {};

BOLADO.main = function() {
    var mg = new BOLADO.MazeGenerator(10, 10, 10);

    mg.generate();
    mg.plot();
}
