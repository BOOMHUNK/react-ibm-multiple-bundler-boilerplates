module.exports = function (source) {
  const regex = /@carbon\/icons-react/g
  return source.replace(regex, '@carbon/icons-react10')
}
