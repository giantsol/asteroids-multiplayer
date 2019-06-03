import React, {ChangeEvent, FormEvent} from 'react'
import Button from '@material-ui/core/Button'
import {Dialog} from "@material-ui/core"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import {CirclePicker, ColorResult, RGBColor} from "react-color"
import {ClientSocketEventsHelper} from "./ClientSocketEventsHelper"

interface Props {
    socket: SocketIOClient.Emitter
    prevName: string | null
    prevColor: RGBColor | null
}

interface State {
    inputName: string
    color: RGBColor
}

export default class LogInView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            inputName: this.props.prevName || '',
            color: this.props.prevColor || { r: 255, g: 255, b: 255 }
        }
    }

    render() {
        return (
            <Dialog open={true}>
                <form onSubmit={this.onLogInButtonClicked} autoComplete="off">
                    <DialogTitle>로그인</DialogTitle>
                    <DialogContent>
                        <TextField id="name" name="name" autoFocus
                                   margin="dense" label="Nickname" fullWidth required
                                   value={this.state.inputName} onChange={this.onInputChanged}/>
                        <CirclePicker color={this.state.color} onChange={this.onColorChanged}/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" fullWidth variant="contained" color="primary">확인</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

    private onInputChanged = (event: ChangeEvent) => {
        let value = (event.target as HTMLInputElement).value.trim()
        if (value.length > 10) {
            value = value.substr(0, 10)
        }
        this.setState({inputName: value})
    }

    private onColorChanged = (color: ColorResult) => {
        this.setState({color: color.rgb})
    }

    private onLogInButtonClicked = (event: FormEvent) => {
        event.preventDefault()
        ClientSocketEventsHelper.sendTryLoggingInEvent(this.props.socket, this.state.inputName, this.state.color)
    }
}