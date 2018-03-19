module.exports = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    let randomSize = 4 + Math.round(Math.random() * 3);
    for (let i = 0; i < randomSize; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}