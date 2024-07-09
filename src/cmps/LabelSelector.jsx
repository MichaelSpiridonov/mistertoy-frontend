/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export function LabelSelector({ labels, onLabelChange }) {
  const [selectedLabels, setSelectedLabels] = useState([])

  useEffect(() => {
    onLabelChange(selectedLabels)
  }, [selectedLabels])

  function handleLabelChange(event) {
    const label = event.target.value
    if (event.target.checked) {
      setSelectedLabels(prevLabels => [...prevLabels, label])
    } else {
      setSelectedLabels(prevLabels => prevLabels.filter(l => l !== label))
    }
  }

  return (
    <div className="label-selector">
      {labels.map(label => (
        <div key={label}>
          <input
            type="checkbox"
            value={label}
            checked={selectedLabels.includes(label)}
            onChange={handleLabelChange}
            id={`checkbox-${label}`}
          />
          <label htmlFor={`checkbox-${label}`}>{label}</label>
        </div>
      ))}
    </div>
  )
}
