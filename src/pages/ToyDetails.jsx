/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

function getEmptyMsg() {
    return {
      txt: '',
    }
  }

export function ToyDetails() {
    const [msg, setMsg] = useState(getEmptyMsg())
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
      }
    
      async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
          ...prevToy,
          msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
      }
    
      async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
          ...prevToy,
          msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
      }

    const { txt } = msg
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details-page">
        <div className="toy-details-container">
            
            <div className="toy-image">
                <img src={`https://robohash.org/${toy.name}?set=set2`} alt="Toy Image" />
            </div>
            <div className="toy-details">
            <Link className="back-button" to="/toy">Back</Link>
                <h1 id="toy-name">{toy.name}</h1>
                <p className="toy-price"><strong>Price:</strong>${toy.price.toLocaleString()}<span id="toy-price"></span></p>
                <p className="toy-labels"><strong>Labels:</strong>{toy.labels}<span id="toy-labels"></span></p>
                <p className="toy-createdAt"><strong>Created At:</strong>{new Date(toy.createdAt).toLocaleDateString()}<span id="toy-createdAt"></span></p>
                <p className="toy-inStock"><strong>In Stock:</strong>{(toy.inStock) ? 'In stock' : 'Out of stock'}<span id="toy-inStock"></span></p>
                <div className="toy-description">
                    <h2>Description</h2>
                    <p id="toy-description">{utilService.makeLorem(50)}</p>
                </div>
            </div>
            <ul>
        {toy.msgs &&
          toy.msgs.map((msg) => (
            <li key={msg.id}>
              By: {msg.by.fullname} - {msg.txt}
              <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                X
              </button>
            </li>
          ))}
      </ul>
      <form className="message" onSubmit={onSaveMsg}>
        <input
          type="text"
          name="txt"
          value={txt}
          placeholder="Message"
          onChange={handleMsgChange}
          required
          autoFocus
        />
        <button>Send</button>
      </form>
        </div>
        </section>
    )
}