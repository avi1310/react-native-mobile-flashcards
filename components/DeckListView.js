import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { purple, white } from '../utils/colors'

export default class DeckListView extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>Deck List View</Text>
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