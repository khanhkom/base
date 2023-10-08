import { StyleSheet, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
const ItemTotalStar = ({ star, setStar }: { star: number; setStar: (val: number) => void }) => {
  return (
    <View style={styles.flexRowStar}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <Icon
            icon="ic_start"
            size={WIDTH(48)}
            onPress={() => setStar(index + 1)}
            key={index}
            color={index < star ? colors.yellow_6 : colors.gray_4}
          />
        )
      })}
    </View>
  )
}
export default ItemTotalStar

const styles = StyleSheet.create({
  flexRowStar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT(spacing.lg),
    width: WIDTH(304),
    justifyContent: "space-between",
  },
})
