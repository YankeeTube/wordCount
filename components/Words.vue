<template>
    <v-container>
        <v-container>
            <v-card color="#fafafa">
                <div class="flex-column">
                    <v-row class="underLine mx-2" align="center">
                        <div class="ma-4 subtitle-1">
                            <v-icon color="#b0d7f2" class="mr-2">fas fa-box-open</v-icon>공백 포함    
                        </div>
                        <div class="d-flex align-center">
                            <span class="highlightText">{{ fullCount }}</span>&nbsp;자
                            <span class="slash mx-2">|</span>
                            <span class="colorFulText">{{ fullByteCount }}</span>&nbsp;BYTE
                        </div>
                    </v-row>
                    <v-row class="mx-2" align="center">
                        <div class="ma-4 subtitle-1">
                            <v-icon color="#b0d7f2" class="ml-1 mr-2">fas fa-box</v-icon>공백 제외
                        </div>
                        <div class="d-flex align-center">
                            <span class="highlightText">{{ emptyCount }}</span>&nbsp;자
                            <span class="slash mx-2">|</span>
                            <span class="colorFulText">{{ emptyByteCount }}</span>&nbsp;BYTE
                        </div>
                    </v-row>
                    <v-row class="mx-2" align="center">
                        <div class="ma-4 subtitle-1">
                            <v-icon color="#b0d7f2" class="ml-1 mr-2">far fa-file-word</v-icon>단어수
                        </div>
                        <div class="d-flex align-center">
                            <span class="highlightText">{{ voca }}</span>&nbsp;자
                        </div>
                    </v-row>
                </div>
            </v-card>
        </v-container>
        <v-container fluid>
            <v-textarea
            counter
            background-color="#ffffff"
            color="cyan"
            label="입력하세요!"
            class="userInput"
            autofocus
            auto-grow
            @keyup="wordCounting"
            hide-details
            outlined
            row-height="50"
            v-model="words"
            ></v-textarea>
            <v-row class="description mx-1" justify="space-between">
                <div class="align-center">
                    <p>글자 수를 세기 위해 검사할 내용을 위에 작성해보세요!</p>
                </div>
                <div class="d-flex flex-row-reverse">
                    <v-tooltip bottom v-for="button in buttons" :key="button.text">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="#5e849e"
                                class="ma-2 white--text"
                                @click="button.func"
                                v-on="on"
                            >
                                <v-icon>{{ button.icon }}</v-icon>
                            </v-btn>
                        </template>
                        <span>{{ button.text }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-switch v-model="switching" v-on="on"></v-switch>
                        </template>
                        <span>히스토리 숨기기</span>
                    </v-tooltip>
                </div>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ text }}
            <v-btn
                color="pink"
                text
                @click="snackbar = false"
            >닫기</v-btn>
        </v-snackbar>
        <v-snackbar v-model="warnsnack" :timeout="2000">{{ warn }}
            <v-btn
                color="pink"
                warn
                @click="warnsnack = false"
            >닫기</v-btn>
        </v-snackbar>
        
    </v-container>
</template>

<style scoped>
    .underLine{
        border-bottom: 1.5px solid #efefef;
    }
    .colorFulText{
        font-size: 1.4rem;
        color: #f1c40f;
    }
    .highlightText{
        font-size: 1.4rem;
        color: #e67e22;
    }
    .slash{
        font-size: 1.25rem;
        color: #5e849e;
    }
    @media (max-width: 768px){
        .description{
            flex-direction: column !important;
        }
    }
</style>

<script>
export default {
  props: ['listen'],
  data () {
      return {
          words: '',
          voca: 0,
          emptyCount: 0,
          emptyByteCount: 0,
          fullCount: 0,
          fullByteCount: 0,
          snackbar: false,
          warnsnack: false,
          text: "복사되었습니다. 'Ctrl + v'를 입력하여 붙여넣어 보세요!",
          warn: "1글자 이상 입력하세요!",
          buttons: [
              {
                  icon: 'far fa-copy',
                  func: this.clipBoard,
                  text: '복사',
              },
              {
                  icon: 'far fa-trash-alt',
                  func: this.removeText,
                  text: '지우기',
              },
              {
                  icon: 'fas fa-eraser',
                  func: this.timeLineReset,
                  text: '히스토리 초기화',
              },
          ],
      }
  },
  mounted: function() {
      this.wordCounting();
  },
  computed: {
      switching: {
          get: function() {
              return this.$store.getters.getSwitch
          },
          set: function(value) {
              this.$store.dispatch("setSwitch", value);
          }
      }
  },
  methods: {
    wordCounting: function() {
        this.$nextTick(function() {
            this.fullCount = this.words.length;
            this.emptyCount = this.words.replace(/\r|\n/g, '').replace(/ /gi,"").length;
            this.fullByteCount = (new TextEncoder().encode(this.words)).length;
            this.emptyByteCount = (new TextEncoder().encode(this.words.replace(/\r|\n/g, '').replace(/ /gi,""))).length;
            this.WordCount(this.words);
        })
    },
    WordCount(str) {
        if (str){
            this.voca = str.match(/\S+/g).length || [].length
        }
        
    },
    removeText: function() {
        this.$store.dispatch('setLoadData', '');
        this.moveTo();
        this.$nextTick(function() {
            this.words = "";
            this.voca = 0;
            this.fullCount = 0;
            this.emptyCount = 0;
            this.fullByteCount = 0;
            this.emptyByteCount = 0;
        })
    },
    clipBoard: function(){
        this.$nextTick(function() {
            if (this.words.length === 0){
                this.warnsnack = true
                return false
            }
            this.snackbar = true;
            var t = document.createElement("textarea");
            document.body.appendChild(t);
            t.value = this.words;
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);

            const time = (new Date()).toTimeString()
            this.$store.dispatch('setNonce')
            const chunk = {
                id: this.$store.state.nonce,
                text: this.words,
                voca: this.voca,
                fullCount: this.fullCount,
                emptyCount: this.emptyCount,
                fullByteCount: this.fullByteCount,
                emptyByteCount: this.emptyByteCount,
                time: this.formatDate(),
            }
            this.$store.dispatch('setTimeLine', chunk);
        })
    },
    formatDate() {
            var date = new Date();
            var m = date.getMonth()+1;
            var d = date.getDate();
            var h = date.getHours();
            var i = date.getMinutes();
            var s = date.getSeconds();
            return date.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
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
    timeLineReset(){
        localStorage.clear();
        this.$store.dispatch('clearTimeLine');
    }
  },
  watch: {
      listen (value){
            this.words = value;
            this.WordCount(value);
            this.fullCount = value.length;
            this.emptyCount = value.replace(/\r|\n/g, '').replace(/ /gi,"").length;
            this.fullByteCount = (new TextEncoder().encode(value)).length;
            this.emptyByteCount = (new TextEncoder().encode(value.replace(/\r|\n/g, '').replace(/ /gi,""))).length;
      },
  }
}
</script>