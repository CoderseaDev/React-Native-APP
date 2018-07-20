import React, { Component } from 'react'
import { AppRegistry } from 'react-native'




import AuthScreen from '../Auth/Auth';
import Splash from './Splash'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'Splash' };
        console.log('Start doing some tasks for about 3 seconds')
        setTimeout(()=>{
            console.log('Done some tasks for about 3 seconds')
            this.setState({ currentScreen: 'Auth' })
        }, 3000)
    }
    render() {
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <AuthScreen />
        return mainScreen
    }
}

export default Main;