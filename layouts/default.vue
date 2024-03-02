<template>
  <div class="default-layout">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const cursor = ref(null);
const point = ref(null);

onMounted(() => {
  const cursorVal = cursor.value;
  const pointVal = point.value;  // Corrected this line

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
  gsap.set(".point", { xPercent: -50, yPercent: -50 });

  let xToCircle = gsap.quickTo(cursorVal, "x", { duration: 0.6, ease: "power3" }),
      yToCircle = gsap.quickTo(cursorVal, "y", { duration: 0.6, ease: "power3" });

  let xToPoint = gsap.quickTo(pointVal, "x", { duration: 0.3, ease: "power3" }),
      yToPoint = gsap.quickTo(pointVal, "y", { duration: 0.3, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    xToPoint(e.clientX);
    yToPoint(e.clientY);

    xToCircle(e.clientX);
    yToCircle(e.clientY);
  });
});
</script>
<style lang="scss" scoped>
.cursor {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;

  width: 20px;
  height: 20px;
  background-color : $blue;
  border-radius: 6rem;
}
.point {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;

  background-color: $anthracite;
  width: 6px;
  height: 6px;
  border-radius: 6rem;
}
.default-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>