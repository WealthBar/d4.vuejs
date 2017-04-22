<template>
  <div class="content">
    <div class="example">
      <h2>Axis Example</h2>
      <svg class="svg-example">
        <d4-axis
          :label="label"
          :domain="domain"
          :orientation="orientation"
          :grid="grid"
          :margin="margin"
        ></d4-axis>
      </svg>
    </div>

    <div class="settings">
      <h3>Options</h3>
      <h4>Label</h4>
      <div class="label">
        <md-input-container>
          <label>Label</label>
          <md-input v-model="label"></md-input>
        </md-input-container>
      </div>
      <h4>Grid</h4>
      <div class="grid">
        <md-checkbox v-model="grid" name="grid">Grid</md-checkbox>
      </div>
      <h4>Orientation</h4>
      <div class="orientation">
        <md-radio v-model="orientation" id="orientation-top" name="orientation" md-value="top">Top</md-radio>
        <md-radio v-model="orientation" id="orientation-right" name="orientation" md-value="right">Right</md-radio>
        <md-radio v-model="orientation" id="orientation-bottom" name="orientation" md-value="bottom">Bottom</md-radio>
        <md-radio v-model="orientation" id="orientation-left" name="orientation" md-value="left">Left</md-radio>
      </div>
      <h4>Domain</h4>
      <div class="domain">
        <md-input-container>
          <label>Start</label>
          <md-input v-model="domainStart"></md-input>
        </md-input-container>

        <md-input-container>
          <label>End</label>
          <md-input v-model="domainEnd"></md-input>
        </md-input-container>
      </div>
      <h4>Margins</h4>
      <div class="margins">
        <md-input-container>
          <label>Top</label>
          <md-input type="number" v-model="marginTop"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Right</label>
          <md-input type="number" v-model="marginRight"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Left</label>
          <md-input type="number" v-model="marginLeft"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Bottom</label>
          <md-input type="number" v-model="marginBottom"></md-input>
        </md-input-container>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'axis-example',
    computed: {
      domain() {
        return [+this.domainStart, +this.domainEnd];
      },

      margin() {
        return {
          top: +this.marginTop,
          right: +this.marginRight,
          bottom: +this.marginBottom,
          left: +this.marginLeft,
        };
      },
    },

    data() {
      return {
        grid: false,
        domainStart: 0,
        domainEnd: 100,
        orientation: 'bottom',
        marginTop: 40,
        marginBottom: 40,
        marginRight: 60,
        marginLeft: 60,
        label: 'Label',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss">
  .content, .margins, .domain {
    display: flex;
    flex-direction: row;
  }

  .md-input-container {
    margin-right: 0.5rem;
  }

  .example {
    flex: 1 0 50%;
    padding-right: 1rem;
  }

  .settings {
    flex: 1 0 50%;
    padding-left: 1rem;
  }

  text {
    font-size: 12px;
    fill: black;
  }
  text.axis-label {
    font-size: 16px;
  }

  svg.svg-example {
    width: 100%;
    height: 480px;
  }
</style>
