let topics = ['pandas', 'bamboo', 'Game of Thrones', 'Destiny']
const { fetch } = window
const API = 'XtTfhYE2XkyTUqFa8N5AkjUCmC2OSKtz'

document.querySelector('.topics').addEventListener('click', e => {
  topics.forEach(topic => {
    let divElem = document.createElement(`button`)
    divElem.innerHTML = `${topic}`
    divElem.setAttribute('id', `${topic}`)
    document.querySelector('.btn').append(divElem)
  })
})

document.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.className === 'gifimg') {
    if (e.target.dataset.switch === 'false') {
      e.target.src = e.target.dataset.playing
      e.target.switch = true
    } else if (e.target.dataset.switch === 'true') {
      e.target.src = e.target.dataset.paused
      e.target.switch = false
    }
  } else if (!e.target.id) {
    null
  } else {
    document.querySelector('.gifs').innerHTML = ''
    fetch(`https://api.giphy.com/v1/gifs/search?q=${e.target.id}&api_key=${API}&limit=10&rating=g`)
      .then(r => r.json())
      .then(({ data }) => {
        console.log(data)
        data.forEach(gif => {
          console.log(gif.images.fixed_width_small.url)
          let gifImage = document.createElement('span')
          let paused = gif.images.fixed_width_still.url
          let playing = gif.images.fixed_width.url
          let rating = gif.rating
          let alt = gif.slug

          gifImage.innerHTML = `
          <img src='${paused}' alt='${alt}' class='gifimg' data-paused='${paused}' data-playing='${playing}' data-rating='${rating}' data-switch= false >
          <p>Rating: ${rating}</p>
          `
          document.querySelector('.gifs').append(gifImage)
        })
      })
      .catch(e => console.log(e))
  }
})
