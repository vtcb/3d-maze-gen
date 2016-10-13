var BOLADO = BOLADO || {};

BOLADO.plot3D = function(input) {
    var data = new vis.DataSet();

    
    for(var k = input.length - 1; k >= 0; k--) {
        for(var i = input[k].length - 1; i >= 0; i--) {
            for(var j = input[k][i].length - 1; j >= 0; j--) {
                data.add({
                    x: i,
                    y: j,
                    z: k,
                    style: input[i][j][k]
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
        }
    };

    // create our graph
    var container = document.getElementById('mygraph');
    var graph = new vis.Graph3d(container, data, options);
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
        }
    };

    // create our graph
    var container = document.getElementById('mygraph');
    var graph = new vis.Graph3d(container, data, options);
};
