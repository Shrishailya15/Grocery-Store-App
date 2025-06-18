import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, FlatList, Alert, ScrollView, SafeAreaView } from 'react-native'
import { API_URL } from '@env';

const CreateScreen = ({ data, setdata, fetchItems }) => {

    const [itemName, setItemName] = useState('')
    const [stockAmt, setStockAmt] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editItemId, setEditItemId] = useState(null)

    const handelAddItem = async () => {

        if (!itemName.trim() || !stockAmt.trim()) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(itemName)) {
            Alert.alert("Error", "Item name must contain only letters.");
            return;
        }
        if (isNaN(stockAmt) || Number(stockAmt) <= 0) {
            Alert.alert("Error", "Stock amount must be a valid positive number.");
            return;
        }

        try {
            const newItem = { name: itemName, stock: Number(stockAmt) };
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });
            Alert.alert("Success", "Item Added Successfully.")
            fetchItems();
        } catch (error) {
            Alert.alert("Error", "Unable to Add Item. Please Try again.")
            console.error('Error adding item:', error);
        }
        setItemName('')
        setStockAmt('')
        setIsEdit(false)
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            Alert.alert("Success", "Item Deleted Successfully.")
            fetchItems();
        } catch (error) {
            Alert.alert("Error", "Unable Deleting Item. Please Try again.")
            console.error('Error deleting item:', error);
        }
    }

    const handleEdit = (item) => {
        Alert.alert("Caution", "Please update the stock of selected Item.")
        setIsEdit(true)
        setItemName(item.name)
        setEditItemId(item.id)
    }

    const updateItem = async () => {
        if (!stockAmt.trim()) {
            Alert.alert("Error", "Please Enter the Stock")
            return
        }

        if (isNaN(stockAmt) || Number(stockAmt) <= 0) {
            Alert.alert("Error", "Stock amount must be a valid positive number.");
            return;
        }

        try {
            await fetch(`${API_URL}/${editItemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: itemName, stock: Number(stockAmt) }),
            });
            Alert.alert("Success", "Item Updated successfully")
            fetchItems();
        } catch (error) {
            Alert.alert("Error", "Unable to Update Item. Please Try again")
            console.error('Error updating item:', error);
        }
        setItemName('')
        setStockAmt('')
        setIsEdit(false)
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter an Item name...'
                placeholderTextColor="#999"
                style={styles.input}
                value={itemName}
                onChangeText={(item) => setItemName(item)}
            />
            <TextInput
                placeholder='Enter Stock amount.....'
                placeholderTextColor="#999"
                style={styles.input}
                value={stockAmt}
                keyboardType='numeric'
                onChangeText={(item) => setStockAmt(item)}
            />
            <Pressable style={styles.addbutton} onPress={() => isEdit ? updateItem() : handelAddItem()}>
                <Text style={styles.btnText}>{isEdit ? 'EDIT ITEM IN STOCK' : 'ADD ITEM IN STOCK'}</Text>
            </Pressable>

            <View style={{ marginTop: 10, flexGrow: 1 }}>
                <Text style={styles.headingText} >All Items in the Stock</Text>

                <FlatList //to render the array in the efficient manner.
                    data={data}
                    style={{ height: "60%" }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BFFF" }]}>
                            <Text style={styles.itemText} >{item.name}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={styles.itemText}>{item.stock}</Text>
                                <Pressable onPress={() => handleEdit(item)}>
                                    <Text style={[styles.itemText, { fontWeight: "bold" }]} >Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => handleDelete(item.id)}>
                                    <Text style={[styles.itemText, { fontWeight: "bold" }]}>Delete</Text>
                                </Pressable>
                            </View>
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
        </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: "4%",
        gap: 10
    },
    input: {
        borderWidth: 1.5,
        borderColor: "#D7F6BFFF",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7
    },
    addbutton: {
        backgroundColor: "#CABFEEFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    headingText: {
        fontWeight: "500",
        fontSize: 16,
        marginVertical: 10
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
        fontSize: 14,
    }

})