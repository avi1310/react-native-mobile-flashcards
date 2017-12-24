import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { white, black, purple } from '../utils/colors'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.cardsNo}>{deck.questions.length} Card(s)</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity><Button title="Add Cards" onPress={() => (console.log("hello"))}/></TouchableOpacity>
                    <TouchableOpacity><Button title="Start Quiz" onPress={() => (console.log("hello"))}/></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 40,
        color: black,
        fontWeight: "800"
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    cardsNo: {
        fontSize: 30,
        color: purple,
        paddingTop: 15
    }
})

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params
    return {
        deck: state[title]
    }
}

export default connect(mapStateToProps)(DeckView)