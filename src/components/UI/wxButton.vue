<template>
  <div>
    <button
      @click="$emit('buttonClick')"
      class="brand-btn w-full flex items-center justify-center gap-1"
      :disabled="isDisabled"
      :class="[
        isLoading ? 'bg-primaryLight text-primary' : formMeta ? 'brand-primary' : 'bg-primaryLight text-primary'
      ]"
    >
    <i-icon v-if="isLoading" icon="line-md:loading-twotone-loop" class="text-xl" />
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    formMeta: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
