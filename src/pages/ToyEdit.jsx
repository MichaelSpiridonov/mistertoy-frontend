/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log("Had issues in toy edit", err)
        navigate("/toy")
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === "number" ? +value : value
    value = type === "select-one" ? JSON.parse(value) : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    if (!toyToEdit.price) toyToEdit.price = 1000
    saveToy(toyToEdit)
      .then(() => {
        navigate("/toy")
        showSuccessMsg("Toy Saved!")
      })
      .catch((err) => {
        console.log("Had issues in toy details", err)
        showErrorMsg("Had issues in toy details")
      })
  }

  return (
    <section className="toy-edit-section">
      <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>

      <form className="toy-edit-form" onSubmit={onSaveToy}>
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name..."
            value={toyToEdit.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price : </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter price"
            value={toyToEdit.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group"></div>
        <div className="form-group">
          <label htmlFor="toy-inStock">In Stock:</label>
          <select
            value={toyToEdit.inStock}
            id="inStock"
            name="inStock"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="form-buttons">
          <button className="save">{toyToEdit._id ? "Save" : "Add"}</button>
          <Link className="cancel" to="/toy">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  )
}
