<template>
  <g class="axis" v-bind:transform="transform"></g>
</template>

<script>
  import {
    select,
    scaleLinear, scaleTime, scalePow, scaleLog,
    axisTop, axisRight, axisBottom, axisLeft,
  } from 'd3';

  const scales = {
    linear: scaleLinear,
    time: scaleTime,
    pow: scalePow,
    log: scaleLog,
  };

  const axes = {
    top: axisTop,
    bottom: axisBottom,
    left: axisLeft,
    right: axisRight,
  };

  export default {
    name: 'd4-axis',

    props: {
      scaleType: { type: String, default: 'linear' },
      format: [String, Function],
      label: String,
      timeScale: String,
      timeInterval: String,
      tickSize: [Array, Number],
      tickDx: String,
      tickDy: String,
      tickAnchor: String,
      firstTickDx: String,
      firstTickDy: String,
      firstTickAnchor: String,
      lastTickDx: String,
      lastTickDy: String,
      lastTickAnchor: String,
      tickValues: Array,
      domain: Array,
      filter: Function,
      margin: { default() { return { top: 20, right: 20, bottom: 20, left: 20 }; } },
      orientation: { type: String, default: 'bottom' },
      reverse: { type: Boolean, default: false },
      extent: { type: Boolean, default: false },
      nice: { type: Boolean, default: true },
      ticks: [Number, Function],
      grid: { type: Boolean, default: false },
    },

    computed: {
      scale() {
        return scales[this.scaleType];
      },

      axis() {
        return axes[this.orientation];
      },

      range() {
        let range;
        if (this.orientation === 'top' || this.orientation === 'bottom') {
          range = [0, this.width];
        } else {
          range = [this.height, 0];
        }
        if (this.reverse) { range = range.reverse(); }

        return range;
      },

      transform() {
        switch (this.orientation) {
          case 'bottom':
            return `translate(${this.margin.left}, ${this.height + this.margin.top})`;
          case 'right':
            return `translate(${this.width + this.margin.left}, ${this.margin.top})`;
          default:
            return `translate(${this.margin.left}, ${this.margin.top})`;
        }
      },

      rootElement() {
        return select(this.$el);
      },

      height() { return this.parentHeight - this.margin.top - this.margin.bottom; },

      width() { return this.parentWidth - this.margin.left - this.margin.right; },
    },

    data() {
      return {
        parentHeight: 0,
        parentWidth: 0,
        elements: {},
      };
    },

    methods: {
      draw() {
        this.parentHeight = this.$el.parentElement.getBoundingClientRect().height;
        this.parentWidth = this.$el.parentElement.getBoundingClientRect().width;
        this.drawAxis();
        this.drawLabel();
        this.drawGrid();
      },

      drawAxis() {
        this.createElement('axis').call(this.createAxis());
        this.adjustTickLabels();
      },

      createAxis() {
        const scale = this.scale();
        scale.range(this.range).domain(this.domain);
        if (this.nice) { scale.nice(); }

        const axis = this.axis(scale);

        if (this.ticks) { axis.ticks(this.ticks); }

        if (this.tickValues) { axis.tickValues(this.tickValues); }

        if (this.format) { axis.tickFormat(this.format); }

        if (this.tickSize) {
          if (Array.isArray(this.tickSize)) {
            axis.tickSizeInner(this.tickSize[0]);
            axis.tickSizeOuter(this.tickSize[1]);
          } else {
            axis.tickSize(this.tickSize);
          }
        }

        return axis;
      },

      drawLabel() {
        if (!this.label) {
          this.removeElement('label');
          return;
        }

        const label = this.createElement('label', 'text');

        label.attr('style', 'text-anchor: middle;')
          .text(this.label);

        switch (this.orientation) {
          case 'top':
            label.attr('x', `${this.width / 2}`)
              .attr('dy', `${-this.margin.top}`)
              .attr('dominant-baseline', 'hanging');

            break;

          case 'left':
            label.attr('x', `${(this.height / 2) * -1}`)
              .attr('dy', `${-this.margin.left + 18}`)
              .attr('dominant-baseline', 'auto')
              .attr('transform', 'rotate(-90)');
            break;

          case 'right':
            label.attr('x', `${this.height / 2}`)
              .attr('dy', `${-this.margin.right + 18}`)
              .attr('dominant-baseline', 'auto')
              .attr('transform', 'rotate(90)');
            break;

          default:
            label.attr('x', `${this.width / 2}`)
              .attr('dy', `${this.margin.bottom}`)
              .attr('dominant-baseline', 'auto');
            break;
        }
      },

      drawGrid() {
        if (!this.grid) {
          this.removeElement('grid');
          return;
        }

        const size = (this.orientation === 'left' || this.orientation === 'right') ?
          -this.width : -this.height;

        const axis = this.createAxis().tickSizeInner(size).tickSizeOuter(0).tickFormat('');
        this.createElement('grid').call(axis);
      },

      adjustTickLabels() {
        const tickLabels = this.elements.axis.selectAll('.tick text');
        if (this.tickDy) {
          tickLabels.attr('dy', this.tickDy);
        }

        if (this.tickDx) {
          tickLabels.attr('dx', this.tickDx);
        }

        if (this.tickAnchor) {
          tickLabels.style('text-anchor', this.tickAnchor);
        }

        const lastTickLabels = select(tickLabels.nodes().slice(-1)[0]);
        if (this.lastTickDy) {
          lastTickLabels.attr('dy', this.lastTickDy);
        }

        if (this.lastTickDx) {
          lastTickLabels.attr('dx', this.lastTickDx);
        }

        if (this.lastTickAnchor) {
          lastTickLabels.style('text-anchor', this.lastTickAnchor);
        }

        const firstTickLabels = select(tickLabels.nodes()[0]);
        if (this.firstTickDy) {
          firstTickLabels.attr('dy', this.firstTickDy);
        }

        if (this.firstTickDx) {
          firstTickLabels.attr('dx', this.firstTickDx);
        }

        if (this.firstTickAnchor) {
          firstTickLabels.style('text-anchor', this.firstTickAnchor);
        }
      },

      createElement(name, type = 'g') {
        if (!this.elements[name]) {
          this.elements[name] = this.rootElement.append(type).attr('class', `axis-${name}`);
        }
        return this.elements[name];
      },

      removeElement(name) {
        if (!this.elements[name]) return;
        this.elements[name].remove();
        this.elements[name] = null;
      },
    },

    watch: {
      // Due to a limitation of d3-axis we must delete the entire axis when orientation is changed
      // See: https://github.com/d3/d3-axis/issues/39
      orientation() {
        this.removeElement('axis');
        this.removeElement('grid');
        this.removeElement('label');
      },
    },

    mounted() {
      this.draw();
      window.addEventListener('resize', this.draw);
      Object.keys(this.$props).forEach((p) => {
        this.$watch(p, () => this.$nextTick(this.draw));
      });
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.draw);
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
