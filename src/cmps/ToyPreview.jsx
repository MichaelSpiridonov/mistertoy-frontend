/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export function ToyPreview({ toy, onRemoveToy }) {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  return (
    <article className="toy-card">
      <img src={`https://robohash.org/${toy.name}?set=set2`} alt="Toy 2" />
      <h2>{toy.name}</h2>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <h1>{toy.inStock ? "In Stock" : "Out Of Stock"}</h1>
      <div className="card-buttons">
      {user && user.isAdmin && (
                <Link className="edit-btn btn" to={`/toy/edit/${toy._id}`}>
                Edit
              </Link>)}
        <Link className="details-btn btn" to={`/toy/${toy._id}`}>
          Details
        </Link>{" "}
        {user && user.isAdmin && (
                <button onClick={() => onRemoveToy(toy._id)} className="remove-btn btn">
                Remove
              </button>
              )}
      </div>
    </article>
  )
}
