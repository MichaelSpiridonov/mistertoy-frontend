/* eslint-disable react/prop-types */

import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"

import { LabelSelector } from "./LabelSelector.jsx";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
    'Outdoor', 'Battery Powered'] 
    
  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === "number" ? +value : value
    if (filterByToEdit.sort[field] || filterByToEdit.sort[field] === '') {
      setFilterByToEdit(prevFilter => ({ ...prevFilter, sort: {...prevFilter.sort, [field]: field === 'desc' ? -prevFilter.sort.desc : value} }))
      }else {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
      }
  }

  function onLabelChange(selectedLabels) {

    setFilterByToEdit(prevFilter => ({
      ...prevFilter,
      labels: selectedLabels,
    }))
  }

  return (
    <section className="toy-filter">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="By name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="By price"
          value={filterByToEdit.price || ""}
          onChange={handleChange}
        />

        <label htmlFor="inStock">In Stock:</label>
        <select
          value={filterByToEdit.inStock}
          name="inStock"
          onChange={handleChange}
          id="inStock"
        >
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out Of Stock</option>
        </select>

        <label htmlFor="sort">Sort By:</label>
        <select
          value={filterByToEdit.sort.type}
          name="type"
          onChange={handleChange}
          id="type"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>

        <label htmlFor="desc">Descending</label>
        <input
          type="checkbox"
          name="desc"
          checked={filterByToEdit.sort.desc < 0}
          onChange={handleChange}
          id="desc"
        />
        <LabelSelector labels={labels} onLabelChange={onLabelChange} />
      </form>
    </section>
  )
}
