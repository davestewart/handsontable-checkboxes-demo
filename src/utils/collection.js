import { assign } from './object'

export function forEach (arr, callback) {
  arr.forEach(item => callback(item))
  return arr
}

export function map (arr, callback) {
  arr.forEach((item, index) => {
    arr[index] = callback(item)
  })
  return arr
}

export function last (arr) {
  return arr[arr.length - 1]
}

export function has (arr, id, key = 'id') {
  return !!get(arr, id, key)
}

export function get (arr, id, key = 'id') {
  if (id !== void 0) {
    return arr.find(item => item[key] === id)
  }
}

export function getIndex (arr, id, key = 'id') {
  if (id !== void 0) {
    return arr.findIndex(item => item[key] === id)
  }
}

export function add (arr, item, index = -1, key = 'id') {
  const trg = get(arr, item.id, key)
  if (trg) {
    return update(arr, item.id, item, key)
  }
  index > -1 && index < arr.length
    ? arr.splice(index, 0, item)
    : arr.push(item)
  return item
}

export function update (arr, id, values, key = 'id') {
  const item = get(arr, id, key)
  if (item) {
    assign(item, values)
    return item
  }
}

export function move (fromArr, id, toIndex, toArr = fromArr, key = 'id') {
  const fromIndex = getIndex(fromArr, id, key)
  return moveByIndex(fromArr, fromIndex, toIndex, toArr)
}

export function moveByIndex (fromArr, fromIndex, toIndex, toArr = fromArr) {
  if (fromIndex > -1 && toIndex > -1) {
    toArr.splice(toIndex, 0, ...fromArr.splice(fromIndex, 1))
    return toArr[toIndex]
  }
}

export function remove (arr, id, key = 'id') {
  const index = getIndex(arr, id, key)
  if (index > -1) {
    return arr.splice(index, 1).shift()
  }
}
