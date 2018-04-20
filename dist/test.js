(function (root, factory) {
    if (typeof module === "object" && typeof module.test === "object") {
        module.test = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.$ = factory();
    }
})(this, function () {
    // 模块主体
    console.log("this is test module");
});