var BOLADO = BOLADO || {}

BOLADO.main = function() {
    var mg = new BOLADO.MazeGenerator();

    mg.generate();
    mg.plot();
}
