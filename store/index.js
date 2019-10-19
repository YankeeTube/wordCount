import Vuex from 'vuex'
import Tl from '~/components/Timeline.vue'
import { async } from 'q';

const store = () => new Vuex.Store({
    state: {
        _timeline: [],
        _loadData: '',
        nonce: 0,
    },
    mutations: {
        setTimeLine(state, timeline){
            let already = JSON.parse(JSON.stringify(state._timeline)).map(function(key, value){
                return key['id'];
            });
            const data = JSON.parse(JSON.stringify(timeline));
            if (already.indexOf(data['id']) === -1){
                state._timeline.push(timeline)
                const nD = JSON.stringify(timeline);
                localStorage.setItem(nD, nD);
            }
        },
        delTimeLine(state, timeline){
            const idx = state._timeline.indexOf(timeline)
            if (idx > -1) state._timeline.splice(idx, 1)
        },
        clearTimeLine(state) {
            state._timeline = []
            state.nonce = 0
        },
        setLoadData(state, loadData){
            state._loadData = loadData;
        },
        increment (state, nonce){
            if (nonce){
                state.nonce = nonce
            }else {
                state.nonce++
            }
        }
    },
    getters: {
        getTimeline: function(state){
            return state._timeline
        },
        getNonce: function(state){
            return state.nonce
        },
        getLoadData: function(state){
            return state._loadData
        }
    },
    actions: {
        setTimeLine({commit}, payload){
            // console.log(this);
            commit('setTimeLine', payload)
        },
        setNonce({commit}, payload){
            if (payload){
                commit('increment', payload)
            }
            else {
                commit('increment')
            }
            
        },
        setLoadData({commit}, payload){
            commit('setLoadData', payload);
        },
        delTimeLine({commit}, payload){
            localStorage.removeItem(JSON.stringify(payload))
            commit('delTimeLine', payload)
        },
        clearTimeLine({commit}){
            commit('clearTimeLine')
        }
    }
})
export default store