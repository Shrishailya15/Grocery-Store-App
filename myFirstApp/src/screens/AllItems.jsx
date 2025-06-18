import { StyleSheet, Text, View, FlatList } from 'react-native'

const AllItems = ({ data }) => {
    return (
        <View style={{ flexGrow: 1, marginBottom: 50 }}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText} >Items</Text>
                <Text style={styles.headingText}>Quantity</Text>
            </View>
            <FlatList //to render the array in the efficient manner.
                data={data}
                style={{ height: "75%" }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BFFF" }]}>
                        <Text style={styles.itemText} >{item.name}</Text>
                        <Text style={styles.itemText}>{item.stock}</Text>
                    </View>
                )}
                contentContainerStyle={{ gap: 10 }}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: 'gray' }}>No items found</Text>
                    </View>
                }
            />
        </View>
    )
}

export default AllItems

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    headingText: {
        fontWeight: "500",
        fontSize: 16
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7
    },
    itemText: {
        fontWeight: "400",
        fontSize: 14
    }
})