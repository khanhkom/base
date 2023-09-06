import React, { memo } from "react"
import { Text, TextStyle } from "react-native"
const hightlightResult = (str: string) => {
  if (!str) return []
  const arr = str.split(/<e|m>/)
  // Remove any HTML tags from the array items using regex
  const cleanedArr = arr.map((item) => item.replace(/(<([^>]+)>)/gi, ""))
  // Loop over the cleaned array and create objects with isHighlighted property
  const objArr = cleanedArr.map((item) => {
    if (item.includes("</e")) {
      return {
        value: item.replace("</e", ""),
        isHighlighted: true,
      }
    } else {
      return { value: item, isHighlighted: false }
    }
  })
  return objArr
}
const Highlight = ({ hit }) => {
  const stringName = hit?._highlightResult?.dc_kn?.value
  const highlights = hightlightResult(stringName)
  return (
    <Text>
      {highlights.map(({ value, isHighlighted }, index) => {
        const style: TextStyle = {
          fontWeight: !isHighlighted ? "800" : "500",
        }

        return (
          <Text key={index} style={style}>
            {value}
          </Text>
        )
      })}
    </Text>
  )
}

export default memo(Highlight)
