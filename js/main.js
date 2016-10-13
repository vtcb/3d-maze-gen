var BOLADO = BOLADO || {};

BOLADO.main = function() {
    var mg = new BOLADO.MazeGenerator(20, 20, 20);

    mg.generate();
    mg.plot();
}
