import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider, List, Searchbar } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import { iconRegistry } from "@app/components/Icon"
import { da } from "date-fns/locale"

type Props = {
  onPress?: () => void
  data?: IITem[]
  selectItem?: (item, index) => void
  onApply?: () => void
}
type IITem = {
  title?: string
  data: string[]
  isIndex?: number
}

const ModalFilter = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(props.data)
  const [isSelect, setIsSelect] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const hide = () => {
    setVisible(false)
    return data
  }
  const onSelectItem = (index, indx) => {
    setIsSelect(!isSelect)
    data[index].isIndex = indx
  }
  const onReset = () => {
    setIsSelect(!isSelect)
    for (let i = 0; i < data.length; i++) {
      data[i].isIndex = 0
    }
  }
  const onHandlApply = () => {
    hide()
    props.onApply()
  }
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      hide()
    },
    returnData() {
      return data
    },
  }))
  return (
    <Modal
      isVisible={visible}
      avoidKeyboard
      backdropOpacity={0.5}
      onBackButtonPress={() => {
        hide()
      }}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      style={{
        alignItems: "flex-end",
        margin: 0,
      }}
      coverScreen={false}
      onBackdropPress={() => {
        setVisible(false)
      }}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            Bộ lọc
          </Text>
        </View>
        {props.data.map((item, index) => {
          return (
            <View key={index}>
              <View style={styles.session}>
                <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                  {item.title}:
                </Text>
                {item.data.map((itemm, indx) => {
                  return (
                    <Toggle
                      onPress={() => onSelectItem(index, indx)}
                      key={indx}
                      variant="radio"
                      label={itemm}
                      value={indx === data[index].isIndex}
                      containerStyle={{ marginTop: HEIGHT(12) }}
                    />
                  )
                })}
              </View>
              <Divider />
            </View>
          )
        })}
        <View style={styles.bottomButton}>
          <Button onPress={onReset} textColor={colors.gray_7} icon={iconRegistry.rotate_left}>
            Đặt lại
          </Button>
          <Button
            onPress={onHandlApply}
            mode="contained"
            icon={iconRegistry.rotate_left}
            style={{ borderRadius: 8 }}
          >
            Áp dụng
          </Button>
        </View>
      </View>
    </Modal>
  )
})
export default ModalFilter
ModalFilter.displayName = "ModalFilter"

const styles = StyleSheet.create({
  container: {
    width: WIDTH(295),
    backgroundColor: colors.white,
    height: getHeight(),
    flex: 1,
    marginRight: -WIDTH(32),
  },
  head: {
    backgroundColor: colors.gray_0,
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(32),
    paddingBottom: HEIGHT(spacing.md),
  },
  session: {
    paddingVertical: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH(280),
    paddingTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    paddingBottom: HEIGHT(spacing.md),
    backgroundColor: colors.white,
  },
})
