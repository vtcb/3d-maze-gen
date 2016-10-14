var BOLADO = BOLADO || {};

var plot1 = function(input) {
    var data = new vis.DataSet();

    
    for(var k = input.length - 1; k >= 0; k--) {
        for(var i = input[k].length - 1; i >= 0; i--) {
            for(var j = input[k][i].length - 1; j >= 0; j--) {
                data.add({
                    x: i,
                    y: j,
                    z: k,
                    style: -input[k][i][j]
                });
            }
        }
    }

    /*
    var myX = [1, 2, 3, 3, 3, 3, 3, 3, 4, 5, 6, 6, 6];
    var myY = [1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4];
    var myZ = [0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 3, 2];

    for (var i = 0; i < 13; i++) {
        var x = myX[i];
        var y = myY[i];
        var z = myZ[i];

        data.add({x:x,y:y,z:z, style:1});
    }*/

    var options = {
        width:  '600px',
        height: '600px',
        style: 'dot-size',
        showPerspective: true,
        showGrid: true,
        keepAspectRatio: true,
        verticalRatio: 1.0,
        legendLabel: 'distance',
        cameraPosition: {
          horizontal: -0.35,
          vertical: 0.22,
          distance: 1.8
        },
        dotSizeRatio: 0.009
    };

    // create our graph
    var container = document.getElementById('graph1');
    var graph = new vis.Graph3d(container, data, options);
};

var plot2 = function(input) {
    var data = new vis.DataSet();

    
    for(var k = input.length - 1; k >= 0; k--) {
        for(var i = input[k].length - 1; i >= 0; i--) {
            for(var j = input[k][i].length - 1; j >= 0; j--) {
                data.add({
                    x: i,
                    y: j,
                    z: k,
                    style: -input[k][i][j]
                });
            }
        }
    }

    var options = {
        width:  '600px',
        height: '600px',
        style: 'dot-color',
        showPerspective: true,
        showGrid: true,
        keepAspectRatio: true,
        verticalRatio: 1.0,
        legendLabel: 'distance',
        cameraPosition: {
          horizontal: -0.35,
          vertical: 0.22,
          distance: 1.8
        },
        dotSizeRatio: 0.009
    };

    // create our graph
    var container = document.getElementById('graph2');
    var graph = new vis.Graph3d(container, data, options);
};

BOLADO.plot3D = function(A, B) {
    plot1(A);
    plot2(B);
};

BOLADO.plot2D = function(input) {
    var data = new vis.DataSet();

    
    for(var i = input.length - 1; i >= 0; i--) {
        for(var j = input[i].length - 1; j >= 0; j--) {
            data.add({
                x: i,
                y: j,
                z: 0,
                style: input[i][j]
            });
        }
    }

    var options = {
        width:  '600px',
        height: '600px',
        style: 'dot-color',
        showPerspective: true,
        showGrid: true,
        keepAspectRatio: true,
        verticalRatio: 1.0,
        legendLabel: 'distance',
        cameraPosition: {
          horizontal: -0.35,
          vertical: 0.22,
          distance: 1.8
        },
        dotSizeRatio: 0.0001
    };

    // create our graph
    var container = document.getElementById('mygraph');
    var graph = new vis.Graph3d(container, data, options);
};
