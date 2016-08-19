/** Moves the TypeScript definition file to the main directory. */

var fs = require("fs-extra");

fs.move("es2015/dms.d.ts", "dms.d.ts", {
    clobber: true
}, function(error) {
    if (error) {
        throw error;
    }
});