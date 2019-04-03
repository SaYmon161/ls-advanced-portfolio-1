import Vue from "vue";

const btns = {
  template: "#slider-btns",
  methods: {
    slide(direction) {
      switch (direction) {
        case "next":
          break;
        case "prev":
          break;
      }
    }
  }
};

const thumbs = {
  template: "#slider-thumbs",
  props: {
    works: Array,
    currentWork: Object
  },
  methods: {
    handleClick(id) { 
      this.$emit('change', id)
    }
  },
};

const tags = {
  template: "#slider-tags",
  props: {
    tags: Array
  }
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: {
    currentWork: Object
  },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(',')
    }
  }
};

const display = {
  components: { btns, thumbs },
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number,
    works: Array
  },
  template: "#slider-display"
};

new Vue({
  el: "#works-slider-component",
  data() {
    return {
      works: [],
      currentIndex: 0,
      works: []
    };
  },
  components: {
    display,
    info
  },
  computed: {
    currentWork() {
      return this.works[0];
    }
  },
  methods: {
    makeArrWithRequiredImages(dataArray) {
      return dataArray.map((item, i) => {
        const requredPic = require(`../images/content/${item.photo}`);
        item.photo = requredPic;

        return item;
      });
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          const lastSlide = this.works[this.works.length - 1];
          this.works.unshift(lastSlide);
          this.works.pop();
          break;
        case "prev":
          this.works.push(this.works[0]);
          this.works.shift();
          break;
      }
    },
    handleChange(id) {
      let index;
      this.works.forEach((item, ndx) => {
        if (ndx !==0 && item.id === id) {
          index = ndx;
        }
      })
      const arr = this.works.splice(0, index);
      this.works = [...this.works, ...arr];
    }
  },
  created() {
    const data = require("../data/works.json");
    const works = this.makeArrWithRequiredImages(data);

    this.works = works.reverse();
  },
  template: "#slider-container"
});
