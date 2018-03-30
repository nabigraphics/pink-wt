module.exports = function (text, max) {
    if(!text || text === "") return;
        if (text.length > max) {
            text = text.substr(0, max) + "...";
        }
    return text;
}