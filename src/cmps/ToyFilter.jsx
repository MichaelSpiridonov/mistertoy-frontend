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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
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
          <option value="All">All</option>
          <option value=" ">In Stock</option>
          <option value="">Out Of Stock</option>
        </select>

        <label htmlFor="sort">Sort By:</label>
        <select
          value={filterByToEdit.sort}
          name="sort"
          onChange={handleChange}
          id="sort"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>
        <LabelSelector labels={labels} onLabelChange={onLabelChange} />
      </form>
    </section>
  )
}
