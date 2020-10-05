var tool;
(function (tool) {
    var utils;
    (function (utils) {
        utils.MirDir = (_a = {},
            _a[7 /* LEFT */] = 3 /* RIGHT */,
            _a[8 /* LEFT_UP */] = 2 /* RIGHT_UP */,
            _a[6 /* LEFT_DOWN */] = 4 /* RIGHT_DOWN */,
            _a);
        utils.ReversalDir = (_b = {},
            _b[3 /* RIGHT */] = 7 /* LEFT */,
            _b[2 /* RIGHT_UP */] = 6 /* LEFT_DOWN */,
            _b[1 /* UP */] = 5 /* DOWN */,
            _b[8 /* LEFT_UP */] = 4 /* RIGHT_DOWN */,
            _b[7 /* LEFT */] = 3 /* RIGHT */,
            _b[6 /* LEFT_DOWN */] = 2 /* RIGHT_UP */,
            _b[5 /* DOWN */] = 1 /* UP */,
            _b[4 /* RIGHT_DOWN */] = 8 /* LEFT_UP */,
            _b);
        var _a, _b;
    })(utils = tool.utils || (tool.utils = {}));
})(tool || (tool = {}));
