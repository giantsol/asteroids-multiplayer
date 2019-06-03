import React, {createRef} from 'react'
import './App.css';
import {withSnackbar, WithSnackbarProps} from "notistack"
import P5Functions from "./P5Functions"

interface Props extends WithSnackbarProps {}

interface State {
    myId: string | null
    fitScreenHeight: boolean
}

class App extends React.Component<Props, State> implements P5Functions {
    private readonly socket: SocketIOClient.Emitter
    private readonly canvasRef = createRef<HTMLCanvasElement>()

    width = 0
    height = 0

    constructor(props: Props) {
        super(props)
        this.socket = io.connect()
        this.state = { myId: null, fitScreenHeight: true }
    }

    render() {
        const divStyle = this.state.fitScreenHeight ? "fitHeight" : "fitWidth"
        return (
            <div style={{width: "100vw", height: "100vh", backgroundColor: "black"}}>
                <div className={divStyle} style={{position: "relative"}}>
                    <canvas ref={this.canvasRef} width={this.width} height={this.height}
                            style={{width: "100%", height: "100%", display: "block", border: '2px solid white'}}>
                        Fallback text for old browsers.
                    </canvas>
                    <span>Hello World!</span>
                </div>
            </div>
        )
    }

}


export default withSnackbar(App)
