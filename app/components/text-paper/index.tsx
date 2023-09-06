import i18n from "i18n-js"
import React from "react"
import { StyleProp, TextStyle } from "react-native"
import { translate, TxKeyPath } from "@app/i18n"
import { TextProps as RNTextProps, Text as RNText, useTheme } from "react-native-paper"
import { IColorsTheme } from "@app/theme/colors"

export interface TextProps<T> extends RNTextProps<T> {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components.
   */
  children?: React.ReactNode
  color: keyof IColorsTheme
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function TextPaper(props: TextProps<string>) {
  const { tx, txOptions, text, children, style: $styleOverride, color, ...rest } = props
  const { colors }: { colors: IColorsTheme } = useTheme()
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children
  const $styleColor: TextStyle = { color: colors[color] }
  const $styles = [$styleColor, $styleOverride]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}
