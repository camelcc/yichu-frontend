const Common = {
  isiOS () {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
  }
}

export default Common
