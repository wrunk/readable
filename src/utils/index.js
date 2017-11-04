
export const logKeyboardEvent = (event) => {
  console.log(event)
  console.log("altKey: " + event.altKey)
  console.log("charCode: " + event.charCode)
  console.log("ctrlKey: " + event.ctrlKey)
  console.log("getModifierState: " + event.getModifierState())
  console.log("getModifierState: " + event.getModifierState(event.key))
  console.log("key: " + event.key)
  console.log("keyCode: " + event.keyCode)
  console.log("locale: " + event.locale)
  console.log("location: " + event.location)
  console.log("metaKey: " + event.metaKey)
  console.log("repeat: " + event.repeat)
  console.log("shiftKey: " + event.shiftKey)
  console.log("which: " + event.which)
}

export const humanDate = (d) => {
  const hd = new Date(d)
  return hd.toISOString()
}

// Return string => String
export const upperFirst = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
