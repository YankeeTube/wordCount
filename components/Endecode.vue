<template>
    <v-container fluid>
        <v-textarea
            background-color="#ffffff"
            color="cyan"
            label="변환할 데이터를 입력하세요!"
            v-model="plain"
            solo
            rows="10"
            no-resize
        ></v-textarea>

        <!-- <v-row class="mb-2" align="center" justify="center" no-gutters>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-card outlined tile width="50%" v-on="on">
                        <v-btn block tile color="indigo" dark @click="$emit('enc')">Encode</v-btn>
                    </v-card>
                </template>
                <span>인코딩</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-card outlined tile width="50%" v-on="on">
                        <v-btn block tile color="indigo" dark @click="$emit('dec')">Decode</v-btn>
                    </v-card>
                </template>
                <span>디코딩</span>
            </v-tooltip>
        </v-row> -->
        <v-row class="mb-6" align="center" justify="center" no-gutters>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-card outlined tile width="33%" v-on="on">
                        <v-btn block tile color="indigo" dark @click="$emit('cp', this.result)">DOWNLOAD</v-btn>
                    </v-card>
                </template>
                <span>다운로드</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-card outlined tile width="33%" v-on="on">
                        <v-btn block tile color="indigo" dark @click="$store.commit('encdec/setFlag')">REVERSE</v-btn>
                    </v-card>
                </template>
                <span>결과 반전</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-card outlined tile width="33%" v-on="on">
                        <v-btn block tile color="indigo" dark @click="$emit('cp', this.result)">COPY</v-btn>
                    </v-card>
                </template>
                <span>클립보드에 복사</span>
            </v-tooltip>
        </v-row>

        <v-textarea
            background-color="#ffffff"
            color="cyan"
            v-model="result"
            solo
            rows="10"
            disabled
            no-resize
        ></v-textarea>
    </v-container>
</template>

<script>
export default {
    data: () => ({
    }),
    computed: {
        plain: {
            get() {
                return this.$store.getters["encdec/plain"]
            },
            set(value) {
                this.$store.commit('encdec/setPlainText', value)
                this.$store.commit('encdec/setResultText', encodeURIComponent(value))
            }
        },
        result: {
            get() {
                return this.$store.getters["encdec/result"]
            },
        }
    }
}
</script>