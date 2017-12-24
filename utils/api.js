import { AsyncStorage } from 'react-native'
import { formatData, DECKS_STORAGE_KEY } from './_deck'

export function fetchDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatData)
}

export function addDeckAPI ({ entry, key }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}
