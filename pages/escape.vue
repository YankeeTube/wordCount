<template>
    <v-container fluid>
        <EncDec 
            @cp="copySomething"
            @download="download"
        />
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            left
            :color="color"
            bottom
            class="font-weight-bold"
        >
            {{ alerts }}
            <v-btn color="white" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import EncDec from '~/components/Endecode.vue'

export default {
    components: {
        EncDec
    },
    data: () => ({
        color: null,
        alerts: null,
        snackbar: null,
        timeout: 5000,
    }),
    methods: {
        async copySomething() {
            try {
                await this.$copyText(this.$store.getters['encdec/result']);
                this.alerts = "복사되었습니다."
                this.color = "success"
                this.snackbar = true
            } catch (e) {
                console.error(e);
                this.alerts = e
                this.color = "error"
                this.snackbar = true
            }
        },
        download(){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.$store.getters['encdec/result']));
            element.setAttribute('download', 'smartTools.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
}
</script>