const asyncWrap = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch((err)=>{
            console.log("Error: ", err);
        });
    };
}
module.exports = asyncWrap;