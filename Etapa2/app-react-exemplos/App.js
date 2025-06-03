import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";

const BASE_URL = "http://10.81.205.18:3000"; // Ajuste conforme sua rede

export default function App() {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editItem, setEditItem] = useState("");
  const [editQuantidade, setEditQuantidade] = useState("");

  // Buscar lista de compras do backend
  const fetchCompras = async () => {
    try {
      const res = await fetch(`${BASE_URL}/compras`);
      const data = await res.json();
      setCompras(data);
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  // Adicionar compra nova
  const adicionarCompra = async () => {
    if (!item.trim() || !quantidade.trim()) return;

    try {
      await fetch(`${BASE_URL}/compras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: item.trim(),
          quantidade: parseInt(quantidade),
        }),
      });
      setItem("");
      setQuantidade("");
      fetchCompras();
    } catch (error) {
      console.error("Erro ao adicionar compra:", error);
    }
  };

  // Atualizar compra
  const atualizarCompra = async (id) => {
    try {
      await fetch(`${BASE_URL}/compras/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: editItem,
          quantidade: parseInt(editQuantidade),
        }),
      });
      setEditandoId(null);
      setEditItem("");
      setEditQuantidade("");
      fetchCompras();
    } catch (error) {
      console.error("Erro ao atualizar compra:", error);
    }
  };

  // Deletar compra
  const deletarCompra = (id) => {
    Alert.alert("Confirmar", "Deseja apagar este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`${BASE_URL}/compras/${id}`, { method: "DELETE" });
            fetchCompras();
          } catch (error) {
            console.error("Erro ao deletar compra:", error);
          }
        },
      },
    ]);
  };

  // Renderiza cada item da lista de compras
  const renderItem = ({ item }) => {
    if (item.id === editandoId) {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.inputPequeno}
            value={editItem}
            onChangeText={setEditItem}
            placeholder="Item"
          />
          <TextInput
            style={styles.inputPequeno}
            value={editQuantidade.toString()}
            onChangeText={setEditQuantidade}
            placeholder="Quantidade"
            keyboardType="numeric"
          />
          <Button title="Salvar" onPress={() => atualizarCompra(item.id)} />
        </View>
      );
    }

    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>
          {item.item} - {item.quantidade}
        </Text>
        <View style={styles.buttons}>
          <Button
            title="Editar"
            onPress={() => {
              setEditandoId(item.id);
              setEditItem(item.item);
              setEditQuantidade(item.quantidade.toString());
            }}
          />
          <Button title="Excluir" onPress={() => deletarCompra(item.id)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>

      <TextInput
        style={styles.input}
        value={item}
        onChangeText={setItem}
        placeholder="Nome do item"
      />
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Quantidade"
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={adicionarCompra} />

      <FlatList
        data={compras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputPequeno: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
