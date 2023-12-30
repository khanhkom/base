import React from "react"
import { Image, ImageProps } from "react-native"
import R from "@app/assets"

interface AvatarProps extends Omit<ImageProps, "source"> {
  // You can add additional props specific to Avatar component here
  avatarUrl: string
  source?: ImageProps["source"]
}

const AvatarDoctor: React.FC<AvatarProps> = (props) => {
  return (
    <Image
      {...props}
      source={props.avatarUrl !== "" ? { uri: props.avatarUrl } : R.images.avatar_docter_rec}
    />
  )
}

export default AvatarDoctor
