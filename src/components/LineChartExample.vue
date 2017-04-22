<template>
  <div class="content">
    <h2>Line Chart Examples</h2>
    <svg>
      <d3-axis name="x" :data="[1,10]"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'line-chart-example',
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
