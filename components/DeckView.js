import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { white, black, purple } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'


class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title,
            headerLeft: <Ionicons name="ios-arrow-back-outline"
                                  style={{color: white, fontSize: 25, padding: 20, paddingBottom: 10}}
                                      onPress={ () => navigation.navigate("Home")}/>
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
                    <TouchableOpacity>
                        <Button title="Add Cards" onPress={() => this.props.navigation.navigate(
                            'NewQuestionView',
                            {title: deck.title}
                        )}/>
                    </TouchableOpacity>
                    {deck.questions.length > 0 ? (
                        <TouchableOpacity><Button title="Start Quiz" onPress={() => this.props.navigation.navigate(
                            'QuizView',
                            {title: deck.title}
                        )}/>
                        </TouchableOpacity>
                    ): (<Text>No cards to start quiz</Text>)}
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