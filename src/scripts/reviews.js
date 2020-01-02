import Vue from "vue";
import { swiper, swiperSlide } from 'vue-awesome-swiper'

new Vue({
  el: "#reviews-component",
  template: "#reviews",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      reviews: [],
      swiperOption: {
        navigation: {
          nextEl: '.reviews__btn_next',
          prevEl: '.reviews__btn_prev',
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50
      }
    }
  },
  methods: {
    
    arrWithRequiredImages(array) {
      return array.map(item => {
        const requredPic = require(`../images/content/${item["author-pic"]}`);
        item["author-pic"] = requredPic;

        return item;
      });
    }
  },
  created() {
    const reviews = require("../data/reviews.json");
    this.reviews = this.arrWithRequiredImages(reviews);
  }
});
