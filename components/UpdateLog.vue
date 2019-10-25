<template>
  <v-row justify="center" class="rt-btn">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on: { click } }">
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn dark icon v-on:click="click" v-on="on" class="mr-3">
                    <v-icon class="justify-center" color="#6f7070" large>mdi-update</v-icon>
                </v-btn>
            </template>
            <span>업데이트 로그</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar dark color="#6f7070">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Log</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">CLOSE</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Service Open</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>2019-10-19</v-list-item-title>
              <v-list-item-subtitle>GM Yankee의 2번째 오픈서비스 글자수 세기의 끝판 왕! 워드카운트가 오픈되었습니다.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>Update History</v-subheader>
          <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-content>
                <v-list-item-title class="my-2">{{ item.date }}</v-list-item-title>
                <v-list-item-subtitle class="my-1" v-for="(text, idx) in item.text" :key="idx">{{ text }}</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        items: [
            {
                date: '2019-10-19',
                text: ['- 워드 카운트 글자수 세기 서비스 오픈 시작',]
            },
            {
                date: '2019-10-21',
                text: [
                     '- [문구 변경] : 시크릿모드 및 토르 브라우저 경고문구 추가',
                     '- [문구 변경] : 타임라인 초기화 => 히스토리 초기화',
                     '- [기능 변경] : 업데이트 로그 버튼 추가되었습니다. 현재 보고 계시는 다이얼로그 창입니다.',
                     '- [기능 변경] : 타임라인 숨기기 토글(스위치) 버튼 추가되어 더 이상 키워드 검색시 히스토리에 영향을 받지 않도록 수정되었습니다.',
                     '- [버그 수정] : 1글자 미만 복사시 복사 및 히스토리 생성되는 현상 수정',
                ]
            },
            {
                date: '2019-10-22',
                text: [
                    '- [기능 변경] : 글자 수를 체크하는 대상의 공백/개행을 기준으로 모든 단어 수를 체크하는 기능이 추가됩니다.'
                ]
            },
            {
              date: '2019-10-25',
              text: [
                  '- [버그 수정] : 지우기 버튼이 아닌 수동으로 글자 제거시 단어 수가 사라지지 않는 현상 수정',
                  '- [문구 수정] : 단어수 => 단어 수',
                  '- [기능 개선] : 개행(줄바꿈)이 길어질 수록 칸이 자동으로 늘어나지만 최대 높이를 초과할 경우 입력 글자가 안보이는 현상',
                  '╚============ 고정된 사이즈로 변경되며, 스크롤이 추가됩니다.',
                  '- [자본 주의] : SPA의 단점으로 애드센스가 안 붙으니 일단 클릭몬 광고가 대체됩니다.',
              ]
            }
        ]
      }
    },
  }
</script>