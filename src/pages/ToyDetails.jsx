/* eslint-disable react-hooks/exhaustive-deps */
import { utilService } from "../services/util.service";
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service";

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId: toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                Navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details-page">
        <div className="toy-details-container">
            <div className="toy-image">
                <img src="toy.jpg" alt="Toy Image" />
            </div>
            <div className="toy-details">
                <h1 id="toy-name">{toy.name}</h1>
                <p className="toy-price"><strong>Price:</strong>{toy.price.toLocaleString()}<span id="toy-price"></span></p>
                <p className="toy-labels"><strong>Labels:</strong>{toy.labels}<span id="toy-labels"></span></p>
                <p className="toy-createdAt"><strong>Created At:</strong>{new Date(toy.createdAt).toLocaleDateString()}<span id="toy-createdAt"></span></p>
                <p className="toy-inStock"><strong>In Stock:</strong>{(toy.inStock) ? 'In stock' : 'Out of stock'}<span id="toy-inStock"></span></p>
                <div className="toy-description">
                    <h2>Description</h2>
                    <p id="toy-description">{utilService.makeLorem(50)}</p>
                </div>
            </div>
        </div>
        </section>
    )
}