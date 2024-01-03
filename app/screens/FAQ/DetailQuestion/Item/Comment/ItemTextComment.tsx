import React from "react"
import { Text } from "@app/components/Text"
import { Part, PartType, parseValue, isMentionPartType } from "react-native-controlled-mentions"
import colors from "@app/assets/colors"
import { Alert } from "react-native"
import { IUserTag } from "@app/interface/question"

/**
 * Part renderer
 *
 * @param part
 * @param index
 */
const renderPart = (part: Part, index: number, tags: IUserTag[] = []) => {
  // Just plain text
  if (!part.partType) {
    return (
      <Text size="ba" weight="normal" style={{ color: colors.gray_7 }} key={index}>
        {part.text}
      </Text>
    )
  }
  // Mention type part
  if (isMentionPartType(part.partType)) {
    const tagedUser = tags.find((it) => it?.userId === part?.data?.id)
    // console.log("tagedUser::", tagedUser, tags, part?.data?.id)
    const roleName = tagedUser?.role === "doctor" ? "B.s" : "B.n"
    return (
      <Text
        key={`${index}-${part.data?.trigger}`}
        // style={part.partType.textStyle}
        size="ba"
        weight="normal"
        style={{ color: colors.primary }}
        onPress={() => console.log("Pressed", part.data)}
        // onPress={() => {
        //   Alert.alert(part.data.name)
        // }}
      >
        {roleName} {part?.text?.replace("@", "")}
      </Text>
    )
  }

  // Other styled part types
  return (
    <Text
      key={`${index}-pattern`}
      // style={part.partType.textStyle}

      size="ba"
      weight="normal"
      style={{ color: colors.gray_7 }}
    >
      {part.text}
    </Text>
  )
}

/**
 * Value renderer. Parsing value to parts array and then mapping the array using 'renderPart'
 *
 * @param value - value from MentionInput
 * @param partTypes - the part types array that you providing to MentionInput
 */
// export const renderValue = (value: string, partTypes: PartType[]) => {
export const renderTextComment = (value: string, tags: IUserTag[]) => {
  const { parts } = parseValue(value, [
    {
      trigger: "@",
    },
  ])

  return <Text>{parts.map((item, index) => renderPart(item, index, tags))}</Text>
}
