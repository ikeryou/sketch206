import { Item } from './parts/item'
import './style.css'

document.querySelectorAll('.l-main-item').forEach((val,i) => {
  new Item({
    el:val as HTMLElement,
    id:i,
  })
})