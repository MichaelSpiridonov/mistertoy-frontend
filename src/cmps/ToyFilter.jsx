/* eslint-disable react/prop-types */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
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
          <TextField
          id="outlined-basic"
          name="name"
          label="Name"
          type="name"
          labelid="name"
          value={filterByToEdit.name || ""}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          type="number"
          id="price"
          name="price"
          label="Price"
          labelid="name"
          value={filterByToEdit.price || ""}
          onChange={handleChange}
          variant="outlined"
        />

        <FormControl sx={{ m: 0.5, minWidth: 120 }} size="small">
      <InputLabel id="type">Stock</InputLabel>
      <Select
        labelId="inStock"
        id="inStock"
        name="inStock"
        value={filterByToEdit.inStock}
        label="Stock"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="true">In Stock</MenuItem>
        <MenuItem value="false">Out Of Stock</MenuItem>
      </Select>
    </FormControl>

      <FormControl sx={{ m: 0.5, minWidth: 120 }} size="small">
      <InputLabel id="type">Sort By</InputLabel>
      <Select
        labelId="type"
        id="type"
        name="type"
        value={filterByToEdit.sort.type}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="createdAt">Created At</MenuItem>
      </Select>
    </FormControl>
    <FormControlLabel name="desc" id="desc" onChange={handleChange} control={<Checkbox />} label="Descending" />
    <LabelSelector labels={labels} onLabelChange={onLabelChange} />
      </form>
    </section>
  )
}
