import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity, Button } from 'react-native'
import { purple, white, red, green } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'


class QuizView extends Component {
    state = {
        items: 1,
        questions: '',
        totalQuestions: this.props.totalQuestions,
        notEmpty: this.props.notEmpty,
        question: '',
        correct: 0,
    }
    static navigationOptions = () => {
        return {
            title: "Quiz"
        }
    }
    componentDidMount () {
        const { title } = this.props
        fetchDecks()
            .then((decks) => {
            this.setState({questions: decks[title]["questions"]})
        }).then(() => {
            const questions = this.state.questions
            const question = questions.pop()
            this.setState({question})
            }
        )
    }
    correctHandle = () => {
        const questions = this.state.questions
        const question = questions.pop()
        let notEmpty = true
        if(!question) {
            notEmpty = false
        }

        this.setState({
            items: this.state.items + 1,
            notEmpty,
            question,
            correct: this.state.correct + 1
        })
    }
    wrongHandle = () => {
        const questions = this.state.questions
        const question = questions.pop()
        let notEmpty = true
        if(!question) {
            notEmpty = false
        }

        this.setState({
            items: this.state.items + 1,
            notEmpty,
            question,
        })
    }
    restartQuiz = () => {
        const { title } = this.props
        fetchDecks()
            .then((decks) => {
                this.setState({questions: decks[title]["questions"]})
            }).then(() => {
                const questions = this.state.questions
                const question = questions.pop()
                this.setState({
                    question,
                    correct: 0,
                    items: 1,
                    notEmpty: this.props.notEmpty
                })
            }
        )
    }



    render() {
        console.log(this.props)
        const { deck, questions, title } = this.props
        const { items, question, notEmpty, correct, totalQuestions } = this.state

        return (

                <View style={styles.container}>
                    <Text style={{color: purple, fontSize: 25}}>Quiz</Text>
                    {notEmpty && (
                        <View
                            style={styles.item}>
                            <Text>{`${items}/${totalQuestions}`}</Text>
                            <Text style={styles.title}>{question.question}</Text>
                            <Text style={styles.info}>{items}</Text>
                            <TouchableOpacity
                                style={[styles.iosSubmitBtn, {backgroundColor: green }]}
                                onPress={this.correctHandle}>
                                <Text style={styles.submitBtnText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.iosSubmitBtn, {backgroundColor: red }]}
                                onPress={this.wrongHandle}>
                                <Text style={styles.submitBtnText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {!notEmpty && (
                        <View style={styles.itemComplete}>
                            <Text style={styles.title}>The Quiz is Complete</Text>
                            <Text style={styles.info}>{correct/totalQuestions * 100}% Correct Answers</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity>
                                    <Button title="Restart Quiz" onPress={this.restartQuiz}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Button
                                        title="Back to Deck"
                                        onPress={() => this.props.navigation.navigate(
                                            'DeckView',
                                            { title }
                                        )}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
    itemComplete: {
        paddingBottom: 50,
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
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
})

function mapStateToProps (decks, { navigation }) {
    const { title } = navigation.state.params
    const deck = decks[title]
    let questions = decks[title]["questions"]
    let totalQuestions = questions.length
    let notEmpty = true
    if(totalQuestions.length === 0) {
        notEmpty = false
    }
    return {
        deck,
        title,
        questions,
        totalQuestions,
        notEmpty
    }
}

export default connect(mapStateToProps)(QuizView)