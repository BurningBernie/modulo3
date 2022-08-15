function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 1
  if (max) {
    while (i <= max) {

      let aux
      if (i % 3 === 0 && i % 5 === 0) {
        aux = "Fizz Buzz"
      } else if (i % 3 === 0) {
        aux = "Fizz"
      } else if (i % 5 === 0) {
        aux = "Buzz"
      } else { aux = i }
      console.log(i)

      yield aux
      i++
    }
  } else {
    while (true) {

      let aux
      if (i % 3 === 0 && i % 5 === 0) {
        aux = "Fizz Buzz"
      } else if (i % 3 === 0) {
        aux = "Fizz"
      } else if (i % 5 === 0) {
        aux = "Buzz"
      } else { aux = i }
      console.log(i)

      yield aux
      i++
    }
  }

}

module.exports = fizzBuzzGenerator;
