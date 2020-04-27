import React, {Component} from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state= {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1bij.jpg",
            allMemeImgs: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then (response => {
            const {memes} =response.data
            this.setState({
                allMemeImgs:memes
            })
        })
    }
    handleClick(){
        let number = Math.floor(Math.random() * this.state.allMemeImgs.length)
        this.setState(prevState => {
            let meme = prevState.allMemeImgs[number]
            return {
                randomImg : meme.url
            }
        })
    }
    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }
    render () {
        return (
            <div>
                <div className="meme-form">
								<input
								onChange={this.handleChange} 
								type="text" 
								name="topText"
								value={this.state.topText} 
								/>
								<input
								onChange={this.handleChange} 
								type="text" 
								name="bottomText"
								value={this.state.bottomText} 
								/>
								<button onClick={this.handleClick}>Generate</button>
							</div>
							

							<div className="meme">
							<img src={this.state.randomImg} alt="randomMeme"/>
							<h2 className="top">{this.state.topText}</h2>
							<h2 className="bottom">{this.state.bottomText}</h2>
							</div>
						</div>

            )
    }

}

export default MemeGenerator