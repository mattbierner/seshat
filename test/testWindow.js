define(['seshat'],
function(seshat){
    var max = function(x, y) { return x > y ? x : y; };
    
    var height = function(root) {
        return (!root ? 0 :
            max(
                (root.left ? 1 + height(root.left) : 0),
                (root.right ? 1 + height(root.right) : 0)));
    };
    
    var count = function(root) {
        return (!root ? 0 :
            1 + count(root.left) + count(root.right));
    };
    
    var compareInt = function(x, y) { return x - y; };
    
    var ordered = function(root) {
        if (!root)
            return;
        if (root.left) {
            assert.ok(compareInt(root.left.key, root.key) < 0)
            ordered(root.left);
        }
        if (root.right) {
            assert.ok(compareInt(root.right.key, root.key) > 0)
            ordered(root.right);
        }
    };
    
    var df = function(node) {
        return (!node ? 0 :
            (node.left ? 1 + height(node.left) : 0) - (node.right ? 1 + height(node.right): 0));
    };
    
    return {
        'module': "Window",
        'tests': [
            ["Lower bound",
            function(){
                var m = seshat.create(compareInt);
                for (var i = 0; i < 16; ++i)
                    m = seshat.update(m, i, 0, [i, 0]);
                
                m = seshat.prune(m, 10);

                assert.equal(count(m.root), 6);
                assert.ok(Math.abs(df(m.root)) <= 1);
                
                for (var i = 0; i < 10; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
                
                for (var i = 10; i < 16; ++i)
                    assert.deepEqual(seshat.lookup(m, i, 0), [i, 0]);
            }],
            ["Upper bound",
            function(){
                var m = seshat.create(compareInt);
                for (var i = 0; i < 16; ++i)
                    m = seshat.update(m, i, 0, [i, 0]);
                
                m = seshat.prune(m, undefined, 6);

                assert.equal(count(m.root), 6);
                assert.ok(Math.abs(df(m.root)) <= 1);
                
                for (var i = 0; i < 6; ++i)
                    assert.deepEqual(seshat.lookup(m, i, 0), [i, 0]);
                
                for (var i = 6; i < 16; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
            }],
            ["Lower and upper bound",
            function(){
                var m = seshat.create(compareInt);
                for (var i = 0; i < 16; ++i)
                    m = seshat.update(m, i, 0, [i, 0]);
                
                m = seshat.prune(m, 4, 10);

                assert.equal(count(m.root), 6);
                assert.ok(Math.abs(df(m.root)) <= 1);
                
                for (var i = 0; i < 4; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
                
                for (var i = 4; i < 10; ++i)
                    assert.deepEqual(seshat.lookup(m, i, 0), [i, 0]);
                
                for (var i = 10; i < 16; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
            }],
            ["Lower and upper bound random insertion",
            function(){
                var m = seshat.create(compareInt);
                
                var z = [13, 5, 3, 14, 12, 11, 0, 1, 15, 7, 4, 8, 6, 10, 2, 9];
                for (var i = 0; i < z.length; ++i)
                    m = seshat.update(m, z[i], 0, [z[i], 0]);
                
                m = seshat.prune(m, 4, 10);

                assert.equal(count(m.root), 6);
                assert.ok(Math.abs(df(m.root)) <= 1);
                
                for (var i = 0; i < 4; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
                
                for (var i = 4; i < 10; ++i)
                    assert.deepEqual(seshat.lookup(m, i, 0), [i, 0]);
                
                for (var i = 10; i < 16; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
            }],
            ["Lower and upper bound random large insertion",
            function(){
                var m = seshat.create(compareInt);
                
                var z = [4, 34, 15, 20, 32, 10, 49, 54, 19, 23, 33, 14, 6, 2, 60,
                         39, 30, 22, 48, 43, 12, 51, 57, 29, 56, 5, 50, 37, 38,
                         16, 55, 1, 47, 36, 42, 25, 18, 13, 0, 8, 17, 46, 58,
                         63, 27, 44, 21, 26, 41, 52, 31, 62, 45, 35, 40, 24,
                         28, 7, 61, 3, 59, 11, 53, 9];
                
                for (var i = 0; i < z.length; ++i)
                    m = seshat.update(m, z[i], 0, [z[i], 0]);
                
                m = seshat.prune(m, 4, 10);

                assert.equal(count(m.root), 6);
                assert.ok(Math.abs(df(m.root)) <= 1);
                
                for (var i = 0; i < 4; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
                
                for (var i = 4; i < 10; ++i)
                    assert.deepEqual(seshat.lookup(m, i, 0), [i, 0]);
                
                for (var i = 10; i < 16; ++i)
                    assert.equal(seshat.lookup(m, i, 0), null);
            }],
           
       ],
    };
});
