import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native";

export default function Settings()
{
    return (
        <SafeAreaView>
            <ScrollView>
                 <Text>Hello User</Text>
                 <Text>Menu option 1</Text>
                 <Text>Menu option 2</Text>
                 <Text>Menu option 3</Text>
                 <Text>Menu option 4</Text>
            </ScrollView>
        </SafeAreaView>
    )
}