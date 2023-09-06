import { StyleSheet, Text, View, ScrollView } from "react-native"
import React from "react"
import { Appbar, useTheme } from "react-native-paper"
import { IColorsTheme } from "@app/theme/colors"
import { goBack } from "@app/navigators/navigationUtilities"
import { spacing } from "@app/theme/spacing"
import RenderHtml from "react-native-render-html"
import { WIDTH } from "@app/config/functions"
import { TextPaper } from "@app/components/text-paper"

interface IScreenProps {
  route: {
    params: {
      item: {
        name: string
        dc_kn: string
        dc_dp: string
        dc_stg: string
        dc_pl: string
        dc_slb: string
        tc_ls: string
        tc_xn: string
        cdpb_cd: string
        cdpb_cdpb: string
        dt_cda: string
        dt_t: string
        objectID: string
      }
    }
  }
}
export default function DetailSick({ route }: IScreenProps) {
  const item = route?.params?.item
  const { colors }: { colors: IColorsTheme } = useTheme()
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: colors.surface }}>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <ScrollView>
        <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}>
          <TextPaper variant="headlineSmall" color="onSurface">
            {item.name}
          </TextPaper>
          <Text>{item.dc_kn}</Text>
          <Text>{item.dc_dp}</Text>
          <Text>{item.dc_stg}</Text>
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.dc_pl,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.dc_slb,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.tc_ls,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.tc_xn,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.cdpb_cd,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.cdpb_cdpb,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.dt_cda,
            }}
          />
          <RenderHtml
            contentWidth={WIDTH(343)}
            source={{
              html: item.dt_t,
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
