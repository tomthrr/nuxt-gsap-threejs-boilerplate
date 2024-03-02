<template>
  <div class="hero-banner-container">
    <h1 ref="first">Welcome to Prune</h1>
    <p ref="second">Nuxt, GSAP, ThreeJS boilerPlate ✨</p>
  </div>
</template>
<script setup lang="ts">
const first = ref(null);
const second = ref(null);

onMounted(() => {

  const textFondu = () => {
    const tl = gsap.timeline()

    tl.from(first.value, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    }).from(second.value, {
      y: 100,
      opacity: 0,
      duration: 0.5,
    })
  }

  textFondu();
})
</script>
<style lang="scss" scoped>
.hero-banner-container {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
}
</style>
