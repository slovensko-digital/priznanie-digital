export default (_req, res) => {
  res.end(
    '<script>sessionStorage.clear();document.write("Session cleared")</script>',
  )
}
