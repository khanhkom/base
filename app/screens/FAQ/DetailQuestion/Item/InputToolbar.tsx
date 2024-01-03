import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { forwardRef, useImperativeHandle, useState, Ref, useRef, useEffect } from "react"
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { ICommentData, IUserTag } from "@app/interface/question"
import { Text } from "@app/components/Text"
import { MentionInput, MentionSuggestionsProps, parseValue } from "react-native-controlled-mentions"

import ModalTagUser from "./ModalTagUser"
import AvatarDefault from "@app/components/avatar-default"
import { ActivityIndicator, IconButton } from "react-native-paper"
import ModalImagePicker from "@app/components/image-picker"
import { Asset } from "react-native-image-picker"

//
// 3. Implement your `renderSuggestions` component
// https://github.com/dabakovich/react-native-controlled-mentions#usage
const renderSuggestions = ({
  suggest,
  suggestions,
}: {
  suggest: MentionSuggestionsProps
  suggestions: { id: string; name: string }[]
}) => {
  // 4.2. Throttling keyword changes to fix flickering
  // https://github.com/dabakovich/react-native-controlled-mentions/issues/55
  const { keyword, onSuggestionPress } = suggest
  const [calmKeyword, setCalmKeyword] = useState(keyword)
  useEffect(() => {
    const timeout = setTimeout(() => setCalmKeyword(keyword), 10)
    return () => clearTimeout(timeout)
  }, [keyword])

  if (calmKeyword == null) {
    return null
  }
  return (
    <View style={styles.suggestView}>
      {suggestions
        .filter((one) =>
          one?.name?.toLocaleLowerCase?.().includes(calmKeyword?.toLocaleLowerCase?.()),
        )
        .map((one) => (
          // 4.3. Wrap elements inside a `TouchableOpacity` from `react-native-gesture-handler` to fix tapping on Android items in absolute containers
          // https://github.com/facebook/react-native/issues/27232#issuecomment-819347427
          <TouchableOpacity
            key={one.id}
            onPress={() => onSuggestionPress(one)}
            style={styles.itemSuggest}
          >
            <AvatarDefault name={one?.name} size="medium" />
            <Text
              size="ba"
              weight="normal"
              style={{ color: colors.gray_9, marginLeft: WIDTH(spacing.sm) }}
            >
              {one.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  )
}
//
interface ItemProps {
  onSend: (comment: string, listImage: Asset[]) => void
  replyComment: ICommentData
  onReplyCancel: () => void
  listUser: IUserTag[]
  loading: boolean
}
const ItemInputToolbar = forwardRef(
  ({ onSend, replyComment, onReplyCancel, listUser, loading }: ItemProps, ref: Ref<TextInput>) => {
    const [comment, setComment] = useState("")
    const [listImage, setListImage] = useState([])

    const isCommented = comment.trim() !== ""
    const input = useRef<TextInput>()
    const isReply = !!replyComment?._id
    useImperativeHandle(ref, () => input.current)
    const suggestion = listUser.map((user) => {
      return {
        ...user,
        id: user?.userId,
        name: user?.userName,
      }
    })

    const refSelect = useRef(null)

    const onPickFile = () => {
      refSelect.current.show()
    }
    const onDeleteImage = (index) => {
      const newArray = [...listImage] // Create a copy of the current array
      newArray.splice(index, 1) // Remove the item at index i
      setListImage(newArray) // Update the state with the new array
    }
    console.log("comment_comment", listImage)
    const hasImage = listImage.length > 0
    return (
      <>
        {/* <ModalTagUser /> */}
        <InputToolbar
          primaryStyle={styles.primaryStyle}
          // containerStyle={{position:'absolute', bottom:500}}
          renderSend={() => {
            if (loading) {
              return (
                <ActivityIndicator
                  size="small"
                  style={{
                    width: WIDTH(28),
                  }}
                />
              )
            }
            return (
              <Icon
                icon="send"
                size={WIDTH(28)}
                onPress={() => {
                  onSend(comment, listImage)
                  setComment("")
                  setListImage([])
                }}
                disabled={!isCommented}
                style={{ marginTop: isReply ? HEIGHT(spacing.lg) : 0 }}
                color={isCommented ? colors.primary_8 : colors.gray_4}
              />
            )
          }}
          renderActions={() => {
            return (
              <Icon
                icon={"take_photo"}
                onPress={onPickFile}
                size={WIDTH(24)}
                style={{ marginRight: WIDTH(spacing.sm) }}
              />
            )
          }}
          renderComposer={(props) => {
            return (
              <View>
                {isReply && (
                  <Text
                    style={{ marginBottom: HEIGHT(spacing.xs), color: colors.gray_7 }}
                    size="sm"
                    weight="normal"
                  >
                    Đang trả lời{" "}
                    <Text style={{ color: colors.gray_9 }} size="sm" weight="bold">
                      {replyComment?.userName}
                    </Text>
                    <Text
                      onPress={onReplyCancel}
                      style={{ color: colors.gray_7 }}
                      size="sm"
                      weight="medium"
                    >
                      {" "}
                      Hủy
                    </Text>
                  </Text>
                )}
                <View style={styles.wrapperIcon}>
                  <MentionInput
                    // 1.1. Copying all the properties from original `Composer`
                    // https://github.com/FaridSafi/react-native-gifted-chat/blob/master/src/Composer.tsx#L106
                    inputRef={input}
                    accessible
                    accessibilityLabel={props.placeholder}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    editable={!props.disableComposer}
                    onLayout={(e) => {
                      if (props.onInputSizeChanged) {
                        props.onInputSizeChanged({
                          width: e.nativeEvent.layout.width,
                          // 1.3. Add magical +17  to height to fix content staying at a single line
                          height: e.nativeEvent.layout.height + 17,
                        })
                      }
                    }}
                    onChange={setComment}
                    containerStyle={{
                      height: props.composerHeight,
                      ...styles.textInput,
                    }}
                    style={[
                      props.textInputStyle,
                      styles.textInput1,
                      Platform.OS === "ios" && {
                        paddingTop: HEIGHT(spacing.md),
                        paddingBottom: HEIGHT(spacing.md),
                      },
                    ]}
                    autoFocus={props.textInputAutoFocus}
                    value={comment}
                    enablesReturnKeyAutomatically
                    underlineColorAndroid={"transparent"}
                    keyboardAppearance={props.keyboardAppearance}
                    // 2. Add your desired part types
                    partTypes={[
                      {
                        trigger: "@",
                        // 4.1. Avoid direct usage of a functional component with hooks
                        // https://github.com/dabakovich/react-native-controlled-mentions/issues/44#issuecomment-808016858
                        renderSuggestions: (p) =>
                          renderSuggestions({
                            suggest: p,
                            suggestions: suggestion,
                          }),
                        textStyle: { fontWeight: "bold" },
                        isInsertSpaceAfterMention: true,
                        // getPlainString: (val) => {
                        //   console.log("getPlainString::", val)
                        // },
                      },
                    ]}
                  />
                </View>
              </View>
            )
          }}
          renderAccessory={() => {
            if (listImage?.length === 0) return null
            return (
              <View style={styles.wrapperImage}>
                <Image source={{ uri: listImage[0].uri }} style={styles.image} />
                <Pressable
                  style={styles.icClose}
                  onPress={() => {
                    onDeleteImage(0)
                  }}
                >
                  <Icon icon="close_circle" size={WIDTH(24)} />
                </Pressable>
              </View>
            )
          }}
          accessoryStyle={{ height: !hasImage ? 0 : WIDTH(120) }}
          // renderComposer={() => {
          //   return (
          //     <View>
          // {isReply && (
          //   <Text
          //     style={{ marginBottom: HEIGHT(spacing.xs), color: colors.gray_7 }}
          //     size="sm"
          //     weight="normal"
          //   >
          //     Đang trả lời{" "}
          //     <Text style={{ color: colors.gray_9 }} size="sm" weight="bold">
          //       {replyComment?.userName}
          //     </Text>
          //     <Text
          //       onPress={onReplyCancel}
          //       style={{ color: colors.gray_7 }}
          //       size="sm"
          //       weight="medium"
          //     >
          //       {" "}
          //       Hủy
          //     </Text>
          //   </Text>
          // )}

          //       <View style={styles.wrapperIcon}>
          //         <TextInput
          //           ref={input}
          //           placeholder="Gửi tin nhắn"
          //           value={comment}
          //           onChangeText={setComment}
          //           placeholderTextColor={colors.gray_6}
          //           style={styles.textInput}
          //         />
          //       </View>
          //     </View>
          //   )
          // }}
        />
        <ModalImagePicker
          ref={refSelect}
          turnOffModal={() => {}}
          onResult={(assets) => {
            // setImage(asset);
            // const newList = [...listImage, ...assets]
            const newList = [...assets]
            setListImage(newList)
          }}
        />
      </>
    )
  },
)
ItemInputToolbar.displayName = "ItemInputToolbar"

export default ItemInputToolbar
const styles = StyleSheet.create({
  wrapperIcon: {
    width: WIDTH(280),
    backgroundColor: colors.gray_2,
    borderRadius: 100,
  },
  textInput: {},
  textInput1: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  primaryStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopWidth: 0,
  },
  suggestView: {
    position: "absolute",
    width: "100%",
    bottom: "100%",
    marginBottom: 10,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  itemSuggest: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
  },
  wrapperImage: {
    height: WIDTH(100),
    width: WIDTH(120),
    marginHorizontal: WIDTH(spacing.sm),
  },
  image: {
    height: WIDTH(100),
    width: WIDTH(100),
    marginHorizontal: WIDTH(spacing.sm),
    borderRadius: WIDTH(12),
  },
  icClose: {
    position: "absolute",
    right: WIDTH(12),
    top: HEIGHT(6),
  },
})
