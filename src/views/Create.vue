<template>
   <div class="create container-fluid">
        <navigation></navigation>
        <h2>This is the create a deck page</h2>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "create",
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