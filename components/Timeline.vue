<template>
  <v-container class="history timeline-container" :class="{'px-6': !$vuetify.breakpoint.smAndDown}" v-if="this.$store.getters.getSwitch == false">
    <p class="history--title"><v-icon>fas fa-history</v-icon> 히스토리</p>
    <p class="warn">* 브라우저 캐시를 삭제(제거)할 경우 히스토리가 초기화 될 수 있으니, 주의 해 주세요!</p>
    <p class="warn">* 시크릿 모드 또는 Tor 브라우저를 사용하여 추적방지 기능을 사용하여도 초기화 됩니다!</p>
    <v-list three-line class="history-box" v-if="timeline.length > 0" color="#fafafa">
      <template v-for="(item, index) in timeline">
        <v-subheader
          :key="item.id"
          v-text="item.time"
        ></v-subheader>

        <v-list-item
          :key="item.id"
        >

          <v-list-item-content>
            <p>공백 포함 : {{ item.fullCount }} 자 / {{ item.fullByteCount || 0 }} BYTE</p>
            <p class="my-1">공백 제외 : {{ item.emptyCount }} 자 / {{ item.emptyByteCount || 0 }} BYTE</p>
            <p class="my-1">단어 수 : {{ item.voca || 0 }} 자</p>
            <v-list-item-subtitle v-html="item.text">
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-row class="action-btn">
              <v-col class="pa-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="copyItem(item);snackbar=true;" v-on="on" color="#5e849e">
                      <v-icon color="white">far fa-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>복사</span>
                </v-tooltip>
              </v-col>

              <v-snackbar v-model="snackbar" :timeout="2000">{{ text }}
                <v-btn
                    color="pink"
                    text
                    @click="snackbar = false"
                >닫기</v-btn>
              </v-snackbar>
              
              <!-- <v-divider></v-divider> -->

              <v-col class="pa-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="editItem(item)" v-on="on" color="#5e849e">
                      <v-icon color="white">fas fa-pen-square</v-icon>
                    </v-btn>
                  </template>
                  <span>불러오기</span>
                </v-tooltip>
              </v-col>

              <!-- <v-divider></v-divider> -->

              <v-col class="pa-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">            
                    <v-btn @click="removeItem(item)" v-on="on" color="#5e849e">
                      <v-icon color="white">far fa-trash-alt</v-icon>
                    </v-btn>
                  </template>
                  <span>삭제</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-list-item-action>
        </v-list-item>
        <v-divider
            v-if="index + 1 < timeline.length"
            :key="index"
          ></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<style>
    .contents{
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        display: inline-block !important;
    }
    .title-color{
      background-color: #00897B;
      font-size: 1.6rem !important;
    }
    @media (max-width:768px) {
      .timeline-container{
        width: 100%;
      }
      .v-timeline-item__divider{
        display: none;
      }
      .v-timeline-item__body > .row > .col-3{
        flex: 100%;
        max-width: 100%;
      }
      .v-timeline-item__body > .row{
        flex-direction: column;
      }
      .v-list-item{
        flex-direction: column;
      }
      .action-btn{
        flex-direction: row !important;
      }
      .history{
        width: 100%;
        padding-right: 0 !important;
        padding-left: 0 !important;
        margin: 0;
      }
    }
    .history-box{
      box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.08);
      background-color: #fafafa;
    }
    .action-btn{
      flex-direction: column;
    }
    .v-application .font-weight-light{
      font-size: 1.6rem !important;
    }
    pre{
      white-space: pre-wrap; /* CSS3*/
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-all; /* Internet Explorer 5.5+ */ 
      font-size: 0.85rem;
    }
    .history--title{
      font-size: 1.3rem;
    }
    .warn{
      font-size: .85rem;
      color: #ff4444;
    }
</style>

<script>
import { mapActions } from "vuex";
  export default {
    data: () => ({
      events: [],
      input: null,
      nonce: 0,
      snackbar: false,
      text: "복사되었습니다. 'Ctrl + v'를 입력하여 붙여넣어 보세요!",
    }),
    created: function() {
      const storage = Object.keys(localStorage);
      if (storage){
        let tmp = []
        let temp = {}
        const nowData = Object.values(this.$store.getters.getTimeline);
        for (let i=storage.length -1; i >= 0; i--){
          try{
            const data = JSON.parse(storage[i]);
            data['text'] = data['text']
            tmp.push(data['id']);
            temp[data['id']] = data;
          }
          catch(e){continue}
        }
        const maximum = Math.max.apply(0, tmp);
        tmp = tmp.sort(function(a, b){ return a - b;}) // 오름차순
        for (let x=0; x < tmp.length; x++){
          this.$store.dispatch('setTimeLine', temp[tmp[x]]);
        }
        if (tmp.length > 0){
          this.$store.dispatch('setNonce', Math.max.apply(0, tmp));
        }
      }

    },
    computed: {
      timeline () {
        return this.$store.getters.getTimeline.slice().reverse();
      },
    },

    methods: {
      formatDate() {
            var date = new Date();
            var m = date.getMonth()+1;
            var d = date.getDate();
            var h = date.getHours();
            var i = date.getMinutes();
            var s = date.getSeconds();
            return date.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
      },
      comment () {
        const time = (new Date()).toTimeString()
        this.events.push({
          id: this.nonce++,
          text: this.$store.getters.getTimeline,
          time: formatDate(),
        })
        this.input = null
      },
      removeItem(item){
          this.$store.dispatch('delTimeLine', item)
          this.moveTo();
      },
      editItem(item){
        this.$store.dispatch('setLoadData', item.text);
        this.moveTo();
      },
      copyItem(item){
          var t = document.createElement("textarea");
          document.body.appendChild(t);
          t.value = item.text;
          t.select();
          document.execCommand('copy');
          document.body.removeChild(t);
      },
      moveTo () {
        let to = this.moveToDown
          ? 0 - 60
          : 0

        window.scroll({
          top: to,
          left: 0,
          behavior: 'smooth'
        })

        this.moveToDown = !this.moveToDown
      },
    },
  }
</script>