/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <article className="toy-card">
      <h2>{toy.name}</h2>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <h1>{toy.inStock ? "In Stock" : "Out Of Stock"}</h1>
      <div className="card-buttons">
        <Link className="edit-btn btn" to={`/toy/edit/${toy._id}`}>
          Edit
        </Link>{" "}
        <Link className="details-btn btn" to={`/toy/${toy._id}`}>
          Details
        </Link>{" "}
        <button onClick={() => onRemoveToy(toy._id)} className="remove-btn btn">
          Remove
        </button>
      </div>
    </article>
  )
}
