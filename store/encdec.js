export const state = () => ({
    plainText: '',
    resultText: '',
    reverse: false,
})

export const getters = {
    plain: function(state){
        if (state.reverse === true) {
            return encodeURIComponent(state.plainText)
        }
        return decodeURIComponent(state.plainText)
    },
    result: function(state){
        if (state.reverse === false) {
            return encodeURIComponent(state.resultText)
        }
        return decodeURIComponent(state.resultText)
    }
}

export const mutations = {
    setPlainText(state, text){
        state.plainText = text
    },
    setResultText(state, text){
        state.resultText = text
    },
    setFlag(state){
        state.reverse = !state.reverse
    }
}

export const actions = {

}