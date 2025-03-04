import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IContact } from "@/utils/models/model";
import dummyData from "../../utils/dummyData.json";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function NotificationScreen() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<IContact[]>(dummyData);

  const filteredContacts = contacts.filter((contact: IContact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Connections</Text>
          <Button title="ADD" onPress={() => {}} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            padding: 8,
            marginBottom: 16,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1 }}
          />
        </View>

        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginBottom: 8,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  Last Interaction: {item.lastInteraction}
                </Text>
              </View>

              {item.completion === 100 ? (
                <Button
                    title="LinkedIn" 
                    color="green"
                    
                 />
              ) : (
                <AnimatedCircularProgress
                  size={50}
                  width={5}
                  fill={item.completion}
                  tintColor="#9654dd"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#ffffff"
                >
                  {(fill) => (
                    <Text style={{ position: "absolute", top: "35%", left: "25%" }}>
                      {`${item.completion}%`}
                    </Text>
                  )}
                </AnimatedCircularProgress>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
