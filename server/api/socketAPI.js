const randomHash = require('../utils/randomHash');
const Share = require('../model/share');

module.exports = (socket) => {
    let id = null;
    socket.on('onSeed', data => {
        // console.log(socket.id);

        // hash gen.
        let hash = generateHash();
        // query.
        id = socket.id;
        let query = {
            hash,
            ...data,
            id: socket.id,
        }
        // new share.
        let newShare = new Share(query);
        newShare.save().then(() => {
            // socket 'onSeelResult' emited.
            socket.join(id);
            socket.emit('onSeedResult', query);
        }).catch(err => { console.log(err) });
    })
    socket.on('getInfo', data => {
        let hash = data.hash ? data.hash : null;
        if (!hash) return;
        Share.findOne({ hash }).then(result => {
            socket.emit('getInfoResult', result);
        })
    })
    socket.on('disconnect', () => {
        if (id) {
            let query = { id: { $in: id } };
            Share.remove(query).then(() => {
                socket.leave(id);
            }).catch(err => console.log(err));
        }
        // console.log('disconnected');
    });
};

const generateHash = () => {
    let hash = randomHash();
    Share.findOne({ hash }).then(result => {
        if (result) return generateHash();
    })
    return hash;
}