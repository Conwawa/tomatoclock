<template>
  <VApp>
    <VAppBar image="./assets/350.jpeg">
      <VContainer class="align-center">
        <VAppBarTitle style="color: white;">Pomodoro Technique</VAppBarTitle>
        <VBtn prepend-icon="mdi-home" color="white" to="/">Home</VBtn>
        <VBtn prepend-icon="mdi-format-list-bulleted" color="white" to="/list">List</VBtn>
        <VBtn prepend-icon="mdi-cog" color="white" to="/settings">Settings</VBtn>
      </VContainer>
      <template v-slot:image>
        <VImg gradient="to top right,rgba(205,92,92,.8),rgba(178,34,34,.8)"></VImg>
      </template>
    </VAppBar>
    <VMain>
      <!-- Component 是目前頁面該顯示的文件 -->
      <RouterView v-slot="{ Component }">
        <!-- <component> 動態元件 ， 顯示 is 綁定的元件  -->
        <!-- 被 <KeepAlive> 包住的元件不會被銷毀，用 include 指定只有 Home 不會被銷毀 -->
        <KeepAlive include="Home">
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </VMain>
  </VApp>
</template>

<script setup>
//
</script>
<style scoped>
.v-toolbar {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

/* 垂直置中 */
.align-center {
  display: flex;
  align-items: center;
}
</style>
