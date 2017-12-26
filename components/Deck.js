import React, { Component } from 'react'
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'

class Deck extends Component {

    render() {
        const { decks } = this.props
        return (
            Object.keys(decks).map((deck) => {
                const { title, questions } = decks[deck]

                return(
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'DeckView',
                            { title }
                        )}
                        key={deck}
                        style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.info}>{questions.length} Card(s)</Text>
                    </TouchableOpacity>
                )

            })
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    title: {
        fontSize: 20,
        fontWeight: "800"
    },
    info: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 17,
        color: purple
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Deck)
