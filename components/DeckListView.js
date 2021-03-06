import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import Deck from './Deck'

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
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading/>
        }
        return (
            <ScrollView style={styles.container}>
                <Text style={{color: purple, fontSize: 25}}>Decks</Text>
                <Deck navigation={this.props.navigation} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckListView)