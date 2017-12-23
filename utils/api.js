import { AsyncStorage } from 'react-native'
import { formatData, DECKS_STORAGE_KEY } from './_deck'

export function fetchDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatData)
}
