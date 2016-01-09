var fs = require("fs");
var FileUtils;
(function (FileUtils) {
    function getAllFileNamesFromFolder(dir) {
        var fileNames = [];
        fs.readdirSync(dir).forEach(function (file) {
            file = dir + "/" + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                fileNames.push.apply(fileNames, FileUtils.getAllFileNamesFromFolder(file));
            }
            else {
                fileNames.push(file);
            }
        });
        return fileNames;
    }
    FileUtils.getAllFileNamesFromFolder = getAllFileNamesFromFolder;
})(/* istanbul ignore next */FileUtils = exports.FileUtils || (exports.FileUtils = {}));

//# sourceMappingURL=file-utils.js.map
