<template>
    <v-container>
        <v-textarea
            background-color="#ffffff"
            color="cyan"
            label="변환할 데이터를 입력하세요!"
            v-model="model"
            solo
            rows="10"
            no-resize
        ></v-textarea>
        {{ $nuxt.$route.name }}
    </v-container>
</template>

<script>
export default {
    data: () => ({
        model: null,
    })
}
</script>