import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple, white, black } from '../utils/colors'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { addDeckAPI } from '../utils/api'

class NewDeckView extends Component {
    state = {
        title: '',
        titleValid: false
    }

    submit = () => {

        const key = this.state.title
        const entry = {
            title: key,
            questions: []
        }

        const valid = this.state.titleValid

        if(valid) {
            this.props.dispatch(addDeck({
                [key]: entry
            }))
            this.setState({title: '', titleValid: false })
            addDeckAPI({ key, entry })
            this.props.navigation.navigate(
                'DeckView',
                { title: key }
            )
        }
    }
    handleTitleChange = (title) => {
        if(title) {
            this.setState({
                title,
                titleValid: true
            })
        }
        else {
            this.setState({
                title,
                titleValid: false
            })
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={{color: purple, fontSize: 25}}>New Deck</Text>
                <Container style={styles.formContainer}>
                    <Content>
                        <Form>
                            <Text style={styles.inputHeader}>What is the title of your new deck?</Text>
                            <Item success={this.state.titleValid} error={!this.state.titleValid}>
                                <Input placeholder="Deck Title" value={this.state.title} onChangeText={(text) => this.handleTitleChange(text)} />
                            </Item>
                        </Form>
                        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.submit}>
                            <Text style={styles.submitBtnText}>Create Deck</Text>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    inputHeader: {
        color: black,
        fontSize: 30,
        textAlign:'center'
    },
    formContainer: {
        marginTop: 30,
    },
    btn: {
        padding: 20,
        color: white,
        backgroundColor: purple,
        fontSize: 20,
        fontWeight: "800",
        textAlign: 'center',
        borderRadius: 16
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 25,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewDeckView)