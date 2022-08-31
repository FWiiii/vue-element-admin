<template>
  <el-card> <md-editor v-model="text" /> </el-card>
</template>
<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const text = ref("# Hello Editor");
</script>
<style></style>
