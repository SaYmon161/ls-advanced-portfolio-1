const smoothScroll = function(reqmove, duration) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
  window.requestAnimationFrame = requestAnimationFrame

  const scrollHeight = window.scrollY
  // если двигаемся вверх, то отрицательная высота
  const diffY =
    scrollHeight < reqmove
      ? reqmove - scrollHeight
      : -1 * (scrollHeight - reqmove)

  const animate = (draw, duration) => {
    const start = performance.now()
    requestAnimationFrame(function move(time) {
      let timePassed = time - start
      if (timePassed > duration) timePassed = duration
      draw(timePassed)
      if (timePassed < duration) requestAnimationFrame(move)
    })
  }

  animate(timePassed => {
    window.scroll(0, scrollHeight + diffY * Math.min(timePassed / duration, 1))
  }, duration)
}

