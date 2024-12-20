import React, { ReactNode, useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Icons from './Icons'

type optionTypes = {
  leftItem?: ReactNode
  title: string
  children?: ReactNode
  setNavigator?: () => void
}

function OptionItem({ children, leftItem, title, setNavigator }: optionTypes) {
  const { ArrowIcon } = Icons
  const [renderItem, setRenderItem] = useState(false)

  const handleDeploy = () => {
    setRenderItem(true)
    if (renderItem == true) {
      setRenderItem(false)
    }
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={children ? handleDeploy : setNavigator}>
        <View className=" flex flex-row  justify-between items-center mx-2">
          <View className=" flex flex-row flex-1 items-center">
            <View className="p-[10px] items-center">{leftItem}</View>
            <Text className="text-helper font-bold text-center text-[16px]">{title}</Text>
          </View>
          <View className=" flex flex-row items-center">
            <ArrowIcon shown={renderItem} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {renderItem && <View className="">{children}</View>}
    </>
  )
}

export default OptionItem
