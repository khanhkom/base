import { StyleSheet, TextInput, View } from "react-native"
import React, { forwardRef, useImperativeHandle, useState, Ref, useRef } from "react"
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { ICommentData } from "@app/interface/question"
import { Text } from "@app/components/Text"
interface ItemProps {
  onSend: (comment: string) => void
  replyComment: ICommentData
  onReplyCancel: () => void
}
const ItemInputToolbar = forwardRef(
  ({ onSend, replyComment, onReplyCancel }: ItemProps, ref: Ref<TextInput>) => {
    const [comment, setComment] = useState("")
    const isCommented = comment.trim() !== ""
    const input = useRef<TextInput>()
    const isReply = replyComment?.userName
    useImperativeHandle(ref, () => input.current)
    return (
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
        renderComposer={() => {
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
                <TextInput
                  ref={input}
                  placeholder="Gửi tin nhắn"
                  value={comment}
                  onChangeText={setComment}
                  placeholderTextColor={colors.gray_6}
                  style={styles.textInput}
                />
              </View>
            </View>
          )
        }}
      />
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
    paddingVertical: HEIGHT(spacing.xs),
  },
  primaryStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopWidth: 0,
  },
})
