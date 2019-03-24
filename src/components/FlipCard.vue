<template>
    <div tabindex="1" class="flip-card">
        <div class="fc-inner card d-flex justify-content-center align-items-center">
            <div class="fc-front text-center">
                <slot name="front">
                    <h1>{{card.question}}</h1>
                </slot>
            </div>
            <div class="fc-back text-center">
                <slot name="back">
                    <h1>{{card.answer}}</h1>
                    <div class="btn-group btn-group-md" role="group">
                        <button @click="status('wrong')" class="btn btn-outline-secondary">Wrong</button>
                        <button @click="status('correct')" class="btn btn-outline-secondary">Correct</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   name: "flip-card",
   props: ["card"],
   data() {
      return {}
   },
   computed: {},
   methods: {
       status(val) {
           this.$emit('status', val)
       }
   },
   components: {}
}
</script>

<style>
.flip-card {
    perspective: 1000px
}
.fc-inner {
    position: relative;
    transform-style: preserve-3d;
    transition: all .5s ease-in-out;
    height: 60vh;
}
.fc-front, .fc-back {
  position: absolute;
  backface-visibility: hidden;
}
.fc-front {
    z-index: 2;
}
.fc-back {
    z-index: 1;
    transform: rotateY(180deg);
    color: transparent;
}
.flip-card:focus {
    outline: none;
}
.flip-card:focus .fc-inner {
    transform: rotateY(180deg);
}
.flip-card:focus .fc-back {
    color: var(--primary)
}
</style>
