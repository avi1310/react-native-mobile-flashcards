import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple, white, black } from '../utils/colors'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardAPI } from '../utils/api'

class NewQuestionView extends Component {
    state = {
        question: '',
        answer: '',
        questionValid: false,
        answerValid: false
    }

    submit = () => {

        const { title } = this.props
        const newDecks = this.props.decks
        const question = this.state.question
        const answer = this.state.answer
        const entry = {
            question,
            answer
        }

        const valid = this.state.questionValid && this.state.answerValid

        if(valid) {
            this.props.dispatch(addCard(entry, title))

            newDecks[title]["questions"].push(entry)

            addCardAPI(newDecks)

            this.setState({question: '', answer: '', questionValid: false, answerValid: false})
            this.props.navigation.goBack()
        }
    }
    handleQuestionChange = (question) => {
        if(question) {
            this.setState({
                question,
                questionValid: true
            })
        }
        else {
            this.setState({
                question,
                questionValid: false
            })
        }
    }
    handleAnswerChange = (answer) => {
        if(answer) {
            this.setState({
                answer,
                answerValid: true
            })
        }
        else {
            this.setState({
                answer,
                answerValid: false
            })
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={{color: purple, fontSize: 25}}>New Question</Text>
                <Container style={styles.formContainer}>
                    <Content>
                        <Form>
                            <Item success={this.state.questionValid} error={!this.state.questionValid}>
                                <Input placeholder="Enter Question" value={this.state.question} onChangeText={(text) => this.handleQuestionChange(text)} />
                            </Item>
                            <Item success={this.state.answerValid} error={!this.state.answerValid}>
                                <Input placeholder="Enter Answer" value={this.state.answer} onChangeText={(text) => this.handleAnswerChange(text)} />
                            </Item>
                        </Form>
                        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.submit}>
                            <Text style={styles.submitBtnText}>Submit</Text>
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

function mapStateToProps (decks, { navigation }) {
    const { title } = navigation.state.params
    return {
        deck: decks[title],
        title,
        decks
    }
}

export default connect(mapStateToProps)(NewQuestionView)