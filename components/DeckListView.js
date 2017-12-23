import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'

class DeckListView extends Component {
    state = {
        ready: false,
    }
    componentDidMount () {
        const { dispatch } = this.props

        fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }


    render() {
        const { decks } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading/>
        }
        return (
            <View style={styles.container}>
                <Text>Hello{console.log(decks)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckListView)