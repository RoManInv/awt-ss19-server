function getRandomNum(min, max) {
    var range = max - min;
    var rand = Math.random;
    return(min + Math.round(rand * range));
}

module.exports.getRandomNum = getRandomNum;