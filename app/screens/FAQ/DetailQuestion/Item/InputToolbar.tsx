import {
  KeyboardAvoidingView,
  Platform,
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
  onSend: (comment: string) => void
  replyComment: ICommentData
  onReplyCancel: () => void
  listUser: IUserTag[]
}
const ItemInputToolbar = forwardRef(
  ({ onSend, replyComment, onReplyCancel, listUser }: ItemProps, ref: Ref<TextInput>) => {
    const [comment, setComment] = useState("")
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
    console.log("comment_comment", comment)
    return (
      <>
        {/* <ModalTagUser /> */}
        <InputToolbar
          primaryStyle={styles.primaryStyle}
          renderSend={() => {
            return (
              <Icon
                icon="send"
                size={WIDTH(28)}
                onPress={() => {
                  onSend(comment)
                  setComment("")
                }}
                disabled={!isCommented}
                style={{ marginTop: isReply ? HEIGHT(spacing.lg) : 0 }}
                color={isCommented ? colors.primary_8 : colors.gray_4}
              />
            )
          }}
          renderComposer={(props) => {
            console.log("props.composerHeight", props.composerHeight)
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
                    style={props.textInputStyle}
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
        {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
      </>
    )
  },
)
ItemInputToolbar.displayName = "ItemInputToolbar"

export default ItemInputToolbar
const styles = StyleSheet.create({
  wrapperIcon: {
    width: WIDTH(303),
    backgroundColor: colors.gray_2,
    borderRadius: 100,
  },
  textInput: {
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(0),
    height: HEIGHT(48),
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
})
