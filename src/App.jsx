import React from 'react';
import ReactDOM from 'react-dom';
import WebTorrent from 'webtorrent';

const App = () => {
    return (
        <div>
            Hello React!
        </div>
    )
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));