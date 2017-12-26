import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity, Button, Animated } from 'react-native'
import { purple, white, red, green } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizView extends Component {
    state = {
        items: 1,
        questions: '',
        totalQuestions: this.props.totalQuestions,
        notEmpty: this.props.notEmpty,
        question: '',
        correct: 0,
        height1: new Animated.Value(261.3),
        width1: new Animated.Value(315),
        opacity1: new Animated.Value(1),
        opacity2: new Animated.Value(0),
        height2: new Animated.Value(0),
        width2: new Animated.Value(0)
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
        clearLocalNotification()
            .then(setLocalNotification)
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
    showAnswer = () => {
        const width1 = this.state.width1
        const height1 = this.state.height1
        const opacity1 = this.state.opacity1
        const opacity2 = this.state.opacity2
        const width2 = this.state.width2
        const height2 = this.state.height2
        Animated.timing(width1, { toValue: 0, duration: 1000}).start()
        Animated.timing(height1, { toValue: 0, duration: 1000}).start()
        Animated.timing(opacity1, { toValue: 0, duration: 100 }).start()
        Animated.timing(opacity2, { toValue: 1, duration: 1000 }).start()
        Animated.timing(width2, { toValue: 315, duration: 1000}).start()
        Animated.timing(height2, { toValue: 142, duration: 1000}).start()
    }
    showQuestion = () => {
        const width1 = this.state.width1
        const height1 = this.state.height1
        const opacity1 = this.state.opacity1
        const opacity2 = this.state.opacity2
        const width2 = this.state.width2
        const height2 = this.state.height2
        Animated.timing(width1, { toValue: 315, duration: 100}).start()
        Animated.timing(height1, { toValue: 261.3, duration: 100}).start()
        Animated.timing(opacity1, { toValue: 1, duration: 1000 }).start()
        Animated.timing(opacity2, { toValue: 0, duration: 100 }).start()
        Animated.timing(width2, { toValue: 0, duration: 1000}).start()
        Animated.timing(height2, { toValue: 0, duration: 1000}).start()
    }



    render() {
        console.log(this.props)
        const { deck, questions, title } = this.props
        const { items, question, notEmpty, correct, totalQuestions } = this.state

        return (

                <View style={styles.container}>
                    <Text style={{color: purple, fontSize: 25}}>Quiz</Text>
                    {notEmpty && (
                        <Animated.View
                            style={[styles.item, { height: this.state.height1, width: this.state.width1, opacity: this.state.opacity1 }]}>
                            <Text>{`${items}/${totalQuestions}`}</Text>
                            <Text style={styles.title}>Q. {question.question}</Text>
                            <Button title="Show Answer" onPress={this.showAnswer} style={{textAlign: 'left'}}/>
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
                        </Animated.View>
                    )}
                    {notEmpty && (
                        <Animated.View
                            style={[styles.item, { opacity: this.state.opacity2 }]}>
                            <Text style={styles.title}>Answer:</Text>
                            <Text style={styles.info}>{question.answer}</Text>
                            <Button title="Show Question" onPress={this.showQuestion} style={{textAlign: 'left'}}/>

                        </Animated.View>
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