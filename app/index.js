var React = require('react');
var ReactDom = require('react-dom')
require('./index.css')

class App extends React.Component {
    render(){
        return(
            <div>
                Hello Kamal!!
            </div>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)
