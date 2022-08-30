<script setup></script>

<template>
  <div class="wrapper">
    <el-card>
      <div class="user-info">
        <div class="user-left">
          <span>Hello</span>
          <span>今天又是元气满满的一天</span>
        </div>
        <div class="user-right">
          <span>待办</span>
          <span>4/10</span>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="projects">
        <div class="project-card" v-for="i in 15" :key="i">
          <el-card>
            <div class="project-top">
              <span>Vue Element Admin</span>
            </div>
            <div class="project-main">
              <span
                >一个基于 Vue3.0、Vite、ElementPlus 的轻量级后台管理模板</span
              >
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  .user-info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .user-left {
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 800;
      }
      span:nth-child(2) {
        font-size: 10px;
        color: gray;
      }
    }
  }
  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .project-card {
      margin-bottom: 10px;
    }
  }
  .el-card:nth-child(1) {
    margin-bottom: 20px;
  } 
}
</style>
