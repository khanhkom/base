import { FlatList, Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Card, Divider, List } from "react-native-paper"
import R from "@app/assets"
import RefreshList from "@app/components/refresh-list"
import ItemPlaceholder from "@app/screens/SearchHome/TabResults/Item/ItemPlaceholder"
import { navigate } from "@app/navigators/navigationUtilities"
import useHookSearchFAQ from "../useHookSearchFAQ"
import { IQuestion } from "@app/interface/question"
import moment from "moment"
import ItemEmpty from "@app/components/ItemEmpty"

export default function FAQ({ keyword }) {
  console.log("keyword::", keyword)
  const {
    listData,
    onFooterRefresh,
    onHeaderRefresh,
    refreshState,
    loading: loadingList,
  } = useHookSearchFAQ(keyword)
  if (loadingList) {
    return (
      <View>
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <RefreshList
        data={listData}
        contentContainerStyle={{ paddingBottom: HEIGHT(120) }}
        loading={loadingList}
        onFooterRefresh={onFooterRefresh}
        onHeaderRefresh={onHeaderRefresh}
        showsVerticalScrollIndicator={false}
        refreshState={refreshState}
        ListEmptyComponent={() => (
          <ItemEmpty
            title="Không tìm thấy kết quả phù hợp"
            sourceImage={R.images.empty_chat}
            style={{ marginTop: HEIGHT(100) }}
          />
        )}
        renderItem={(item: IQuestion, index) => {
          const isAnswered = item?.isAnswered
          return (
            <Card
              mode="contained"
              style={styles.item}
              onPress={() => navigate("DetailQuestion", { id: item?.id })}
            >
              <List.Item
                left={() => {
                  return <Image source={R.images.ic_question} style={styles.icon} />
                }}
                style={{ paddingBottom: 0 }}
                title={() => {
                  return (
                    <View>
                      <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                        {item?.title}
                      </Text>
                    </View>
                  )
                }}
              />
              <Text size="xs" weight="normal" style={styles.textTime}>
                {moment(item?.createdAt).format("DD/MM/YYYY")}
              </Text>
              {isAnswered && (
                <>
                  <Divider style={{ marginVertical: HEIGHT(10), marginLeft: WIDTH(spacing.sm) }} />
                  <Text
                    size="ba"
                    weight="normal"
                    style={{ color: colors.gray_6, marginLeft: WIDTH(spacing.sm) }}
                  >
                    Trả lời:
                    <Text style={{ color: colors.gray_9 }}>
                      {" "}
                      Bác sĩ {item?.doctorName ?? "S Doctor"}
                    </Text>
                  </Text>
                </>
              )}
            </Card>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
  },
  textTime: { color: colors.gray_6, textAlign: "right" },
})
