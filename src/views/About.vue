<template>
   <div class="about container-fluid">
     <navigation></navigation>
      <h2>This is an about page</h2>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "about",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {},
   components: {
     Navigation
   }
}
</script>
