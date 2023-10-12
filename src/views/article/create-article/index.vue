<script setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('# Hello Editor')
</script>

<template>
  <el-card> <MdEditor v-model="text" /> </el-card>
</template>

<style></style>
