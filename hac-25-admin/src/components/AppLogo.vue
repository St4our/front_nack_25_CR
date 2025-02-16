<template>
  <div class="wrap-logo">
    <img src="../assets/logo.svg" alt="" />
    <div class="logo-text">
      <span class="title-logo">КНИГА ПАМЯТИ</span>
      <span class="subtitle-logo">Оренбургской области</span>
    </div>
  </div>
</template>
<style scoped>
.wrap-logo {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-logo {
  color: #005eff;
  font-weight: 800;
  font-size: 16.5px;
  line-height: 22.54px;
  letter-spacing: 0em;
}

.subtitle-logo {
  font-size: 12px;
  line-height: 16.39px;
}
</style>
