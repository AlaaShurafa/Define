
import React, { useState } from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import * as Colors from '../styles/Colors'
const Image = ({ containerStyle, url, onPress, onLoad, style, loaderSize, ...restProps }) => {
    console.log(onLoad ,'onLoad')
  const [loaded, setLoaded] = useState(false)
  const handleLoading = (event) => {
      console.log('event')
    setLoaded(true)
    onLoad && onLoad(event) 
  }
  return (
    <TouchableOpacity style={[styles.base, containerStyle]} onPress={onPress} disabled={!onPress}>
      <FastImage
        style={[styles.base, style]}
        onLoad={handleLoading}
        source={{ uri: url }}
        {...restProps}
      />
      {!loaded && (
        <ActivityIndicator color={LOADER_COLOR} style={styles.loader} size={loaderSize} />
      )}
    </TouchableOpacity>
  )
}

export default Image

const BG_COLOR = "rgba(240, 242, 245, 1)"
const LOADER_COLOR = Colors.Main_Color

const styles = StyleSheet.create({
  base: {
    height: "100%",
    width: "100%",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BG_COLOR,
  },
})