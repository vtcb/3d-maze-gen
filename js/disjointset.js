var BOLADO = BOLADO || {}

/**
 * Disjoint Set
 */

BOLADO.DisjointSet = function(size) {

    var ds, sz;

    var find = function(u) {
        return ds[u] === u ? u : ds[u] = find(ds[u]);
    };

    return {
        inc     : function(u, val) {
            val = val || 1;
            sz[find(u)] += val;
        },

        size    : function(u) {
            return sz[find(u)];
        },

        makeset : function() {
            ds = [];
            sz = [];
            for(var i = 0; i < size; i++) {
                ds.push(i);
                sz.push(0);
            }
        },

        find    : find,

        union   : function(u, v) {
            u = find(u);
            v = find(v);

            if(u === v) return false;

            sz[v] += sz[u];
            ds[u] = v;

            return true;
        },

        sameset : function(u, v) {
            return find(u) === find(v);
        }
    }
};
