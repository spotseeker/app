import React from 'react';
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
    return (
        <SafeAreaView>
        <View>
            <Text className="text-lightc font-pbold text-[14px]">
                Pagina de busqueda
            </Text>
        </View>
        </SafeAreaView>

    );
}
