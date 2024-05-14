<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h6 class="text-[13px] font-regular text-gray-600">{{ title }}</h6>
    <h3 class="font-semibold text-xl">{{ value }}</h3>
    <span class="flex flex-col items-end justify-end w-full">
      <span class="flex text-sm items-center" :class="[percentage_type === 'incr' ? 'text-[#22c55e]' : 'text-[#ef4444]']">
        <h6>{{ `${percentage_type === 'incr' ? '+' : '-'}${percentage}%` }}</h6>
        <i-icon :icon="percentage_type === 'incr' ? 'humbleicons:arrow-up' : 'humbleicons:arrow-down'" />
      </span>
      <span v-if="hasFilter" class="text-xs text-gray-500"> {{ 'Since last' }} </span>
    </span>
    <span v-if="hasView" class="flex justify-between mt-3 items-center">
      <router-link class="text-[10px] underline" to="/app/dashboard"> {{ linkText }} </router-link>
      <span class=" block w-fit p-1 rounded-[2px] text-xl" :class="iconStyling">
        <i-icon :icon="linkIcon" />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title','value', 'percentage', 'percentage_type', 'filter', 'hasFilter', 'hasView', 'linkText', 'linkIcon', 'iconStyling']
}
</script>

<style></style>
