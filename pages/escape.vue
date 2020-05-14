<template>
    <v-container fluid>
        <EncDec 
            @enc="encode"
            @dec="decode"
            @rev="reverse"
            @cp="copySomething"
            :before="before"
            :after="after"
        />
    </v-container>
</template>

<script>
import EncDec from '~/components/Endecode.vue'

export default {
    components: {
        EncDec
    },
    data: () => ({
        before: null,
        after: null,
    }),
    methods: {
        encode(){
            const plainText = encodeURIComponent(this.model)
            this.result = plainText
        },
        decode(){
            const encodeText = decodeURIComponent(this.model)
            this.result = encodeText
        },
        reverse(before, after){
            const _b = before
            const _a = after
            this.before = _a
            this.after = _b
        },
        async copySomething() {
            try {
                await this.$copyText(this.result);
            } catch (e) {
                console.error(e);
            }
        },
        download(){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    }
}
</script>