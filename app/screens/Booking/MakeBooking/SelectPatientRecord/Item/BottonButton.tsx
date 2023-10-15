import { StyleSheet, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { iconRegistry } from "@app/components/Icon"
import { translate } from "@app/i18n/translate"

export default function BottonButton() {
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        style={styles.buttonHome}
        textColor={colors.primary}
        icon={iconRegistry.folder_add}
        onPress={() => {
          navigate("CreatePatient")
        }}
      >
        {translate("booking.add_patient")}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonHome: {
    borderColor: colors.primary,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: WIDTH(spacing.md),
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingVertical: HEIGHT(spacing.sm),
    position: "absolute",
    right: 0,
  },
})
