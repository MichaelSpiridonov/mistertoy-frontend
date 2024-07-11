/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import * as React from "react"
import { useTheme } from "@mui/material/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

export function LabelSelector({ labels, onLabelChange }) {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  }

  function getStyles(name, label, theme) {
    return {
      fontWeight:
        label.indexOf(label) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  const [selectedLabels, setSelectedLabels] = useState([])
  const theme = useTheme()

  useEffect(() => {
    onLabelChange(selectedLabels)
  }, [selectedLabels])

  function handleLabelChange(event) {
    console.log(event.target.value)
    const value = event.target.value
    setSelectedLabels(typeof value === 'string' ? value.split(',') : value,)
  }

  return (
      <FormControl sx={{ m: 0.5, width: 200 }} size="small">
        <InputLabel id="label">Label</InputLabel>
        <Select
          labelId="label"
          id="label"
          multiple
          value={selectedLabels}
          onChange={handleLabelChange}
          input={<OutlinedInput label="labelin" />}
          MenuProps={MenuProps}
        >
          {labels.map((label) => (
            <MenuItem
              key={label}
              value={label}
              style={getStyles(label, selectedLabels, theme)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}
