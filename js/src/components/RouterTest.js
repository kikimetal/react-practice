import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    HashRouter
} from 'react-router-dom'

// const rootDirName = "garment-dev"
const rootDirName = ""

const Matches = ({match}) => {
    return <div style={{border: "2px solid blue", margin: "1em", padding: "0.3em"}}>
        {match.params.pageName
            ? <p><b>pageName: {match.params.pageName}</b></p>
            : <h3>page not match...</h3>}
    </div>
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const NoTopic = ({ match }) => (
    <div>
        <h3 style={{color: "red"}}>Sorry, {match.params.topicId} is not found.</h3>
    </div>
)

// const Topics = ({ match }) => (
//     <div>
//         <h2>Topics</h2>
//         <ul>
//             <li>
//                 <Link to={`${match.url}/rendering`}>
//                     Rendering with React
//                 </Link>
//             </li>
//             <li>
//                 <Link to={`${match.url}/components`}>
//                     Components
//                 </Link>
//             </li>
//             <li>
//                 <Link to={`${match.url}/props-v-state`}>
//                     Props v. State
//                 </Link>
//             </li>
//         </ul>
//
//         <Route path={`${match.url}/:topicId`} component={Topic}/>
//         <Route exact path={match.url} render={() => (
//                 <h3>Please select a topic.</h3>
//             )}/>
//     </div>
// )

const Topics = ({match}) => {
    console.log(match)
    return (
        <div style={{border: "1px solid grey"}}>
            <ul style={{padding: "0.7em"}}>
                <li><NavLink to="/hello">/hello</NavLink></li>
                <li><NavLink to="hello">hello</NavLink></li>
                <li><NavLink to={match.url + "/hello"}>match.url hello</NavLink></li>
                <li><NavLink to="/topics/world">/topics/world</NavLink></li>
            </ul>
            <Switch>
                <Route exact path={match.url + "/hello"} component={Hello} />
                <Route exact path="/topics/world" component={World} />
                <Route exact path="/topics/:topicId" component={NoTopic} />
            </Switch>
        </div>
    )
}

const RootHello = () => <h2 style={{background: "skyblue"}}>(Root)hello hello hello</h2>

const Hello = () => <h2 style={{background: "pink"}}>hello hello hello</h2>

const World = () => <h2 style={{background: "pink"}}>world world world</h2>

const RouterTest = () => {
    const headerfooterstyle = {padding: "0.6em", background: "thistle", borderRadius: "0.2em", }
    return (
    <Router basename={rootDirName}>
        <div style={{fontSize: "30px", padding: "1em"}}>
            <h2 style={headerfooterstyle}>HEADER</h2>
            {/* <ul>
                <li>Link</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul> */}
            <ul style={{padding: "0.5em"}}>
                <li>NavLink</li>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/topics">Topics</NavLink></li>
            </ul>

            <hr/>

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
                <Route path="/:pageName" component={Matches} />

            <h2 style={headerfooterstyle}>FOOTER</h2>
        </div>

    </Router>
)}

export default RouterTest
